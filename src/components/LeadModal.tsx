"use client";

import { useState } from "react";
import { 
  X, CheckCircle2, Building2, Ruler, Phone, User, Send, 
  Building, Factory, Home, Coffee, ShieldCheck, Clock, Flame, 
  Sparkles, MessageSquare, ArrowRight, Wrench, FileCheck2, Store,
  HelpCircle, Landmark, UtensilsCrossed, Layers, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
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
    `Merhaba Ay Mühendislik, web sitenizden ${name} olarak "${finalServiceType}" (${finalBuildingType}) için teklif formu doldurdum. Projemizin fotoğraflarını ve mimari planını buradan iletiyorum.`
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
                  <a href="tel:02164567890" className="text-sm font-bold text-white hover:text-brand-400 transition-colors">
                    0 (216) 456 78 90
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
                      href={`https://wa.me/905329998877?text=${whatsappMessage}`}
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
                            type="button"
                            key={srv.id}
                            onClick={() => setServiceType(srv.id)}
                            className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20 scale-[1.02]"
                                : "bg-stone-50/70 hover:bg-stone-100 border-stone-200/80 text-ink-900"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-brand-600"}`} />
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div>
                              <div className="font-bold text-xs leading-tight">{srv.id}</div>
                              <div className={`text-[10px] mt-0.5 truncate ${isSelected ? "text-white/80" : "text-stone-500"}`}>
                                {srv.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Service Input if "Diğer" is chosen */}
                    {serviceType === "Diğer / Özel Mühendislik" && (
                      <div className="mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <input
                          type="text"
                          value={customService}
                          onChange={(e) => setCustomService(e.target.value)}
                          placeholder="Lütfen talep ettiğiniz hizmeti kısaca belirtin..."
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50/40 text-xs text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. Building Type */}
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2.5">
                      2. Yapı / Tesis Türü
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {buildingTypes.map((bld) => {
                        const Icon = bld.icon;
                        const isSelected = buildingType === bld.id;
                        return (
                          <button
                            type="button"
                            key={bld.id}
                            onClick={() => setBuildingType(bld.id)}
                            className={`p-2.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                              isSelected
                                ? "bg-ink-900 text-white border-ink-900 shadow-md scale-[1.02]"
                                : "bg-stone-50/70 hover:bg-stone-100 border-stone-200/80 text-ink-900"
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? "text-brand-400" : "text-stone-500"}`} />
                            <div className="min-w-0">
                              <div className="font-bold text-xs leading-tight">{bld.id}</div>
                              <div className={`text-[10px] mt-0.5 truncate ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
                                {bld.label}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Building Input if "Diğer" is chosen */}
                    {buildingType === "Diğer Yapı Türü" && (
                      <div className="mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <input
                          type="text"
                          value={customBuilding}
                          onChange={(e) => setCustomBuilding(e.target.value)}
                          placeholder="Lütfen tesis / bina türünüzü belirtin (Örn: Çiftlik, Depolama, Fırın)..."
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* 3. Contact Inputs */}
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2.5">
                      3. İletişim Bilgileriniz
                    </label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Name Input */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ad Soyad / Firma Adı *"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                          <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Telefon Numaranız (05xx) *"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                          <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Square Meters & Message */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1 relative">
                          <input
                            type="text"
                            value={squareMeters}
                            onChange={(e) => setSquareMeters(e.target.value)}
                            placeholder="Metrekare (m²)"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                          <Ruler className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>

                        <div className="sm:col-span-2 relative">
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Proje konumu veya özel notunuz..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                          <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full group relative overflow-hidden bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-brand-600/25 transition-all flex items-center justify-center gap-3 disabled:opacity-60 text-sm cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10">
                        {loading ? "Talebiniz Gönderiliyor..." : "Ücretsiz Keşif & Teklif Talebini Gönder"}
                      </span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-[10px] text-stone-400 mt-2.5">
                      🔒 Bilgileriniz 6698 sayılı KVKK kapsamında güvendedir ve 3. şahıslarla paylaşılmaz.
                    </p>
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