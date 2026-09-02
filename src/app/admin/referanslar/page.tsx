"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { ReferenceItem } from "@/lib/types";
import { Plus, Edit2, Trash2, X, Upload, Building2, Image as ImageIcon, FolderOpen, CheckCircle, Loader2, Layers } from "lucide-react";

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingRef, setEditingRef] = useState<ReferenceItem | null>(null);

  // Single form states
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [order, setOrder] = useState(1);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Bulk upload states
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; isUploading: boolean }>({
    current: 0,
    total: 0,
    isUploading: false
  });

  const fetchReferences = async () => {
    try {
      const res = await fetch("/api/references");
      const data = await res.json();
      setReferences(data);
    } catch (e) {
      console.error("Referanslar yüklenemedi", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const openCreateModal = () => {
    setEditingRef(null);
    setName("");
    setLogo("");
    setOrder(references.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (ref: ReferenceItem) => {
    setEditingRef(ref);
    setName(ref.name);
    setLogo(ref.logo);
    setOrder(ref.order || 1);
    setModalOpen(true);
  };

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", name ? `${name} Logosu` : file.name.replace(/\.[^/.]+$/, ""));
    formData.append("folder", "referans");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.media) {
        setLogo(data.media.url);
        if (!name) {
          const cleanName = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          setName(cleanName);
        }
      } else {
        alert("Logo yüklenirken hata oluştu.");
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      alert("Logo yüklenemedi.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logo) {
      alert("Lütfen bir logo görseli yükleyin veya seçin.");
      return;
    }

    try {
      const res = await fetch("/api/references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingRef ? editingRef.id : undefined,
          name,
          logo,
          order: Number(order)
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchReferences();
      } else {
        alert("Referans kaydedilirken hata oluştu.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu referans logosunu silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/references?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchReferences();
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // BULK / TOPLU YÜKLEME HANDLER
  // ==========================================
  const handleBatchFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBatchFiles(Array.from(e.target.files));
    }
  };

  const handleStartBatchUpload = async () => {
    if (batchFiles.length === 0) return;

    setBatchProgress({ current: 0, total: batchFiles.length, isUploading: true });
    let currentOrder = references.length + 1;

    for (let i = 0; i < batchFiles.length; i++) {
      const file = batchFiles[i];
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      try {
        // 1. Upload file to media
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", cleanName);
        formData.append("folder", "referans");

        const mediaRes = await fetch("/api/media", {
          method: "POST",
          body: formData
        });
        const mediaData = await mediaRes.json();

        if (mediaData.success && mediaData.media) {
          // 2. Create reference item
          await fetch("/api/references", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: cleanName,
              logo: mediaData.media.url,
              order: currentOrder
            })
          });
          currentOrder++;
        }
      } catch (err) {
        console.error(`Error uploading batch file ${file.name}:`, err);
      }

      setBatchProgress((prev) => ({ ...prev, current: i + 1 }));
    }

    setBatchProgress({ current: 0, total: 0, isUploading: false });
    setBatchFiles([]);
    setBatchModalOpen(false);
    await fetchReferences();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-brand-500" />
            Referans Markalar & Logolar (CMS)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Ana sayfada kayan şeritte gösterilen kurumsal referansları ve firma logolarını yönetin.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => {
              setBatchFiles([]);
              setBatchModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 font-bold text-white text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Toplu Logo Yükle</span>
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tek Referans Ekle</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-stone-400 font-medium text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
          <span>Yükleniyor...</span>
        </div>
      ) : references.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-ink-900 text-base mb-1">Henüz Referans Eklenmemiş</h3>
          <p className="text-xs text-stone-500 mb-4">Şirketinizin çalıştığı markaların logolarını ekleyin.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setBatchModalOpen(true)}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Toplu Logo Yükle
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Referans Ekle
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {references.map((ref, idx) => (
            <div
              key={ref.id || idx}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-4 group"
            >
              <div className="relative aspect-[3/2] w-full bg-stone-50 rounded-2xl overflow-hidden mb-3 border border-stone-100 flex items-center justify-center p-3">
                {ref.logo ? (
                  <img
                    src={ref.logo}
                    alt={ref.name}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/referanslar/agaoglu_logo.svg";
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-300" />
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-ink-900 text-sm truncate">{ref.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                    #{ref.order || idx + 1}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => openEditModal(ref)}
                    className="flex-1 py-1.5 rounded-xl bg-stone-50 hover:bg-brand-50 hover:text-brand-700 text-stone-600 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(ref.id)}
                    className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 transition-colors cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Single Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900">
                {editingRef ? "Referansı Düzenle" : "Yeni Referans Ekle"}
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
                  Firma / Marka Adı *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Ağaoğlu İnşaat veya BOTAŞ"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Logo Upload & Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider">
                  Firma Logosu *
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-stone-200 hover:border-brand-500 bg-stone-50 hover:bg-brand-50/30 text-stone-600 hover:text-brand-600 text-xs font-bold transition-all cursor-pointer">
                    {uploadingLogo ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploadingLogo ? "Yükleniyor..." : "Cihazdan Yükle"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDirectUpload}
                      disabled={uploadingLogo}
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
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="/images/referanslar/logo.svg veya görsel URL"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Instant Preview Box */}
                {logo && (
                  <div className="mt-3 p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-center gap-4">
                    <div className="w-24 h-16 rounded-xl bg-white border border-stone-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                      <img
                        src={logo}
                        alt="Önizleme"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/referanslar/agaoglu_logo.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mb-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Logo Hazır & Önizleniyor</span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate font-mono">{logo}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Sıralama
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
                  disabled={uploadingLogo}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BATCH / TOPLU LOGO YÜKLEME MODAL */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-xl overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">Toplu Logo Yükleme</h3>
                  <p className="text-xs text-stone-500">Aynı anda birden fazla firma logosu seçip ekleyin.</p>
                </div>
              </div>
              <button
                onClick={() => !batchProgress.isUploading && setBatchModalOpen(false)}
                disabled={batchProgress.isUploading}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors cursor-pointer disabled:opacity-30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Dropzone */}
              <label className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-stone-300 hover:border-brand-500 bg-stone-50 hover:bg-brand-50/20 text-center transition-all cursor-pointer">
                <Upload className="w-10 h-10 text-stone-400 mb-3" />
                <span className="text-sm font-bold text-ink-900 mb-1">
                  Logoları Seçin (Birden Çok Dosya Seçilebilir)
                </span>
                <span className="text-xs text-stone-500 mb-4">
                  PNG, SVG, WEBP veya JPG formatında logonuzu seçin
                </span>
                <span className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl shadow-xs">
                  Cihazdan Logoları Seç
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleBatchFileSelect}
                  disabled={batchProgress.isUploading}
                  className="hidden"
                />
              </label>

              {/* Selected Files List Preview */}
              {batchFiles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                    <span>Seçilen Logolar ({batchFiles.length} Adet):</span>
                    <button
                      type="button"
                      onClick={() => setBatchFiles([])}
                      disabled={batchProgress.isUploading}
                      className="text-rose-600 hover:underline"
                    >
                      Temizle
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 border border-stone-200 rounded-2xl p-3 bg-stone-50/50">
                    {batchFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-ink-900 truncate">{f.name}</span>
                        </div>
                        <span className="text-stone-400 font-mono text-[10px] shrink-0">
                          {(f.size / 1024).toFixed(0)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {batchProgress.isUploading && (
                <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-800">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    <span>
                      Logolar Yükleniyor... ({batchProgress.current} / {batchProgress.total})
                    </span>
                  </div>
                  <div className="w-full bg-brand-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(batchProgress.current / batchProgress.total) * 100}%`
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setBatchModalOpen(false)}
                  disabled={batchProgress.isUploading}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold transition-colors cursor-pointer disabled:opacity-40"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={handleStartBatchUpload}
                  disabled={batchFiles.length === 0 || batchProgress.isUploading}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors cursor-pointer disabled:opacity-40 flex items-center gap-2"
                >
                  {batchProgress.isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{batchFiles.length > 0 ? `${batchFiles.length} Logoyu Yükle` : "Yüklemeyi Başlat"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setLogo(url)}
        title="Referans Logosu Seç veya Yükle"
        defaultFolder="referans"
      />
    </AdminLayout>
  );
}
