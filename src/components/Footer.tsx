import Link from "next/link";
import { Flame, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { SiteSettings, ServiceItem } from "@/lib/types";

interface FooterServiceLink {
  id: string;
  slug: string;
  title: string;
}

const DEFAULT_FOOTER_SERVICES: FooterServiceLink[] = [
  {
    id: "srv-1",
    slug: "endustriyel-dogalgaz-tesisati",
    title: "Endüstriyel Doğalgaz Tesisatı & RMS"
  },
  {
    id: "srv-2",
    slug: "dogalgaz-projelendirme-ve-onay",
    title: "Doğalgaz Proje Çizimi & İGDAŞ Onayı"
  },
  {
    id: "srv-3",
    slug: "merkezi-isitma-ve-kaskad-kazan-sistemleri",
    title: "Merkezi Isıtma & Kaskad Kazan"
  },
  {
    id: "srv-4",
    slug: "bireysel-kombi-ve-kalorifer-tesisati",
    title: "Bireysel Kombi & Kalorifer Tesisatı"
  },
  {
    id: "srv-5",
    slug: "radyant-isitma-sistemleri",
    title: "Radyant Fabrika & Kafe Isıtma"
  },
  {
    id: "srv-6",
    slug: "mekanik-tesisat-yangin-ve-havalandirma",
    title: "Mekanik Tesisat & Yangın Hatları"
  }
];

export default function Footer({ settings, services }: { settings?: SiteSettings; services?: ServiceItem[] }) {
  const year = new Date().getFullYear();
  const phone = settings?.phone || "0 (216) 456 78 90";
  const email = settings?.email || "info@aymuhendislik.com.tr";
  const address = settings?.address || "Tekstilkent Ticaret Merkezi G1 Blok No: 9 Esenler / İstanbul";

  const displayServices: FooterServiceLink[] = (services && services.length > 0) ? services : DEFAULT_FOOTER_SERVICES;

  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="inline-block scale-110 sm:scale-120 origin-left mb-3 shrink-0">
              <img 
                src="/logo/logo_tam.png" 
                alt="Ay Mühendislik" 
                className="h-20 sm:h-26 w-auto max-w-none shrink-0 object-contain brightness-0 invert opacity-95 transition-all"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ink-300">
              EPDK ve Gaz Dağıtım Yetkili Mühendislik Firması. Tüm Türkiye genelinde büyük sanayi tesislerinden konutlara anahtar teslim doğalgaz mühendisliği.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {settings?.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all text-ink-400" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all text-ink-400" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {settings?.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all text-ink-400" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              <a href={"https://wa.me/" + (settings?.whatsapp || "905329998877")} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ink-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-ink-400" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest mb-5">Hizmetlerimiz</h4>
            <div className="space-y-3">
              {displayServices.slice(0, 6).map(srv => (
                <Link key={srv.id} href={`/hizmetler/${srv.slug}`} className="block text-sm hover:text-white transition-colors text-ink-300">
                  {srv.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest mb-5">Kurumsal & Yasal</h4>
            <div className="space-y-3">
              <Link href="/hakkimizda" className="block text-sm hover:text-white transition-colors text-ink-300">Hakkımızda</Link>
              <Link href="/projeler" className="block text-sm hover:text-white transition-colors text-ink-300">Referanslarımız</Link>
              <Link href="/blog" className="block text-sm hover:text-white transition-colors text-ink-300">Doğalgaz Rehberi</Link>
              <Link href="/iletisim" className="block text-sm hover:text-white transition-colors text-ink-300">İletişim</Link>
              <Link href="/gizlilik-politikasi" className="block text-sm hover:text-white transition-colors text-ink-300">Gizlilik & KVKK</Link>
              <Link href="/sartlar-ve-kosullar" className="block text-sm hover:text-white transition-colors text-ink-300">Şartlar & Koşullar</Link>
              <Link href="/cerez-politikasi" className="block text-sm hover:text-white transition-colors text-ink-300">Çerez Politikası</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest mb-5">İletişim</h4>
            <div className="space-y-4 text-ink-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-sm">{address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-sm hover:text-white transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={`mailto:${email}`} className="text-sm hover:text-white transition-colors">{email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between text-xs text-ink-400 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <p>© {year} Ay Mühendislik. Tüm hakları saklıdır.</p>
            <span className="hidden md:inline">•</span>
            <p className="text-brand-400 font-semibold">EPDK & İGDAŞ Yetkili Mühendislik Firması</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik-politikasi" className="hover:text-ink-200 transition-colors">KVKK</Link>
            <Link href="/sartlar-ve-kosullar" className="hover:text-ink-200 transition-colors">Şartlar</Link>
            <Link href="/cerez-politikasi" className="hover:text-ink-200 transition-colors">Çerezler</Link>
            <Link href="/admin" className="hover:text-ink-200 transition-colors">Yönetici Girişi</Link>
          </div>
        </div>
      </div>
      
      <FloatingWhatsApp phone={settings?.whatsapp || "905329998877"} />
    </footer>
  );
}