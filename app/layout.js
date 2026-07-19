import './globals.css';

export const metadata = {
  title: 'SFE Shop Store — The real shop for shopping',
  description: 'Achte bon jan pwodwi, oswa vin Ajan Afilye pou touche komisyon.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
