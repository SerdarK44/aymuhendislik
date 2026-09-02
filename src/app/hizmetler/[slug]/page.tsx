import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getServices, getServiceBySlug, getProjects } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, CheckCircle2, ArrowRight, Phone, MessageSquare, ChevronRight, FolderGit2, ArrowLeft, Wrench } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const settings = getSettings();

  if (!service) {
    return { title: `Hizmet Bulunamadı | ${settings.companyName}` };
  }

  return buildSeoMetadata({
    title: `${service.title} | ${settings.companyName}`,
    description: service.shortDesc,
    path: `/hizmetler/${service.slug}`,
    image: service.image || "/images/1.png",
    keywords: [
      service.title,
      "doğalgaz projesi",
      "yetkili mühendislik",
      "İGDAŞ onaylı",
      "EPDK lisanslı",
      "Ay Mühendislik"
    ]
  });
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const settings = getSettings();
  const allServices = getServices();
  const allProjects = getProjects();

  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects.slice(0, 3);
  const otherServices = allServices.filter(s => s.slug !== service.slug).slice(0, 4);

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hizmetlerimiz", path: "/hizmetler" },
    { name: service.title, path: `/hizmetler/${service.slug}` }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={serviceJsonLd(service)} />
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb Bar */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <Link href="/hizmetler" className="hover:text-brand-600 transition-colors">Hizmetlerimiz</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-ink-900 font-bold truncate max-w-xs">{service.title}</span>
          </nav>
        </div>

        {/* Hero Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <FadeIn>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Hizmetlerimize Dön</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold mb-4 font-mono">
              <Wrench className="w-3.5 h-3.5 text-brand-600" />
              <span>Yetkili Doğalgaz Mühendislik Çözümü</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
              {service.shortDesc}
            </p>
          </FadeIn>
        </div>

        {/* Content Layout */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Feature Image */}
              <FadeIn delay={0.1}>
                <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                  <Image
                    src={service.image || "/images/1.png"}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>

              {/* Service Description Card */}
              <FadeIn delay={0.15}>
                <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-ink-900">Mühendislik Süreci ve Kapsam</h2>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  <div className="pt-6 border-t border-stone-100">
                    <h3 className="text-base font-bold text-ink-900 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-brand-600" />
                      <span>Bu Hizmette Sağlanan Standartlar ve Güvenceler</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feat, index) => (
                        <div key={index} className="flex items-start p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Related Reference Projects (Cross Linking) */}
              {relatedProjects.length > 0 && (
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-3xl border border-stone-200/80 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">Referanslarımız</span>
                        <h3 className="text-lg font-bold text-ink-900 mt-0.5">Tamamladığımız Benzer Projeler</h3>
                      </div>
                      <Link href="/projeler" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                        Tüm Projeler →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedProjects.map((prj) => (
                        <Link
                          key={prj.id}
                          href={`/projeler/${prj.slug}`}
                          className="group flex flex-col rounded-2xl bg-stone-50 border border-stone-200/80 overflow-hidden hover:border-brand-300 hover:shadow-sm transition-all"
                        >
                          <div className="relative h-32 w-full bg-stone-100 overflow-hidden">
                            <Image
                              src={prj.image || "/images/1.png"}
                              alt={prj.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 250px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3.5">
                            <div className="text-[10px] text-brand-600 font-bold font-mono">{prj.category}</div>
                            <h4 className="font-bold text-xs text-ink-900 group-hover:text-brand-700 line-clamp-1 mt-0.5">
                              {prj.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* High-Converting Contact Card */}
              <FadeIn delay={0.2}>
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b141f] to-[#050b12] text-white border border-stone-800 shadow-xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold">
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <span>Hızlı Keşif & Fiyat Teklifi</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    Bu Hizmet İçin Ücretsiz Keşif İsteyin
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    Mühendislerimiz tesisinizi yerinde inceleyerek mevzuata uygun en verimli doğalgaz projenizi planlasın.
                  </p>

                  <div className="space-y-3 pt-2">
                    <a
                      href={`https://wa.me/${settings.whatsapp || "905329998877"}?text=${encodeURIComponent(`Merhaba, "${service.title}" hizmetiniz hakkında ücretsiz keşif ve teklif almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] font-bold text-white text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp&apos;tan Hızlı Teklif Al</span>
                    </a>

                    <a
                      href={`tel:${(settings.phone || "02164567890").replace(/\s+/g, "")}`}
                      className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-white text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{settings.phone || "0 (216) 456 78 90"}</span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Other Services Navigation */}
              <FadeIn delay={0.25}>
                <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm">
                  <h3 className="text-sm font-bold text-ink-900 uppercase tracking-wider mb-4 font-mono">
                    Diğer Hizmetlerimiz
                  </h3>
                  <div className="space-y-2">
                    {allServices.map((s) => (
                      <Link
                        key={s.id}
                        href={`/hizmetler/${s.slug}`}
                        className={`block p-3 rounded-xl text-xs font-semibold transition ${
                          s.slug === service.slug
                            ? "bg-brand-600 text-white shadow-sm"
                            : "text-stone-600 hover:bg-stone-50 hover:text-ink-900"
                        }`}
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} services={allServices} />
    </div>
  );
}
