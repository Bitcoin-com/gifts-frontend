module.exports = {
  siteMetadata: {
    title: `Bitcoin.com Homepage`,
    siteUrl: 'https://www.bitcoin.com',
  },
  plugins: [
    { resolve: `gatsby-plugin-react-helmet` },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bitcoin.com`,
        short_name: `Bitcoin.com`,
        start_url: `/`,
        display: `fullscreen`,
        background_color: `#fdfdfd`,
        theme_color: `#111724`,
        icon: `src/assets/images/favicon-2.png`,
        icons: [
          {
            src: 'icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        navigateFallbackWhitelist: [],
      },
    },
    { resolve: `gatsby-plugin-styled-components` },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https:///trackcmp.net',
          'https://s3.amazonaws.com',
          'https://api.opmnstr.com',
          'https://integration.test-simplexcc.com',
          'https://accounts.google.com',
          'https://www.google-analytics.com',
          'https://ajax.googleapis.com',
          'https://coin-api.bitcoin.com',
          'https://api.pulse.btctest.net',
          'https://www.bitcoin.com',
          'https://static.doubleclick.net',
          'https://www.youtube.com',
          'https://www.google.com',
          'https://news.bitcoin.com',
          'https://charts.bitcoin.com',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        htmlTitle: `Bitcoin.com | Content Manager`,
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Gilroy:n4,n6,n7'],
          // should probably use the CDN here to load fonts but was getting cors errors locally
          urls: ['/fonts/fonts.css'],
        },
      },
    },
  ],
};
