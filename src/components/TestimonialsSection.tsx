"use client";

import { TestimonialItem } from "@/lib/types";
import { Star, Quote } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";

export default function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (!testimonials?.length) return null;
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-lg mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-brand-500" />
              <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">Müşteri Yorumları</p>
              <div className="w-8 h-[2px] bg-brand-500" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-ink-900 tracking-tight">
              Müşterilerimiz<br />
              <span className="text-brand-500">Ne Dedi?</span>
            </h2>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.12}>
              <motion.div 
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group relative bg-white rounded-2xl p-8 border border-stone-100 hover:border-brand-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 h-full flex flex-col transition-colors duration-500"
              >
                {/* Decorative quote mark */}
                <div className="absolute -top-4 -left-2 text-8xl font-serif text-brand-100 select-none leading-none opacity-60">"</div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-500 text-brand-500" />
                    ))}
                  </div>
                  
                  <p className="text-stone-600 leading-relaxed mb-8 flex-1 text-[15px]">
                    "{t.comment}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-5 border-t border-stone-100">
                    {/* Avatar placeholder */}
                    <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-black text-sm shrink-0">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink-900">{t.clientName}</div>
                      <div className="text-xs text-stone-400 mt-0.5">{t.companyOrBuilding}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}