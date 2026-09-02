"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { SiteSettings } from "@/lib/types";
import { Save, CheckCircle2 } from "lucide-react";

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

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition"
        >
          <Save className="w-4 h-4" />
          <span>Tüm Ayarları Kaydet</span>
        </button>
      </form>
    </AdminLayout>
  );
}
