import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "lactus-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "pt";
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "pt" || requestedLanguage === "en") return requestedLanguage;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "pt";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
    document.title = language === "pt"
      ? "Lactus — Energia sustentável para comunidades"
      : "Lactus — Sustainable energy for communities";
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
