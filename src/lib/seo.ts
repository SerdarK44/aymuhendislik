import type { Metadata } from "next";

export const SITE_URL = "https://aymuhendislik.com.tr";
export const SITE_NAME = "Ay Mühendislik";
export const DEFAULT_OG_IMAGE = "/images/1.png";
export const LAST_SITE_UPDATE = "2026-08-30T00:00:00+03:00";

export const DEFAULT_KEYWORDS = [
  "doğalgaz projesi",
  "doğalgaz tesisatı",
  "endüstriyel doğalgaz tesisatı",
  "doğalgaz projelendirme İstanbul",
  "İGDAŞ yetkili firma",
  "EPDK yetkili mühendislik",
  "RMS istasyonu kurulumu",
  "kaskad kazan dairesi",
  "radyant ısıtma sistemleri",
  "gaz açma uygunluk belgesi",
  "fabrika doğalgaz dönüşümü",
  "Ay Mühendislik",
  "Tekstilkent doğalgaz mühendislik"
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

export function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value = "", maxLength = 160) {
  const clean = stripHtml(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

export function buildSeoMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  type = "website",
  publishedTime,
  authors,
}: MetadataInput): Metadata {
  const imageUrl = absoluteUrl(image);
  const authorNames = authors?.length ? authors : [SITE_NAME];

  const openGraph =
    type === "article"
      ? {
          type: "article" as const,
          title,
          description: truncateText(description, 180),
          url: absoluteUrl(path),
          siteName: SITE_NAME,
          locale: "tr_TR",
          publishedTime,
          authors: authorNames,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }
      : {
          type: "website" as const,
          title,
          description: truncateText(description, 180),
          url: absoluteUrl(path),
          siteName: SITE_NAME,
          locale: "tr_TR",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        };

  return {
    title,
    description: truncateText(description, 180),
    keywords,
    authors: authorNames.map((name) => ({ name })),
    alternates: {
      canonical: path,
      languages: {
        "tr-TR": path,
        "x-default": path,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description: truncateText(description, 180),
      images: [imageUrl],
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function localBusinessJsonLd(settings?: any) {
  const phone = settings?.phone || "0 (216) 456 78 90";
  const email = settings?.email || "info@aymuhendislik.com.tr";
  const address = settings?.address || "Tekstilkent Ticaret Merkezi G1 Blok No: 9 Esenler / İstanbul";

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "GeneralContractor"],
    "@id": `${SITE_URL}/#organization`,
    name: "Ay Mühendislik",
    alternateName: "Ay Mühendislik Doğalgaz & Mekanik Tesisat",
    description: "EPDK ve İGDAŞ yetkili makine mühendisliği firması. Tüm Türkiye genelinde endüstriyel tesisat, RMS istasyonları, kaskad kazan ve onaylı doğalgaz projelendirme.",
    url: SITE_URL,
    logo: absoluteUrl("/logo/logo_tam.png"),
    image: absoluteUrl("/images/1.png"),
    telephone: phone.replace(/\s+/g, ""),
    email: email,
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Nakit, Banka Havalesi, Kredi Kartı",
    areaServed: [
      { "@type": "Country", name: "Türkiye" },
      { "@type": "City", name: "İstanbul" },
      { "@type": "AdministrativeArea", name: "Marmara Bölgesi" }
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Esenler",
      addressRegion: "İstanbul",
      postalCode: "34235",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.065914,
      longitude: 28.868953,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "19:00",
      },
    ],
    sameAs: [
      settings?.facebookUrl || "https://facebook.com/aymuhendislik",
      settings?.instagramUrl || "https://instagram.com/aymuhendislik",
      settings?.linkedinUrl || "https://linkedin.com/company/aymuhendislik",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Doğalgaz ve Mekanik Mühendislik Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Endüstriyel Doğalgaz Tesisatı & RMS İstasyonu",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CAD Doğalgaz Proje Çizimi & İGDAŞ Onayı",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Merkezi Isıtma & Kaskad Kazan Dairesi",
          },
        },
      ],
    },
  };
}

export function serviceJsonLd(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDesc || service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Ay Mühendislik",
      url: SITE_URL,
    },
    serviceType: "Doğalgaz & Mekanik Mühendislik",
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features?.map((feat: string) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feat,
        },
      })) || [],
    },
  };
}

export function articleJsonLd(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage || "/images/2.png"),
    datePublished: post.publishDate || "2026-08-28",
    dateModified: post.publishDate || "2026-08-28",
    author: {
      "@type": "Person",
      name: post.author || "Makine Müh. Serdar Ay",
      jobTitle: "Yetkili Makine Mühendisi",
    },
    publisher: {
      "@type": "Organization",
      name: "Ay Mühendislik",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo/logo_tam.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
