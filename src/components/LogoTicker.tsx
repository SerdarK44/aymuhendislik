"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { ReferenceItem } from "@/lib/types";

const defaultLogos: ReferenceItem[] = [
  { id: "r1", name: "Ağaoğlu", logo: "/images/referanslar/agaoglu_logo.svg", order: 1 },
  { id: "r2", name: "DAP Yapı", logo: "/images/referanslar/d.png", order: 2 },
  { id: "r3", name: "FSD Endüstriyel", logo: "/images/referanslar/fsd.jpg", order: 3 },
  { id: "r4", name: "Teknik Yapı", logo: "/images/referanslar/images.jpg", order: 4 },
  { id: "r5", name: "Nef İnşaat", logo: "/images/referanslar/nef.png", order: 5 },
];

export default function LogoTicker({ references = defaultLogos }: { references?: ReferenceItem[] }) {
  const activeLogos = references && references.length > 0 ? references : defaultLogos;

  return (
    <section className="py-24 bg-white border-t border-brand-100 overflow-hidden relative">
      {/* Subtle gradient overlay on edges for seamless loop illusion */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-brand-500" />
            <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">Güveniyorlar</p>
            <div className="w-8 h-[2px] bg-brand-500" />
          </div>
          <h2 className="text-4xl font-black text-ink-900 tracking-tight">Referanslarımız</h2>
        </FadeIn>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] items-center">
          {[...activeLogos, ...activeLogos, ...activeLogos, ...activeLogos].map((refItem, idx) => (
            <div key={idx} className="mx-10 w-44 h-24 relative opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 flex items-center justify-center hover:scale-110">
              <Image 
                src={refItem.logo || "/images/referanslar/agaoglu_logo.svg"} 
                alt={refItem.name} 
                fill 
                sizes="(max-width: 768px) 33vw, 20vw" 
                className="object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}