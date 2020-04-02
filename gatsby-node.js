const path = require('path');

const { appLocales } = require('./src/i18n');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const newPage = page;

  deletePage(page);

  Object.keys(appLocales).forEach(locale => {
    newPage.context = { locale };
    newPage.path = appLocales[locale].default
      ? page.path
      : appLocales[locale].path + page.path;

    createPage(newPage);
  });
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'styled-components': path.resolve('./node_modules/styled-components'),
      },
    },
  });

  const webpackConfig = getConfig();
  delete webpackConfig.resolve.alias['core-js'];

  webpackConfig.resolve.modules = [
    path.resolve(__dirname, 'node_modules/gatsby/node_modules'), // for Gatsby's core-js@2
    'node_modules', // your modules w/ core-js@3
  ];

  actions.replaceWebpackConfig(webpackConfig);
};
