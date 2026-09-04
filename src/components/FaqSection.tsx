"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { ChevronDown, HelpCircle, Phone, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ_DATA = [
  {
    q: "Doğalgaz projesi çizimi ve İGDAŞ gaz açma süreci kaç gün sürer?",
    a: "Ay Mühendislik yetkili makine mühendisleri tarafından sahada rölöve alındıktan sonra 24 saat içinde 3D CAD projeniz dijital ortamda çizilir ve ilgili gaz dağıtım idaresine (İGDAŞ vb.) onaylatılır. Onayın ardından sertifikalı ekiplerimiz tesisat montajını tamamlar ve ortalama 3 ile 5 iş günü içinde resmi gaz açım randevusu gerçekleştirilerek gazınız kullanıma açılır.",
    tag: "Projelendirme"
  },
  {
    q: "Endüstriyel tesis ve fabrikalarda RMS istasyonu kurulumu zorunlu mudur?",
    a: "Evet. Şebekeden yüksek basınçla (4-19 bar) gelen doğalgazın; fabrika içi fırın, kurutma tesisi, buhar kazanı veya boylerlerde güvenle kullanılabilmesi için basıncın 300 mbar veya 21 mbar seviyesine düşürülmesi, filtrelenmesi ve ölçülmesi yasal ve teknik bir zorunluluktur. Firmamız RMS-B ve RMS-C istasyonlarını anahtar teslim kurmaktadır.",
    tag: "Endüstriyel"
  },
  {
    q: "Merkezi kaskad kazan sistemi ile bireysel kombi arasındaki tasarruf farkı nedir?",
    a: "Sitelerde ve toplu konutlarda yoğuşmalı kaskad kazan daireleri, dış hava kompanzasyon paneli sayesinde sadece ihtiyaç duyulan ısı kadar modülasyon yapar. Bu sayede daire başı yakıt tüketimi bireysel kombilere göre %30 ila %35 oranında daha düşük gerçekleşir. Ayrıca ilk yatırım ve bakım maliyetleri çok daha ekonomiktir.",
    tag: "Tasarruf & Kaskad"
  },
  {
    q: "Yetkili makine mühendislik firması olmadan doğalgaz tesisatı yapılabilir mi?",
    a: "Kesinlikle hayır. EPDK ve yerel gaz dağıtım kuruluşları (İGDAŞ vb.) yetki belgesi olmayan şahıs veya firmaların doğalgaz hattına müdahale etmesi yasalara göre suçtur ve tespit edildiğinde bina gazı süresiz kesilir. Ay Mühendislik, resmi yetki belgeli uzman kadrosuyla %100 onay garantili hizmet sunar.",
    tag: "Yasal Zorunluluk"
  },
  {
    q: "Hangi bölgelere hizmet veriyorsunuz? Şehir dışı büyük projelere destek sağlıyor musunuz?",
    a: "Merkezimiz İstanbul Esenler Tekstilkent'te bulunmakta olup, Tüm Türkiye genelinde (81 il) hizmet vermekteyiz. Büyük ölçekli organize sanayi fabrikaları, enerji santralleri, RMS istasyonları ve endüstriyel tesislerin yanı sıra; toplu konut, ticari bina, restoran ve bireysel doğalgaz projelerinde de anahtar teslim mühendislik ve taahhüt sağlamaktayız.",
    tag: "Tüm Türkiye Hizmeti"
  },
  {
    q: "Acil durumlar ve gaz kaçaklarında teknik müdahale sağlıyor musunuz?",
    a: "Evet. Devreye aldığımız tüm endüstriyel tesisler ve konut projeleri için 7/24 acil teknik destek hattımız mevcuttur. Selenoid vana arızaları, regülatör basınç problemleri veya gaz alarm santrali kontrolleri uzman teknisyenlerimizce anında giderilir.",
    tag: "7/24 Destek"
  },
];

import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { faqsEn } from "@/lib/i18n/contentTranslations";

export default function FaqSection({ 
  onOpenQuote, 
  phone,
  settings 
}: { 
  onOpenQuote?: () => void; 
  phone?: string;
  settings?: Partial<SiteSettings>;
}) {
  const { t, isEn } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const currentPhone = settings?.phone || phone || "0 (216) 456 78 90";
  const cleanPhone = currentPhone.replace(/\D/g, "");

  const badge = isEn ? "Custom Project Consultation" : (settings?.faqCtaBadge || "Özel Proje Danışmanlığı");
  const title = isEn ? "Have another question or a specialized project?" : (settings?.faqCtaTitle || "Başka bir sorunuz veya özel bir projeniz mi var?");
  const subtitle = isEn ? "Our certified mechanical engineers will inspect your facility on-site and answer all technical aspects free of charge." : (settings?.faqCtaSubtitle || "Uzman makine mühendislerimiz projenizi yerinde inceleyip tüm teknik detayları ücretsiz yanıtlasın.");

  const faqList = isEn 
    ? faqsEn 
    : ((settings?.faqs && settings.faqs.length > 0) ? settings.faqs : FAQ_DATA);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-white relative overflow-hidden border-t border-brand-100">
      {/* Ambient background blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4 text-brand-600" />
              {isEn ? "Frequently Asked Questions" : "Merak Edilenler & Sıkça Sorulan Sorular"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-900 tracking-tight mb-4">
              {isEn ? (
                <>Gas & Engineering <br className="hidden sm:block" /><span className="text-brand-600">Frequently Asked Questions</span></>
              ) : (
                <>Doğalgaz & Mühendislik Hakkında <br className="hidden sm:block" /><span className="text-brand-600">Sık Sorulan Sorular</span></>
              )}
            </h2>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              {isEn
                ? "Answers to most common questions regarding engineering timelines, RMS skids, permits, and official commissioning."
                : "Projelendirme süreleri, maliyetler, yasal standartlar ve gaz açma adımları hakkında en çok sorulan soruları derledik."}
            </p>
          </FadeIn>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-brand-500/40 bg-brand-50/40 shadow-sm" 
                      : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-100/80 text-brand-800">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-ink-900 leading-snug">
                        {item.q}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-brand-600 text-white rotate-180" : "bg-stone-100 text-stone-500"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-brand-100/50 mt-1">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <FadeIn delay={0.3}>
          <div className="bg-[#0b141f] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-stone-800 relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-3 border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                {badge}
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
                {title}
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 relative z-10">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isEn ? "Get Quote Now" : "Hemen Teklif Al"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:${cleanPhone}`}
                className="px-6 py-3.5 rounded-xl bg-[#162032] hover:bg-[#1f2d44] text-white font-bold text-sm border border-stone-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>{currentPhone}</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
