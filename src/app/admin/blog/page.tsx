"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { BlogPost } from "@/lib/types";
import { Plus, Edit2, Trash2, X, BookOpen, FolderOpen } from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Müh. Serdar Ay");
  const [readTime, setReadTime] = useState("5 dk okuma");
  const [coverImage, setCoverImage] = useState("/images/2.png");
  const [tags, setTags] = useState("Doğalgaz Projesi, Mühendislik, Gaz Açma");
  const [isPublished, setIsPublished] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("<h2>Giriş ve Mühendislik Esasları</h2>\n<p>Bu makalede doğalgaz projelendirme ve tesisat güvenlik standartlarını inceliyoruz...</p>");
    setAuthor("Müh. Serdar Ay");
    setReadTime("5 dk okuma");
    setCoverImage("/images/2.png");
    setTags("Doğalgaz, Mühendislik, İGDAŞ Onayı");
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setAuthor(post.author);
    setReadTime(post.readTime);
    setCoverImage(post.coverImage);
    setTags(post.tags.join(", "));
    setIsPublished(post.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<BlogPost> = {
      id: editingPost ? editingPost.id : undefined,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      excerpt,
      content,
      author,
      readTime,
      coverImage,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      isPublished
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setModalOpen(false);
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu makaleyi silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900">Mühendislik Rehberi & Blog (CMS)</h1>
          <p className="text-xs text-stone-500 mt-1">Google ve Yapay Zeka aramalarında (LLMO) öne çıkan teknik makaleleri yönetin</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center space-x-1.5 shadow-md shadow-brand-600/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Makale Ekle</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-mono uppercase text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3.5">Makale Başlığı</th>
                <th className="p-3.5">Yazar</th>
                <th className="p-3.5">Tarih</th>
                <th className="p-3.5">Durum</th>
                <th className="p-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-ink-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50/40 transition">
                  <td className="p-3.5 font-bold text-ink-900 max-w-md">{post.title}</td>
                  <td className="p-3.5 text-ink-800">{post.author}</td>
                  <td className="p-3.5 font-mono text-stone-500">{post.publishDate}</td>
                  <td className="p-3.5">
                    {post.isPublished ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-400 font-semibold">
                        Yayında
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px] text-amber-400 font-semibold">
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(post)}
                      className="px-2.5 py-1 rounded bg-stone-50 hover:bg-stone-100 text-ink-900 font-semibold"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
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
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <h3 className="text-lg font-bold text-ink-900">
                {editingPost ? "Makaleyi Düzenle" : "Yeni Teknik Rehber / Makale Ekle"}
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
                <label className="block font-semibold text-ink-800 mb-1">Makale Başlığı (SEO Uyumlu) *</label>
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
                  <label className="block font-semibold text-ink-800 mb-1">Yazar Ünvanı</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-800 mb-1">Okuma Süresi</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Özet (Meta Açıklama & Arama Sonuçları İçin)</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Makale İçeriği (HTML Destekli)</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-ink-800">Kapak Görseli *</label>
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1 text-xs"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    Galeriden Seç
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-3 py-2 bg-ink-900 hover:bg-ink-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Seç</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Etiketler (Virgülle ayırın)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Doğalgaz Projesi, Mühendislik, Gaz Açma"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="accent-brand-500 w-4 h-4"
                />
                <label htmlFor="pubCheck" className="text-ink-800 font-semibold cursor-pointer">
                  Hemen Yayına Al
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
        onSelect={(url) => setCoverImage(url)}
        title="Blog Kapak Görseli Seç veya Yükle"
        defaultFolder="blog"
      />
    </AdminLayout>
  );
}
