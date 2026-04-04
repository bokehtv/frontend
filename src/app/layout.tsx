import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BokehTV | Your Ultimate Media Tracker",
    template: "%s | BokehTV",
  },
  description: "BokehTV is the ultimate hub to discover, track, and log the movies and TV shows you love. Join the community and build your ultimate watchlist.",
  keywords: ["movies", "tv shows", "tracking", "watchlist", "entertainment", "films", "series", "tmdb"],
  authors: [{ name: "BokehTV Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://bokehtv.vercel.app"),
  openGraph: {
    title: "BokehTV",
    description: "Track your frames, build your collection.",
    url: "https://bokehtv.vercel.app",
    siteName: "BokehTV",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BokehTV Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BokehTV",
    description: "Track your frames, build your collection.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[150px] pointer-events-none rounded-full" />
        <Providers>
          <Navbar />
          <main className="flex-1 mt-16 z-10">
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
