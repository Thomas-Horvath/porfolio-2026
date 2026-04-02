"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import hu from "@/data/hu.json";
import en from "@/data/en.json";

type Language = "hu" | "en";
type Translations = typeof hu | typeof en;

type LanguageContextType = {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "hu";
    }

    const stored = window.sessionStorage.getItem("language");

    return stored === "hu" || stored === "en" ? stored : "hu";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    sessionStorage.setItem("language", language);
  }, [language]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const translations: Translations = language === "en" ? en : hu;

  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
