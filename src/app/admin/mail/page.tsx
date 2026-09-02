"use client";

import { useState, useEffect } from "react";
import { MailItem } from "@/lib/types";
import AdminLayout from "@/components/admin/AdminLayout";
import { Mail as MailIcon, Send, Inbox, Trash2, Paperclip, X, Loader2, RefreshCw } from "lucide-react";

export default function MailPage() {
  const [mails, setMails] = useState<MailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState<'inbox' | 'sent'>('inbox');
  const [activeMail, setActiveMail] = useState<MailItem | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "", attachments: [] as File[] });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    setLoading(true);
    const res = await fetch("/api/mail");
    if (res.ok) setMails(await res.json());
    setLoading(false);
  };

  const markAsRead = async (mail: MailItem) => {
    setActiveMail(mail);
    if (!mail.isRead) {
      await fetch(`/api/mail/${mail.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true })
      });
      setMails(mails.map(m => m.id === mail.id ? { ...m, isRead: true } : m));
    }
  };

  const deleteMail = async (id: string) => {
    if (confirm("Bu mesaji silmek istediginize emin misiniz?")) {
      await fetch(`/api/mail/${id}`, { method: "DELETE" });
      setMails(mails.filter(m => m.id !== id));
      if (activeMail?.id === id) setActiveMail(null);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const attachments = composeData.attachments.map(f => f.name); // Mock upload
    const res = await fetch("/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...composeData, attachments })
    });
    if (res.ok) {
      const newMail = await res.json();
      setMails([newMail, ...mails]);
      setComposeOpen(false);
      setComposeData({ to: "", subject: "", body: "", attachments: [] });
    }
    setSending(false);
  };

  const filteredMails = mails.filter(m => m.folder === folder);
  const unreadCount = mails.filter(m => m.folder === 'inbox' && !m.isRead).length;

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col sm:flex-row gap-6">
      
      {/* Sidebar */}
      <div className="w-full sm:w-64 shrink-0 flex flex-col gap-4">
        <button onClick={() => setComposeOpen(true)} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
          <MailIcon className="w-5 h-5" /> Yeni E-Posta
        </button>
        
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <button onClick={() => {setFolder('inbox'); setActiveMail(null);}} className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${folder === 'inbox' ? 'bg-brand-50 text-brand-700' : 'text-stone-700 hover:bg-stone-50'}`}>
            <div className="flex items-center gap-3"><Inbox className="w-4 h-4" /> Gelen Kutusu</div>
            {unreadCount > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </button>
          <button onClick={() => {setFolder('sent'); setActiveMail(null);}} className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${folder === 'sent' ? 'bg-brand-50 text-brand-700' : 'text-stone-700 hover:bg-stone-50'}`}>
            <div className="flex items-center gap-3"><Send className="w-4 h-4" /> Gonderilmis</div>
          </button>
        </div>
      </div>

      {/* Mail List & View */}
      <div className="flex-1 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
        
        {/* List */}
        <div className={`${activeMail ? 'hidden sm:flex' : 'flex'} w-full sm:w-1/2 lg:w-2/5 flex-col border-r border-stone-200 h-full`}>
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <h2 className="font-semibold text-ink-900">{folder === 'inbox' ? 'Gelen Kutusu' : 'Gonderilenler'}</h2>
            <button onClick={fetchMails} className="p-1.5 text-stone-500 hover:text-brand-600 rounded-lg transition-colors"><RefreshCw className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {loading ? (
              <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-600" /></div>
            ) : filteredMails.length === 0 ? (
              <div className="p-8 text-center text-sm text-stone-500">Bu klasor bos.</div>
            ) : (
              filteredMails.map(mail => (
                <div key={mail.id} onClick={() => markAsRead(mail)} className={`p-4 cursor-pointer transition-colors ${activeMail?.id === mail.id ? 'bg-brand-50' : 'hover:bg-stone-50'} ${!mail.isRead ? 'bg-stone-50/80' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-sm truncate ${!mail.isRead ? 'font-bold text-ink-900' : 'font-medium text-stone-800'}`}>{mail.sender}</h3>
                    <span className="text-[10px] text-stone-400 shrink-0 whitespace-nowrap">{new Date(mail.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className={`text-sm truncate mb-1 ${!mail.isRead ? 'font-semibold text-ink-800' : 'text-stone-600'}`}>{mail.subject}</div>
                  <div className="text-xs text-stone-500 truncate">{mail.body}</div>
                  {mail.attachments && mail.attachments.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-stone-500"><Paperclip className="w-3 h-3" /> {mail.attachments.length} Ek</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* View */}
        <div className={`${!activeMail ? 'hidden sm:flex' : 'flex'} flex-1 flex-col h-full bg-stone-50/30`}>
          {activeMail ? (
            <>
              <div className="p-6 border-b border-stone-200 bg-white">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-xl font-bold text-ink-900">{activeMail.subject}</h1>
                  <div className="flex gap-2">
                    <button onClick={() => setActiveMail(null)} className="sm:hidden p-2 text-stone-500 bg-stone-100 rounded-lg hover:text-ink-900"><X className="w-4 h-4" /></button>
                    <button onClick={() => deleteMail(activeMail.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-ink-800">{activeMail.sender}</div>
                    <div className="text-xs text-stone-500">{activeMail.senderEmail}</div>
                  </div>
                  <div className="text-xs text-stone-400">{new Date(activeMail.date).toLocaleString('tr-TR')}</div>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed">{activeMail.body}</div>
                
                {activeMail.attachments && activeMail.attachments.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-stone-200">
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Ekler</h4>
                    <div className="flex flex-wrap gap-3">
                      {activeMail.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-brand-600 hover:border-brand-300 cursor-pointer transition-colors shadow-sm">
                          <Paperclip className="w-4 h-4" /> {att}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400">
              <MailIcon className="w-12 h-12 mb-4 opacity-20" />
              <p>Okumak icin bir mesaj secin</p>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-ink-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-full">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h2 className="font-bold text-ink-900">Yeni E-Posta</h2>
              <button onClick={() => setComposeOpen(false)} className="text-stone-500 hover:text-ink-900"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSend} className="p-6 flex flex-col gap-4 overflow-y-auto">
              <div>
                <input required type="email" placeholder="Kime (E-Posta)" value={composeData.to} onChange={e => setComposeData({...composeData, to: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <input required type="text" placeholder="Konu" value={composeData.subject} onChange={e => setComposeData({...composeData, subject: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" />
              </div>
              <div className="flex-1 min-h-[200px]">
                <textarea required placeholder="Mesajinizi buraya yazin..." value={composeData.body} onChange={e => setComposeData({...composeData, body: e.target.value})} className="w-full h-full min-h-[200px] bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none" />
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm text-stone-600 hover:text-brand-600 cursor-pointer bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-lg transition-colors">
                  <Paperclip className="w-4 h-4" /> Ek Ekle
                  <input type="file" multiple className="hidden" onChange={e => {
                    if (e.target.files) setComposeData({...composeData, attachments: [...composeData.attachments, ...Array.from(e.target.files)]})
                  }} />
                </label>
                <div className="flex-1 flex gap-2 flex-wrap">
                  {composeData.attachments.map((f, i) => (
                    <span key={i} className="text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 flex items-center gap-1">
                      {f.name} <button type="button" onClick={() => setComposeData({...composeData, attachments: composeData.attachments.filter((_, idx) => idx !== i)})}><X className="w-3 h-3 hover:text-red-500" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-stone-100 mt-2">
                <button disabled={sending} type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-2.5 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Gonder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}