/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require('react');

const Iframe = (
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  <iframe
    key="iframe"
    src="https://www.googletagmanager.com/ns.html?id=GTM-5N6TL56"
    height="0"
    width="0"
    style={{ display: 'none', visibility: 'hidden' }}
  />
);
const noScript = <noscript key="none">{Iframe}</noscript>;

const gtmTag = (
  <script
    key="gtm"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l] = w[l] || []; w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5N6TL56');`,
    }}
  />
);

// array of pathnames to exclude gtm tracking scripts
const excludes = [];

exports.onPreRenderHTML = props => {
  const {
    getHeadComponents,
    replaceHeadComponents,
    getPreBodyComponents,
    replacePreBodyComponents,
    pathname,
  } = props;

  // set crossorigin credentials
  const headComponents = getHeadComponents().reduce((prev, curr) => {
    if (curr.type === 'link' && curr.props && curr.props.rel === 'preconnect') {
      return [
        ...prev,
        { ...curr, props: { ...curr.props, crossOrigin: 'anonymous' } },
      ];
    }

    return [...prev, curr];
  }, []);

  if (!excludes.includes(pathname)) headComponents.push(gtmTag);

  replaceHeadComponents(headComponents);

  const preBodyComponents = getPreBodyComponents();
  if (!excludes.includes(pathname)) preBodyComponents.push(noScript);

  replacePreBodyComponents(preBodyComponents);
};
