import i18next from 'i18next';
import frCommon from '../locales/fr/common.json';
import enCommon from '../locales/en/common.json';

export const resources = {
  fr: { common: frCommon },
  en: { common: enCommon },
};

export const initI18n = () =>
  i18next.init({
    lng: 'fr',
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  });
