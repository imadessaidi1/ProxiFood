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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://api:4000';

function buildUrl(
  path: string,
  query?: Record<string, string | number | undefined>
): string {
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

async function apiFetch<T>(
  path: string,
  query?: Record<string, string | number | undefined>
): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    cache: 'no-store',
  });

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
  return apiFetch('/restaurants', params);
}

export async function fetchRestaurantDetails(
  id: string
): Promise<RestaurantDetails> {
  return apiFetch(`/restaurants/${id}`);
}

export async function fetchRestaurantDishes(
  id: string
): Promise<Dish[]> {
  return apiFetch(`/restaurants/${id}/dishes`);
}

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(priceCents / 100);
}
