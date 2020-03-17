module.exports = {
  siteMetadata: {
    title: `Bitcoin.com Gifts`,
    siteUrl: 'https://gifts.bitcoin.com',
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
        icon: `static/images/favicon.png`,
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
    `gatsby-plugin-sitemap`,
    { resolve: `gatsby-plugin-styled-components` },

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
          'https://accounts.google.com',
          'https://www.google-analytics.com',
          'https://ajax.googleapis.com',
          'https://coin-api.bitcoin.com',
          'https://api.pulse.btctest.net',
          'https://www.bitcoin.com',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        htmlTitle: `Bitcoin.com | Content Manager`,
        htmlFavicon: `${__dirname}/static/icons/icon-512x512.png`,
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Gilroy:n4,n6,n7'],
          urls: [
            'https://menu.cdn.bitcoindotcom.net/uni/dist/fonts.css',
            '/fonts/fonts.css',
          ],
        },
      },
    },
  ],
};
