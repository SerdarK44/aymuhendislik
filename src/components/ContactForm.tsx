"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Phone, Sparkles } from "lucide-react";

export default function ContactForm() {
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
        body: JSON.stringify({ ...formData, serviceType: "İletişim Formu" })
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
    `Merhaba Ay Mühendislik, web sitenizden ${lastSubmittedName} olarak iletişim formu gönderdim. Proje detaylarını ve fotoğrafları buradan da iletmek istiyorum.`
  );

  if (success) {
    return (
      <div className="bg-emerald-50/80 text-emerald-900 p-8 rounded-3xl border border-emerald-200 text-center shadow-sm space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-ink-900 mb-1.5">Mesajınız Başarıyla Alındı!</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            Yetkili makine mühendislerimiz mesajınızı inceleyerek en kısa sürede telefonla geri dönüş yapacaktır.
          </p>
        </div>

        {/* WhatsApp Fast Track Shortcut */}
        <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 text-left space-y-2.5 shadow-xs">
          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hızlı İletişim:</span>
          </div>
          <p className="text-xs text-stone-600">
            Dilerseniz tesisinizin veya kazan dairenizin fotoğraflarını doğrudan WhatsApp üzerinden gönderebilirsiniz.
          </p>
          <a
            href={`https://wa.me/905329998877?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp ile Fotoğraf Gönder</span>
          </a>
        </div>

        <button 
          onClick={() => setSuccess(false)} 
          className="text-xs font-bold text-stone-500 hover:text-ink-900 transition-colors"
        >
          Yeni Bir Mesaj Gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
          Ad Soyad *
        </label>
        <input 
          required 
          type="text" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
          placeholder="Adınız Soyadınız / Firma Adı" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
            Telefon Numarası *
          </label>
          <input 
            required 
            type="tel" 
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
            placeholder="05XX XXX XX XX" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
            E-Posta Adresi
          </label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
            placeholder="ornek@firma.com" 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-ink-900 mb-1.5 uppercase tracking-wider">
          Mesajınız & Proje Detayı *
        </label>
        <textarea 
          required 
          rows={4} 
          value={formData.message} 
          onChange={e => setFormData({...formData, message: e.target.value})} 
          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none" 
          placeholder="Doğalgaz projeniz, keşif adresi veya talebiniz..." 
        />
      </div>

      <button 
        disabled={submitting} 
        type="submit" 
        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
      >
        <span>{submitting ? "Gönderiliyor..." : "Mesajı ve Keşif Talebini Gönder"}</span>
        <Send className="w-4 h-4" />
      </button>

      <p className="text-center text-[10px] text-stone-400 mt-2">
        🔒 Bilgileriniz 6698 sayılı KVKK kapsamında güvendedir.
      </p>
    </form>
  );
}