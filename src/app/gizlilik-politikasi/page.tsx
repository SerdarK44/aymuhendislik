import { Metadata } from "next";
import Link from "next/link";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, FileText, ArrowLeft, Building2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Gizlilik Politikası ve KVKK Aydınlatma Metni | Ay Mühendislik",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca kişisel verilerinizin işlenmesi ve korunmasına dair aydınlatma metni.",
};

export const revalidate = 60;

export default function PrivacyPolicyPage() {
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

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>6698 Sayılı KVKK Uyumlu Resmi Aydınlatma Metni</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-4">
                Gizlilik Politikası ve KVKK Aydınlatma Metni
              </h1>
              <p className="text-xs text-stone-500 font-mono">
                Son Güncelleme: 29 Ağustos 2026 | Veri Sorumlusu: Ay Mühendislik Doğalgaz Taahhüt Ltd. Şti.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-stone-700 leading-relaxed text-sm sm:text-base">
              
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  1. Veri Sorumlusunun Kimliği
                </h2>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, <strong>Ay Mühendislik</strong> (&quot;Şirket&quot;) olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun şekilde işleyebilecek, kaydedebilecek, saklayabilecek ve güncelleyebilecektir.
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1 font-mono text-stone-600">
                  <div><strong>Veri Sorumlusu:</strong> Ay Mühendislik</div>
                  <div><strong>Adres:</strong> {settings.address}</div>
                  <div><strong>E-posta:</strong> {settings.email}</div>
                  <div><strong>Telefon:</strong> {settings.phone}</div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  2. İşlenen Kişisel Veriler ve Toplanma Amaçları
                </h2>
                <p>
                  Web sitemizdeki iletişim formları, teklif/keşif talep formları ve çağrı merkezi üzerinden toplanan kişisel verileriniz (Ad, Soyad, Telefon Numarası, E-posta Adresi, İl/İlçe ve Proje Detayları):
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
                  <li>Doğalgaz projelendirme, tesisat keşfi ve fiyat tekliflerinin hazırlanması,</li>
                  <li>EPDK ve İGDAŞ yetkili doğalgaz proje onay süreçlerinin yürütülmesi,</li>
                  <li>Müşteri iletişim taleplerine hızlı dönüş sağlanması ve acil müdahale organizasyonu,</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  3. Kişisel Verilerin Aktarılması
                </h2>
                <p>
                  Kişisel verileriniz, doğalgaz proje onay ve gaz açım sözleşmelerinin zorunlu kıldığı ölçüde yalnızca <strong>EPDK (Enerji Piyasası Düzenleme Kurumu)</strong>, ilgili <strong>Bölgesel Gaz Dağıtım Şirketleri (örn. İGDAŞ vb.)</strong> ve kanunen yetkili resmi kamu kurum ve kuruluşları ile paylaşılmakta olup üçüncü şahıslara ticari amaçla asla satılmaz veya aktarılmaz.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  4. KVKK Madde 11 Kapsamındaki Haklarınız
                </h2>
                <p>KVKK uyarınca şirketimize başvurarak kendinizle ilgili;</p>
                <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
                  <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                  <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahipsiniz.</li>
                </ul>
              </section>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  Sorularınız ve talepleriniz için: <a href={`mailto:${settings.email}`} className="text-brand-600 font-bold">{settings.email}</a>
                </div>
                <Link
                  href="/iletisim"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition shadow-md shadow-brand-600/20"
                >
                  İletişime Geçin
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
