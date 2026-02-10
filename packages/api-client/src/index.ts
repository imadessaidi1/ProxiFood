const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost/api';

export async function getRestaurants() {
  const res = await fetch(`${API_URL}/orders/restaurants`);
  return res.json();
}
