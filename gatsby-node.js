const path = require('path');
/*
const sitemap = require('sitemap');
const fs = require('fs-extra');
const { defaultOptions, runQuery } = require('./src/helpers/sitemaps');
const subdomains = require('./subdomains.json');

const publicPath = '/public';
*/

const { onCreatePage: homeBuild } = require('./src/views/Home/config/gatsby');

exports.onCreatePage = params => {
  const { page, actions } = params;
  const { deletePage } = actions;

  if (page.path === '/') return homeBuild(params);

  return new Promise(resolve => {
    deletePage(page);
    resolve();
  });
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  if (process.env.NODE_ENV === 'production') {
    config.output = {
      ...config.output,
      publicPath: `/lxiv/`,
    };

    actions.replaceWebpackConfig(config);
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        'styled-components': path.resolve('./node_modules/styled-components'),
      },
    },
  });
};

/*
const createSitemap = async ({
  graphql,
  pathPrefix,
  basePath = pathPrefix,
}) => {
  const { query, serialize, exclude } = {
    ...defaultOptions,
  };

  // Paths we're excluding...
  const excludeOptions = exclude.concat(defaultOptions.exclude);
  const queryRecords = await runQuery(graphql, query, excludeOptions, basePath);

  await subdomains.forEach(async sub => {
    const saved = path.join(
      __dirname,
      publicPath,
      sub.subdomain === 'www' ? '' : sub.path,
      '/sitemap.xml',
    );
    const hostname = `https://${sub.subdomain}.bitcoin.com`;
    const excludes =
      sub.subdomain === 'www'
        ? subdomains.reduce((p, c) => {
          if (c.path === '/') return p;
          return [...p, c.path];
        }, [])
        : [];

    const subExcludes = sub.excludes || [];
    const urls = serialize(queryRecords, hostname, sub.path, [
      ...excludes,
      ...subExcludes,
    ]);

    const map = await sitemap.createSitemap({
      hostname,
      cacheTime: 600000,
      urls,
    });

    fs.writeFileSync(saved, map.toString());
    console.log('Sitemap Written for', hostname);
  });
};

const copyRobots = () => {
  console.log('Copying robotx.txt to subdomains');

  subdomains.forEach(sub => {
    const robots = path.join(__dirname, publicPath, '/robots.txt');
    const subPath = path.join(__dirname, publicPath, sub.path, '/robots.txt');
    if (sub.subdomain !== 'www') {
      fs.copySync(robots, subPath);
      if (sub.excludes) {
        sub.excludes.forEach(exclude => {
          fs.appendFileSync(
            subPath,
            `\r\nDisallow: ${exclude.substr(sub.path.length)}`,
          );
        });
      }
      console.log(subPath, 'created');
    }
  });
};

exports.onPostBuild = props => {
  console.log('Creating Sitemaps');
  return new Promise(async resolve => {
    await createSitemap(props);
    await copyRobots();
    resolve();
  });
};
*/
