"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { ServiceItem } from "@/lib/types";
import { Plus, Edit2, Trash2, Check, X, Flame, ShieldCheck, Factory, FileCheck, Home, SunMedium, ShieldAlert, FolderOpen } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Factory");
  const [image, setImage] = useState("/images/1.png");
  const [features, setFeatures] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setShortDesc("");
    setDescription("");
    setIcon("Factory");
    setImage("/images/1.png");
    setFeatures("RMS İstasyonu Montajı\nÇelik Hat Kaynak ve Röntgen Testi\nGaz Açım İdare Onayı");
    setIsFeatured(true);
    setModalOpen(true);
  };

  const openEditModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setTitle(srv.title);
    setSlug(srv.slug);
    setShortDesc(srv.shortDesc);
    setDescription(srv.description);
    setIcon(srv.icon);
    setImage(srv.image);
    setFeatures(srv.features.join("\n"));
    setIsFeatured(srv.isFeatured);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicePayload: Partial<ServiceItem> = {
      id: editingService ? editingService.id : undefined,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      shortDesc,
      description,
      icon,
      image,
      features: features.split("\n").map((f) => f.trim()).filter(Boolean),
      isFeatured,
      order: editingService ? editingService.order : services.length + 1
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicePayload)
      });
      if (res.ok) {
        setModalOpen(false);
        fetchServices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchServices();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900">Hizmet Yönetimi (CMS)</h1>
          <p className="text-xs text-stone-500 mt-1">Web sitesinde listelenen mühendislik hizmetlerini yönetin</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center space-x-1.5 shadow-md shadow-brand-600/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Hizmet Ekle</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-mono uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3.5">Hizmet Başlığı</th>
                <th className="p-3.5">Slug (URL)</th>
                <th className="p-3.5">İkon</th>
                <th className="p-3.5">Öne Çıkan</th>
                <th className="p-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-ink-800">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-stone-50/40 transition">
                  <td className="p-3.5 font-bold text-ink-900">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                      <span>{srv.title}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-stone-500">/hizmetler/{srv.slug}</td>
                  <td className="p-3.5 font-mono text-brand-400">{srv.icon}</td>
                  <td className="p-3.5">
                    {srv.isFeatured ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-400 font-semibold">
                        Öne Çıkan
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">Normal</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="px-2.5 py-1 rounded bg-stone-50 hover:bg-stone-100 text-ink-900 font-semibold"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-900 font-semibold"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <h3 className="text-lg font-bold text-ink-900">
                {editingService ? "Hizmeti Düzenle" : "Yeni Mühendislik Hizmeti Ekle"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-stone-50 text-stone-500 hover:text-ink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink-800 mb-1">Hizmet Başlığı *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="endustriyel-dogalgaz-tesisati"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">İkon (Lucide)</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  >
                    <option value="Factory">Factory (Fabrika / Sanayi)</option>
                    <option value="FileCheck">FileCheck (Proje / Onay)</option>
                    <option value="Flame">Flame (Kaskad / Ateş)</option>
                    <option value="Home">Home (Bireysel Konut)</option>
                    <option value="SunMedium">SunMedium (Radyant Isıtma)</option>
                    <option value="ShieldAlert">ShieldAlert (LNG / Güvenlik)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-ink-800">Görsel Yolu *</label>
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      Galeriden Seç
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="px-3 py-2 bg-ink-900 hover:bg-ink-800 text-white rounded-lg font-bold flex items-center gap-1 shrink-0"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Seç</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Kısa Açıklama (Vitrin için)</label>
                <textarea
                  rows={2}
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Detaylı Açıklama (Hizmet Sayfası)</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Özellik Maddeleri (Her satıra bir madde)</label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="RMS İstasyonu Montajı&#10;Çelik Hat Kaynak Testi"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded bg-stone-50 border-stone-200 text-brand-500 focus:ring-0"
                />
                <label htmlFor="featured" className="text-ink-800 font-semibold cursor-pointer">
                  Anasayfada Öne Çıkarılsın
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-ink-800 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md shadow-brand-600/30"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setImage(url)}
        title="Hizmet Görseli Seç veya Yükle"
        defaultFolder="hizmet"
      />
    </AdminLayout>
  );
}
