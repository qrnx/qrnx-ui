import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Импортируем JSON-файлы с переводами
import en from "./public/locales/en/translation.json";
import ru from "./public/locales/ru/translation.json";

// Определяем тип ресурсов (для поддержки автодополнения)
export const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React уже экранирует HTML
  },
});

export default i18n;
