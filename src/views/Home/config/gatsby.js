const { appLocales: locales } = require('../../../i18n');
const enMessages = require('../../../data/home/locales/en.json');
const flattenMessages = require('../../../helpers/flattenMessages');

const translationMessages = {
  en: flattenMessages(enMessages, 'home'),
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
          locales: translationMessages,
        },
      });
    });

    resolve();
  });
};
