import Link from "next/link";
import { Wrench, FolderGit2, BookOpen, Phone, ArrowLeft, Home, Sparkles, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between text-ink-900 font-sans antialiased">
      {/* Header */}
      <header className="py-6 px-6 max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-block scale-105 origin-left">
          <img 
            src="/logo/logo_tam.png" 
            alt="Ay Mühendislik" 
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:text-brand-600 transition-colors shadow-xs"
        >
          Ana Sayfa
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="max-w-2xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Hata Kodu: 404 • Sayfa Bulunamadı</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-ink-900 tracking-tight font-mono mb-4">
            4<span className="text-brand-500">0</span>4
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 mb-3">
            Aradığınız Sayfa Taşınmış veya Bulunamıyor
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-md mx-auto mb-8 leading-relaxed">
            Ulaşmaya çalıştığınız bağlantı adresi değişmiş veya kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan aradığınız hizmete kolayca ulaşabilirsiniz:
          </p>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            <Link
              href="/hizmetler"
              className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-brand-300 hover:bg-brand-50/50 transition-all group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-ink-900 group-hover:text-brand-700">Mühendislik Hizmetleri</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Endüstriyel, kaskad, proje çizimi</p>
            </Link>

            <Link
              href="/projeler"
              className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-brand-300 hover:bg-brand-50/50 transition-all group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-ink-900 group-hover:text-emerald-700">Referans Projeler</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Tamamlanan fabrika ve konut işleri</p>
            </Link>

            <Link
              href="/iletisim"
              className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-brand-300 hover:bg-brand-50/50 transition-all group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-ink-900 group-hover:text-blue-700">İletişim & Keşif</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Ücretsiz keşif randevusu alın</p>
            </Link>
          </div>

          {/* Primary Action Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/25 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Geri Dön</span>
          </Link>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 px-6 text-center text-xs text-stone-500 border-t border-stone-200/60 max-w-6xl mx-auto w-full">
        © {new Date().getFullYear()} Ay Mühendislik. EPDK & İGDAŞ Yetkili Doğalgaz Mühendislik Firması.
      </footer>
    </div>
  );
}
