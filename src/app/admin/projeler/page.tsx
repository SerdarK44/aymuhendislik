"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { ProjectItem } from "@/lib/types";
import { Plus, Edit2, Trash2, X, FolderGit2, FolderOpen } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<ProjectItem["category"]>("Endüstriyel");
  const [location, setLocation] = useState("");
  const [completionDate, setCompletionDate] = useState("2024");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [image, setImage] = useState("/images/1.png");
  const [isFeatured, setIsFeatured] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategory("Endüstriyel");
    setLocation("Tuzla OSB / İstanbul");
    setCompletionDate("2024");
    setDescription("");
    setClient("");
    setImage("/images/1.png");
    setIsFeatured(true);
    setModalOpen(true);
  };

  const openEditModal = (prj: ProjectItem) => {
    setEditingProject(prj);
    setTitle(prj.title);
    setSlug(prj.slug);
    setCategory(prj.category);
    setLocation(prj.location);
    setCompletionDate(prj.completionDate);
    setDescription(prj.description);
    setClient(prj.client);
    setImage(prj.image);
    setIsFeatured(prj.isFeatured);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<ProjectItem> = {
      id: editingProject ? editingProject.id : undefined,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      category,
      location,
      completionDate,
      description,
      client,
      image,
      isFeatured
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setModalOpen(false);
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900">Referans Proje Yönetimi (CMS)</h1>
          <p className="text-xs text-stone-500 mt-1">Sitede yayınlanan endüstriyel ve konut referanslarını yönetin</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center space-x-1.5 shadow-md shadow-brand-600/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Proje Ekle</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-mono uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3.5">Proje Başlığı</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Lokasyon</th>
                <th className="p-3.5">İşveren</th>
                <th className="p-3.5">Yıl</th>
                <th className="p-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-ink-800">
              {projects.map((prj) => (
                <tr key={prj.id} className="hover:bg-stone-50/40 transition">
                  <td className="p-3.5 font-bold text-ink-900">{prj.title}</td>
                  <td className="p-3.5 font-mono text-brand-400">{prj.category}</td>
                  <td className="p-3.5 text-stone-500">{prj.location}</td>
                  <td className="p-3.5 text-ink-800 font-medium">{prj.client}</td>
                  <td className="p-3.5 font-mono text-stone-500">{prj.completionDate}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prj)}
                      className="px-2.5 py-1 rounded bg-stone-50 hover:bg-stone-100 text-ink-900 font-semibold"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(prj.id)}
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <h3 className="text-lg font-bold text-ink-900">
                {editingProject ? "Projeyi Düzenle" : "Yeni Referans Proje Ekle"}
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
                <label className="block font-semibold text-ink-800 mb-1">Proje Başlığı *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  >
                    <option value="Endüstriyel">Endüstriyel</option>
                    <option value="Ticari & Fabrika">Ticari & Fabrika</option>
                    <option value="Konut & Toplu Konut">Konut & Toplu Konut</option>
                    <option value="Mühendislik & Projelendirme">Mühendislik & Projelendirme</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-ink-800">Proje Görseli *</label>
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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">Lokasyon</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Kartal / İstanbul"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">İşveren / Firma</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="XYZ Sanayi A.Ş."
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">Tamamlanma Yılı</label>
                  <input
                    type="text"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Proje Açıklaması & Kapsamı</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
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
        title="Proje Görseli Seç veya Yükle"
        defaultFolder="proje"
      />
    </AdminLayout>
  );
}
