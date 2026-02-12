export type CartItemResponse = {
  id: string;
  dishId: string;
  quantity: number;
  dish: {
    id: string;
    restaurantId: string;
    name: string;
    description: string;
    priceCents: number;
    isAvailable: boolean;
    imageUrl: string | null;
  };
};

export type CartResponse = {
  id: string;
  restaurantId: string;
  restaurant: {
    id: string;
    name: string;
  } | null;
  items: CartItemResponse[];
  totalCents: number;
};
