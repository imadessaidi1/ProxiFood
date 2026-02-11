import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { MapViewContainer } from '@/components/maps';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 p-4">
      <header>
        <h1 className="text-3xl font-bold">ProxiFood</h1>
        <p className="text-gray-500">Commande en moins de 60 secondes.</p>
      </header>

      <Card>
        <h2 className="text-lg font-semibold">Nouveau catalogue restaurants</h2>
        <p className="text-sm text-gray-500">Consultez la liste paginée des restaurants et leurs plats en temps réel.</p>
      </Card>

      <Link href="/restaurants">
        <Button>Voir les restaurants</Button>
      </Link>

      <MapViewContainer title="Tracking live du livreur" />
    </main>
  );
}
