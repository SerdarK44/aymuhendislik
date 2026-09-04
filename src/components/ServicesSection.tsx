"use client";

import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import FadeIn, { TiltCard } from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { servicesEnMap } from "@/lib/i18n/contentTranslations";

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  const { t, isEn } = useLanguage();

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="max-w-xl mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-brand-500" />
              <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">
                {isEn ? "Our Engineering Solutions" : "Hizmetlerimiz"}
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-ink-900 leading-[1.1] tracking-tight">
              {isEn ? (
                <>Expert Natural Gas<br />Engineering</>
              ) : (
                <>Uzman Doğalgaz<br />Mühendisliği</>
              )}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, i) => {
            const srvTitle = (isEn && servicesEnMap[srv.slug]) ? servicesEnMap[srv.slug].title : srv.title;
            const srvDesc = (isEn && servicesEnMap[srv.slug]) ? servicesEnMap[srv.slug].shortDesc : srv.shortDesc;

            return (
              <FadeIn key={srv.id} delay={i * 0.1}>
                <TiltCard className="relative">
                  <Link href={`/hizmetler/${srv.slug}`} className="group block relative">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                      <Image
                        src={srv.image || "/images/1.png"}
                        alt={srvTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                      />
                      {/* Gradient overlay that intensifies on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      
                      {/* Content overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-white text-lg mb-1.5 drop-shadow-lg">
                          {srvTitle}
                        </h3>
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {srvDesc}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 group-hover:translate-x-1">
                          {t("common.details")}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}