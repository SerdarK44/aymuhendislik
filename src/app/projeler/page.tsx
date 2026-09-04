import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSettings, getProjects, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Building, ArrowRight, FolderGit2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Referans Projelerimiz | Ay Mühendislik",
    description: "Ay Mühendislik tarafından başarıyla tamamlanan endüstriyel doğalgaz, RMS istasyonları, fabrika dönüşümleri ve merkezi kaskad kazan referans projeleri.",
    path: "/projeler",
    image: "/images/1.png",
    keywords: [
      "doğalgaz referansları",
      "tamamlanan doğalgaz projeleri",
      "fabrika doğalgaz dönüşümü referans",
      "OSB doğalgaz projeleri",
      "Ay Mühendislik referanslar"
    ]
  });
}

export const revalidate = 60;

import ProjectsClient from "@/components/ProjectsClient";

export default function ProjectsPage() {
  const settings = getSettings();
  const projects = getProjects();
  const services = getServices();

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Referans Projeler", path: "/projeler" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <Navbar settings={settings} />

      <ProjectsClient projects={projects} settings={settings} />

      <Footer settings={settings} services={services} />
    </div>
  );
}