export type RestaurantCard = {
  id: string;
  name: string;
  cuisineType: string;
  rating: number;
  priceLevel: number;
  city: string;
  address: string;
};

export type RestaurantDetails = RestaurantCard & {
  description: string;
  lat: number;
  lng: number;
};

export type DishDto = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  isAvailable: boolean;
  imageUrl: string | null;
};

export type RestaurantsListResponse = {
  data: RestaurantCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};
