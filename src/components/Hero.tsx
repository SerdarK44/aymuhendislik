"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface HeroProps {
  settings?: SiteSettings;
  onOpenQuote?: () => void;
}

export default function Hero({ settings, onOpenQuote }: HeroProps) {
  return (
    <section className="pt-28 pb-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              EPDK & İGDAŞ Yetkili Mühendislik
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1] tracking-tight">
              Güvenli<br />
              <span className="text-orange-600">Doğalgaz</span><br />
              Mühendisliği
            </h1>

            <p className="text-lg text-stone-500 leading-relaxed max-w-md">
              Fabrikalar, siteler ve konutlar için onaylı projelendirme ve anahtar teslim doğalgaz taahhüt hizmetleri.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Ücretsiz Keşif Al
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-semibold px-6 py-3 rounded-xl border border-stone-200 transition-colors"
              >
                Projelerimiz
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-stone-200">
              <div>
                <div className="text-2xl font-bold text-stone-900">{settings?.yearsExperience || 16}+</div>
                <div className="text-xs text-stone-500 mt-0.5">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-stone-900">{settings?.completedProjects || 1450}+</div>
                <div className="text-xs text-stone-500 mt-0.5">Tamamlanan Proje</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">%100</div>
                <div className="text-xs text-stone-500 mt-0.5">Gaz Açma Onayı</div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-xl">
              <Image
                src="/images/1.png"
                alt="Ay Mühendislik Endüstriyel Tesisat"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-stone-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-900">EPDK Yetkili</div>
                <div className="text-xs text-stone-500">İGDAŞ Onaylı Firma</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}