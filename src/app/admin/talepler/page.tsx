"use client";

import { useState, useEffect } from "react";
import { LeadItem } from "@/lib/types";
import { Check, X, Phone, Mail, FileText, Calendar, Loader2, ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function TaleplerPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    if (res.ok) setLeads(await res.json());
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string, isRead = true) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, isRead })
    });
    if (res.ok) {
      if (activeLead && activeLead.id === id) {
        setActiveLead({ ...activeLead, status: status as any, isRead: true });
      }
      fetchLeads();
    }
  };

  const openLead = async (lead: LeadItem) => {
    setActiveLead(lead);
    if (lead.status === 'new' && !lead.isRead) {
      await updateStatus(lead.id, 'new', true);
    }
  };

  if (loading) return <AdminLayout><div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-600" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 relative">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Gelen Talepler</h1>
          <p className="text-stone-500 mt-1 text-sm">Site uzerinden formu dolduran musterilerin talepleri.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-stone-500">Henuz hic talep yok.</div>
          ) : (
            <div className="divide-y divide-stone-200">
              {leads.map(lead => {
                const isNew = lead.status === 'new' && !lead.isRead;
                return (
                  <div key={lead.id} className={`p-4 cursor-pointer transition-colors flex items-center justify-between ${isNew ? 'bg-brand-50/30 hover:bg-brand-50/60' : 'hover:bg-stone-50'}`} onClick={() => openLead(lead)}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full">
                      <div className="w-48 shrink-0 flex items-center gap-3">
                        <h3 className={`text-sm truncate ${isNew ? 'font-bold text-ink-900' : 'font-semibold text-ink-800'}`}>
                          {lead.name}
                        </h3>
                        {isNew && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase tracking-wider shrink-0">Yeni</span>}
                      </div>
                      
                      <div className="flex-1 flex items-center gap-4 text-xs sm:text-sm text-stone-600 truncate">
                        <span className="truncate flex-1">
                          <span className="font-semibold text-brand-600 mr-2">[{lead.serviceType}]</span>
                          {lead.message || "Mesaj yok..."}
                        </span>
                      </div>

                      <div className="shrink-0 text-xs text-stone-400 hidden lg:flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString('tr-TR')}</span>
                        <div className="w-20 text-right">
                          {lead.status === 'completed' && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Tamamlandi</span>}
                          {lead.status === 'cancelled' && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-600 uppercase tracking-wider">Iptal</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {activeLead && (
          <div className="fixed inset-0 bg-ink-900/60 z-50 flex items-center justify-center p-4 lg:pl-64">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveLead(null)} className="p-1 text-stone-400 hover:text-ink-900 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                  <h2 className="font-bold text-ink-900 text-lg">Talep Detayi</h2>
                </div>
                <button onClick={() => setActiveLead(null)} className="text-stone-500 hover:text-ink-900 p-1"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto space-y-8">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-ink-900 mb-2">{activeLead.name}</h3>
                    <div className="flex flex-col gap-1.5 text-sm font-medium text-stone-600">
                      <a href={`tel:${activeLead.phone}`} className="flex items-center gap-2 hover:text-brand-600 transition-colors"><Phone className="w-4 h-4 text-brand-500" /> {activeLead.phone}</a>
                      {activeLead.email && <a href={`mailto:${activeLead.email}`} className="flex items-center gap-2 hover:text-brand-600 transition-colors"><Mail className="w-4 h-4 text-stone-400" /> {activeLead.email}</a>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-stone-500 flex items-center gap-1.5 justify-end mb-2"><Calendar className="w-4 h-4" /> {new Date(activeLead.createdAt).toLocaleString('tr-TR')}</div>
                    {activeLead.status === 'completed' && <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Tamamlandi</span>}
                    {activeLead.status === 'cancelled' && <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-stone-200 text-stone-700 uppercase tracking-wider">Iptal Edildi</span>}
                    {activeLead.status === 'new' && <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-brand-100 text-brand-700 uppercase tracking-wider">Acik Talep</span>}
                  </div>
                </div>

                {/* Form Details */}
                <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                  <div className="font-bold text-brand-600 mb-4 flex items-center gap-2 text-base"><FileText className="w-5 h-5" /> {activeLead.serviceType}</div>
                  
                  {activeLead.buildingType && (
                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-stone-200">
                      <div>
                        <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Bina Tipi</div>
                        <div className="text-sm font-medium text-ink-800">{activeLead.buildingType}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Metrekare</div>
                        <div className="text-sm font-medium text-ink-800">{activeLead.squareMeters} m²</div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Musteri Mesaji</div>
                    <div className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed">
                      {activeLead.message ? `"${activeLead.message}"` : <span className="italic text-stone-400">Mesaj girilmemis.</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap gap-3 justify-end">
                {activeLead.status !== 'completed' && (
                  <button onClick={() => updateStatus(activeLead.id, 'completed', true)} className="px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Check className="w-4 h-4" /> Talebi Tamamla
                  </button>
                )}
                {activeLead.status !== 'cancelled' && (
                  <button onClick={() => updateStatus(activeLead.id, 'cancelled', true)} className="px-5 py-2.5 bg-white text-red-600 hover:bg-red-50 border border-stone-200 hover:border-red-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <X className="w-4 h-4" /> Iptal Et
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}