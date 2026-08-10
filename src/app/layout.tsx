import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_URL = "https://scrapearn.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ScrapEarn | Doorstep Scrap Collection in Hyderabad",
    template: "%s | ScrapEarn",
  },
  description:
    "Sell your scrap the smart way in Hyderabad. Best prices for Newspaper, Plastic, Metal, and E-waste. Instant payment & digital weighing.",
  applicationName: "ScrapEarn",
  authors: [{ name: "ScrapEarn", url: SITE_URL }],
  creator: "ScrapEarn",
  publisher: "ScrapEarn",
  keywords: [
    "scrap collection Hyderabad",
    "sell scrap online",
    "doorstep scrap pickup",
    "scrap dealer Hyderabad",
    "e-waste pickup",
    "newspaper scrap price",
    "plastic scrap Hyderabad",
    "metal scrap buyer",
    "ScrapEarn",
  ],
  category: "Scrap Collection & Recycling",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ScrapEarn",
    title: "ScrapEarn | Doorstep Scrap Collection in Hyderabad",
    description:
      "Sell your scrap the smart way in Hyderabad. Best prices for Newspaper, Plastic, Metal, and E-waste. Instant payment & digital weighing.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ScrapEarn - Doorstep Scrap Collection in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ScrapEarn",
    creator: "@ScrapEarn",
    title: "ScrapEarn | Doorstep Scrap Collection in Hyderabad",
    description:
      "Sell your scrap the smart way in Hyderabad. Best prices for Newspaper, Plastic, Metal, and E-waste. Instant payment & digital weighing.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
