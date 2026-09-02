"use client";

import FadeIn from "@/components/FadeIn";
import { ReferenceItem } from "@/lib/types";

const defaultLogos: ReferenceItem[] = [
  { id: "r1", name: "Ağaoğlu", logo: "/images/referanslar/agaoglu_logo.svg", order: 1 },
  { id: "r2", name: "DAP Yapı", logo: "/images/referanslar/d.png", order: 2 },
  { id: "r3", name: "RAMS Global", logo: "/images/referanslar/fsd.jpg", order: 3 },
  { id: "r4", name: "Torunlar GYO", logo: "/images/referanslar/images.jpg", order: 4 },
  { id: "r5", name: "Nef İnşaat", logo: "/images/referanslar/nef.png", order: 5 },
];

export default function LogoTicker({ references }: { references?: ReferenceItem[] }) {
  const activeLogos = references && references.length > 0 ? references : defaultLogos;

  // Duplicate for smooth endless looping
  const tickerItems = [...activeLogos, ...activeLogos, ...activeLogos, ...activeLogos];

  return (
    <section className="py-20 bg-white border-y border-stone-200/80 overflow-hidden relative">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-brand-500" />
            <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">
              Bizi Tercih Edenler
            </p>
            <div className="w-8 h-[2px] bg-brand-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-900 tracking-tight">
            Referans Kuruluşlar & Markalar
          </h2>
        </FadeIn>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] items-center py-2">
          {tickerItems.map((refItem, idx) => (
            <div
              key={`${refItem.id}-${idx}`}
              className="mx-4 sm:mx-6 group/item shrink-0"
            >
              <div className="h-20 w-44 sm:w-48 bg-stone-50/80 hover:bg-white border border-stone-200/80 hover:border-brand-300 rounded-2xl p-4 flex items-center justify-center shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105">
                {refItem.logo ? (
                  <img
                    src={refItem.logo}
                    alt={refItem.name || "Referans"}
                    className="max-h-12 max-w-[130px] w-auto h-auto object-contain opacity-75 group-hover/item:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent && !parent.querySelector(".ref-fallback-text")) {
                        const span = document.createElement("span");
                        span.className = "ref-fallback-text text-xs font-bold text-stone-700 tracking-tight text-center px-2";
                        span.textContent = refItem.name || "Referans";
                        parent.appendChild(span);
                      }
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold text-stone-700 tracking-tight text-center px-2">
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