const minimatch = require('minimatch');
const fs = require('fs');
const pify = require('pify');

const withoutTrailingSlash = path =>
  path === `/` ? path : path.replace(/\/$/, ``);

const writeFile = pify(fs.writeFile);
const renameFile = pify(fs.rename);

const runQuery = (handler, query, excludes, pathPrefix) =>
  handler(query).then(q => {
    if (q.errors) {
      throw new Error(q.errors.join(`, `));
    }
    const r = q;
    // Removing excluded paths
    r.data.allSitePage.edges = r.data.allSitePage.edges.filter(
      page =>
        !excludes.some(excludedRoute =>
          minimatch(withoutTrailingSlash(page.node.path), excludedRoute),
        ),
    );

    // Add path prefix
    r.data.allSitePage.edges = r.data.allSitePage.edges.map(pageProp => {
      const page = pageProp;
      page.node.path = (pathPrefix + page.node.path).replace(/^\/\//g, `/`);
      return page;
    });

    /* if (!r.data.site.siteMetadata.siteUrl) {
      throw new Error(
        `SiteMetaData 'siteUrl' property is required. Check out the documentation to see a working example: https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#how-to-use`,
      );
    }

    // remove trailing slash of siteUrl
    r.data.site.siteMetadata.siteUrl = withoutTrailingSlash(
      r.data.site.siteMetadata.siteUrl,
    ); */

    return r.data;
  });

const defaultOptions = {
  query: `
    {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
  }`,
  output: `/sitemap.xml`,
  exclude: [
    `/dev-404-page`,
    `/404`,
    `/404.html`,
    `/offline-plugin-app-shell-fallback`,
    `/mining/workers/apiviewer`,
    `/thank-you`,
  ],
  serialize: ({ allSitePage }, hostname, path, excludes) => {
    return allSitePage.edges.reduce((prev, edge) => {
      if (edge.node.path.startsWith(path)) {
        if (path === '/') {
          let isExcluded = false;
          excludes.forEach(ex => {
            if (edge.node.path.startsWith(ex)) isExcluded = true;
          });
          if (isExcluded) return prev;
        }
        const newPath =
          path === '/' ? edge.node.path : edge.node.path.substr(path.length);
        return [
          ...prev,
          {
            url: `${hostname}${newPath}`,
            changefreq: `daily`,
            priority: 0.7,
          },
        ];
      }
      return prev;
    }, []);
  },
};

module.exports = { writeFile, renameFile, runQuery, defaultOptions };
