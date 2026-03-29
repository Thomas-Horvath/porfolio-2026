"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import hu from "@/data/hu.json";
import en from "@/data/en.json";
import Loading from "@/app/loading"

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("language");

    if (stored === "hu" || stored === "en") {
      setLanguage(stored);
    }
    setTimeout(() => {

      setIsReady(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.lang = language;

    if (language === "en") {
      setTranslations(en);
    } else {
      setTranslations(hu);
    }

    sessionStorage.setItem("language", language);
  }, [language, isReady]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };


  //TODO: add loading state while translations are being set (for better UX on initial load)
  if (!isReady) {
    return (
      <Loading />
    );
  }

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