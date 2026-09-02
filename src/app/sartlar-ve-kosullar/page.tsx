import { Metadata } from "next";
import Link from "next/link";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle2, ArrowLeft, Shield } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Şartlar ve Koşullar | Ay Mühendislik",
  description: "Ay Mühendislik web sitesi kullanım koşulları ve doğalgaz taahhüt mühendislik hizmet standartları.",
};

export const revalidate = 60;

export default function TermsPage() {
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

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold mb-4">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Hizmet ve Kullanım Koşulları</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-4">
                Kullanım Şartları ve Hizmet Koşulları
              </h1>
              <p className="text-xs text-stone-500 font-mono">
                Son Güncelleme: 29 Ağustos 2026 | Lisans No: {settings.licenseNo}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
              
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  1. Genel Hükümler ve Web Sitesi Kullanımı
                </h2>
                <p>
                  Bu web sitesini (<strong>aymuhendislik.com.tr</strong>) ziyaret ederek ve sitede yer alan formları doldurarak, aşağıda belirtilen kullanım şartlarını ve gizlilik esaslarını peşinen kabul etmiş sayılırsınız. Sitede yer alan tüm teknik makaleler, hesaplama araçları ve proje rehberleri bilgilendirme amaçlıdır.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  2. Mühendislik Standartları ve Yasal Yetkiler
                </h2>
                <p>
                  <strong>Ay Mühendislik</strong>, Enerji Piyasası Düzenleme Kurumu (EPDK) ve yetkili gaz dağıtım kuruluşları (İGDAŞ vb.) tarafından sertifikalandırılmış resmi makine mühendisliği ve doğalgaz taahhüt firmasıdır.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-stone-700">
                      <strong>TSE & EPDK Uygunluğu:</strong> Tüm projeler TS 7363 ve ulusal yangın yönetmeliklerine %100 uygun çizilir.
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-stone-700">
                      <strong>Gaz Açım Garantisi:</strong> Taahhüdü tamamlanan tüm tesisatlar gaz dağıtım idaresi tarafından onaylanıp gaz açımı yapılana kadar firmamız güvencesindedir.
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  3. Teklif ve Keşif Koşulları
                </h2>
                <p>
                  Web sitesi üzerindeki teklif formu veya çağrı merkezi aracılığıyla talep edilen ücretsiz keşifler, uzman mühendislerimizin yerinde incelemesi neticesinde kesin maliyet ve proje planına bağlanır. Yerinde keşif yapılmadan verilen yaklaşık fiyatlar nihai sözleşme niteliği taşımaz.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  4. Fikri Mülkiyet Hakları
                </h2>
                <p>
                  Sitede yer alan tüm marka logoları, CAD çizim görselleri, makaleler, hesaplama araçları ve yazılımlar Ay Mühendislik&apos;e aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
                </p>
              </section>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  Resmi Yetki Belge No: <strong className="text-ink-900">{settings.licenseNo}</strong>
                </div>
                <Link
                  href="/projeler"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition shadow-md shadow-brand-600/20"
                >
                  Referans Projelerimizi İnceleyin
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
