"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Phone, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm({ whatsapp = "905329998877" }: { whatsapp?: string }) {
  const { t, isEn } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [lastSubmittedName, setLastSubmittedName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, serviceType: isEn ? "Contact Form" : "İletişim Formu" })
      });
      if (res.ok) {
        setLastSubmittedName(formData.name);
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(
    isEn
      ? `Hello, my name is ${lastSubmittedName || "website visitor"}. I submitted a contact inquiry from your website and would like to request detailed engineering information.`
      : `Merhaba, ben ${lastSubmittedName || "web sitesi ziyaretçisi"}. Sitenizden iletişim formu gönderdim, detaylı bilgi ve teklif almak istiyorum.`
  );

  if (success) {
    return (
      <div className="bg-emerald-50/80 text-emerald-900 p-8 rounded-3xl border border-emerald-200 text-center shadow-sm space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-ink-900 mb-1.5">{t("modal.successTitle")}</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            {isEn
              ? "Our licensed mechanical engineers will review your inquiry and contact you shortly."
              : "Yetkili makine mühendislerimiz mesajınızı inceleyerek en kısa sürede telefonla geri dönüş yapacaktır."}
          </p>
        </div>

        {/* WhatsApp Fast Track Shortcut */}
        <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 text-left space-y-2.5 shadow-xs">
          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isEn ? "Direct Contact Shortcut:" : "Hızlı İletişim:"}</span>
          </div>
          <p className="text-xs text-stone-600">
            {isEn
              ? "You can also send blueprints or facility photos directly via WhatsApp."
              : "Dilerseniz tesisinizin veya kazan dairenizin fotoğraflarını doğrudan WhatsApp üzerinden gönderebilirsiniz."}
          </p>
          <a
            href={`https://wa.me/${whatsapp}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isEn ? "Send Photos via WhatsApp" : "WhatsApp ile Fotoğraf Gönder"}</span>
          </a>
        </div>

        <button 
          onClick={() => setSuccess(false)} 
          className="text-xs font-bold text-stone-500 hover:text-ink-900 transition-colors cursor-pointer"
        >
          {isEn ? "Send Another Message" : "Yeni Bir Mesaj Gönder"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
          {t("contactForm.nameLabel")}
        </label>
        <input 
          required 
          type="text" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
          placeholder={t("contactForm.namePlaceholder")} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
            {t("contactForm.phoneLabel")}
          </label>
          <input 
            required 
            type="tel" 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono" 
            placeholder={t("contactForm.phonePlaceholder")} 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
            {t("contactForm.emailLabel")}
          </label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
            placeholder={t("contactForm.emailPlaceholder")} 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
          {t("contactForm.messageLabel")}
        </label>
        <textarea 
          required 
          rows={4} 
          value={formData.message} 
          onChange={e => setFormData({...formData, message: e.target.value})} 
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none leading-relaxed" 
          placeholder={t("contactForm.messagePlaceholder")} 
        />
      </div>

      <button 
        disabled={submitting} 
        type="submit" 
        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
      >
        <span>{submitting ? t("contactForm.submittingBtn") : t("contactForm.submitBtn")}</span>
        <Send className="w-4 h-4" />
      </button>

      <p className="text-center text-[10px] text-stone-400 mt-2">
        {t("modal.privacyNotice")}
      </p>
    </form>
  );
}