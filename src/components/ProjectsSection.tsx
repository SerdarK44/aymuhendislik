"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/lib/types";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const [selected, setSelected] = useState("Tümü");
  const categories = ["Tümü", "Endüstriyel", "Ticari & Fabrika", "Konut & Toplu Konut"];
  const filtered = selected === "Tümü" ? projects : projects.filter(p => p.category === selected);

  return (
    <section className="py-32 bg-brand-50 relative overflow-hidden section-divider">
      {/* Decorative blob */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-[2px] bg-brand-500" />
                <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">Referanslar</p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-ink-900 tracking-tight">Tamamlanan Projeler</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`text-xs font-bold px-5 py-2 rounded-full transition-all duration-300 ${
                    selected === cat
                      ? "bg-ink-900 text-white shadow-lg shadow-ink-900/20"
                      : "bg-white text-stone-500 border border-stone-200 hover:border-brand-500 hover:text-brand-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((prj) => (
              <motion.div
                key={prj.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/projeler/${prj.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={prj.image || "/images/1.png"}
                      alt={prj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                    />
                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-ink-900 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full">{prj.category}</span>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{prj.location}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {prj.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeIn delay={0.2}>
          <div className="mt-14 text-center">
            <Link href="/projeler" className="inline-flex items-center gap-2 text-sm font-bold text-ink-900 hover:text-brand-600 transition-colors group">
              Tüm Referansları Gör 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}