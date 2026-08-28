
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Envíos DosRuedas - Propuesta Operativa',
  description: 'Logística Corporativa de Alta Precisión en Mar del Plata',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700;900&family=Montserrat:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-slate-900 overflow-x-hidden md:py-12" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
