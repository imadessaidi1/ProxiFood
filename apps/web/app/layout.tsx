import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProxiFood',
  description: '0% commission food delivery platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
