"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ServicesSection from "@/components/ServicesSection";
import LogoTicker from "@/components/LogoTicker";
import WhyUs from "@/components/WhyUs";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";

const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });
import { SiteSettings, ServiceItem, ProjectItem, BlogPost, TestimonialItem, SliderItem, ReferenceItem } from "@/lib/types";
import { MessageCircle, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface HomeClientProps {
  settings: SiteSettings;
  services: ServiceItem[];
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  testimonials: TestimonialItem[];
  slides?: SliderItem[];
  references?: ReferenceItem[];
}

export default function HomeClient({ settings, services, projects, blogPosts, testimonials, slides, references }: HomeClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const whatsappNum = settings.whatsapp || "905329998877";
  const phone = settings.phone || "0 (216) 456 78 90";

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <JsonLd settings={settings} services={services} />
      <Navbar settings={settings} onOpenQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1">
        <HeroSlider settings={settings} slides={slides} onOpenQuote={() => setIsQuoteOpen(true)} />
        <ServicesSection services={services} />
        <LogoTicker references={references} />
        <WhyUs />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <BlogSection posts={blogPosts} />
        <FaqSection onOpenQuote={() => setIsQuoteOpen(true)} phone={phone} />

        {/* CTA Banner — Premium gradient design */}
        <section className="py-20 sm:py-32 relative overflow-hidden noise-overlay">
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-ink-900" />
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(184,146,74,0.3) 0%, transparent 70%)"
          }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(184,146,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,74,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
          
          <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                <div className="w-8 h-[2px] bg-brand-500" />
                <p className="text-xs font-bold text-brand-400 uppercase tracking-[0.2em]">İletişim & Keşif</p>
                <div className="w-8 h-[2px] bg-brand-500" />
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-[1.15]">
                Projenizi Birlikte<br />
                <span className="text-brand-500">Planlayalım</span>
              </h2>
              <p className="text-ink-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto">
                Ücretsiz keşif ve teknik değerlendirme için hemen bize ulaşın. Yetkili mühendislerimiz 24 saat içinde dönüş yapar.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full sm:w-auto group relative overflow-hidden bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 sm:px-8 py-4 rounded-xl shadow-2xl shadow-brand-600/30 transition-all flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">Ücretsiz Keşif Al</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/${whatsappNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white/5 hover:bg-[#25D366]/20 text-white font-bold px-6 sm:px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 border border-white/10 hover:border-[#25D366]/40 backdrop-blur-sm text-xs sm:text-sm uppercase tracking-wider"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-6 sm:px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 backdrop-blur-sm text-xs sm:text-sm uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
                  <span>Hemen Ara</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} services={services} />

      {/* Interactive Global Modal */}
      <LeadModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} settings={settings} />
    </div>
  );
}