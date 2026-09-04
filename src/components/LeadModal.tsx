"use client";

import { useState, useEffect } from "react";
import { 
  X, CheckCircle2, Building2, Ruler, Phone, User, Send, 
  Building, Factory, Home, Coffee, ShieldCheck, Clock, Flame, 
  Sparkles, MessageSquare, ArrowRight, Wrench, FileCheck2, Store,
  HelpCircle, Landmark, UtensilsCrossed, Layers, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteSettings } from "@/lib/types";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: Partial<SiteSettings>;
}

const serviceOptions = [
  { id: "Endüstriyel Doğalgaz & RMS", icon: Factory, desc: "Fabrika, Atölye, Fırın & Sanayi" },
  { id: "CAD Projelendirme & Gaz Açma", icon: FileCheck2, desc: "Resmi Onay, Tadilat, Güç Artırımı" },
  { id: "Merkezi Isıtma & Kaskad Kazan", icon: Flame, desc: "Kazan Dairesi & Boyler Sistemleri" },
  { id: "Bireysel Kombi & Konut", icon: Home, desc: "Daire, Villa & Yerden Isıtma" },
  { id: "Ticari İşletme & Mutfak Tesisatı", icon: UtensilsCrossed, desc: "Restoran, Cafe, Fırın, Otel, AVM" },
  { id: "Radyant Isıtma Sistemleri", icon: Sparkles, desc: "Fabrika & Kafe Alan Isıtma" },
  { id: "Periyodik Bakım & Kaçak Tespiti", icon: Wrench, desc: "Yetkili Test & Sızdırmazlık" },
  { id: "Diğer / Özel Mühendislik", icon: HelpCircle, desc: "Özel Proje & Danışmanlık" },
];

const buildingTypes = [
  { id: "Sanayi & Fabrika / OSB", icon: Factory, label: "Fabrika, Depo, Atölye" },
  { id: "Ticari İşletme (Restoran, Cafe, Otel, AVM)", icon: Store, label: "Restoran, Cafe, Mağaza" },
  { id: "Toplu Konut & Site / Plaza", icon: Building, label: "Site Yönetimi, Apartman, Plaza" },
  { id: "Müstakil / Bireysel Konut", icon: Home, label: "Daire, Villa, Müstakil Ev" },
  { id: "Kamu & Kurumsal Yapı", icon: Landmark, label: "Okul, Hastane, Resmi Kurum" },
  { id: "Diğer Yapı Türü", icon: HelpCircle, label: "Diğer Özel Yapılar" },
];

