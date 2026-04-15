import { useState, useCallback } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations } from "@shared/constants/translations";

const STORAGE_KEY = "lawbox-lang";
const VALID_LANGS = ["vi", "en"];

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGS.includes(stored)) return stored;
  } catch {}
  return "vi";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLang);

  const setLanguage = useCallback((lang) => {
    if (!VALID_LANGS.includes(lang)) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const t = useCallback(
    (key) => {
      return translations[language]?.[key] || translations["vi"]?.[key] || key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
