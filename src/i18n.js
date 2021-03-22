import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
  });

// const resources = {
//   en: {
//     translation: {
//       home: 'Home',
//     },
//   },
//   th: {
//     translation: {
//       home: 'หน้าแรก',
//     },
//   },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: 'en',

//   keySeparator: false,

//   interpolation: {
//     escapeValue: false,
//   },
// });

export default i18n;
