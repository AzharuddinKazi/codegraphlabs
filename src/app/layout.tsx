import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Azharuddin Kazi | Specialist Data Scientist',
  description:
    'Personal portfolio and blog of Azharuddin Kazi, Specialist Data Scientist in financial supervision and risk modeling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/design-system/fonts/fonts.css" />
        <link rel="stylesheet" href="/design-system/system/variables.css" />
        <link rel="icon" href="/design-system/assets/logo-mark.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
