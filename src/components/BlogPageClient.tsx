"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen, FileText, Tag } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { BlogPost } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { t, isEn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: isEn ? "All Guides" : "Tüm Rehberler" },
    ...Array.from(new Set(posts.map((p) => p.category || (isEn ? "General" : "Genel"))))
      .filter(Boolean)
      .map((cat) => ({ id: cat, label: cat }))
  ];

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((p) => (p.category || (isEn ? "General" : "Genel")) === selectedCategory);

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold font-mono mb-3">
              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
              <span>{t("pages.blogBadge")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">
              {t("pages.blogTitle")}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              {t("pages.blogSubtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Category Filter Tabs */}
        {categories.length > 2 && (
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => {
                const count = cat.id === "all"
                  ? posts.length
                  : posts.filter((p) => (p.category || (isEn ? "General" : "Genel")) === cat.id).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-brand-600 text-white shadow-md shadow-brand-600/20 scale-105"
                        : "bg-white text-stone-600 border border-stone-200 hover:border-brand-300 hover:bg-stone-50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm font-medium">Bu kategoride henüz yazı bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => {
              const hasImage = Boolean(post.coverImage && post.coverImage.trim().length > 0);
              const postCategory = post.category || (isEn ? "General" : "Genel");

              return (
                <FadeIn key={post.id} delay={i * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md hover:border-brand-300 transition-all relative"
                  >
                    {hasImage ? (
                      /* With Image Card */
                      <>
                        <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                          <Image
                            src={post.coverImage!}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 bg-ink-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/10 font-mono">
                            {postCategory}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 text-xs text-stone-500 font-mono mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-brand-600" />
                                <span>{post.publishDate}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>{post.readTime}</span>
                              </span>
                            </div>

                            <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
                              {post.title}
                            </h2>
                            <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                              <span>{isEn ? "Read Article" : "Yazıyı Oku"}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {isEn ? "Engineering Guide" : "Teknik Rehber"}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Text-Only Card (Resimsiz Yazı) */
                      <div className="p-7 flex-1 flex flex-col justify-between border-t-4 border-brand-500">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[11px] font-bold font-mono">
                              <FileText className="w-3 h-3 text-brand-600" />
                              <span>{postCategory}</span>
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </span>
                          </div>

                          <h2 className="text-xl font-black text-ink-900 group-hover:text-brand-600 transition-colors mb-3 leading-snug">
                            {post.title}
                          </h2>
                          <p className="text-sm text-stone-600 line-clamp-4 leading-relaxed mb-5">
                            {post.excerpt}
                          </p>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                            <span>{isEn ? "Read Article" : "Yazıyı Oku"}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span>{post.publishDate}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

