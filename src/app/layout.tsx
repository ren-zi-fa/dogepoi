import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecondNavbar from "@/components/SecondNavbar";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en">
      <head>
        {/* Google Analytics - gunakan lazyOnload untuk menghindari hydration issues */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${comicNeue.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Hindari "system" untuk menghindari hydration error
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SecondNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}