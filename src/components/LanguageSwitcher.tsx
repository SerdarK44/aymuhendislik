"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile" | "compact";
  isDarkText?: boolean;
}

export default function LanguageSwitcher({ variant = "desktop", isDarkText = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-2 rounded-2xl bg-stone-100 border border-stone-200/80">
        <div className="flex items-center gap-2 pl-2 text-xs font-bold text-stone-600">
          <Globe className="w-4 h-4 text-brand-600" />
          <span>Dil Seçimi / Language</span>
        </div>
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs border border-stone-200/60">
          <button
            type="button"
            onClick={() => setLocale("tr")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              locale === "tr"
                ? "bg-brand-600 text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            🇹🇷 Türkçe
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              locale === "en"
                ? "bg-brand-600 text-white shadow-xs"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    );
  }

  // Desktop Pill Switcher
  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl border transition-all text-xs font-bold ${
        isDarkText
          ? "bg-stone-100/90 border-stone-200/80 text-stone-700"
          : "bg-white/10 backdrop-blur-md border-white/20 text-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setLocale("tr")}
        aria-label="Türkçe"
        className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
          locale === "tr"
            ? isDarkText
              ? "bg-white text-ink-900 shadow-xs"
              : "bg-white text-ink-900 shadow-xs"
            : isDarkText
            ? "text-stone-500 hover:text-stone-900"
            : "text-white/75 hover:text-white"
        }`}
      >
        <span>TR</span>
      </button>

      <span className={`px-0.5 text-[10px] ${isDarkText ? "text-stone-300" : "text-white/40"}`}>|</span>

      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label="English"
        className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
          locale === "en"
            ? isDarkText
              ? "bg-white text-ink-900 shadow-xs"
              : "bg-white text-ink-900 shadow-xs"
            : isDarkText
            ? "text-stone-500 hover:text-stone-900"
            : "text-white/75 hover:text-white"
        }`}
      >
        <span>EN</span>
      </button>
    </div>
  );
}
