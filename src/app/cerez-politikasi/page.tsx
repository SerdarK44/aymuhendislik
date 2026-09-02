import { Metadata } from "next";
import Link from "next/link";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cookie, ShieldCheck, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Çerez (Cookie) Politikası | Ay Mühendislik",
  description: "Web sitemizde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğinize dair bilgilendirme.",
};

export const revalidate = 60;

export default function CookiePolicyPage() {
  const settings = getSettings();
  const services = getServices();

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-600 mb-6 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ana Sayfaya Dön</span>
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold mb-4">
                <Cookie className="w-4 h-4 text-amber-600" />
                <span>Çerez ve Gizlilik Tercihleri</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-4">
                Çerez (Cookie) Politikası
              </h1>
              <p className="text-xs text-stone-500 font-mono">
                Son Güncelleme: 29 Ağustos 2026 | Ay Mühendislik
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
              
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  1. Çerez (Cookie) Nedir?
                </h2>
                <p>
                  Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitemizin güvenli, hızlı ve kullanıcı deneyimini artıracak şekilde çalışmasını sağlar.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  2. Web Sitemizde Kullanılan Çerez Türleri
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-ink-900 text-sm mb-1">Zorunlu ve Güvenlik Çerezleri</h3>
                    <p className="text-xs text-stone-600">
                      Sitenin temel fonksiyonlarının çalışması, admin oturum güvenliğinin sağlanması (HttpOnly token çerezleri) ve form spam koruması için zorunludur.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <h3 className="font-bold text-ink-900 text-sm mb-1">Performans ve Analitik Çerezleri</h3>
                    <p className="text-xs text-stone-600">
                      Ziyaretçilerimizin sayfalar arasındaki gezintisini anonim olarak ölçümleyerek site hızını ve teknik içeriğimizi optimize etmemize yardımcı olur.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  3. Çerez Tercihlerinizi Nasıl Yönetebilirsiniz?
                </h2>
                <p>
                  Tarayıcınızın ayarlarını değiştirerek çerezlerin kullanımını dilediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak zorunlu çerezlerin devre dışı bırakılması halinde web sitesinin bazı fonksiyonları düzgün çalışmayabilir.
                </p>
              </section>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  Daha fazla bilgi için: <Link href="/gizlilik-politikasi" className="text-brand-600 font-bold underline">KVKK Aydınlatma Metni</Link>
                </div>
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition shadow-md shadow-brand-600/20"
                >
                  Ana Sayfaya Dön
                </Link>
              </div>

            </div>
          </FadeIn>
        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}
