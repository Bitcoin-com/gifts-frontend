import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

const SEO = ({ intl }) => (
  <Helmet title={intl.formatMessage({ id: '404.meta.title' })}>
    <meta
      name="description"
      content={intl.formatMessage({
        id: '404.meta.description',
      })}
    />
    <meta
      property="og:title"
      content={intl.formatMessage({ id: '404.meta.title' })}
    />
    <meta
      property="og:description"
      content={intl.formatMessage({
        id: '404.meta.description',
      })}
    />
    <meta
      property="og:image"
      content={`https://www.bitcoin.com${intl.formatMessage({
        id: '404.meta.image',
      })}`}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:site"
      content={`@${intl.formatMessage({ id: '404.meta.twitter' })}`}
    />
    <meta
      name="twitter:title"
      content={intl.formatMessage({ id: '404.meta.title' })}
    />
    <meta
      name="twitter:description"
      content={intl.formatMessage({
        id: '404.meta.description',
      })}
    />
    <meta
      name="twitter:image"
      content={`https://www.bitcoin.com${intl.formatMessage({
        id: '404.meta.image',
      })}`}
    />
    <link rel="canonical" href="https://www.bitcoin.com/404/" />
  </Helmet>
);

SEO.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(SEO);
