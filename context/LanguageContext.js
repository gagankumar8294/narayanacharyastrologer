// context/LanguageContext.js
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("kannada"); // Default language is Kannada

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("preferred_lang");
      if (savedLang && ["kannada", "telugu", "hindi", "english"].includes(savedLang)) {
        setLanguage(savedLang);
        if (typeof document !== "undefined") {
          document.documentElement.lang = savedLang === 'kannada' ? 'kn' : savedLang === 'telugu' ? 'te' : savedLang === 'hindi' ? 'hi' : 'en';
        }
      }
    } catch (e) {
      // localStorage unavailable or SSR
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem("preferred_lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang === 'kannada' ? 'kn' : lang === 'telugu' ? 'te' : lang === 'hindi' ? 'hi' : 'en';
      }
    } catch (e) {}
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

