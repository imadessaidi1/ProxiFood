import { cookies } from 'next/headers';

export type RestaurantCard = {
  id: string;
  name: string;
  cuisineType: string;
  rating: number;
  priceLevel: number;
  city: string;
  address: string;
};

export type RestaurantsResponse = {
  data: RestaurantCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type RestaurantDetails = RestaurantCard & {
  description: string;
  lat: number;
  lng: number;
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
  isAvailable: boolean;
};

export type Cart = {
  id: string;
  restaurantId: string;
  restaurant: { id: string; name: string } | null;
  items: Array<{
    id: string;
    dishId: string;
    quantity: number;
    dish: Dish & { restaurantId: string };
  }>;
  totalCents: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://api:4000';
const CART_COOKIE_NAME = 'proxifood_cart_id';

function buildUrl(path: string, query?: Record<string, string | number | undefined>): string {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });
  }

  return url.toString();
}

function getCookieHeader(): string {
  const cartId = cookies().get(CART_COOKIE_NAME)?.value;
  return cartId ? `${CART_COOKIE_NAME}=${cartId}` : '';
}

function applyCartCookieFromResponse(response: Response): void {
  const rawSetCookie = response.headers.get('set-cookie');
  if (!rawSetCookie) {
    return;
  }

  const match = rawSetCookie.match(new RegExp(`${CART_COOKIE_NAME}=([^;]+)`));
  if (!match) {
    return;
  }

  cookies().set(CART_COOKIE_NAME, match[1], {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

async function apiFetch<T>(
  path: string,
  options?: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
    query?: Record<string, string | number | undefined>;
    allowNotFound?: boolean;
  }
): Promise<T | null> {
  const response = await fetch(buildUrl(path, options?.query), {
    method: options?.method ?? 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(getCookieHeader() ? { cookie: getCookieHeader() } : {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  applyCartCookieFromResponse(response);

  if (options?.allowNotFound && response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json();
}

export async function fetchRestaurants(params: {
  page?: number;
  limit?: number;
  q?: string;
  city?: string;
  cuisineType?: string;
}): Promise<RestaurantsResponse> {
  return (await apiFetch<RestaurantsResponse>('/restaurants', { query: params })) as RestaurantsResponse;
}

export async function fetchRestaurantDetails(id: string): Promise<RestaurantDetails> {
  return (await apiFetch<RestaurantDetails>(`/restaurants/${id}`)) as RestaurantDetails;
}

export async function fetchRestaurantDishes(id: string): Promise<Dish[]> {
  return (await apiFetch<Dish[]>(`/restaurants/${id}/dishes`)) as Dish[];
}

export async function fetchDishDetails(dishId: string): Promise<Dish> {
  const restaurants = await fetchRestaurants({ page: 1, limit: 100 });

  for (const restaurant of restaurants.data) {
    const dishes = await fetchRestaurantDishes(restaurant.id);
    const dish = dishes.find((item) => item.id === dishId);
    if (dish) {
      return dish;
    }
  }

  throw new Error('Dish not found');
}

export async function addToCart(dishId: string, quantity: number): Promise<Cart> {
  return (await apiFetch<Cart>('/cart/add', {
    method: 'POST',
    body: { dishId, quantity },
  })) as Cart;
}

export async function fetchCart(): Promise<Cart | null> {
  return apiFetch<Cart>('/cart', { allowNotFound: true });
}

export async function updateCartItem(cartItemId: string, quantity: number): Promise<Cart> {
  return (await apiFetch<Cart>(`/cart/item/${cartItemId}`, {
    method: 'PATCH',
    body: { quantity },
  })) as Cart;
}

export async function deleteCartItem(cartItemId: string): Promise<Cart> {
  return (await apiFetch<Cart>(`/cart/item/${cartItemId}`, {
    method: 'DELETE',
  })) as Cart;
}

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceCents / 100);
}
