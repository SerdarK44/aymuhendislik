"use client";

import { ShieldCheck, Zap, Award, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { whyUsEn } from "@/lib/i18n/contentTranslations";

export default function WhyUs({ settings }: { settings?: Partial<SiteSettings> }) {
  const { isEn } = useLanguage();

  const points = [
    {
      icon: ShieldCheck,
      title: isEn ? whyUsEn.items[0].title : (settings?.whyUsItem1Title || "EPDK & İGDAŞ Yetkili"),
      desc: isEn ? whyUsEn.items[0].desc : (settings?.whyUsItem1Desc || "Tüm projeler yetkili makine mühendislerimiz tarafından onaylı çizilir, sıfır hata ile resmi kabul teslimi yapılır."),
      number: "01"
    },
    {
      icon: Zap,
      title: isEn ? whyUsEn.items[1].title : (settings?.whyUsItem2Title || "Hızlı Gaz Açımı"),
      desc: isEn ? whyUsEn.items[1].desc : (settings?.whyUsItem2Desc || "Proje onayından gaz açma randevusuna kadar tüm süreci hızlandırılmış dijital takiple yönetiyoruz."),
      number: "02"
    },
    {
      icon: Award,
      title: isEn ? whyUsEn.items[2].title : (settings?.whyUsItem3Title || (settings?.yearsExperience ? `${settings.yearsExperience}+ Yıl Saha Deneyimi` : "16+ Yıl Saha Deneyimi")),
      desc: isEn ? whyUsEn.items[2].desc : (settings?.whyUsItem3Desc || "Türkiye'nin öncü sanayi kuruluşlarına ve binlerce konuta teslim ettiğimiz proje referansları."),
      number: "03"
    },
    {
      icon: Clock,
      title: isEn ? whyUsEn.items[3].title : (settings?.whyUsItem4Title || "7/24 Acil Müdahale"),
      desc: isEn ? whyUsEn.items[3].desc : (settings?.whyUsItem4Desc || "Gaz kaçakları ve kritik arızalarda 7 gün 24 saat sahada hazır sertifikalı teknik ekip."),
      number: "04"
    },
  ];

  const badge = isEn ? whyUsEn.badge : (settings?.whyUsBadge || "Neden Biz");
  const title = isEn ? whyUsEn.title : (settings?.whyUsTitle || "Güvenli, Onaylı ve Hızlı Tesisat");
  const subtitle = isEn ? whyUsEn.subtitle : (settings?.whyUsSubtitle || "Doğalgaz hata kabul etmez. Sertifikalı mühendislik güvencesiyle, her projeyi TSE ve EPDK standartlarında teslim ediyoruz.");

  const stats = [
    { num: `${settings?.yearsExperience || 16}+`, label: isEn ? "Years Experience" : "Yıl Deneyim" },
    { num: `${(settings?.completedProjects || 1450).toLocaleString(isEn ? "en-US" : "tr-TR")}+`, label: isEn ? "Projects Delivered" : "Proje Teslimi" },
    { num: "100%", label: isEn ? "Official Approval" : "Resmi Onay" },
  ];

  return (
    <section className="py-20 sm:py-32 bg-ink-900 relative overflow-hidden noise-overlay">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-[120px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(184,146,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,74,0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />
      
      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <FadeIn direction="left">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-brand-500" />
                <p className="text-xs font-bold text-brand-400 uppercase tracking-[0.2em]">{badge}</p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
                {title}
              </h2>
              <p className="text-ink-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                {subtitle}
              </p>
              
              {/* Stats counter row - Responsive on 320px+ */}
              <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-ink-800">
                {stats.map((stat, idx) => (
                  <FadeIn key={idx} delay={0.3 + idx * 0.15} direction="up">
                    <div className="text-center sm:text-left">
                      <div className="text-2xl sm:text-3xl font-black text-brand-500 mb-0.5">{stat.num}</div>
                      <div className="text-[10px] sm:text-xs text-ink-400 uppercase tracking-wider font-semibold">{stat.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <FadeIn key={idx} delay={0.15 + idx * 0.12}>
                  <motion.div 
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    className="relative group bg-ink-800/50 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-ink-800 hover:border-brand-500/30 transition-all duration-500"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors duration-500">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-ink-800 group-hover:text-ink-600 transition-colors select-none">{pt.number}</span>
                      </div>
                      <h3 className="font-bold text-white text-base sm:text-lg">{pt.title}</h3>
                      <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">{pt.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}