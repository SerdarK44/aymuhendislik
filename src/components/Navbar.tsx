"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Flame, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

interface NavbarProps {
  settings?: Partial<SiteSettings>;
  onOpenQuote?: () => void;
}

export default function Navbar({ settings, onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phone = settings?.phone || "0 (216) 456 78 90";
  const rawPhone = phone.replace(/\D/g, "");
  const cleanPhone = rawPhone.startsWith("90") ? `+${rawPhone}` : (rawPhone.startsWith("0") ? rawPhone : `0${rawPhone}`);
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
          scrolled || !isHome 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2" 
            : "bg-gradient-to-b from-ink-950/85 via-ink-950/40 to-transparent py-3 sm:py-4"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center group relative z-10 shrink-0 transition-all duration-300 ${
              !isDarkText 
                ? "bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-sm border border-white/60 hover:bg-white" 
                : "hover:opacity-95"
            }`}
          >
            <img 
              src="/logo/logo_tam.png" 
              alt="Ay Mühendislik" 
              className="h-9 sm:h-11 lg:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-7 text-sm font-semibold transition-colors ${isDarkText ? "text-stone-600" : "text-white drop-shadow-sm"}`}>
            <Link href="/hizmetler" className="hover:text-brand-500 transition-colors">{t("nav.services")}</Link>
            <Link href="/projeler" className="hover:text-brand-500 transition-colors">{t("nav.projects")}</Link>
            <Link href="/blog" className="hover:text-brand-500 transition-colors">{t("nav.blog")}</Link>
            <Link href="/hakkimizda" className="hover:text-brand-500 transition-colors">{t("nav.about")}</Link>
            <Link href="/iletisim" className="hover:text-brand-500 transition-colors">{t("nav.contact")}</Link>
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher variant="desktop" isDarkText={isDarkText} />

            <a
              href={`tel:${cleanPhone}`}
              className={`text-sm font-semibold transition-colors ${isDarkText ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"}`}
            >
              {phone}
            </a>
            <button
              onClick={handleQuoteClick}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("nav.getQuote")}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher + Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher variant="desktop" isDarkText={isDarkText} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl transition-colors ${isDarkText ? "text-stone-800 hover:bg-stone-100" : "text-white hover:bg-white/10"}`}
              aria-label={mobileOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            <Link href="/" onClick={() => setMobileOpen(false)} className="inline-block">
              <img 
                src="/logo/logo_tam.png" 
                alt="Ay Mühendislik" 
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Language Switcher in Mobile Drawer */}
          <div className="mb-6">
            <LanguageSwitcher variant="mobile" />
          </div>

          <div className="flex flex-col gap-5 text-lg font-bold text-ink-900">
            <Link href="/" onClick={() => setMobileOpen(false)}>{t("nav.home")}</Link>
            <Link href="/hizmetler" onClick={() => setMobileOpen(false)}>{t("nav.services")}</Link>
            <Link href="/projeler" onClick={() => setMobileOpen(false)}>{t("nav.projects")}</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>{t("nav.blog")}</Link>
            <Link href="/hakkimizda" onClick={() => setMobileOpen(false)}>{t("nav.about")}</Link>
            <Link href="/iletisim" onClick={() => setMobileOpen(false)}>{t("nav.contact")}</Link>
          </div>

          <div className="mt-auto pt-8">
            <div className="bg-stone-50 rounded-2xl p-4 mb-3 border border-stone-100">
              <div className="text-xs text-stone-500 mb-1">{t("nav.customerService")}</div>
              <a href={`tel:${cleanPhone}`} className="text-lg font-bold text-ink-900 flex items-center gap-2">
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
              <span>{t("common.getFreeQuote")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Embedded LeadModal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        settings={settings}
      />
    </>
  );
}