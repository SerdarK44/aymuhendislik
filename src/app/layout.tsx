import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://aymuhendislik.com.tr"),
  title: {
    default: "Ay Mühendislik | Tüm Türkiye Yetkili Doğalgaz ve Mekanik Mühendislik",
    template: "%s | Ay Mühendislik"
  },
  description: "İstanbul Tekstilkent merkezli olarak Tüm Türkiye genelinde büyük ölçekli sanayi tesisleri, OSB fabrikaları, toplu konutlar ve ticari yapılar için onaylı CAD projelendirme, RMS istasyonu, kaskad kazan ve anahtar teslim doğalgaz taahhüdü.",
  keywords: [
    "doğalgaz tesisatı",
    "tüm türkiye doğalgaz mühendisliği",
    "endüstriyel doğalgaz firması",
    "RMS istasyonu kurulumu",
    "kaskad kazan dairesi",
    "doğalgaz proje çizimi",
    "İGDAŞ yetkili firma",
    "EPDK yetkili mühendislik",
    "Tekstilkent doğalgaz mühendislik",
    "Esenler mühendislik firması",
    "OSB doğalgaz taahhüt",
    "fabrika doğalgaz dönüşümü",
    "gaz açma uygunluk belgesi"
  ],
  authors: [{ name: "Ay Mühendislik", url: "https://aymuhendislik.com.tr" }],
  creator: "Ay Mühendislik",
  publisher: "Ay Mühendislik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://aymuhendislik.com.tr",
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
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aymuhendislik.com.tr",
    siteName: "Ay Mühendislik",
    title: "Ay Mühendislik | Yetkili Doğalgaz Mühendisliği & Taahhüt",
    description: "Endüstriyel ve bireysel doğalgaz projelerinde 16+ yıllık uzman kadro ile onay garantili profesyonel çözümler.",
    images: [
      {
        url: "/images/1.png",
        width: 1200,
        height: 630,
        alt: "Ay Mühendislik Doğalgaz Tesisatı ve Mühendislik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ay Mühendislik | Yetkili Doğalgaz Mühendisliği",
    description: "İGDAŞ & EPDK Yetkili Makine Mühendisleri ile endüstriyel dönüşüm ve onaylı proje taahhüdü.",
    images: ["/images/1.png"],
  },
};

import MobileQuickBar from "@/components/MobileQuickBar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="h-full" data-scroll-behavior="smooth">
      <body
        className="min-h-full flex flex-col bg-brand-50 text-ink-900 antialiased pb-16 lg:pb-0"
        style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        <PageTransition>
          {children}
        </PageTransition>
        <MobileQuickBar />
      </body>
    </html>
  );
}