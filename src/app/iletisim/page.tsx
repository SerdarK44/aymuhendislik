import { Metadata } from "next";
import { getSettings, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Navigation, Clock, Link as LinkIcon, Share2, Headphones } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildSeoMetadata({
    title: `İletişim & Ücretsiz Keşif | ${settings.companyName}`,
    description: "Ay Mühendislik iletişim bilgileri, adres, telefon, acil servis hattı ve ücretsiz yerinde keşif formu.",
    path: "/iletisim",
    image: "/images/1.png",
    keywords: [
      "Ay Mühendislik iletişim",
      "doğalgaz keşif randevusu",
      "Tekstilkent mühendislik adres",
      "doğalgaz acil telefon"
    ]
  });
}

export const revalidate = 60;

export default function ContactPage() {
  const settings = getSettings();
  const services = getServices();
  
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.1485648834927!2d28.868952739077227!3d41.06591419472658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAzJzU3LjMiTiAyOMKwNTInMTAuNiJF!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str";
  const directionsUrl = settings.googleMapsUrl || "https://maps.app.goo.gl/bpbn5Dzx6ezDK5mD9";

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "İletişim", path: "/iletisim" }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={localBusinessJsonLd(settings)} />
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
                <Headphones className="w-3.5 h-3.5 text-brand-600" />
                <span>7/24 Kesintisiz Destek</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">Bize Ulaşın</h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                Projeleriniz, ücretsiz keşif talepleriniz veya acil teknik destek için mühendislik ekibimiz hizmetinizdedir.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Contact Form */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm h-full">
                <h2 className="text-2xl font-bold text-ink-900 mb-2">Mesaj Gönderin & Teklif İsteyin</h2>
                <p className="text-xs sm:text-sm text-stone-500 mb-8">Yetkili makine mühendislerimiz en kısa sürede size geri dönüş yapacaktır.</p>
                <ContactForm whatsapp={settings.whatsapp} />
              </div>
            </FadeIn>

            {/* Contact Info & Socials */}
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
                  <h2 className="text-2xl font-bold text-ink-900 mb-8">İletişim Bilgileri</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-900 text-sm mb-1">Merkez Ofis & Proje Birimi</h3>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-3">{settings.address}</p>
                        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">
                          <Navigation className="w-3.5 h-3.5" /> Yol Tarifi Al (Google Maps)
                        </a>
                      </div>
                    </div>

                    <div className="w-full h-px bg-stone-100" />

                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-900 text-sm mb-1">Telefon & Santral</h3>
                        <a href={`tel:${(settings.phone || "").replace(/[^\d+]/g, "")}`} className="block text-stone-600 text-xs sm:text-sm hover:text-brand-600 transition-colors mb-1 font-semibold">{settings.phone}</a>
                        {settings.emergencyPhone && (
                          <a href={`tel:${settings.emergencyPhone.replace(/[^\d+]/g, "")}`} className="block text-brand-600 text-xs font-bold hover:text-brand-700 transition-colors">
                            7/24 Acil & Keşif: {settings.emergencyPhone}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="w-full h-px bg-stone-100" />

                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0 text-brand-600 border border-brand-200/60">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-ink-900 text-sm mb-1">Kurumsal E-Posta</h3>
                        <a href={`mailto:${settings.email}`} className="text-stone-600 text-xs sm:text-sm hover:text-brand-600 transition-colors">{settings.email}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
             {/* Google Maps Embed */}
             <FadeIn delay={0.3} className="h-full min-h-[320px] sm:min-h-[400px]">
              <div className="bg-white rounded-3xl p-2 border border-stone-200/80 shadow-sm h-full w-full relative overflow-hidden group">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl w-full h-full min-h-[300px] grayscale-[0.2] contrast-[1.05] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                ></iframe>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-center h-full">
                  <div className="flex items-center gap-3 mb-4 text-ink-900">
                    <Clock className="w-5 h-5 text-brand-600" />
                    <h3 className="font-bold text-sm">Çalışma Saatleri</h3>
                  </div>
                  <div className="text-xs text-stone-600 space-y-3">
                    <div className="flex justify-between"><span>Pzt - Cmt:</span> <span className="font-bold text-ink-900">08:30 - 19:00</span></div>
                    <div className="flex justify-between"><span>Pazar:</span> <span className="font-bold text-ink-900">Nöbetçi Ekip</span></div>
                    <div className="flex justify-between text-brand-600 font-bold pt-3 border-t border-stone-100 mt-2">
                      <span>Acil Müdahale:</span> <span>7/24 Kesintisiz</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-center h-full text-center">
                  <h3 className="font-bold text-ink-900 text-sm mb-4">Sosyal Medyada Biz</h3>
                  <div className="flex justify-center gap-4">
                    <a href={settings.instagramUrl || "https://instagram.com/aymuhendislik"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-600 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all transform hover:scale-110" aria-label="Instagram">
                      <Share2 className="w-5 h-5" />
                    </a>
                    <a href={settings.facebookUrl || "https://facebook.com/aymuhendislik"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all transform hover:scale-110" aria-label="Facebook">
                      <LinkIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}