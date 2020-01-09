const path = require('path');

const { homeBuild } = require('./src/views/Home/config/gatsby');
const { errorBuild } = require('./src/views/404/config/gatsby');

const replacePath = pagePath =>
  pagePath === `/` ? pagePath : pagePath.replace(/\/$/, ``);

exports.onCreatePage = params => {
  const { page, actions } = params;
  const { createPage, deletePage } = actions;

  if (page.path === '/') return homeBuild(params);
  if (page.path === '/subpage/') return homeBuild(params);

  if (page.path === '/404.html') return errorBuild(params);
  if (page.path === '/404/') return errorBuild(params);

  const oldPage = Object.assign({}, page);

  // Remove trailing slash unless page is /
  if (!page.path.includes('.html')) {
    page.path = replacePath(page.path);
  }

  if (
    page.path !== oldPage.path ||
    page.path === '/offline-plugin-app-shell-fallback/'
  ) {
    // Replace new page with old page
    deletePage(oldPage);
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'styled-components': path.resolve('./node_modules/styled-components'),
        'bitbox-sdk': path.resolve('./node_modules/bitbox-sdk'),
      },
    },
  });
};
