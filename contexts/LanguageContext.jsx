import React, { createContext, useState, useEffect } from 'react';
import hu from '../data/hu.json';
import en from '../data/en.json';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const storedLanguage = localStorage.getItem('language') || 'hu';
    const [language, setLanguage] = useState(storedLanguage);
    const [translations, setTranslations] = useState(hu);

    useEffect(() => {
        document.documentElement.lang = language;
        switch (language) {
            case 'en':
                setTranslations(en);
                break;
            case 'hu':
            default:
                setTranslations(hu);
                break;
        }

        // Mentjük a választott nyelvet a localStorage-ba
        localStorage.setItem('language', language);
    }, [language]);

    const switchLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};
