import { Metadata } from "next";
import { getSettings, getServices, getProjects, getBlogPosts, getTestimonials, getSliders, getReferences } from "@/lib/db";
import HomeClient from "@/components/HomeClient";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, localBusinessJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildSeoMetadata({
    title: `${settings.companyName} | Yetkili Doğalgaz Projelendirme, Endüstriyel Tesisat & Mekanik Mühendislik`,
    description: settings.heroSubtitle || "EPDK ve İGDAŞ yetkili makine mühendisleri ile fabrika, konut ve ticari binalar için onaylı CAD doğalgaz projesi, RMS istasyonları, kaskad kazan ve anahtar teslim taahhüt.",
    path: "/",
    image: "/images/1.png",
    keywords: [
      "doğalgaz projesi",
      "endüstriyel doğalgaz tesisatı",
      "RMS istasyonu",
      "doğalgaz projelendirme istanbul",
      "kaskad kazan dairesi dönüşümü",
      "gaz açma uygunluk belgesi",
      "yetkili doğalgaz mühendisi",
      "radyant fabrika ısıtma",
      "Ay Mühendislik",
      "doğalgaz taahhüt firması"
    ]
  });
}

export const revalidate = 60;

export default function HomePage() {
  const settings = getSettings();
  const services = getServices();
  const projects = getProjects();
  const blogPosts = getBlogPosts();
  const testimonials = getTestimonials();
  const slides = getSliders();
  const references = getReferences();

  return (
    <>
      <StructuredData data={localBusinessJsonLd(settings)} />
      <HomeClient
        settings={settings}
        services={services}
        projects={projects}
        blogPosts={blogPosts}
        testimonials={testimonials}
        slides={slides}
        references={references}
      />
    </>
  );
}
