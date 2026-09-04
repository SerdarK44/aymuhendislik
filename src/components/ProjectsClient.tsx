"use client";

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

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((prj, i) => {
            const enData = projectsEnMap[prj.slug];
            const title = isEn && enData ? enData.title : prj.title;
            const description = isEn && enData ? enData.description : prj.description;
            const category = isEn && enData ? enData.category : prj.category;

            return (
              <FadeIn key={prj.id} delay={i * 0.08}>
                <Link
                  href={`/projeler/${prj.slug}`}
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={prj.image || "/images/1.png"}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-ink-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/10 font-mono">
                      {category}
                    </div>
                  </div>
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
