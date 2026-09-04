"use client";

import Image from "next/image";
import { ShieldCheck, Target, Award, Users, CheckCircle2, Building2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { SiteSettings, ServiceItem } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutClient({
  settings,
}: {
  settings: SiteSettings;
  services: ServiceItem[];
}) {
  const { isEn } = useLanguage();

  const values = isEn
    ? [
        { icon: ShieldCheck, title: "Safety Focused", desc: "Uncompromising safety standards adhering to national and international EPDK & EN norms." },
        { icon: Target, title: "Zero Error", desc: "Zero tolerance for error in CAD engineering calculations and field pipe installations." },
        { icon: Award, title: "Certified Expertise", desc: "Licensed professional mechanical engineers and certified orbital/gas welding teams." },
        { icon: Users, title: "Client Satisfaction", desc: "Transparent process tracking, on-time project handover, and continuous engineering support." },
      ]
    : [
        { icon: ShieldCheck, title: "Güvenlik Odaklı", desc: "Tesisat projelerinde tavizsiz güvenlik ve EPDK standartları." },
        { icon: Target, title: "Sıfır Hata", desc: "Mühendislik hesaplamalarında ve saha uygulamasında sıfır hata prensibi." },
        { icon: Award, title: "Sertifikalı Uzmanlık", desc: "Yetkili makine mühendisleri ve sertifikalı kaynak/montaj ekipleri." },
        { icon: Users, title: "Müşteri Memnuniyeti", desc: "Şeffaf süreç yönetimi ve taahhüt edilen sürede kesin teslim." },
      ];

  const checklist = isEn
    ? [
        "Certified Mechanical Engineering Staff (EPDK / Authority Authorized)",
        "Officially Certified & Tested Technical Welding Specialists",
        "Comprehensive Technical Field & Maintenance Network",
        "Industry-Leading Turnkey Conversion & EPC Contracting",
      ]
    : [
        "Uzman Makine Mühendisleri Kadrosu",
        "MYK Belgeli ve Sertifikalı Ustalar",
        "Periyodik Bakım ve Teknik Servis Ağı",
        "Endüstriyel Dönüşümde Lider Çözümler",
      ];

  const aboutParagraphs = isEn
    ? [
        "Ay Mühendislik, as an authorized engineering contractor certified by Gas Distribution Authorities and EPDK, has successfully delivered over 1,450 major projects across Turkey. From high-capacity industrial RMS regulating stations to commercial cascade boiler rooms, all engineering design, load calculations, and pressure loss simulations are performed in-house by our certified mechanical engineers.",
        "Every welded seam and every pipeline installed on site is strictly audited against international standards (ASME, EN) and rigorous safety codes. Our mission extends beyond gas commissioning: we build robust, energy-efficient, and long-lasting mechanical infrastructures that operate with zero downtime.",
      ]
    : (settings.aboutFull || "Ay Mühendislik, İGDAŞ ve EPDK yetkili firması olarak İstanbul ve çevre illerde 1.450'den fazla başarılı projeye imza atmıştır. RMS istasyonlarından kaskad kazan dairelerine kadar her ölçekteki projede mühendislik hesaplamalarını bizzat yapıyoruz.\n\nSahadaki her kaynak, çekilen her hat uluslararası normlara (ASME, EN) ve yerel şartnamelere uygun olarak denetlenir. Amacımız sadece gaz açmak değil; yıllarca sorunsuz ve maksimum verimle çalışacak sistemler kurmaktır.")
        .split("\n\n");

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              <span>
                {settings.yearsExperience || 16}+ {isEn ? "Years of Engineering Assurance" : "Yıllık Mühendislik Güvencesi"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">
              {isEn ? "Who We Are" : "Biz Kimiz?"}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              {isEn
                ? "Since 2008, we design, engineer, and commission certified, secure, and energy-efficient natural gas systems for industrial plants and commercial spaces."
                : (settings.aboutShort || "2008 yılından bu yana endüstriyel tesisler ve yaşam alanları için onaylı, güvenli ve verimli doğalgaz sistemleri projelendiriyor ve uyguluyoruz.")}
            </p>
          </div>
        </FadeIn>

        {/* Image & Text Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
              <Image
                src="/images/2.png"
                alt={`${settings.companyName} Team`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink-900/10" />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
              {isEn ? "Engineering Assurance in Natural Gas" : "Doğalgazda Mühendislik Güvencesi"}
            </h2>
            <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
              {aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <ul className="space-y-3 pt-2">
              {checklist.map((item, i) => (
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
            <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight">
              {isEn ? "Our Core Values" : "Kurumsal Değerlerimiz"}
            </h2>
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
  );
}
