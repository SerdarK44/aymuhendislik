import { SiteSettings, ServiceItem, BlogPost } from "@/lib/types";
import { FAQ_DATA } from "@/components/FaqSection";

interface JsonLdProps {
  settings: SiteSettings;
  services?: ServiceItem[];
  blogPosts?: BlogPost[];
}

export default function JsonLd({ settings, services = [] }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HVACBusiness", "ProfessionalService", "Organization"],
        "@id": "https://aymuhendislik.com.tr/#organization",
        "name": settings.companyName || "Ay Mühendislik Doğalgaz & Mekanik Tesisat",
        "alternateName": "Ay Mühendislik Endüstriyel Doğalgaz Projelendirme",
        "url": "https://aymuhendislik.com.tr",
        "logo": "https://aymuhendislik.com.tr/logo/logo_tam.png",
        "image": "https://aymuhendislik.com.tr/images/1.png",
        "description": settings.heroSubtitle || "Yetkili Makine Mühendisleri ile endüstriyel doğalgaz dönüşümü, RMS istasyonları, CAD projelendirme ve kaskad kazan sistemleri anahtar teslim taahhüt hizmetleri.",
        "telephone": settings.phone || "0 (216) 456 78 90",
        "email": settings.email || "info@aymuhendislik.com.tr",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tekstilkent Ticaret Merkezi G1 Blok No: 9",
          "addressLocality": "Esenler",
          "addressRegion": "İstanbul",
          "postalCode": "34235",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 41.0664,
          "longitude": 28.8732
        },
        "areaServed": [
          { "@type": "Country", "name": "Türkiye" },
          { "@type": "AdministrativeArea", "name": "Tüm Türkiye (81 İl Taahhüt & Mühendislik Hizmeti)" },
          { "@type": "City", "name": "İstanbul" },
          { "@type": "City", "name": "Kocaeli" },
          { "@type": "City", "name": "Tekirdağ" },
          { "@type": "City", "name": "Bursa" },
          { "@type": "City", "name": "Ankara" },
          { "@type": "City", "name": "İzmir" },
          { "@type": "Place", "name": "Tekstilkent Ticaret Merkezi Esenler" },
          { "@type": "Place", "name": "İkitelli Organize Sanayi Bölgesi (İOSB)" },
          { "@type": "Place", "name": "Hadımköy Sanayi Bölgesi" },
          { "@type": "Place", "name": "Çerkezköy Organize Sanayi Bölgesi" },
          { "@type": "Place", "name": "Tuzla Deri Organize Sanayi Bölgesi" },
          { "@type": "Place", "name": "Gebze Organize Sanayi Bölgesi (GOSB)" },
          { "@type": "Place", "name": "Dudullu OSB" },
          { "@type": "Place", "name": "İMES Sanayi Sitesi" },
          { "@type": "Place", "name": "Dilovası İMES OSB" }
        ],
        "knowsAbout": [
          "Endüstriyel Doğalgaz Tesisatı",
          "Doğalgaz Proje Çizimi ve İGDAŞ Onayı",
          "RMS-B ve RMS-C Basınç Düşürme İstasyonu",
          "Merkezi Isıtma ve Yoğuşmalı Kaskad Kazan Dairesi",
          "Radyant Fabrika Isıtma Sistemleri",
          "Gaz Kaçak Algılama ve Ex-Proof Selenoid Vana Sistemleri",
          "Radyografik Çelik Boru Kaynak Testi",
          "Bireysel Kombi Montajı ve Gaz Açma"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "license",
            "name": "EPDK Doğalgaz İç Tesisat & Dönüşüm Yetki Belgesi"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "license",
            "name": "İGDAŞ Yetkili Mühendislik Firması Sertifikası (Yetki No: 34-10492)"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "membership",
            "name": "TMMOB Makina Mühendisleri Odası Tescil Belgesi"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:30",
            "closes": "19:00"
          }
        ],
        "sameAs": [
          settings.facebookUrl || "https://facebook.com/aymuhendislik",
          settings.instagramUrl || "https://instagram.com/aymuhendislik",
          settings.linkedinUrl || "https://linkedin.com/company/aymuhendislik"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Doğalgaz ve Mekanik Tesisat Mühendislik Hizmetleri",
          "itemListElement": services.map((s, idx) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": s.title,
              "description": s.shortDesc
            }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://aymuhendislik.com.tr/#faq",
        "mainEntity": FAQ_DATA.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
