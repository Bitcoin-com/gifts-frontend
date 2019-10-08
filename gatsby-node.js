const path = require('path');
const { onCreatePage: homeBuild } = require('./src/views/Home/config/gatsby');
const { onCreatePage: errorBuild } = require('./src/views/404/config/gatsby');

exports.onCreatePage = params => {
  const { page, actions } = params;
  const { deletePage } = actions;

  if (page.path === '/') return homeBuild(params);

  if (page.path === '/offline-plugin-app-shell-fallback/')
    return new Promise(resolve => resolve());
  if (page.path === '/404/') return errorBuild(params);
  if (page.path === '/404.html') return errorBuild(params);

  return new Promise(resolve => {
    deletePage(page);
    resolve();
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'styled-components': path.resolve('./node_modules/styled-components'),
      },
    },
  });
};
