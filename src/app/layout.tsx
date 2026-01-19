import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/constants";

// Viewport configuration for mobile browsers
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#D4AF37" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "lowrider photography",
    "lowrider photographer",
    "chicago photographer",
    "chicano culture",
    "latino photography",
    "latina photography",
    "car show photographer",
    "hydraulics photography",
    "custom cars chicago",
    "lowrider bikes",
    "hood culture",
    "portrait photography chicago",
    "pilsen photographer",
    "little village photographer",
    "event photography",
    "car club photography",
    "hugo and his camera",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon-32x32.png", color: "#D4AF37" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Lowrider Culture Photography`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image.png"],
    creator: "@hugoandhiscamera",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "photography",
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen pt-32 md:pt-36">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
