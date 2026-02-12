import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui';
import { fetchRestaurantDetails, fetchRestaurantDishes, formatPrice } from '@/lib/api';

type RestaurantDetailsPageProps = {
  params: { id: string };
};

export default async function RestaurantDetailsPage({ params }: RestaurantDetailsPageProps) {
  try {
    const [restaurant, dishes] = await Promise.all([
      fetchRestaurantDetails(params.id),
      fetchRestaurantDishes(params.id),
    ]);

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
        <Link href="/restaurants" className="text-sm text-primary">← Retour aux restaurants</Link>

        <Card>
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-sm text-gray-600">{restaurant.cuisineType} · ⭐ {restaurant.rating.toFixed(1)} · {'€'.repeat(restaurant.priceLevel)}</p>
          <p className="mt-2 text-gray-700">{restaurant.description}</p>
          <p className="mt-2 text-sm text-gray-500">{restaurant.address}, {restaurant.city}</p>
          <p className="text-sm text-gray-500">Coordonnées: {restaurant.lat.toFixed(4)}, {restaurant.lng.toFixed(4)}</p>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Plats</h2>
          {dishes.length === 0 ? (
            <Card>
              <p className="text-gray-600">Aucun plat disponible.</p>
            </Card>
          ) : (
            dishes.map((dish) => (
              <Link key={dish.id} href={`/restaurants/${params.id}/dishes/${dish.id}`}>
                <Card>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{dish.name}</h3>
                      <p className="text-sm text-gray-600">{dish.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(dish.priceCents)}</p>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs ${dish.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {dish.isAvailable ? 'Disponible' : 'Indisponible'}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
