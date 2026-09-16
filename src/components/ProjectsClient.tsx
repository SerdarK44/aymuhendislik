"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, FolderGit2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { ProjectItem, SiteSettings } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { projectsEnMap } from "@/lib/i18n/contentTranslations";

export default function ProjectsClient({
  projects,
  settings,
}: {
  projects: ProjectItem[];
  settings: SiteSettings;
}) {
  const { t, isEn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: isEn ? "All Projects" : "Tüm Projeler" },
    ...Array.from(new Set(projects.map((p) => p.category)))
      .filter(Boolean)
      .map((cat) => ({ id: cat, label: cat }))
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {(settings.completedProjects ? settings.completedProjects.toLocaleString(isEn ? "en-US" : "tr-TR") : "1,450")}+{" "}
                {isEn ? "Completed Turnkey Projects" : "Başarılı Proje Teslimi"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mb-4">
              {t("pages.projectsTitle")}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              {t("pages.projectsSubtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Category Filter Tabs */}
        {categories.length > 2 && (
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => {
                const count = cat.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105"
                        : "bg-white text-stone-600 border border-stone-200 hover:border-emerald-300 hover:bg-stone-50"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((prj, i) => {
            const enData = projectsEnMap[prj.slug];
            const title = isEn && enData ? enData.title : prj.title;
            const description = isEn && enData ? enData.description : prj.description;
            const category = isEn && enData ? enData.category : prj.category;
            const hasImage = Boolean(prj.image && prj.image.trim().length > 0);

            return (
              <FadeIn key={prj.id} delay={i * 0.08}>
                <Link
                  href={`/projeler/${prj.slug}`}
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
                >
                  {hasImage ? (
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={prj.image!}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-ink-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/10 font-mono">
                        {category}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-white border-b border-emerald-100 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                        {category}
                      </span>
                      <FolderGit2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-ink-900 group-hover:text-emerald-700 transition-colors mb-2">
                        {title}
                      </h2>
                      <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-600" />
                        <span>{prj.location}</span>
                      </span>
                      <span>
                        {isEn ? "Handover: " : "Teslim: "}
                        {prj.completionDate}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
