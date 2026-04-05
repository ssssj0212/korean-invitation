import type { Metadata } from "next";

import { getMeta } from "@/lib/content";

import "./globals.css";

const meta = getMeta();

export const metadata: Metadata = {
  metadataBase: meta.siteUrl ? new URL(meta.siteUrl) : undefined,
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.siteUrl,
    siteName: meta.title,
    locale: "ko_KR",
    type: "website",
    images: meta.ogImage ? [{ url: meta.ogImage }] : undefined,
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
      <body>{children}</body>
    </html>
  );
}
