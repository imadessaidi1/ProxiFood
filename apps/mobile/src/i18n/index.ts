import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../../../../packages/i18n/locales/fr/common.json';
import en from '../../../../packages/i18n/locales/en/common.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: Localization.getLocales()[0]?.languageCode || 'fr',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
