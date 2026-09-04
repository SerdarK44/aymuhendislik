"use client";

import { MapPin, Phone, Mail, Navigation, Clock, Headphones } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactClient({ settings }: { settings: SiteSettings }) {
  const { isEn } = useLanguage();

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.1485648834927!2d28.868952739077227!3d41.06591419472658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzU3LjMiTiAyOMKwNTInMTAuNiJF!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str";
  const directionsUrl = settings.googleMapsUrl || "https://maps.app.goo.gl/bpbn5Dzx6ezDK5mD9";

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
              <Headphones className="w-3.5 h-3.5 text-brand-600" />
              <span>{isEn ? "24/7 Rapid Response & Support" : "7/24 Kesintisiz Destek"}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">
              {isEn ? "Get in Touch" : "Bize Ulaşın"}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              {isEn
                ? "Our certified mechanical engineers are at your service for on-site discovery, project estimation, and emergency support."
                : "Projeleriniz, ücretsiz keşif talepleriniz veya acil teknik destek için mühendislik ekibimiz hizmetinizdedir."}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Contact Form */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm h-full">
              <h2 className="text-2xl font-bold text-ink-900 mb-2">
                {isEn ? "Send Message & Request Proposal" : "Mesaj Gönderin & Teklif İsteyin"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mb-8">
                {isEn
                  ? "Our authorized mechanical engineers will evaluate your request and respond within 24 hours."
                  : "Yetkili makine mühendislerimiz en kısa sürede size geri dönüş yapacaktır."}
              </p>
              <ContactForm whatsapp={settings.whatsapp} />
            </div>
          </FadeIn>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                <h2 className="text-2xl font-bold text-ink-900 mb-8">
                  {isEn ? "Contact Information" : "İletişim Bilgileri"}
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-900 text-sm mb-1">
                        {isEn ? "Head Office & Project Office" : "Merkez Ofis & Proje Birimi"}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-3">{settings.address}</p>
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        {isEn ? "Get Directions (Google Maps)" : "Yol Tarifi Al (Google Maps)"}
                      </a>
                    </div>
                  </div>

                  <div className="w-full h-px bg-stone-100" />

                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-900 text-sm mb-1">
                        {isEn ? "Phone & Switchboard" : "Telefon & Santral"}
                      </h3>
                      <a
                        href={`tel:${(settings.phone || "").replace(/[^\d+]/g, "")}`}
                        className="block text-stone-600 text-xs sm:text-sm hover:text-brand-600 transition-colors mb-1 font-semibold"
                      >
                        {settings.phone}
                      </a>
                      {settings.emergencyPhone && (
                        <a
                          href={`tel:${settings.emergencyPhone.replace(/[^\d+]/g, "")}`}
                          className="block text-brand-600 text-xs font-bold hover:text-brand-700 transition-colors"
                        >
                          {isEn ? "24/7 Emergency & Survey: " : "7/24 Acil & Keşif: "}
                          {settings.emergencyPhone}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-px bg-stone-100" />

                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink-900 text-sm mb-1">
                        {isEn ? "Corporate Email" : "Kurumsal E-Posta"}
                      </h3>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-stone-600 text-xs sm:text-sm hover:text-brand-600 transition-colors"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Google Maps Embed */}
          <FadeIn delay={0.3} className="h-full min-h-[320px] sm:min-h-[400px]">
            <div className="bg-white rounded-3xl p-2 border border-stone-200/80 shadow-sm h-full w-full relative overflow-hidden group">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full h-full min-h-[300px] grayscale-[0.2] contrast-[1.05] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Working Hours - Bound to CMS */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-center h-full">
              <div className="flex items-center gap-3 mb-4 text-ink-900">
                <Clock className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-sm">{isEn ? "Working Hours" : "Çalışma Saatleri"}</h3>
              </div>
              <div className="text-xs text-stone-600 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="shrink-0">{isEn ? "Schedule:" : "Mesai Saatleri:"}</span>
                  <span className="font-bold text-ink-900 text-right">
                    {settings.workingHours || (isEn ? "Mon - Sat: 08:30 - 19:00" : "Pzt - Cmt: 08:30 - 19:00")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{isEn ? "Emergency Team:" : "Acil Müdahale & Keşif:"}</span>
                  <span className="font-bold text-ink-900">{isEn ? "7/24 Active Field Crew" : "7/24 Sahada Hazır"}</span>
                </div>
                {settings.emergencyPhone && (
                  <div className="flex justify-between items-center text-brand-600 font-bold pt-3 border-t border-stone-100 mt-2">
                    <span>{isEn ? "Direct Hotline:" : "Santral Hattı:"}</span>
                    <a href={`tel:${settings.emergencyPhone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                      {settings.emergencyPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media - Branded SVG Icons */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-center h-full text-center">
              <h3 className="font-bold text-ink-900 text-sm mb-4">
                {isEn ? "Connect on Social Media" : "Sosyal Medyada Biz"}
              </h3>
              <div className="flex justify-center items-center gap-4">
                {/* Instagram */}
                <a
                  href={settings.instagramUrl || "https://instagram.com/aymuhendislik"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 p-3 sm:px-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all transform hover:-translate-y-1 shadow-sm"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span className="text-[11px] font-bold">Instagram</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={settings.linkedinUrl || "https://linkedin.com/company/aymuhendislik"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 p-3 sm:px-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all transform hover:-translate-y-1 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-[11px] font-bold">LinkedIn</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${(settings.whatsapp || "905329998877").replace(/\D/g, "")}?text=${encodeURIComponent(isEn ? "Hello, I would like to get technical information about your engineering services." : "Merhaba, mühendislik hizmetleriniz hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5 p-3 sm:px-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all transform hover:-translate-y-1 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors">
                    <path d="M12.031 0C5.398 0 .018 5.378.018 12.012c0 2.12.553 4.19 1.603 6.012L0 24l6.168-1.618a11.96 11.96 0 005.863 1.523h.005c6.63 0 12.013-5.38 12.013-12.013 0-3.208-1.249-6.223-3.518-8.494A11.942 11.942 0 0012.03 0zm-.005 21.99a9.96 9.96 0 01-5.077-1.393l-.364-.216-3.77.989 1.006-3.676-.237-.377A9.972 9.972 0 012.016 12.01c0-5.523 4.493-10.015 10.02-10.015 2.675 0 5.19 1.042 7.081 2.934a9.965 9.965 0 012.93 7.082c0 5.525-4.492 10.018-10.02 10.018z"/>
                  </svg>
                  <span className="text-[11px] font-bold">WhatsApp</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
