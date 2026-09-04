"use client";

import Link from "next/link";
import { Wrench, Phone, Mail, Clock, ShieldCheck, Lock } from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function MaintenanceView({ settings }: { settings?: Partial<SiteSettings> }) {
  const { t, locale, setLocale, isEn } = useLanguage();

  const phone = settings?.emergencyPhone || settings?.phone || "0 (216) 456 78 90";
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  let cleanWa = (settings?.whatsapp || "905329998877").replace(/\D/g, "");
  if (cleanWa.startsWith("0")) cleanWa = "9" + cleanWa;
  if (!cleanWa.startsWith("90") && cleanWa.length === 10) cleanWa = "90" + cleanWa;

  const email = settings?.email || "info@aymuhendislik.com.tr";

  const title = isEn
    ? (settings?.maintenanceTitle ? `${settings.maintenanceTitle}` : t("maintenance.defaultTitle"))
    : (settings?.maintenanceTitle || t("maintenance.defaultTitle"));

  const message = isEn
    ? (settings?.maintenanceMessage ? `${settings.maintenanceMessage}` : t("maintenance.defaultMessage"))
    : (settings?.maintenanceMessage || t("maintenance.defaultMessage"));

  const estimatedTime = settings?.maintenanceEstimatedTime;

  return (
    <div className="min-h-screen w-full bg-[#0a0e17] text-white flex flex-col justify-between relative overflow-hidden selection:bg-brand-500 selection:text-ink-950">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }}
      />

      {/* Top Header: Logo & Language Switcher */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo/logo_tam.png" 
            alt="Ay Mühendislik" 
            className="h-14 sm:h-18 w-auto object-contain brightness-0 invert opacity-95 transition-all"
          />
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full text-xs">
          <button
            onClick={() => setLocale("tr")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              locale === "tr" ? "bg-brand-500 text-ink-950 shadow-xs" : "text-stone-400 hover:text-white"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              locale === "en" ? "bg-brand-500 text-ink-950 shadow-xs" : "text-stone-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-8 flex flex-col items-center text-center my-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono uppercase tracking-wider mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span>{t("maintenance.badge")}</span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-brand-500/20 to-amber-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6 shadow-2xl relative group">
          <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-brand-400 animate-[spin_8s_linear_infinite]" />
        </div>

        {/* Headings */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl leading-tight">
          {title}
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
          {message}
        </p>

        {/* Estimated Duration Card */}
        {estimatedTime && (
          <div className="mb-8 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-stone-300 text-xs sm:text-sm">
            <Clock className="w-4 h-4 text-brand-400 shrink-0" />
            <span className="font-semibold text-stone-400">{t("maintenance.estimatedTime")}</span>
            <span className="font-bold text-brand-400">{estimatedTime}</span>
          </div>
        )}

        {/* Direct Contact Options */}
        <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-5 font-mono">
            {t("maintenance.contactTitle")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phone */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center sm:flex-col sm:justify-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/40 transition-all text-left sm:text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-stone-400">{t("maintenance.phoneLabel")}</div>
                <div className="text-xs font-bold text-white truncate">{phone}</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${cleanWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center sm:flex-col sm:justify-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-left sm:text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-ink-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-emerald-300">{t("maintenance.whatsappLabel")}</div>
                <div className="text-xs font-bold text-white truncate">WhatsApp</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center sm:flex-col sm:justify-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/40 transition-all text-left sm:text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-stone-400">{t("maintenance.emailLabel")}</div>
                <div className="text-xs font-bold text-white truncate">{email}</div>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
          <span>EPDK & Gaz İdaresi Yetkili Doğalgaz Mühendislik Firması</span>
        </div>

        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Ay Mühendislik. {t("maintenance.rights")}</span>
          <span className="text-stone-700">•</span>
          <Link
            href="/admin/login"
            className="text-stone-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
          >
            <Lock className="w-3 h-3" />
            <span>{t("maintenance.adminLogin")}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
