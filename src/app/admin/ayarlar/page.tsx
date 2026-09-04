"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { SiteSettings } from "@/lib/types";
import { Save, CheckCircle2, Plus, Trash2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleAddFaq = () => {
    if (!settings) return;
    const newFaq = {
      id: "faq-" + Date.now(),
      q: "Yeni Soru Başlığı",
      a: "Bu sorunun detaylı açıklaması...",
      tag: "Genel"
    };
    setSettings({ ...settings, faqs: [...(settings.faqs || []), newFaq] });
  };

  const handleUpdateFaq = (idx: number, field: string, value: string) => {
    if (!settings) return;
    const updated = [...(settings.faqs || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    setSettings({ ...settings, faqs: updated });
  };

  const handleDeleteFaq = (idx: number) => {
    if (!settings) return;
    const updated = (settings.faqs || []).filter((_, i) => i !== idx);
    setSettings({ ...settings, faqs: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-stone-500 text-xs font-mono">Ayarlar yükleniyor...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900">Site & İletişim Ayarları (CMS)</h1>
          <p className="text-xs text-stone-500 mt-1">Firma telefonları, acil hat, EPDK yetki no ve genel metinleri düzenleyin</p>
        </div>
        {saved && (
          <div className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ayarlar Başarıyla Kaydedildi!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs max-w-4xl">
        {/* Company info */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">Temel Şirket Bilgileri</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">Şirket Ünvanı</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">EPDK & Gaz İdaresi Lisans / Yetki No</label>
              <input
                type="text"
                value={settings.licenseNo}
                onChange={(e) => setSettings({ ...settings, licenseNo: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Hero Rozet Metni</label>
            <input
              type="text"
              value={settings.heroBadge}
              onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Hero Ana Açıklama Metni</label>
            <textarea
              rows={2}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* About Us & Story */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">
              Kurumsal Hikaye & Hakkımızda Metinleri
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">/hakkimizda Sayfası</span>
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Kısa Tanıtım Özeti (Alt Bilgi ve Giriş İçin)</label>
            <textarea
              rows={2}
              value={settings.aboutShort || ""}
              onChange={(e) => setSettings({ ...settings, aboutShort: e.target.value })}
              placeholder="Ay Mühendislik; 16 yılı aşkın tecrübesi..."
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Detaylı Kurumsal Hikaye (Hakkımızda Sayfası Ana Metni)</label>
            <textarea
              rows={5}
              value={settings.aboutFull || ""}
              onChange={(e) => setSettings({ ...settings, aboutFull: e.target.value })}
              placeholder="Ay Mühendislik olarak kurulduğumuz günden bu yana..."
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500 leading-relaxed"
            />
            <p className="text-[10px] text-stone-400 mt-1">Paragraflar arasında bir satır boşluk bırakabilirsiniz.</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">İletişim & Acil Hatlar</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">Sabit / Ofis Telefonu</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">7/24 Acil Müdahale Hattı</label>
              <input
                type="text"
                value={settings.emergencyPhone}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">WhatsApp Numarası (Ülke Koduyla)</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="905329998877"
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">E-Posta Adresi</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Çalışma Saatleri</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Fiziksel Merkez Adresi</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Social Media & Maps */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">
              Sosyal Medya & Harita Bağlantıları
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Footer & İletişim</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">Google Haritalar Yol Tarifi / Paylaşım URL</label>
              <input
                type="url"
                value={settings.googleMapsUrl || ""}
                onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">LinkedIn Profil / Şirket URL</label>
              <input
                type="url"
                value={settings.linkedinUrl || ""}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl || ""}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebookUrl || ""}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Counters & Experience */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">İstatistik Sayaçları</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">Yıllık Deneyim</label>
              <input
                type="number"
                value={settings.yearsExperience}
                onChange={(e) => setSettings({ ...settings, yearsExperience: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Tamamlanan Proje</label>
              <input
                type="number"
                value={settings.completedProjects}
                onChange={(e) => setSettings({ ...settings, completedProjects: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Memnun Müşteri</label>
              <input
                type="number"
                value={settings.happyClients}
                onChange={(e) => setSettings({ ...settings, happyClients: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink-800 mb-1">Sertifikalı Personel</label>
              <input
                type="number"
                value={settings.certifiedStaff}
                onChange={(e) => setSettings({ ...settings, certifiedStaff: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Why Us Section Management */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">
              &quot;Neden Biz?&quot; Bölümü Yönetimi
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Ana Sayfa Vitrin</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-ink-800 mb-1">Üst Rozet Metni</label>
              <input
                type="text"
                value={settings.whyUsBadge || ""}
                onChange={(e) => setSettings({ ...settings, whyUsBadge: e.target.value })}
                placeholder="Neden Biz"
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-ink-800 mb-1">Ana Başlık</label>
              <input
                type="text"
                value={settings.whyUsTitle || ""}
                onChange={(e) => setSettings({ ...settings, whyUsTitle: e.target.value })}
                placeholder="Güvenli, Onaylı ve Hızlı Tesisat"
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink-800 mb-1">Açıklama Paragrafı</label>
            <textarea
              rows={2}
              value={settings.whyUsSubtitle || ""}
              onChange={(e) => setSettings({ ...settings, whyUsSubtitle: e.target.value })}
              placeholder="Doğalgaz hata kabul etmez..."
              className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-2 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">4 Avantaj Maddesi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[11px] font-bold text-brand-600 font-mono">1. Madde</div>
                <input
                  type="text"
                  value={settings.whyUsItem1Title || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem1Title: e.target.value })}
                  placeholder="Madde Başlığı (Örn: EPDK & İGDAŞ Yetkili)"
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 font-semibold focus:outline-none focus:border-brand-500"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsItem1Desc || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem1Desc: e.target.value })}
                  placeholder="Madde Açıklaması..."
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 text-[11px] focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Item 2 */}
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[11px] font-bold text-brand-600 font-mono">2. Madde</div>
                <input
                  type="text"
                  value={settings.whyUsItem2Title || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem2Title: e.target.value })}
                  placeholder="Madde Başlığı (Örn: Hızlı Gaz Açımı)"
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 font-semibold focus:outline-none focus:border-brand-500"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsItem2Desc || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem2Desc: e.target.value })}
                  placeholder="Madde Açıklaması..."
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 text-[11px] focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Item 3 */}
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[11px] font-bold text-brand-600 font-mono">3. Madde</div>
                <input
                  type="text"
                  value={settings.whyUsItem3Title || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem3Title: e.target.value })}
                  placeholder="Madde Başlığı (Örn: Yıllık Saha Deneyimi)"
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 font-semibold focus:outline-none focus:border-brand-500"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsItem3Desc || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem3Desc: e.target.value })}
                  placeholder="Madde Açıklaması..."
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 text-[11px] focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Item 4 */}
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-[11px] font-bold text-brand-600 font-mono">4. Madde</div>
                <input
                  type="text"
                  value={settings.whyUsItem4Title || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem4Title: e.target.value })}
                  placeholder="Madde Başlığı (Örn: 7/24 Acil Müdahale)"
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 font-semibold focus:outline-none focus:border-brand-500"
                />
                <textarea
                  rows={2}
                  value={settings.whyUsItem4Desc || ""}
                  onChange={(e) => setSettings({ ...settings, whyUsItem4Desc: e.target.value })}
                  placeholder="Madde Açıklaması..."
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-stone-200 text-ink-900 text-[11px] focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Special Project Consultation & CTA Banners */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">
            Özel Proje Danışmanlığı & Çağrı (CTA) Bantları
          </h3>

          <div className="space-y-4 pt-2">
            {/* FAQ Bottom Callout */}
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <div className="font-bold text-ink-900 text-xs flex items-center justify-between">
                <span>1. SSS Altı &quot;Özel Proje Danışmanlığı&quot; Kartı</span>
                <span className="text-[10px] text-stone-400 font-mono">SSS Bölümü</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">Rozet Metni</label>
                  <input
                    type="text"
                    value={settings.faqCtaBadge || ""}
                    onChange={(e) => setSettings({ ...settings, faqCtaBadge: e.target.value })}
                    placeholder="Özel Proje Danışmanlığı"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-ink-800 mb-1">Başlık</label>
                  <input
                    type="text"
                    value={settings.faqCtaTitle || ""}
                    onChange={(e) => setSettings({ ...settings, faqCtaTitle: e.target.value })}
                    placeholder="Başka bir sorunuz veya özel bir projeniz mi var?"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-ink-800 mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  value={settings.faqCtaSubtitle || ""}
                  onChange={(e) => setSettings({ ...settings, faqCtaSubtitle: e.target.value })}
                  placeholder="Uzman makine mühendislerimiz projenizi yerinde inceleyip..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Main Page Bottom CTA */}
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <div className="font-bold text-ink-900 text-xs flex items-center justify-between">
                <span>2. Ana Sayfa Alt Çağrı Bannerı (Büyük Keşif Bandı)</span>
                <span className="text-[10px] text-stone-400 font-mono">Footer Öncesi</span>
              </div>
              <div>
                <label className="block font-semibold text-ink-800 mb-1">Ana Başlık</label>
                <input
                  type="text"
                  value={settings.ctaTitle || ""}
                  onChange={(e) => setSettings({ ...settings, ctaTitle: e.target.value })}
                  placeholder="Projenizi Birlikte Planlayalım"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink-800 mb-1">Açıklama Metni</label>
                <textarea
                  rows={2}
                  value={settings.ctaSubtitle || ""}
                  onChange={(e) => setSettings({ ...settings, ctaSubtitle: e.target.value })}
                  placeholder="Ücretsiz keşif ve teknik değerlendirme için hemen bize ulaşın..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Management Card */}
        <div className="p-6 rounded-xl bg-white border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-ink-900 uppercase font-mono tracking-wider">
                Sıkça Sorulan Sorular (SSS) Yönetimi
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Ana sayfada yayınlanan soru & cevapları anlık olarak düzenleyin</p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs flex items-center gap-1.5 border border-brand-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Soru Ekle</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {(settings.faqs || []).map((faq, idx) => (
              <div key={faq.id || idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5 relative group">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => handleUpdateFaq(idx, "q", e.target.value)}
                      placeholder="Soru başlığı..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold text-ink-900 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="w-32 shrink-0">
                    <input
                      type="text"
                      value={faq.tag || ""}
                      onChange={(e) => handleUpdateFaq(idx, "tag", e.target.value)}
                      placeholder="Etiket (örn: İGDAŞ)"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-[11px] font-mono text-stone-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer shrink-0"
                    title="Soruyu Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => handleUpdateFaq(idx, "a", e.target.value)}
                    placeholder="Detaylı cevap açıklaması..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-xs text-ink-900 focus:outline-none focus:border-brand-500 leading-relaxed"
                  />
                </div>
              </div>
            ))}

            {(!settings.faqs || settings.faqs.length === 0) && (
              <div className="text-center py-6 text-stone-400 text-xs">
                Kayıtlı soru bulunmuyor. &quot;Yeni Soru Ekle&quot; butonuna basarak ilk sorunuzu ekleyebilirsiniz.
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Tüm Ayarları Kaydet</span>
        </button>
      </form>
    </AdminLayout>
  );
}
