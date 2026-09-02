"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Flame, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { SiteSettings } from "@/lib/types";

const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

interface NavbarProps {
  settings?: Partial<SiteSettings>;
  onOpenQuote?: () => void;
}

export default function Navbar({ settings, onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phone = settings?.phone || "0 (216) 456 78 90";
  const isDarkText = scrolled || !isHome;

  const handleQuoteClick = () => {
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-gradient-to-b from-ink-950/85 via-ink-950/40 to-transparent py-3 sm:py-4"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">

          {/* Logo - Ideal Sweet-Spot Size */}
          <Link href="/" className="flex items-center group relative z-10 shrink-0 scale-110 sm:scale-120 origin-left my-0.5">
            <img 
              src="/logo/logo_tam.png" 
              alt="Ay Mühendislik" 
              className={`h-15 sm:h-20 lg:h-24 w-auto max-w-none shrink-0 object-contain transition-all duration-300 ${!isDarkText ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" : "drop-shadow-xs"}`}
            />
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-7 text-sm font-semibold transition-colors ${isDarkText ? "text-stone-600" : "text-white drop-shadow-sm"}`}>
            <Link href="/hizmetler" className="hover:text-brand-500 transition-colors">Hizmetler</Link>
            <Link href="/projeler" className="hover:text-brand-500 transition-colors">Projeler</Link>
            <Link href="/blog" className="hover:text-brand-500 transition-colors">Rehber</Link>
            <Link href="/hakkimizda" className="hover:text-brand-500 transition-colors">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-brand-500 transition-colors">İletişim</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className={`text-sm font-semibold transition-colors ${isDarkText ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"}`}
            >
              {phone}
            </a>
            <button
              onClick={handleQuoteClick}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teklif Al</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${isDarkText ? "text-stone-800 hover:bg-stone-100" : "text-white hover:bg-white/10"}`}
            aria-label="Menüyü Aç"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6 pb-6 flex-1 overflow-y-auto flex flex-col">
          {/* Mobile Drawer Header Logo */}
          <div className="pb-6 mb-6 border-b border-stone-100 flex items-center justify-between">
            <Link href="/" onClick={() => setMobileOpen(false)} className="inline-block scale-125 origin-left">
              <img 
                src="/logo/logo_tam.png" 
                alt="Ay Mühendislik" 
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-5 text-lg font-bold text-ink-900">
            <Link href="/" onClick={() => setMobileOpen(false)}>Ana Sayfa</Link>
            <Link href="/hizmetler" onClick={() => setMobileOpen(false)}>Hizmetlerimiz</Link>
            <Link href="/projeler" onClick={() => setMobileOpen(false)}>Referanslar & Projeler</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>Rehber & Blog</Link>
            <Link href="/hakkimizda" onClick={() => setMobileOpen(false)}>Hakkımızda</Link>
            <Link href="/iletisim" onClick={() => setMobileOpen(false)}>İletişim</Link>
          </div>

          <div className="mt-auto pt-8">
            <div className="bg-stone-50 rounded-2xl p-4 mb-3 border border-stone-100">
              <div className="text-xs text-stone-500 mb-1">Müşteri Hizmetleri & Keşif</div>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600" /> {phone}
              </a>
            </div>
            
            <button
              onClick={() => {
                setMobileOpen(false);
                handleQuoteClick();
              }}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white text-xs uppercase tracking-wider font-bold py-3.5 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ücretsiz Teklif Al</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Embedded LeadModal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}