"use client";

import { useState, useEffect } from "react";
import { LeadItem } from "@/lib/types";
import { Check, X, Phone, Mail, FileText, Calendar, Loader2, ArrowLeft, Trash2, Building, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function TaleplerPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        setLeads(await res.json());
      }
    } catch (err) {
      console.error("Fetch leads error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: LeadItem["status"], isRead = true) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, isRead })
      });
      if (res.ok) {
        if (activeLead && activeLead.id === id) {
          setActiveLead({ ...activeLead, status, isRead: true });
        }
        await fetchLeads();
      }
    } catch (err) {
      console.error("Update lead error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Bu talebi kalıcı olarak silmek istediğinize emin misiniz?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        if (activeLead && activeLead.id === id) {
          setActiveLead(null);
        }
        await fetchLeads();
      } else {
        alert("Talep silinemedi.");
      }
    } catch (err) {
      console.error("Delete lead error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const openLead = async (lead: LeadItem) => {
    setActiveLead(lead);
    if (!lead.isRead) {
      await updateStatus(lead.id, lead.status, true);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink-900">Gelen Teklif & Keşif Talepleri</h1>
            <p className="text-stone-500 mt-1 text-sm">Site üzerinden ziyaretçilerin gönderdiği formlar ve keşif istekleri.</p>
          </div>
          <div className="text-xs font-mono text-stone-500 bg-white px-3 py-1.5 rounded-xl border border-stone-200">
            Toplam: <strong className="text-ink-900">{leads.length}</strong> Talep
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          {leads.length === 0 ? (
            <div className="p-12 text-center text-stone-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40 text-stone-400" />
              <p className="font-semibold text-sm">Henüz kayıtlı bir talep bulunmuyor.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {leads.map((lead) => {
                const isNew = lead.status === "new" && !lead.isRead;
                return (
                  <div
                    key={lead.id}
                    className={`p-4 sm:p-5 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isNew ? "bg-brand-50/40 hover:bg-brand-50/70" : "hover:bg-stone-50/80"
                    }`}
                    onClick={() => openLead(lead)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                      <div className="w-48 shrink-0 flex items-center gap-2">
                        <h3 className={`text-sm truncate ${isNew ? "font-bold text-ink-900" : "font-semibold text-stone-800"}`}>
                          {lead.name}
                        </h3>
                        {isNew && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white uppercase tracking-wider shrink-0 animate-pulse">
                            Yeni
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex items-center gap-3 text-xs sm:text-sm text-stone-600 min-w-0">
                        <span className="font-bold text-brand-600 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-lg shrink-0 text-xs">
                          {lead.serviceType}
                        </span>
                        <span className="truncate text-stone-500">
                          {lead.message || "Mesaj belirtilmemiş..."}
                        </span>
                      </div>

                      <div className="shrink-0 text-xs text-stone-400 hidden lg:flex items-center gap-4">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 font-mono text-stone-600 hover:text-brand-600"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-500" />
                          <span>{lead.phone}</span>
                        </a>
                        <span className="font-mono">{new Date(lead.createdAt).toLocaleDateString("tr-TR")}</span>
                        <div className="w-24 text-right">
                          {lead.status === "completed" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                              Tamamlandı
                            </span>
                          )}
                          {lead.status === "cancelled" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 border border-stone-200 text-stone-500">
                              İptal Edildi
                            </span>
                          )}
                          {lead.status === "new" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700">
                              Bekliyor
                            </span>
                          )}
                          {lead.status === "contacted" && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-700">
                              Görüşüldü
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Delete Button on Row */}
                    <button
                      onClick={(e) => handleDeleteLead(lead.id, e)}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      title="Talebi Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {activeLead && (
          <div className="fixed inset-0 bg-ink-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 lg:pl-64">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-stone-200">
              <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveLead(null)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-ink-900 hover:bg-stone-200/60 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="font-bold text-ink-900 text-base">Talep Detayı & Süreç Yönetimi</h2>
                </div>
                <button
                  onClick={() => setActiveLead(null)}
                  className="text-stone-400 hover:text-ink-900 p-1.5 rounded-xl hover:bg-stone-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-100">
                  <div>
                    <h3 className="text-2xl font-black text-ink-900 mb-2">{activeLead.name}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-600">
                      <a
                        href={`tel:${activeLead.phone.replace(/\s+/g, "")}`}
                        className="flex items-center gap-1.5 text-brand-600 hover:underline bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200/60"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-600" />
                        <span>{activeLead.phone}</span>
                      </a>
                      {activeLead.email && (
                        <a
                          href={`mailto:${activeLead.email}`}
                          className="flex items-center gap-1.5 text-stone-600 hover:text-ink-900 bg-stone-100 px-3 py-1.5 rounded-xl"
                        >
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{activeLead.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono text-stone-400 flex items-center gap-1.5 justify-end mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(activeLead.createdAt).toLocaleString("tr-TR")}</span>
                    </div>
                    {activeLead.status === "completed" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        ✓ Tamamlandı
                      </span>
                    )}
                    {activeLead.status === "cancelled" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-700">
                        ✕ İptal Edildi
                      </span>
                    )}
                    {activeLead.status === "new" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        ● Bekleyen Talep
                      </span>
                    )}
                    {activeLead.status === "contacted" && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                        ☎ Görüşüldü
                      </span>
                    )}
                  </div>
                </div>

                {/* Form Details */}
                <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200/70 space-y-4">
                  <div className="font-bold text-brand-600 flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Hizmet Türü: {activeLead.serviceType}</span>
                  </div>

                  {activeLead.buildingType && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-200/60">
                      <div>
                        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Yapı / Tesis Tipi</div>
                        <div className="text-xs sm:text-sm font-semibold text-ink-900">{activeLead.buildingType}</div>
                      </div>
                      {activeLead.squareMeters && (
                        <div>
                          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Alan / Metrekare</div>
                          <div className="text-xs sm:text-sm font-semibold text-ink-900">{activeLead.squareMeters} m²</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-200/60">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Müşteri Notu / Açıklama</div>
                    <div className="text-xs sm:text-sm text-stone-700 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-stone-200/60">
                      {activeLead.message ? `"${activeLead.message}"` : <span className="italic text-stone-400">Herhangi bir not girilmedi.</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleDeleteLead(activeLead.id)}
                  disabled={actionLoading}
                  className="px-4 py-2.5 bg-white text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Talebi Sil</span>
                </button>

                <div className="flex items-center gap-2">
                  {activeLead.status !== "contacted" && (
                    <button
                      onClick={() => updateStatus(activeLead.id, "contacted", true)}
                      disabled={actionLoading}
                      className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Görüşüldü İşaretle</span>
                    </button>
                  )}
                  {activeLead.status !== "completed" && (
                    <button
                      onClick={() => updateStatus(activeLead.id, "completed", true)}
                      disabled={actionLoading}
                      className="px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Talebi Tamamla</span>
                    </button>
                  )}
                  {activeLead.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(activeLead.id, "cancelled", true)}
                      disabled={actionLoading}
                      className="px-4 py-2.5 bg-white text-stone-600 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>İptal Et</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}