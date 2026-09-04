import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Mühendislik Hizmetlerimiz | Ay Mühendislik",
    description: "Endüstriyel doğalgaz tesisatı, RMS istasyonları, CAD proje çizimi, İGDAŞ onayı, kaskad kazan ve mekanik tesisat çözümleri.",
    path: "/hizmetler",
    image: "/images/1.png",
    keywords: [
      "doğalgaz hizmetleri",
      "endüstriyel doğalgaz",
      "RMS istasyonu",
      "kaskad kazan dairesi",
      "doğalgaz projelendirme",
      "İGDAŞ onaylı proje",
      "mekanik tesisat",
      "radyant ısıtma"
    ]
  });
}

export const revalidate = 60;

import ServicesClient from "@/components/ServicesClient";

export default function ServicesPage() {
  const settings = getSettings();
  const services = getServices();

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hizmetlerimiz", path: "/hizmetler" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <Navbar settings={settings} />

      <ServicesClient services={services} />

      <Footer settings={settings} services={services} />
    </div>
  );
}