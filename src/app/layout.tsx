import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    icon: "/icon.svg",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream-100 text-cocoa-800 antialiased selection:bg-blush-200 selection:text-cocoa-900 bg-grain font-sans">
        {children}
      </body>
    </html>
  );
}
