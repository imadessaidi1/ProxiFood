import { PropsWithChildren } from 'react';

export function Button({ children }: PropsWithChildren) {
  return <button className="w-full rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-white">{children}</button>;
}

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-2xl bg-white p-4 shadow-sm">{children}</div>;
}

export function Loader() {
  return <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />;
}

export function Toast({ children }: PropsWithChildren) {
  return <div className="rounded-xl bg-gray-900 px-4 py-2 text-white">{children}</div>;
}
