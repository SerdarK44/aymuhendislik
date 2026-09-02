import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getBlogPostBySlug, getBlogPosts, getServices, getProjects } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowLeft, Phone, Share2, ChevronRight, Wrench, FolderGit2, CheckCircle2, MessageSquare } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import StructuredData from "@/components/StructuredData";
import { buildSeoMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const settings = getSettings();

  if (!post) {
    return { title: `Yazı Bulunamadı | ${settings.companyName}` };
  }

  return buildSeoMetadata({
    title: `${post.title} | ${settings.companyName} Mühendislik Rehberi`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage || "/images/2.png",
    type: "article",
    publishedTime: post.publishDate,
    authors: [post.author || "Ay Mühendislik"],
    keywords: post.tags || ["doğalgaz rehberi", "doğalgaz projesi"]
  });
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const settings = getSettings();
  const services = getServices();
  const allProjects = getProjects();
  const allPosts = getBlogPosts();

  if (!post) {
    notFound();
  }

  const otherPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  const relatedServices = services.slice(0, 3);
  const relatedProjects = allProjects.slice(0, 2);

  const breadcrumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Mühendislik Rehberi", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` }
  ];

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />
      <StructuredData data={articleJsonLd(post)} />
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-24">
        {/* Breadcrumb Bar */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <Link href="/blog" className="hover:text-brand-600 transition-colors">Mühendislik Rehberi</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-ink-900 font-bold truncate max-w-xs">{post.title}</span>
          </nav>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Rehber ve Makalelere Dön</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-900 leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono pt-4 border-t border-stone-200">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <User className="w-3.5 h-3.5 text-brand-600" />
                <strong className="text-ink-900">{post.author}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{post.publishDate}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <FadeIn delay={0.1}>
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100">
              <Image
                src={post.coverImage || "/images/2.png"}
                alt={post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>

        {/* Article Body & Internal Linking */}
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm">
              <div
                className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-stone-100 flex flex-wrap gap-2">
                {post.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-xs font-semibold text-brand-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Contextual Internal Linking (İlgili Mühendislik Hizmetlerimiz) */}
          <FadeIn delay={0.25}>
            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">Site İçi Bağlantılar</span>
                  <h2 className="text-xl font-bold text-ink-900 mt-1">İlgili Mühendislik Çözümlerimiz</h2>
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
                    className="p-5 rounded-2xl bg-stone-50 hover:bg-brand-50 border border-stone-200/80 hover:border-brand-300 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-ink-900 group-hover:text-brand-700 transition-colors mb-1">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2">{srv.shortDesc}</p>
                    </div>
                    <div className="text-[11px] font-bold text-brand-600 mt-4 flex items-center gap-1">
                      <span>İncele</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* High-Converting CTA Banner */}
          <FadeIn delay={0.3}>
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0b141f] to-[#050b12] text-white border border-stone-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Ücretsiz Keşif & Yasal Proje Danışmanlığı</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Doğalgaz Projeniz İçin Uzman Mühendislerimizle Görüşün
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
                    EPDK ve İGDAŞ yetkili mühendislik kadromuz yerinde inceleme yaparak en ekonomik ve güvenli tesisat projenizi hazırlar.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${settings.whatsapp || "905329998877"}?text=${encodeURIComponent(`Merhaba, "${post.title}" makalenizi okudum. Doğalgaz projemiz için ücretsiz keşif ve teklif almak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp&apos;tan Yazın</span>
                  </a>
                  <a
                    href={`tel:${(settings.phone || "02164567890").replace(/\s+/g, "")}`}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{settings.phone || "0 (216) 456 78 90"}</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Related Articles Carousel/Grid */}
          {otherPosts.length > 0 && (
            <FadeIn delay={0.35}>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
                  <span>Diğer Mühendislik Rehberi Yazıları</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative h-40 w-full bg-stone-100 overflow-hidden">
                        <Image
                          src={p.coverImage || "/images/2.png"}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-stone-400">{p.publishDate}</span>
                          <h4 className="font-bold text-sm text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2 mt-1 mb-2">
                            {p.title}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-2">{p.excerpt}</p>
                        </div>
                        <span className="text-xs font-bold text-brand-600 mt-4 flex items-center gap-1">
                          <span>Devamını Oku</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

        </div>
      </main>

      <Footer settings={settings} services={services} />
    </div>
  );
}
