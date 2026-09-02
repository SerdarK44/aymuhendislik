"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { SliderItem } from "@/lib/types";
import { Plus, Edit2, Trash2, X, Sparkles, Image as ImageIcon, FolderOpen, Upload, CheckCircle, Loader2 } from "lucide-react";

export default function AdminSlidersPage() {
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
  const [uploadingImage, setUploadingImage] = useState(false);

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
    setLabel("Yetkili Doğalgaz Mühendisliği");
    setHeadline("Endüstriyel & Bireysel Doğalgaz Çözümleri");
    setSub("İstanbul ve tüm Türkiye'de projelendirme, anahtar teslim taahhüt ve yetkili gaz açım hizmetleri.");
    setImage("/images/1.png");
    setOrder(slides.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (slide: SliderItem) => {
    setEditingSlide(slide);
    setLabel(slide.label || "");
    setHeadline(slide.headline);
    setSub(slide.sub || "");
    setImage(slide.image);
    setOrder(slide.order || 1);
    setModalOpen(true);
  };

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", label || file.name.replace(/\.[^/.]+$/, ""));
    formData.append("folder", "slider");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.media) {
        setImage(data.media.url);
      } else {
        alert("Görsel yüklenirken hata oluştu.");
      }
    } catch (err) {
      console.error("Slider upload error:", err);
      alert("Görsel yüklenemedi.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Lütfen bir arka plan görseli seçin veya yükleyin.");
      return;
    }

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
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Slayt Ekle</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-stone-400 font-medium text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
          <span>Yükleniyor...</span>
        </div>
      ) : slides.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-ink-900 text-base mb-1">Henüz Slayt Eklenmemiş</h3>
          <p className="text-xs text-stone-500 mb-4">Ana sayfa için ilk slaytınızı oluşturun.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Slayt Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                  <img
                    src={slide.image || "/images/1.png"}
                    alt={slide.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/1.png";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-ink-900/80 backdrop-blur-xs text-brand-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-brand-500/30 uppercase tracking-wider">
                    {slide.label}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-ink-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
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

              <div className="p-4 pt-0 border-t border-stone-100 flex items-center gap-2 mt-2">
                <button
                  onClick={() => openEditModal(slide)}
                  className="flex-1 py-2 rounded-xl bg-stone-50 hover:bg-brand-50 hover:text-brand-700 text-stone-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Düzenle
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 transition-colors cursor-pointer"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl p-6 sm:p-8 max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900">
                {editingSlide ? "Slaytı Düzenle" : "Yeni Slayt Ekle"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Rozet / Üst Başlık (Küçük Etiket)
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Örn: Yetkili Mühendislik Hizmetleri"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Ana Manşet Başlığı *
                </label>
                <textarea
                  required
                  rows={2}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Örn: Endüstriyel Tesisler İçin Güvenli & Kusursuz Doğalgaz Altyapısı"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Alt Açıklama Metni
                </label>
                <textarea
                  rows={2}
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  placeholder="Kısa açıklama..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Slider Image Upload & Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider">
                  Slayt Arka Plan Görseli *
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-stone-200 hover:border-brand-500 bg-stone-50 hover:bg-brand-50/30 text-stone-600 hover:text-brand-600 text-xs font-bold transition-all cursor-pointer">
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingImage ? "Yükleniyor..." : "Cihazdan Yükle"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDirectUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Ortam Galerisi</span>
                  </button>
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/1.png veya görsel URL"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Instant Preview */}
                {image && (
                  <div className="mt-3 p-3 rounded-2xl border border-stone-200 bg-stone-50 flex items-center gap-4">
                    <div className="w-28 aspect-video rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200 shadow-xs">
                      <img
                        src={image}
                        alt="Önizleme"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/1.png";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mb-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Görsel Hazır</span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate font-mono">{image}</p>
                    </div>
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
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors cursor-pointer disabled:opacity-50"
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
        title="Hero Slider Görseli Seç veya Yükle"
        defaultFolder="slider"
      />
    </AdminLayout>
  );
}
