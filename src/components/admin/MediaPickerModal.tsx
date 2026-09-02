"use client";

import { useState, useEffect } from "react";
import { MediaItem } from "@/lib/types";
import { 
  X, Search, Upload, Check, Image as ImageIcon, 
  Folder, Sparkles, Building2, ShieldCheck, Wrench, FolderGit2, BookOpen 
} from "lucide-react";
import Image from "next/image";

const FOLDERS = [
  { id: "all", label: "Tümü", icon: Folder },
  { id: "slider", label: "Hero Slider", icon: Sparkles },
  { id: "referans", label: "Referanslar", icon: Building2 },
  { id: "logo", label: "Logolar", icon: ShieldCheck },
  { id: "hizmet", label: "Hizmetler", icon: Wrench },
  { id: "proje", label: "Projeler", icon: FolderGit2 },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "genel", label: "Genel", icon: ImageIcon },
];

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, mediaItem?: MediaItem) => void;
  title?: string;
  defaultFolder?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "Ortam Kütüphanesinden Görsel Seç",
  defaultFolder = "all",
}: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery");

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFolder, setUploadFolder] = useState(defaultFolder === "all" ? "genel" : defaultFolder);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMediaList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
      setSelectedFolder(defaultFolder);
      setUploadFolder(defaultFolder === "all" ? "genel" : defaultFolder);
    }
  }, [isOpen, defaultFolder]);

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
      if (data.success && data.media) {
        onSelect(data.media.url, data.media);
        onClose();
      } else {
        alert("Görsel yüklenemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    } finally {
      setUploading(false);
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-ink-950/80 backdrop-blur-md">
      <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/60 shrink-0">
          <div>
            <h3 className="font-bold text-ink-900 text-base flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-500" />
              {title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Klasörlerden filtreleyip görsel seçin veya yeni bir görsel yükleyin.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-stone-400 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-6 py-3 border-b border-stone-100 bg-white shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "gallery"
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Ortam Galerisi ({mediaList.length})
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === "upload"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Yeni Yükle & Klasörle
            </button>
          </div>

          {activeTab === "gallery" && (
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Görsel veya başlık ara..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs text-ink-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>

        {/* Folder Filter Pill Row */}
        {activeTab === "gallery" && (
          <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-stone-100 bg-stone-50/50 overflow-x-auto shrink-0 scrollbar-none">
            {FOLDERS.map((f) => {
              const Icon = f.icon;
              const isSelected = selectedFolder === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolder(f.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 ${
                    isSelected
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50/40">
          {activeTab === "gallery" ? (
            loading ? (
              <div className="py-20 text-center text-stone-400 text-sm">Görseller yükleniyor...</div>
            ) : filteredMedia.length === 0 ? (
              <div className="py-16 text-center">
                <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500">Bu klasörde veya aramada görsel bulunamadı.</p>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="mt-3 px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  Yeni Görsel Yükle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url, item);
                      onClose();
                    }}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-500 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/30 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white text-brand-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all font-bold text-xs shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-ink-900 text-xs truncate mb-0.5">{item.title}</h4>
                      <p className="text-[10px] text-stone-400 font-mono truncate">{item.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Upload & Naming Tab */
            <form onSubmit={handleUploadSubmit} className="max-w-xl mx-auto py-4 space-y-5 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  1. Görsel Dosyası Seçin *
                </label>
                <div className="border-2 border-dashed border-stone-200 hover:border-brand-500 rounded-2xl p-6 text-center transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                    id="modal-media-file-input"
                  />
                  <label htmlFor="modal-media-file-input" className="cursor-pointer block">
                    {previewUrl ? (
                      <div className="relative aspect-[16/9] max-w-xs mx-auto rounded-xl overflow-hidden border border-stone-200 mb-3 bg-stone-50">
                        <Image src={previewUrl} alt="Önizleme" fill className="object-contain" />
                      </div>
                    ) : (
                      <Upload className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                    )}
                    <span className="block text-xs font-bold text-ink-900">
                      {selectedFile ? selectedFile.name : "Bilgisayarınızdan Görsel Seçin"}
                    </span>
                    <span className="block text-[10px] text-stone-400 mt-1">PNG, JPG, WEBP veya SVG</span>
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
                  placeholder="Örn: Fabrika RMS İstasyonu Montajı veya Ofis Binası"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                  3. Kaydedilecek Klasör *
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

              <div className="pt-2 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setActiveTab("gallery")}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50"
                >
                  {uploading ? "Yükleniyor..." : "Yükle ve Bu Görseli Seç"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
