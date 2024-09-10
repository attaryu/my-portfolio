import type { Metadata } from 'next';

import localFont from 'next/font/local';

import Lenis from '@/app/Lenis';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';

import './globals.css';

export const metadata: Metadata = {
  title: 'M Attar',
  description: 'My own masterpiece',
};

const neueMontrealNormal = localFont({
  src: '../font/neue-montreal/NeueMontreal-Regular.otf',
  variable: '--neue-montreal-normal',
});

const neueMontrealMedium = localFont({
  src: '../font/neue-montreal/NeueMontreal-Medium.otf',
  variable: '--neue-montreal-medium',
});

const tuskerGroteskMedium = localFont({
  src: '../font/tusker-grotesk/TuskerGrotesk-4500Medium.otf',
  variable: '--tusker-grotesk-medium',
});

const tuskerGroteskSemibold = localFont({
  src: '../font/tusker-grotesk/TuskerGrotesk-3600Semibold.otf',
  variable: '--tusker-grotesk-semibold',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    neueMontrealNormal.variable,
    neueMontrealMedium.variable,
    tuskerGroteskMedium.variable,
    tuskerGroteskSemibold.variable,
  ].join(' ');

  return (
    <html lang="en">
      <body className={`mx-auto max-w-widhest ${fontVariables}`}>
        <Lenis>
          <Loading />

          <div className="root-container relative h-svh overflow-hidden" id="top">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Lenis>
      </body>
    </html>
  );
}
