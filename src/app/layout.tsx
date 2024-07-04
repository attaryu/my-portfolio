import type { Metadata } from "next";

import localFont from 'next/font/local';

import "./globals.css";
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: "M Attar",
  description: "My own masterpiece",
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
      <body className={fontVariables}>
        <div className="max-w-widhest mx-auto relative">
          <Navbar  />
          {children}
        </div>
      </body>
    </html>
  );
}
