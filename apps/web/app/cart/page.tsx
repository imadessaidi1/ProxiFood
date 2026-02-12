import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { Card } from '@/components/ui';
import { deleteCartItem, fetchCart, formatPrice, updateCartItem } from '@/lib/api';

export default async function CartPage() {
  const cart = await fetchCart();

  async function increase(formData: FormData) {
    'use server';

    const itemId = String(formData.get('itemId'));
    const quantity = Number(formData.get('quantity'));
    await updateCartItem(itemId, quantity + 1);
    revalidatePath('/cart');
  }

  async function decrease(formData: FormData) {
    'use server';

    const itemId = String(formData.get('itemId'));
    const quantity = Number(formData.get('quantity'));

    if (quantity <= 1) {
      await deleteCartItem(itemId);
    } else {
      await updateCartItem(itemId, quantity - 1);
    }

    revalidatePath('/cart');
  }

  async function remove(formData: FormData) {
    'use server';

    const itemId = String(formData.get('itemId'));
    await deleteCartItem(itemId);
    revalidatePath('/cart');
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Panier</h1>

      {!cart || cart.items.length === 0 ? (
        <Card>
          <p className="text-gray-600">Votre panier est vide.</p>
          <Link href="/restaurants" className="mt-3 inline-block text-sm text-primary">Découvrir les restaurants</Link>
        </Card>
      ) : (
        <>
          <Card>
            <p className="text-sm text-gray-500">Restaurant</p>
            <p className="font-semibold">{cart.restaurant?.name ?? cart.restaurantId}</p>
          </Card>

          {cart.items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.dish.name}</p>
                  <p className="text-sm text-gray-600">{formatPrice(item.dish.priceCents)} / unité</p>
                </div>
                <p className="font-semibold">{formatPrice(item.dish.priceCents * item.quantity)}</p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <form action={decrease}>
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="quantity" value={item.quantity} />
                  <button type="submit" className="rounded-md border px-3 py-1">−</button>
                </form>
                <span className="min-w-8 text-center">{item.quantity}</span>
                <form action={increase}>
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="quantity" value={item.quantity} />
                  <button type="submit" className="rounded-md border px-3 py-1">+</button>
                </form>
                <form action={remove} className="ml-auto">
                  <input type="hidden" name="itemId" value={item.id} />
                  <button type="submit" className="text-sm text-red-600">Supprimer</button>
                </form>
              </div>
            </Card>
          ))}

          <Card>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-bold">{formatPrice(cart.totalCents)}</p>
            </div>
          </Card>
        </>
      )}
    </main>
  );
}
