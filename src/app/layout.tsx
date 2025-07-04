import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import Script from "next/script"; // ← Import Script
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Doge-Poi | NZY",
  description: "created by renzi febriandika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comicNeue.variable}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
     

        {children}

        <Footer />
      </body>
    </html>
  );
}
