import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayearwithyou.love"),
  title: "A Year With You — Our First Anniversary",
  description:
    "A little digital scrapbook of our first year together, filled with memories, love, and everything in between.",
  keywords: ["anniversary", "first anniversary", "love story", "celebration", "memories"],
  authors: [{ name: "With Love" }],
  openGraph: {
    title: "A Year With You — Our First Anniversary",
    description:
      "A little digital scrapbook of our first year together, filled with memories, love, and everything in between.",
    url: "https://ayearwithyou.love",
    siteName: "A Year With You",
    images: [
      {
        url: "/images/hero/main.jpg",
        width: 1200,
        height: 630,
        alt: "A Year With You — 365 Days of Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Year With You — Our First Anniversary",
    description:
      "A little digital scrapbook of our first year together, filled with memories, love, and everything in between.",
    images: ["/images/hero/main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8EDEB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} scroll-smooth`}>
      <body className="min-h-screen bg-cream-100 text-cocoa-800 antialiased selection:bg-blush-200 selection:text-cocoa-900 bg-grain">
        {children}
      </body>
    </html>
  );
}
