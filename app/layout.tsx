import type { Metadata } from "next";
import { Cormorant_Garamond, Gowun_Batang, Gowun_Dodum } from "next/font/google";

import { getMeta } from "@/lib/content";

import "./globals.css";

const meta = getMeta();
const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gowun-batang",
  display: "swap",
});
const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gowun-dodum",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: meta.siteUrl ? new URL(meta.siteUrl) : undefined,
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: meta.siteUrl,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.siteUrl,
    siteName: meta.title,
    locale: "ko_KR",
    type: "website",
    images: meta.ogImage
      ? [
          {
            url: meta.ogImage,
            secureUrl: meta.ogImage,
            width: 1200,
            height: 630,
            alt: meta.title,
            type: "image/jpeg",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: meta.ogImage ? [meta.ogImage] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth">
      <body className={`${gowunBatang.variable} ${gowunDodum.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
