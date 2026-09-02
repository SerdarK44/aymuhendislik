"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { TestimonialItem } from "@/lib/types";
import { Plus, Trash2, Star, X } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [companyOrBuilding, setCompanyOrBuilding] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [projectType, setProjectType] = useState("Endüstriyel Tesisat");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          companyOrBuilding,
          rating,
          comment,
          projectType
        })
      });
      if (res.ok) {
        setModalOpen(false);
        setClientName("");
        setCompanyOrBuilding("");
        setComment("");
        fetchTestimonials();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchTestimonials();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-ink-900">Müşteri Yorumları & Değerlendirmeler (CMS)</h1>
          <p className="text-xs text-stone-500 mt-1">Anasayfada gösterilen müşteri referanslarını yönetin</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center space-x-1.5 shadow-md shadow-brand-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Yorum Ekle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="p-5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-rose-400 hover:text-rose-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-ink-800 italic mb-4">"{t.comment}"</p>
            </div>
            <div className="pt-3 border-t border-stone-200 text-xs">
              <div className="font-bold text-ink-900">{t.clientName}</div>
              <div className="text-brand-400 text-[11px]">{t.companyOrBuilding}</div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
              <h3 className="font-bold text-ink-900 text-base">Yeni Yorum Ekle</h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-500 hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink-800 mb-1">Müşteri Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Firma / Site / Ünvan</label>
                <input
                  type="text"
                  required
                  value={companyOrBuilding}
                  onChange={(e) => setCompanyOrBuilding(e.target.value)}
                  placeholder="Örn: Akmetal A.Ş. Fabrika Müdürü"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Proje Türü</label>
                <input
                  type="text"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="Endüstriyel RMS İstasyonu"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-800 mb-1">Yorum Metni *</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-ink-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-50 text-ink-800 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
