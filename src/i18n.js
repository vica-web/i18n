import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

// Plugins are registered before initialization because each one owns a specific task:
// loading JSON files, detecting the user's language, and connecting i18next to React.
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    // The backend loads files from /public/locales/{language}/translation.json.
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Reuse a saved choice first, then fall back to the browser language.
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      // React already escapes rendered values, so double escaping is unnecessary.
      escapeValue: false,
    },
    debug: import.meta.env.DEV,
  })

export default i18n
