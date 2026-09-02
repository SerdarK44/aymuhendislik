"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { SiteSettings, SliderItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

const defaultSlides: SliderItem[] = [
  {
    id: "s1",
    image: "/images/1.png",
    label: "Endüstriyel Tesisat",
    headline: "Fabrikalar ve\nSanayi Tesisleri",
    sub: "RMS istasyonları, yüksek basınçlı çelik hatlar ve anahtar teslim endüstriyel dönüşüm.",
    order: 1
  },
  {
    id: "s2",
    image: "/images/2.png",
    label: "Projelendirme",
    headline: "Yetkili CAD\nProje Çizimi",
    sub: "EPDK ve gaz dağıtım idaresi onaylı dijital projelendirme ve gaz açma hizmeti.",
    order: 2
  },
  {
    id: "s3",
    image: "/images/6.png",
    label: "Radyant & Hangar Isıtma",
    headline: "Fabrika ve Hangar\nRadyant Isıtma",
    sub: "Yüksek tavanlı endüstriyel tesisler, depolar ve açık alanlar için %50 enerji tasarruflu radyant sistemler.",
    order: 3
  },
  {
    id: "s4",
    image: "/images/7.png",
    label: "Merkezi Kaskad Sistemler",
    headline: "Kazan Dairesi ve\nEnerji Dönüşümü",
    sub: "Siteler, rezidanslar ve ticari plazalar için yüksek verimli kaskad yoğuşmalı kazan dairesi kurulumu.",
    order: 4
  },
  {
    id: "s5",
    image: "/images/4.jpg",
    label: "Konut Tesisatı",
    headline: "Bireysel Kombi\nve Daire Tesisatı",
    sub: "Konforlu ve güvenli bireysel doğalgaz bağlantısı, hızlı montaj ve gaz açımı.",
    order: 5
  },
];

interface HeroSliderProps {
  settings?: SiteSettings;
  slides?: SliderItem[];
  onOpenQuote?: () => void;
}

export default function HeroSlider({ settings, slides = defaultSlides, onOpenQuote }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % activeSlides.length), [activeSlides.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + activeSlides.length) % activeSlides.length), [activeSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, isPaused]);

  return (
    <section 
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[1080px] overflow-hidden select-none bg-ink-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Images with Ken Burns Effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={activeSlides[current]?.image || "/images/1.png"} 
            alt={activeSlides[current]?.label || "Doğalgaz Mühendisliği"} 
            fill 
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Scrims & Vignettes */}
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(100deg, rgba(11,20,31,0.85) 0%, rgba(11,20,31,0.65) 45%, rgba(11,20,31,0.25) 75%, transparent 100%)"
      }} />
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to bottom, rgba(11,20,31,0.75) 0%, rgba(11,20,31,0.30) 25%, transparent 50%)"
      }} />
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(to top, rgba(11,20,31,0.70) 0%, transparent 35%)"
      }} />

      {/* Content */}
      <div className="relative z-20 h-full max-w-6xl mx-auto px-5 sm:px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { staggerChildren: 0.12, delayChildren: 0.2 }
              },
              exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
            }}
            className="max-w-2xl mt-12 sm:mt-20"
          >
            {/* Top Badge */}
            <motion.div variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }} className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="bg-brand-500/25 backdrop-blur-md border border-brand-500/40 text-brand-300 text-[11px] sm:text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>{activeSlides[current]?.label || settings?.heroBadge || "Mühendislik Çözümleri"}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }} className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.15] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
              {(activeSlides[current]?.headline || "").split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }} className="text-sm sm:text-lg text-ink-100 font-medium leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-lg line-clamp-3 sm:line-clamp-none">
              {activeSlides[current]?.sub}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }} className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenQuote}
                className="group relative overflow-hidden bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-2xl shadow-brand-600/30 transition-all flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Ücretsiz Keşif Al</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-medium text-xs sm:text-sm">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>EPDK & İGDAŞ Onaylı</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Controls (adjusted for mobile) */}
      <div className="absolute z-30 bottom-16 sm:bottom-12 right-4 sm:right-12 flex items-center gap-2 sm:gap-3">
        <button
          onClick={prev}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-ink-900/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-600 hover:border-brand-600 transition-all active:scale-95"
          aria-label="Önceki Slayt"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-ink-900/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-600 hover:border-brand-600 transition-all active:scale-95"
          aria-label="Sonraki Slayt"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute z-30 bottom-16 sm:bottom-12 left-5 sm:left-12 flex gap-2">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-8 sm:w-10 h-1.5 bg-brand-500" : "w-2 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}