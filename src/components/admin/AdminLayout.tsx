"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Flame, LayoutDashboard, Wrench, FolderGit2, BookOpen, Inbox, 
  MessageSquare, Settings, LogOut, ExternalLink, Menu, X, Mail, 
  Sparkles, Building2, Image as ImageIcon, Users, Shield, Bell, ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Genel Bakış", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Slider (Manşet)", href: "/admin/slider", icon: Sparkles },
  { label: "Hizmetler", href: "/admin/hizmetler", icon: Wrench },
  { label: "Projeler", href: "/admin/projeler", icon: FolderGit2 },
  { label: "Medya & Görsel Galerisi", href: "/admin/medya", icon: ImageIcon },
  { label: "Referans Markalar", href: "/admin/referanslar", icon: Building2 },
  { label: "Blog & Rehber", href: "/admin/blog", icon: BookOpen },
  { label: "Gelen Talepler", href: "/admin/talepler", icon: Inbox, id: "talepler" },
  { label: "Gelen Mesajlar", href: "/admin/mail", icon: Mail, id: "mail" },
  { label: "Müşteri Yorumları", href: "/admin/yorumlar", icon: MessageSquare },
  { label: "Kullanıcılar & Yetkiler", href: "/admin/kullanicilar", icon: Users },
  { label: "Site Ayarları", href: "/admin/ayarlar", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState({ talepler: 0, mail: 0 });
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/counts")
      .then(res => res.json())
      .then(data => {
        setCounts({ talepler: data.talepler || 0, mail: data.mail || 0 });
        if (data?.maintenanceMode !== undefined) setMaintenanceMode(data.maintenanceMode);
      })
      .catch(() => {});

    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-stone-100/70 flex text-ink-900 font-sans antialiased">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-stone-200/80 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-sm ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-stone-100 bg-white">
          <Link href="/admin" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/60 flex items-center justify-center p-1.5 shadow-sm">
              <img src="/logo/logo_tek.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-base font-black text-ink-900 leading-none tracking-tight flex items-center gap-1.5">
                Ay Mühendislik
              </div>
              <div className="text-[11px] font-bold text-brand-600 tracking-wider uppercase mt-1">
                Yönetim Paneli
              </div>
            </div>
          </Link>
          <button 
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-ink-900 hover:bg-stone-100 transition-colors" 
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-1 scrollbar-thin scrollbar-thumb-stone-200">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            İçerik & Modüller
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const badgeCount = item.id === "talepler" ? counts.talepler : item.id === "mail" ? counts.mail : 0;
            
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all font-semibold text-xs relative ${
                  isActive 
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/25" 
                    : "text-stone-600 hover:bg-stone-100/80 hover:text-ink-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-stone-400 group-hover:text-ink-900"}`} />
                  <span>{item.label}</span>
                </div>
                {badgeCount > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                    isActive ? "bg-white text-brand-700" : "bg-rose-500 text-white"
                  }`}>
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Bottom Action Links */}
        <div className="p-3.5 border-t border-stone-100 bg-stone-50/50 space-y-2">
          {/* User badge */}
          <div className="px-3 py-2 rounded-xl bg-white border border-stone-200/70 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-brand-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-ink-900 truncate">{user?.name || "Yönetici"}</div>
                <div className="text-[10px] text-stone-400 font-mono">@{user?.username || "admin"}</div>
              </div>
            </div>
            <Link 
              href="/admin/kullanicilar" 
              className="p-1 text-stone-400 hover:text-brand-600 transition-colors"
              title="Profil & Şifre"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link 
              href="/" 
              target="_blank" 
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-100 hover:text-ink-900 transition-all font-bold text-[11px] shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span>Siteyi Gör</span>
            </Link>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-700 hover:bg-rose-100 transition-all font-bold text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-stone-200/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)} 
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-ink-900 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
              <span className="font-bold text-ink-900">
                {navItems.find(n => n.href === pathname)?.label || "Yönetim"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {maintenanceMode ? (
              <Link
                href="/admin/ayarlar"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-all shadow-xs"
                title="Bakım Modu Aktif! Ziyaretçiler bakım sayfasını görüyor. Ayarları düzenlemek için tıklayın."
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span>Bakım Modu Aktif</span>
              </Link>
            ) : (
              <Link
                href="/admin/ayarlar"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
                title="Site Yayında - Bakım modunu açmak için tıklayın"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Site Yayında</span>
              </Link>
            )}

            <Link 
              href="/admin/talepler"
              className="relative p-2 rounded-xl bg-stone-100 text-stone-600 hover:text-ink-900 hover:bg-stone-200/70 transition-colors"
              title="Gelen Talepler"
            >
              <Bell className="w-4 h-4" />
              {counts.talepler > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {counts.talepler}
                </span>
              )}
            </Link>

            <Link 
              href="/" 
              target="_blank" 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Canlı Siteye Git</span>
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}