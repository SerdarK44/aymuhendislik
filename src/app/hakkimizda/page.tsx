import { Metadata } from "next";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ShieldCheck, Target, Award, Users, CheckCircle2, Building2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildSeoMetadata({
    title: `Hakkımızda & Kurumsal Profil | ${settings.companyName}`,
    description: "Ay Mühendislik kurumsal profili, 16+ yıllık mühendislik deneyimimiz, EPDK ve İGDAŞ yetkili uzman kadromuz ve kalite standartlarımız.",
    path: "/hakkimizda",
    image: "/images/2.png",
    keywords: [
      "Ay Mühendislik hakkında",
      "doğalgaz mühendislik firması",
      "yetkili makine mühendisi",
      "İGDAŞ yetki belgesi",
      "Tekstilkent mühendislik"
    ]
  });
}

export const revalidate = 60;

import AboutClient from "@/components/AboutClient";

export default function AboutPage() {
  const settings = getSettings();
  const services = getServices();

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hakkımızda", path: "/hakkimizda" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={localBusinessJsonLd(settings)} />
      <Navbar settings={settings} />

      <AboutClient settings={settings} services={services} />

      <Footer settings={settings} services={services} />
    </div>
  );
}