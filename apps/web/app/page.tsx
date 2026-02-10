import { Button, Card } from '@/components/ui';
import { MapViewContainer } from '@/components/maps';

const restaurants = [
  { name: 'Green Bowl', eta: '22 min', fee: '2,90€' },
  { name: 'Roma Pasta', eta: '26 min', fee: '1,90€' },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 p-4">
      <header>
        <h1 className="text-3xl font-bold">ProxiFood</h1>
        <p className="text-gray-500">Commande en moins de 60 secondes.</p>
      </header>

      <section className="space-y-3">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.name}>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-sm text-gray-500">{restaurant.eta} · Livraison {restaurant.fee}</p>
          </Card>
        ))}
      </section>

      <MapViewContainer title="Tracking live du livreur" />
      <Button>Passer au checkout</Button>
    </main>
  );
}
