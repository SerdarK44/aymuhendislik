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

export default function AboutPage() {
  const settings = getSettings();
  const services = getServices();

  const values = [
    { icon: ShieldCheck, title: "Güvenlik Odaklı", desc: "Tesisat projelerinde tavizsiz güvenlik ve EPDK standartları." },
    { icon: Target, title: "Sıfır Hata", desc: "Mühendislik hesaplamalarında ve saha uygulamasında sıfır hata prensibi." },
    { icon: Award, title: "Sertifikalı Uzmanlık", desc: "Yetkili makine mühendisleri ve sertifikalı kaynak/montaj ekipleri." },
    { icon: Users, title: "Müşteri Memnuniyeti", desc: "Şeffaf süreç yönetimi ve taahhüt edilen sürede kesin teslim." },
  ];

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hakkımızda", path: "/hakkimizda" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={localBusinessJsonLd(settings)} />
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
                <Building2 className="w-3.5 h-3.5 text-brand-600" />
                <span>16+ Yıllık Mühendislik Güvencesi</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">Biz Kimiz?</h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                2008 yılından bu yana endüstriyel tesisler ve yaşam alanları için onaylı, güvenli ve verimli doğalgaz sistemleri projelendiriyor ve uyguluyoruz.
              </p>
            </div>
          </FadeIn>

          {/* Image & Text Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                <Image src="/images/2.png" alt="Ay Mühendislik Kadrosu" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
                <div className="absolute inset-0 bg-ink-900/10" />
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.2} className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">Doğalgazda Mühendislik Güvencesi</h2>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                Ay Mühendislik, İGDAŞ ve EPDK yetkili firması olarak İstanbul ve çevre illerde 1.450&apos;den fazla başarılı projeye imza atmıştır. RMS istasyonlarından kaskad kazan dairelerine kadar her ölçekteki projede mühendislik hesaplamalarını bizzat yapıyoruz.
              </p>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                Sahadaki her kaynak, çekilen her hat uluslararası normlara (ASME, EN) ve yerel şartnamelere uygun olarak denetlenir. Amacımız sadece gaz açmak değil; yıllarca sorunsuz ve maksimum verimle çalışacak sistemler kurmaktır.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  "Uzman Makine Mühendisleri Kadrosu",
                  "MYK Belgeli ve Sertifikalı Ustalar",
                  "7/24 Acil Müdahale ve Servis Ağı",
                  "Endüstriyel Dönüşümde Lider Çözümler"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-ink-900">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Core Values */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight">Kurumsal Değerlerimiz</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-sm text-center h-full hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-brand-600 border border-brand-200/60">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-ink-900 mb-2">{v.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{v.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}