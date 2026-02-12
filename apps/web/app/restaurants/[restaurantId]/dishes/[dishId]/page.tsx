import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Card } from '@/components/ui';
import { addToCart, fetchRestaurantDishes, formatPrice } from '@/lib/api';

type DishDetailsPageProps = {
  params: { restaurantId: string; dishId: string };
};

export default async function DishDetailsPage({ params }: DishDetailsPageProps) {
  const dishes = await fetchRestaurantDishes(params.restaurantId).catch(() => null);

  if (!dishes) {
    notFound();
  }

  const dish = dishes.find((item) => item.id === params.dishId);

  if (!dish) {
    notFound();
  }

  async function addDishToCart() {
    'use server';

    await addToCart(dish.id, 1);
    redirect('/cart');
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
      <Link href={`/restaurants/${params.restaurantId}`} className="text-sm text-primary">← Retour au restaurant</Link>

      <Card>
        <h1 className="text-2xl font-bold">{dish.name}</h1>
        <p className="mt-2 text-gray-700">{dish.description}</p>
        <p className="mt-3 text-lg font-semibold">{formatPrice(dish.priceCents)}</p>
        <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs ${dish.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {dish.isAvailable ? 'Disponible' : 'Indisponible'}
        </span>

        <form action={addDishToCart} className="mt-4">
          <button
            type="submit"
            className="w-full rounded-2xl bg-primary px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!dish.isAvailable}
          >
            Ajouter au panier
          </button>
        </form>
      </Card>
    </main>
  );
}
