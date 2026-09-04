import { Metadata } from "next";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Navigation, Clock, Link as LinkIcon, Share2, Headphones } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildSeoMetadata({
    title: `İletişim & Ücretsiz Keşif | ${settings.companyName}`,
    description: "Ay Mühendislik iletişim bilgileri, adres, telefon, keşif hattı ve ücretsiz yerinde keşif formu.",
    path: "/iletisim",
    image: "/images/1.png",
    keywords: [
      "Ay Mühendislik iletişim",
      "doğalgaz keşif randevusu",
      "Tekstilkent mühendislik adres",
      "doğalgaz mühendislik telefon"
    ]
  });
}

export const revalidate = 60;

import ContactClient from "@/components/ContactClient";

export default function ContactPage() {
  const settings = getSettings();
  const services = getServices();

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "İletişim", path: "/iletisim" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={localBusinessJsonLd(settings)} />
      <Navbar settings={settings} />

      <ContactClient settings={settings} />

      <Footer settings={settings} services={services} />
    </div>
  );
}