"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { MediaItem } from "@/lib/types";
import { 
  Plus, Trash2, X, Upload, Search, Copy, Check, 
  Image as ImageIcon, Sparkles, ExternalLink, Calendar, HardDrive,
  Folder, FolderOpen, Edit2, Building2, ShieldCheck, Wrench, FolderGit2, BookOpen, Tag
} from "lucide-react";
import Image from "next/image";

const FOLDERS = [
  { id: "all", label: "Tüm Görseller", icon: Folder },
  { id: "slider", label: "Hero Slider (Manşet)", icon: Sparkles },
  { id: "referans", label: "Referans Logoları", icon: Building2 },
  { id: "logo", label: "Şirket Logoları", icon: ShieldCheck },
  { id: "hizmet", label: "Hizmet Görselleri", icon: Wrench },
  { id: "proje", label: "Proje Fotoğrafları", icon: FolderGit2 },
  { id: "blog", label: "Blog Kapakları", icon: BookOpen },
  { id: "genel", label: "Genel / Diğer", icon: ImageIcon },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload Form
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFolder, setUploadFolder] = useState("genel");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Edit Form
  const [editTitle, setEditTitle] = useState("");
  const [editFolder, setEditFolder] = useState("genel");

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMediaList(data);
    } catch (err) {
      console.error("Medya yüklenemedi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", uploadTitle);
    formData.append("folder", uploadFolder);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadModalOpen(false);
        setSelectedFile(null);
        setPreviewUrl("");
        setUploadTitle("");
        fetchMedia();
      } else {
        alert("Görsel yüklenemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditFolder(item.folder || "genel");
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingItem,
          title: editTitle,
          folder: editFolder,
        }),
      });
      if (res.ok) {
        setEditModalOpen(false);
        fetchMedia();
      } else {
        alert("Güncelleme başarısız oldu.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu görseli silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase());

    const matchesFolder =
      selectedFolder === "all" || (m.folder || "genel") === selectedFolder;

    return matchesSearch && matchesFolder;
  });

  const getFolderBadge = (folderId?: string) => {
    const f = FOLDERS.find((item) => item.id === (folderId || "genel")) || FOLDERS[7];
    const Icon = f.icon;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-bold">
        <Icon className="w-3 h-3 text-brand-600" />
        {f.label}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-brand-500" />
            Medya & Klasör Galerisi (CMS)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Görsellerinizi klasörlere ayırın, yeniden adlandırın ve tüm sayfalarda düzenli tutun.
          </p>
        </div>
        <button
          onClick={() => {
            setUploadFolder(selectedFolder === "all" ? "genel" : selectedFolder);
            setUploadModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Görsel Yükle & Adlandır</span>
        </button>
      </div>

      {/* Main Container with Folders & Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Folders Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="text-xs font-bold text-ink-900 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
            <span>Klasörler</span>
            <span className="text-[10px] font-normal text-stone-400">({mediaList.length} Dosya)</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-2 space-y-1 shadow-sm">
            {FOLDERS.map((f) => {
              const Icon = f.icon;
              const count =
                f.id === "all"
                  ? mediaList.length
                  : mediaList.filter((m) => (m.folder || "genel") === f.id).length;
              const isSelected = selectedFolder === f.id;

              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolder(f.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-brand-50 text-brand-700 shadow-sm"
                      : "text-stone-600 hover:bg-stone-50 hover:text-ink-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-brand-600" : "text-stone-400"}`} />
                    <span>{f.label}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-brand-200 text-brand-900 font-bold" : "bg-stone-100 text-stone-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search & Media Cards */}
        <div className="flex-1 min-w-0">
          {/* Search & Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Görsel veya başlık ara..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="text-xs text-stone-500 font-medium self-end sm:self-auto">
              Gösterilen: <strong>{filteredMedia.length}</strong> görsel
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="p-12 text-center text-stone-400 font-medium text-sm">Görseller yükleniyor...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-sm">
              <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-ink-900 text-base mb-1">Bu Klasörde Görsel Yok</h3>
              <p className="text-xs text-stone-500 mb-4">
                Seçili klasöre henüz görsel eklenmemiş veya arama sonucu boş.
              </p>
              <button
                onClick={() => {
                  setUploadFolder(selectedFolder === "all" ? "genel" : selectedFolder);
                  setUploadModalOpen(true);
                }}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold shadow"
              >
                Bu Klasöre Görsel Yükle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Preview */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-100">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        {getFolderBadge(item.folder)}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-ink-900/80 backdrop-blur-sm text-white hover:bg-brand-600 transition-colors shadow"
                          title="Yeni Sekmede Aç"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-ink-900 text-sm mb-1 leading-snug line-clamp-1" title={item.title}>
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-stone-400 font-mono truncate mb-2">{item.url}</p>
                      <div className="flex items-center gap-3 text-[10px] text-stone-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAt || "2026"}
                        </span>
                        {item.size && (
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3 h-3" />
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <Edit2 className="w-3 h-3" /> Adlandır
                    </button>
                    <button
                      onClick={() => handleCopyUrl(item.id, item.url)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all border ${
                        copiedId === item.id
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-white text-stone-600 hover:bg-stone-100 border-stone-200"
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>URL</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-500" />
                Yeni Görsel Yükle & Klasörle
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  1. Dosya Seçin *
                </label>
                <div className="border-2 border-dashed border-stone-200 hover:border-brand-500 rounded-2xl p-6 text-center transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                    id="admin-media-upload-input"
                  />
                  <label htmlFor="admin-media-upload-input" className="cursor-pointer block">
                    {previewUrl ? (
                      <div className="relative aspect-[16/9] max-w-xs mx-auto rounded-xl overflow-hidden border border-stone-200 mb-3 bg-stone-50">
                        <Image src={previewUrl} alt="Önizleme" fill className="object-contain" />
                      </div>
                    ) : (
                      <Upload className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                    )}
                    <span className="block text-xs font-bold text-ink-900">
                      {selectedFile ? selectedFile.name : "Görsel Dosyası Seçmek İçin Tıklayın"}
                    </span>
                    <span className="block text-[10px] text-stone-400 mt-1">PNG, JPG, WEBP, SVG</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  2. Görsel Başlığı / Adlandırma *
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Örn: Fabrika RMS Gaz İstasyonu Montajı"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  3. Kaydedilecek Klasör / Kategori *
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {FOLDERS.filter((f) => f.id !== "all").map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Yükleniyor..." : "Klasöre Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit / Rename Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-ink-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-brand-500" />
                Görseli Yeniden Adlandır & Klasör Değiştir
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="relative aspect-[16/9] w-full max-w-xs mx-auto rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 mb-4">
                <Image src={editingItem.url} alt={editingItem.title} fill className="object-contain" />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Görsel Başlığı / Tanımlayıcı Adı *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  Klasör / Kategori *
                </label>
                <select
                  value={editFolder}
                  onChange={(e) => setEditFolder(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {FOLDERS.filter((f) => f.id !== "all").map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-colors"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
