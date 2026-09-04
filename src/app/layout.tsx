import type { Metadata } from 'next';
import Header from '@/components/Header';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Space_Grotesk, Khand, Work_Sans } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const khand = Khand({
  subsets: ['devanagari', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-khand',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: 'Paathsala',
  description: 'One school. Every exam. Your language.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${khand.variable} ${workSans.variable}`}
      >
      <LanguageProvider>
      <Header />  
        {children}
      </LanguageProvider>  
      </body>
    </html>
  );
}
