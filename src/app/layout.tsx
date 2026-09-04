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
import { getSettings } from "@/lib/db";
import { cookies, headers } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import { Locale } from "@/lib/i18n/translations";
import { getSessionAdmin } from "@/lib/auth";
import MaintenanceView from "@/components/MaintenanceView";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = getSettings();
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("ay_lang")?.value;
  const initialLocale: Locale = cookieLang === "en" ? "en" : "tr";

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const isAdminRoute = pathname.startsWith("/admin");
  const isApiRoute = pathname.startsWith("/api");
  const isUploadRoute = pathname.startsWith("/uploads");
  const isPreviewMaintenance = pathname === "/bakimda";
  const isMaintenanceActive = Boolean(settings?.maintenanceMode);

  const session = await getSessionAdmin();
  const isAdmin = Boolean(session);

  const showMaintenance = (isMaintenanceActive && !isAdmin && !isAdminRoute && !isApiRoute && !isUploadRoute) || isPreviewMaintenance;

  return (
    <html lang={initialLocale} className="h-full" data-scroll-behavior="smooth">
      <body
        className={`min-h-full flex flex-col ${
          showMaintenance ? "bg-[#0a0e17] text-white" : "bg-brand-50 text-ink-900 pb-16 lg:pb-0"
        } antialiased`}
        style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        <LanguageProvider initialLocale={initialLocale}>
          {showMaintenance ? (
            <MaintenanceView settings={settings} />
          ) : (
            <>
              {isMaintenanceActive && isAdmin && !isAdminRoute && (
                <div className="bg-amber-500 text-ink-950 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-md z-50 sticky top-0">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-ink-950 shrink-0" />
                    <span>BAKIM MODU AKTİF — Site ziyaretçilere kapalıdır. Yönetici oturumunuz açık olduğu için sayfaları görüntülüyorsunuz.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="/admin/ayarlar" className="underline hover:text-white transition-colors">Ayarları Yönet</Link>
                    <Link href="/bakimda" target="_blank" className="bg-ink-900 text-white px-2.5 py-1 rounded text-[11px] hover:bg-ink-800 transition-colors">Bakım Sayfasını Gör</Link>
                  </div>
                </div>
              )}
              <PageTransition>
                {children}
              </PageTransition>
              {!isAdminRoute && <MobileQuickBar phone={settings.phone} whatsapp={settings.whatsapp} />}
            </>
          )}
        </LanguageProvider>
      </body>
    </html>
  );
}