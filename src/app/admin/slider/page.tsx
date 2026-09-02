"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { SliderItem } from "@/lib/types";
import { Plus, Edit2, Trash2, X, Upload, Image as ImageIcon, Sparkles, FolderOpen } from "lucide-react";
import Image from "next/image";

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SliderItem | null>(null);

  // Form states
  const [label, setLabel] = useState("");
  const [headline, setHeadline] = useState("");
  const [sub, setSub] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(1);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/slides");
      const data = await res.json();
      setSlides(data);
    } catch (e) {
      console.error("Slaytlar yüklenemedi", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openCreateModal = () => {
    setEditingSlide(null);
    setLabel("");
    setHeadline("");
    setSub("");
    setImage("/images/1.png");
    setOrder(slides.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (slide: SliderItem) => {
    setEditingSlide(slide);
    setLabel(slide.label);
    setHeadline(slide.headline);
    setSub(slide.sub);
    setImage(slide.image);
    setOrder(slide.order || 1);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingSlide ? editingSlide.id : undefined,
          label,
          headline,
          sub,
          image,
          order: Number(order)
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchSlides();
      } else {
        alert("Slayt kaydedilirken hata oluştu.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu slaytı silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/slides?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchSlides();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-500" />
            Hero Slider Yönetimi (CMS)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Ana sayfada sırayla gösterilen büyük manşet slaytlarını, başlıkları ve arka plan fotoğraflarını yönetin.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Slayt Ekle</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-stone-400 font-medium text-sm">Yükleniyor...</div>
      ) : slides.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-ink-900 text-base mb-1">Henüz Slayt Eklenmemiş</h3>
          <p className="text-xs text-stone-500 mb-4">Ana sayfa için ilk slaytınızı oluşturun.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-bold"
          >
            Slayt Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                  <Image
                    src={slide.image || "/images/1.png"}
                    alt={slide.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-ink-900/80 backdrop-blur-sm text-brand-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-brand-500/30 uppercase tracking-wider">
                    {slide.label}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-ink-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Sıra: {slide.order || idx + 1}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-ink-900 text-base leading-tight mb-2 whitespace-pre-line">
                    {slide.headline}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {slide.sub}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono font-medium truncate max-w-[120px]">
                  {slide.image}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(slide)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-ink-900 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900">
                {editingSlide ? "Slaytı Düzenle" : "Yeni Slayt Ekle"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Üst Rozet / Kategori Etiketi *
                </label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Örn: Endüstriyel Tesisat veya EPDK Onaylı"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Manşet Başlığı (Enter ile alt satıra geçebilirsiniz) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Fabrikalar ve&#10;Sanayi Tesisleri"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Alt Açıklama Metni *
                </label>
                <textarea
                  rows={3}
                  required
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  placeholder="RMS istasyonları, yüksek basınçlı çelik hatlar ve anahtar teslim endüstriyel dönüşüm."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Image picker & URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider">
                    Slayt Arka Plan Görseli *
                  </label>
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    Galeriden Seç / Yükle
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/1.png veya URL"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors shrink-0"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Galeriden Seç</span>
                  </button>
                </div>

                {image && (
                  <div className="mt-3 relative aspect-[16/9] w-full max-w-[240px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
                    <Image src={image} alt="Önizleme" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Görüntülenme Sırası
                </label>
                <input
                  type="number"
                  min={1}
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-24 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors"
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
        title="Slayt Görseli Seç veya Yükle"
        defaultFolder="slider"
      />
    </AdminLayout>
  );
}
