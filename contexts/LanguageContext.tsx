"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import hu from "@/data/hu.json";
import en from "@/data/en.json";

type Language = "hu" | "en";
type Translations = typeof hu | typeof en;

type LanguageContextType = {
  isHydrated: boolean;
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("hu");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const stored = window.sessionStorage.getItem("language");

      if (stored === "hu" || stored === "en") {
        setLanguage(stored);
      }

      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    document.documentElement.lang = language;
    sessionStorage.setItem("language", language);
  }, [language, isHydrated]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const translations: Translations = language === "en" ? en : hu;

  return (
    <LanguageContext.Provider
      value={{
        isHydrated,
        language,
        switchLanguage,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
