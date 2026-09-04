import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSettings, getBlogPosts, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Mühendislik Rehberi & Blog | Ay Mühendislik",
    description: "Doğalgaz tesisatı, onay süreçleri, kaskad sistemler ve enerji verimliliği hakkında uzman makine mühendislerimizin hazırladığı teknik rehberler.",
    path: "/blog",
    image: "/images/2.png",
    keywords: [
      "doğalgaz rehberi",
      "doğalgaz proje onay süresi",
      "gaz açma rehberi",
      "kaskad kazan tasarruf",
      "Ay Mühendislik blog"
    ]
  });
}

export const revalidate = 60;

import BlogPageClient from "@/components/BlogPageClient";

export default function BlogPage() {
  const settings = getSettings();
  const posts = getBlogPosts();
  const services = getServices();

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Mühendislik Rehberi", path: "/blog" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <Navbar settings={settings} />

      <BlogPageClient posts={posts} />

      <Footer settings={settings} services={services} />
    </div>
  );
}