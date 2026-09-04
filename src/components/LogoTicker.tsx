"use client";

import FadeIn from "@/components/FadeIn";
import { ReferenceItem } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

const defaultLogos: ReferenceItem[] = [
  { id: "r1", name: "Ağaoğlu", logo: "/images/referanslar/agaoglu_logo.svg", order: 1 },
  { id: "r2", name: "DAP Yapı", logo: "/images/referanslar/d.png", order: 2 },
  { id: "r3", name: "RAMS Global", logo: "/images/referanslar/fsd.jpg", order: 3 },
  { id: "r4", name: "Torunlar GYO", logo: "/images/referanslar/images.jpg", order: 4 },
  { id: "r5", name: "Nef İnşaat", logo: "/images/referanslar/nef.png", order: 5 },
];

export default function LogoTicker({ references }: { references?: ReferenceItem[] }) {
  const { isEn } = useLanguage();
  const activeLogos = references && references.length > 0 ? references : defaultLogos;

  // Duplicate 4 sets for smooth, seamless endless looping
  const tickerItems = [...activeLogos, ...activeLogos, ...activeLogos, ...activeLogos];

  return (
    <section className="py-20 bg-white border-y border-stone-200/80 overflow-hidden relative">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/95 to-transparent z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-brand-500" />
            <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">
              {isEn ? "Trusted by Leaders" : "Bizi Tercih Edenler"}
            </p>
            <div className="w-8 h-[2px] bg-brand-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-900 tracking-tight">
            {isEn ? "Enterprise References & Partners" : "Referans Kuruluşlar & Markalar"}
          </h2>
        </FadeIn>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] items-center py-3">
          {tickerItems.map((refItem, idx) => (
            <div
              key={`${refItem.id}-${idx}`}
              className="mx-3 sm:mx-5 group/item shrink-0"
            >
              <div className="h-24 sm:h-28 w-56 sm:w-64 bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-brand-400 rounded-2xl p-4 sm:p-5 flex items-center justify-center shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-105">
                {refItem.logo ? (
                  <img
                    src={refItem.logo}
                    alt={refItem.name || "Referans"}
                    className="max-h-16 sm:max-h-18 max-w-[170px] sm:max-w-[200px] w-auto h-auto object-contain opacity-90 group-hover/item:opacity-100 transition-all duration-300 filter contrast-[1.05]"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent && !parent.querySelector(".ref-fallback-text")) {
                        const span = document.createElement("span");
                        span.className = "ref-fallback-text text-sm font-bold text-stone-700 tracking-tight text-center px-2";
                        span.textContent = refItem.name || "Referans";
                        parent.appendChild(span);
                      }
                    }}
                  />
                ) : (
                  <span className="text-sm font-bold text-stone-700 tracking-tight text-center px-2">
                    {refItem.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}