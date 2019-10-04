const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line

const appLocales = {
  en: {
    path: 'en',
    locale: 'English',
    default: true,
  },
  /*
  ja: {
    path: 'ja',
    locale: '日本語',
  },
  ko: {
    path: 'ko',
    locale: '한국어',
  },
  zh: {
    path: 'zh',
    locale: '中文',
  },
  ru: {
    path: 'ru',
    locale: 'Русский',
  },
  es: {
    path: 'es',
    locale: 'Español',
  },
  fr: {
    path: 'fr',
    locale: 'Français',
  },
  */
};

const localeDataArray = [];

Object.keys(appLocales).forEach(l => {
  const locale = appLocales[l];
  /* eslint-disable import/no-dynamic-require, global-require */
  const localeData = require(`react-intl/locale-data/${locale.path}`);
  localeDataArray.push(...localeData);
});

addLocaleData(localeDataArray);

exports.DEFAULT_LOCALE = 'en';
exports.appLocales = appLocales;
