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

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
                <Wrench className="w-3.5 h-3.5 text-brand-600" />
                <span>Yetkili Doğalgaz Çözümleri</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">Mühendislik Çözümlerimiz</h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                Tüm Türkiye genelinde sanayi tesislerinden konutlara anahtar teslim yetkili mühendislik ve taahhüt hizmetleri.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, i) => (
              <FadeIn key={srv.id} delay={i * 0.08}>
                <Link href={`/hizmetler/${srv.slug}`} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md hover:border-brand-300 transition-all">
                  <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={srv.image || "/images/1.png"}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-2">
                        {srv.title}
                      </h2>
                      <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {srv.shortDesc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                        <span>Hizmet Detayı & Keşif</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">Yetkili Mühendislik</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}