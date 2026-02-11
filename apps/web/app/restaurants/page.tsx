import Link from 'next/link';
import { Card } from '@/components/ui';
import { fetchRestaurants } from '@/lib/api';

type RestaurantsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function valueFromParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

function toPositiveInt(value: string, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const page = toPositiveInt(valueFromParam(searchParams?.page), 1);
  const limit = toPositiveInt(valueFromParam(searchParams?.limit), 6);
  const q = valueFromParam(searchParams?.q);
  const city = valueFromParam(searchParams?.city);

  let content: React.ReactNode;

  try {
    const result = await fetchRestaurants({ page, limit, q, city });
    const totalPages = Math.max(1, Math.ceil(result.meta.total / result.meta.limit));

    content = (
      <>
        <p className="text-sm text-gray-500">{result.meta.total} restaurants trouvés.</p>

        {result.data.length === 0 ? (
          <Card>
            <p className="font-medium">Aucun restaurant trouvé.</p>
            <p className="text-sm text-gray-500">Essayez avec un autre mot-clé ou une autre ville.</p>
          </Card>
        ) : (
          <section className="space-y-3">
            {result.data.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
                <Card>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                      <p className="text-sm text-gray-600">{restaurant.cuisineType} · {restaurant.city}</p>
                      <p className="text-sm text-gray-500">{restaurant.address}</p>
                    </div>
                    <div className="text-right text-sm text-gray-700">
                      <p>⭐ {restaurant.rating.toFixed(1)}</p>
                      <p>€{'€'.repeat(Math.max(restaurant.priceLevel - 1, 0))}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </section>
        )}

        <nav className="mt-2 flex items-center justify-between text-sm">
          <Link
            className={`rounded-lg px-3 py-2 ${page <= 1 ? 'pointer-events-none bg-gray-100 text-gray-400' : 'bg-white shadow-sm'}`}
            href={`/restaurants?page=${Math.max(1, page - 1)}&limit=${limit}&q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`}
          >
            ← Précédent
          </Link>
          <span>
            Page {page}/{totalPages}
          </span>
          <Link
            className={`rounded-lg px-3 py-2 ${page >= totalPages ? 'pointer-events-none bg-gray-100 text-gray-400' : 'bg-white shadow-sm'}`}
            href={`/restaurants?page=${Math.min(totalPages, page + 1)}&limit=${limit}&q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`}
          >
            Suivant →
          </Link>
        </nav>
      </>
    );
  } catch {
    content = (
      <Card>
        <p className="font-medium">Erreur de chargement.</p>
        <p className="text-sm text-gray-500">Vérifiez que l’API est lancée puis rechargez la page.</p>
      </Card>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <p className="text-gray-500">Découvrez les restaurants autour de vous.</p>
      </header>

      <form className="grid gap-2 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-3">
        <input name="q" defaultValue={q} placeholder="Recherche (q)" className="rounded-xl border p-2" />
        <input name="city" defaultValue={city} placeholder="Ville" className="rounded-xl border p-2" />
        <button type="submit" className="rounded-xl bg-primary px-4 py-2 font-semibold text-white">Rechercher</button>
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="limit" value={String(limit)} />
      </form>

      {content}
    </main>
  );
}
