import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Inbox,
  Wrench,
  FolderGit2,
  BookOpen,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Phone,
  Sparkles,
  Database,
  Image as ImageIcon,
  Users,
  Settings,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSessionAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const db = getDb();
  const leads = db.leads;
  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  return (
    <AdminLayout>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 text-white shadow-xl mb-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 font-mono text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              <span>Ay Mühendislik CMS & Yönetim Paneli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Hoş Geldiniz, {session.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
              Tüm kurumsal web sitesi içeriklerini, teklif taleplerini, referans projeleri ve SEO yazılarını buradan anlık olarak yönetebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/talepler"
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <Inbox className="w-4 h-4" />
              <span>Gelen Talepler ({newLeadsCount} Yeni)</span>
            </Link>
            <Link
              href="/admin/ayarlar"
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center gap-2 border border-stone-700 transition-all"
            >
              <Settings className="w-4 h-4 text-stone-400" />
              <span>Site Ayarları</span>
            </Link>
          </div>
        </div>

        {/* Database & System Health Sub-strip */}
        <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-3 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Veritabanı: <strong>SQLite (WAL Modu)</strong></span>
            <span className="text-stone-600">•</span>
            <span>Şifreleme: <strong>Bcrypt Salted</strong></span>
          </div>
          <div className="flex items-center gap-2 text-stone-500">
            <span>Yol: <strong>data/aymuhendislik.sqlite</strong></span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Link 
          href="/admin/talepler"
          className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-brand-500/50 transition-all duration-200 shadow-sm hover:shadow-md group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Bekleyen Talepler</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-ink-900 font-mono">{newLeadsCount}</div>
          <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
            <span>Toplam {leads.length} talep</span>
            <span className="text-brand-600 font-bold group-hover:translate-x-0.5 transition-transform">İncele →</span>
          </div>
        </Link>

        <Link 
          href="/admin/hizmetler"
          className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-blue-500/50 transition-all duration-200 shadow-sm hover:shadow-md group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Aktif Hizmetler</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-ink-900 font-mono">{db.services.length}</div>
          <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
            <span>Yayında olan modüller</span>
            <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">Yönet →</span>
          </div>
        </Link>

        <Link 
          href="/admin/projeler"
          className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-500/50 transition-all duration-200 shadow-sm hover:shadow-md group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Referans Projeler</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-ink-900 font-mono">{db.projects.length}</div>
          <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
            <span>Tamamlanan işler</span>
            <span className="text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">Yönet →</span>
          </div>
        </Link>

        <Link 
          href="/admin/blog"
          className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-purple-500/50 transition-all duration-200 shadow-sm hover:shadow-md group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Mühendislik Rehberi</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-ink-900 font-mono">{db.blogPosts.length}</div>
          <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
            <span>SEO & AI makaleleri</span>
            <span className="text-purple-600 font-bold group-hover:translate-x-0.5 transition-transform">Yönet →</span>
          </div>
        </Link>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-ink-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          Hızlı Eylemler
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/projeler"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Proje Ekle</div>
          </Link>

          <Link
            href="/admin/blog"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Yazı Paylaş</div>
          </Link>

          <Link
            href="/admin/medya"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Görsel Yükle</div>
          </Link>

          <Link
            href="/admin/slider"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Manşet / Slider</div>
          </Link>

          <Link
            href="/admin/kullanicilar"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Kullanıcılar</div>
          </Link>

          <Link
            href="/admin/ayarlar"
            className="p-4 rounded-xl bg-white border border-stone-200/80 hover:bg-brand-50 hover:border-brand-300 text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-brand-500 group-hover:text-white text-stone-600 flex items-center justify-center mx-auto mb-2 transition-colors">
              <Settings className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink-900">Site Ayarları</div>
          </Link>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink-900">Son Gelen Teklif & Keşif İstekleri</h2>
            <p className="text-xs text-stone-500">Sitedeki teklif formu üzerinden gelen en güncel talepler</p>
          </div>
          <Link
            href="/admin/talepler"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Tümünü Gör ({leads.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-100">
              <tr>
                <th className="px-6 py-3.5">Müşteri / Firma</th>
                <th className="px-6 py-3.5">Telefon</th>
                <th className="px-6 py-3.5">Hizmet Türü</th>
                <th className="px-6 py-3.5">Tarih</th>
                <th className="px-6 py-3.5">Durum</th>
                <th className="px-6 py-3.5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-ink-800">
              {leads.slice(0, 6).map((lead) => (
                <tr key={lead.id} className="hover:bg-stone-50/60 transition">
                  <td className="px-6 py-4 font-bold text-ink-900">{lead.name}</td>
                  <td className="px-6 py-4 font-mono">
                    <a href={`tel:${lead.phone}`} className="hover:text-brand-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-500" />
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-stone-600 font-medium">{lead.serviceType}</td>
                  <td className="px-6 py-4 text-stone-500 font-mono text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-6 py-4">
                    {lead.status === "new" && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-bold text-rose-700">
                        Yeni Talep
                      </span>
                    )}
                    {lead.status === "contacted" && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700">
                        Görüşüldü
                      </span>
                    )}
                    {lead.status === "completed" && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                        Tamamlandı
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/admin/talepler"
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-brand-50 hover:text-brand-700 text-stone-700 font-bold text-[11px] transition-colors"
                    >
                      İncele
                    </Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-stone-400">
                    Henüz gelen teklif talebi bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
