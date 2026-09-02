import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getProjects, getProjectBySlug, getServices } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Building, CheckCircle2, Phone, MessageSquare, ArrowLeft, ChevronRight, Wrench, FolderGit2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const settings = getSettings();

  if (!project) {
    return { title: `Proje Bulunamadı | ${settings.companyName}` };
  }

  return buildSeoMetadata({
    title: `${project.title} | ${settings.companyName} Referans Projeleri`,
    description: project.description,
    path: `/projeler/${project.slug}`,
    image: project.image || "/images/1.png",
    keywords: [
      project.title,
      project.category,
      project.location,
      "tamamlanan doğalgaz projesi",
      "Ay Mühendislik referans"
    ]
  });
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const settings = getSettings();
  const services = getServices();
  const allProjects = getProjects();

  if (!project) {
    notFound();
  }

  const otherProjects = allProjects.filter(p => p.slug !== project.slug).slice(0, 3);
  const relatedServices = services.slice(0, 3);

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Referans Projeler", path: "/projeler" },
    { name: project.title, path: `/projeler/${project.slug}` }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb Bar */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <Link href="/projeler" className="hover:text-brand-600 transition-colors">Referans Projeler</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-ink-900 font-bold truncate max-w-xs">{project.title}</span>
          </nav>
        </div>

        {/* Hero Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <FadeIn>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Projelere Dön</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-4 font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{project.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-900 tracking-tight mb-6">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono pt-4 border-t border-stone-200">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <strong className="text-ink-900">{project.location}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Teslim: {project.completionDate}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <Building className="w-3.5 h-3.5 text-stone-400" />
                <span>İşveren: {project.client}</span>
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Content Layout */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Feature Image */}
              <FadeIn delay={0.1}>
                <div className="relative h-80 sm:h-96 lg:h-[450px] w-full rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                  <Image
                    src={project.image || "/images/1.png"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>

              {/* Project Scope & Details */}
              <FadeIn delay={0.15}>
                <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-ink-900">Proje Kapsamı ve Mühendislik Detayı</h2>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  <div className="pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      <span>Resmi Gaz Dağıtım İdaresi Onaylı Kabul</span>
                    </div>
                    <div className="flex items-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      <span>TS 7363 ve Uluslararası Güvenlik Standartları</span>
                    </div>
                    <div className="flex items-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      <span>Basınç Dayanım ve Sızdırmazlık Test Raporları</span>
                    </div>
                    <div className="flex items-center p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      <span>Zamanında ve Eksiksiz Gaz Açım Teslimatı</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Related Engineering Services (Internal Linking) */}
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-3xl border border-stone-200/80 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">Hizmetlerimiz</span>
                      <h3 className="text-lg font-bold text-ink-900 mt-0.5">Bu Projede Kullanılan Hizmetler</h3>
                    </div>
                    <Link href="/hizmetler" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                      Tüm Hizmetler →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.id}
                        href={`/hizmetler/${srv.slug}`}
                        className="p-4 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-200/80 hover:border-brand-300 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-brand-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs text-ink-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                          {srv.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* High-Converting CTA Card */}
              <FadeIn delay={0.2}>
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b141f] to-[#050b12] text-white border border-stone-800 shadow-xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold">
                    <Phone className="w-3.5 h-3.5 text-brand-400" />
                    <span>Benzer Bir Projeniz Mi Var?</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    Tesisiniz İçin Ücretsiz Keşif Alın
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    Alanında uzman mühendislerimiz projenizin teknik analizini yapsın, en ekonomik çözümü sunalım.
                  </p>

                  <div className="space-y-3 pt-2">
                    <a
                      href={`https://wa.me/${settings.whatsapp || "905329998877"}?text=${encodeURIComponent(`Merhaba, "${project.title}" referans projenizi inceledim. Kendi projemiz için ücretsiz keşif ve teklif almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] font-bold text-white text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp&apos;tan Yazın</span>
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

              {/* Other Projects */}
              {otherProjects.length > 0 && (
                <FadeIn delay={0.25}>
                  <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm">
                    <h3 className="text-sm font-bold text-ink-900 uppercase tracking-wider mb-4 font-mono">
                      Diğer Referans Projeler
                    </h3>
                    <div className="space-y-3">
                      {otherProjects.map((p) => (
                        <Link
                          key={p.id}
                          href={`/projeler/${p.slug}`}
                          className="block p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-brand-300 hover:bg-brand-50/50 transition-all group"
                        >
                          <div className="font-bold text-xs text-ink-900 group-hover:text-brand-700 line-clamp-1">{p.title}</div>
                          <div className="text-[11px] text-brand-600 mt-1 font-mono">{p.category} • {p.location}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}
