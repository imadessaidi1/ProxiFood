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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

function buildUrl(path: string, query?: Record<string, string | number | undefined>): string {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const url = new URL(`${base}${path}`, 'http://proxifood.local');

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return `${url.pathname}${url.search}`;
}

async function apiFetch<T>(path: string, query?: Record<string, string | number | undefined>): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchRestaurants(params: {
  page?: number;
  limit?: number;
  q?: string;
  city?: string;
  cuisineType?: string;
}): Promise<RestaurantsResponse> {
  return apiFetch<RestaurantsResponse>('/restaurants', params);
}

export async function fetchRestaurantDetails(id: string): Promise<RestaurantDetails> {
  return apiFetch<RestaurantDetails>(`/restaurants/${id}`);
}

export async function fetchRestaurantDishes(id: string): Promise<Dish[]> {
  return apiFetch<Dish[]>(`/restaurants/${id}/dishes`);
}

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceCents / 100);
}
