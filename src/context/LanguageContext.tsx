"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations, Translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string) => string;
  isEn: boolean;
  isTr: boolean;
  dictionary: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = "ay_lang";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale = "tr" }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Read from cookie or localStorage on initial client mount
    const savedCookie = getCookie(COOKIE_NAME);
    const savedLocal = typeof window !== "undefined" ? localStorage.getItem(COOKIE_NAME) : null;
    const detected = (savedCookie || savedLocal) as Locale;
    if (detected === "en" || detected === "tr") {
      setLocaleState(detected);
      document.documentElement.lang = detected;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(COOKIE_NAME, newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_NAME, newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "tr" ? "en" : "tr");
  };

  // Helper to safely navigate nested object keys with dot notation
  // e.g., t("nav.services") or t("modal.title")
  const t = (path: string): string => {
    const dict = translations[locale] || translations.tr;
    const parts = path.split(".");
    let current: any = dict;

    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to Turkish if key missing in current locale
        let fallback: any = translations.tr;
        for (const fbPart of parts) {
          if (fallback && typeof fallback === "object" && fbPart in fallback) {
            fallback = fallback[fbPart];
          } else {
            return path; // return key if not found
          }
        }
        return typeof fallback === "string" ? fallback : path;
      }
    }

    return typeof current === "string" ? current : path;
  };

  const isEn = locale === "en";
  const isTr = locale === "tr";
  const dictionary = translations[locale] || translations.tr;

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        isEn,
        isTr,
        dictionary
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
