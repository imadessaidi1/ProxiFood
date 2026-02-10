import { z } from 'zod';

export const checkoutSchema = z.object({
  restaurantId: z.string(),
  items: z.array(z.object({ menuId: z.string(), qty: z.number().int().positive() })),
  address: z.string().min(5),
});