export default function LeadModal({ isOpen, onClose, settings }: LeadModalProps) {
  const [modalSettings, setModalSettings] = useState<Partial<SiteSettings> | null>(settings || null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Endüstriyel Doğalgaz & RMS");
  const [customService, setCustomService] = useState("");
  const [buildingType, setBuildingType] = useState("Sanayi & Fabrika / OSB");
  const [customBuilding, setCustomBuilding] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (settings) {
      setModalSettings(settings);
    } else if (isOpen && !modalSettings) {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.phone) setModalSettings(data);
        })
        .catch((err) => console.error("Error fetching modal settings:", err));
    }
  }, [isOpen, settings, modalSettings]);

  const phoneDisplay = modalSettings?.phone || "0 (216) 456 78 90";
  const rawPhone = phoneDisplay.replace(/\D/g, "");
  const phoneTel = rawPhone.startsWith("90") ? `+${rawPhone}` : (rawPhone.startsWith("0") ? rawPhone : `0${rawPhone}`);

  let cleanWa = (modalSettings?.whatsapp || "905329998877").replace(/\D/g, "");
  if (cleanWa.startsWith("0")) cleanWa = "9" + cleanWa;
  if (!cleanWa.startsWith("90") && cleanWa.length === 10) cleanWa = "90" + cleanWa;

  const finalServiceType = serviceType === "Diğer / Özel Mühendislik" && customService.trim()
    ? `Diğer: ${customService.trim()}`
    : serviceType;

  const finalBuildingType = buildingType === "Diğer Yapı Türü" && customBuilding.trim()
    ? `Diğer: ${customBuilding.trim()}`
    : buildingType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          phone, 
          serviceType: finalServiceType, 
          buildingType: finalBuildingType, 
          squareMeters, 
          message 
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally { 
      setLoading(false); 
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setPhone("");
      setCustomService("");
      setCustomBuilding("");
      setSquareMeters("");
      setMessage("");
    }, 300);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba ${modalSettings?.companyName || "Ay Mühendislik"}, web sitenizden ${name} olarak "${finalServiceType}" (${finalBuildingType}) için teklif formu doldurdum. Projemizin fotoğraflarını ve mimari planını buradan iletiyorum.`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-ink-950/75 backdrop-blur-md transition-opacity" 
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/40 my-auto z-10 max-h-[92vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-100/90 text-stone-500 hover:bg-stone-200 hover:text-ink-900 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Brand & Trust Info */}
            <div className="w-full md:w-4/12 bg-gradient-to-br from-[#0b141f] via-[#050b12] to-[#0b141f] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-stone-800">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-brand-500/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold font-mono mb-4 border border-brand-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Ücretsiz Yerinde Keşif</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white leading-tight">
                    Doğalgaz Projeniz İçin Hızlı Teklif Alın
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    Formu doldurun, yetkili makine mühendislerimiz en geç <strong>24 saat içinde</strong> projenizi inceleyip yerinde keşif planlasın.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0 text-brand-400 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">İGDAŞ & EPDK Yetkili</h4>
                      <p className="text-[11px] text-ink-200 mt-0.5">Sıfır hata ile %100 resmi gaz açım güvencesi.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">24 Saat İçinde Dönüş</h4>
                      <p className="text-[11px] text-ink-200 mt-0.5">Mühendislerimiz aynı gün içinde keşif planlar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Support Line */}
              <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-ink-400 tracking-wider">Acil Keşif & Danışma</span>
                  <a href={`tel:${phoneTel}`} className="text-sm font-bold text-white hover:text-brand-400 transition-colors">
                    {phoneDisplay}
                  </a>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            {/* Right Column: Interactive Form & Smart Post-Submission */}
            <div className="w-full md:w-8/12 p-6 sm:p-8 lg:p-10 bg-white overflow-y-auto">
              {submitted ? (
                <div className="h-full min-h-[440px] flex flex-col items-center justify-center text-center py-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-xl shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </motion.div>
                  
                  <h4 className="text-2xl font-black text-ink-900 mb-2">Talebiniz Başarıyla Alındı!</h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                    Sayın <strong>{name}</strong>, talebiniz nöbetçi makine mühendisimize iletildi. En kısa sürede telefonla keşif randevusu için aranacaksınız.
                  </p>

                  {/* Smart WhatsApp Handoff Shortcut */}
                  <div className="w-full max-w-md space-y-3 mb-6 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Hızlı Fiyatlandırma İpucu:</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Projenizin, şantiyenizin veya kazan dairenizin fotoğraflarını WhatsApp üzerinden ileterek anında ön inceleme yaptırabilirsiniz.
                    </p>
                    <a
                      href={`https://wa.me/${cleanWa}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp ile Fotoğraf / Plan Gönder</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full max-w-sm">
                    <button 
                      onClick={handleResetAndClose} 
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl transition-colors text-xs cursor-pointer"
                    >
                      Pencereyi Kapat
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Mobile Header */}
                  <div className="md:hidden pr-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" /> Ücretsiz Keşif
                    </div>
                    <h3 className="text-xl font-bold text-ink-900">Teklif Alın</h3>
                    <p className="text-xs text-stone-500 mt-1">Mühendislerimiz talebinizi hızla yanıtlar.</p>
                  </div>

                  {/* 1. Service Selection Chips */}
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2.5">
                      1. İhtiyacınız Olan Hizmet Türü
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {serviceOptions.map((srv) => {
                        const Icon = srv.icon;
                        const isSelected = serviceType === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setServiceType(srv.id)}
                            className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20"
                                : "bg-stone-50 hover:bg-stone-100/80 text-stone-700 border-stone-200/80"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-2">
                              <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-brand-600"}`} />
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <div className="font-bold text-xs leading-tight mb-0.5">{srv.id}</div>
                              <div className={`text-[10px] line-clamp-1 ${isSelected ? "text-white/80" : "text-stone-400"}`}>
                                {srv.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Service Input */}
                    {serviceType === "Diğer / Özel Mühendislik" && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5">
                        <input
                          type="text"
                          required
                          value={customService}
                          onChange={(e) => setCustomService(e.target.value)}
                          placeholder="Lütfen ihtiyacınız olan özel mühendislik hizmetini yazın..."
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50/40 text-xs font-semibold text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* 2. Building / Property Type */}
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2.5">
                      2. Yapı / Tesis Türü
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {buildingTypes.map((b) => {
                        const Icon = b.icon;
                        const isSelected = buildingType === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBuildingType(b.id)}
                            className={`p-2.5 rounded-xl text-left border transition-all flex items-center gap-2.5 cursor-pointer ${
                              isSelected
                                ? "bg-ink-900 text-white border-ink-900 shadow-xs"
                                : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80"
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-brand-400" : "text-stone-500"}`} />
                            <span className="text-xs font-bold truncate">{b.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Building Input */}
                    {buildingType === "Diğer Yapı Türü" && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5">
                        <input
                          type="text"
                          required
                          value={customBuilding}
                          onChange={(e) => setCustomBuilding(e.target.value)}
                          placeholder="Lütfen yapı / bina türünü belirtin (örn: Sera, Spor Tesisi vb.)..."
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* 3. Contact & Area Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                        Adınız Soyadınız *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ad Soyad"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                        Telefon Numaranız *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="05XX XXX XX XX"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                        Yaklaşık Alan (m²)
                      </label>
                      <div className="relative">
                        <Ruler className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={squareMeters}
                          onChange={(e) => setSquareMeters(e.target.value)}
                          placeholder="Örn: 450 m²"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. Message / Note */}
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                      Proje Notu / Özel İstekleriniz (Opsiyonel)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Şantiye konumu, mevcut cihazlar, keşif için uygun saatleriniz vb..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
                    <span className="text-[11px] text-stone-400">
                      * Bilgileriniz KVKK kapsamında korunur ve 3. şahıslarla paylaşılmaz.
                    </span>
                    <button
                      type="submit"
                      disabled={loading || !name || !phone}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? "Gönderiliyor..." : "Ücretsiz Keşif Talebi Gönder"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}