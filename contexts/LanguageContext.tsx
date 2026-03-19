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
  const [language, setLanguage] = useState<Language>("hu");
  const [translations, setTranslations] = useState<Translations>(hu);

  useEffect(() => {
    const stored = localStorage.getItem("language");

    if (stored === "hu" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    if (language === "en") {
     setTranslations(en); 
    } else {
      setTranslations(hu);
    }

    localStorage.setItem("language", language);
  }, [language]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

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