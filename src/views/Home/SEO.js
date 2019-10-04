import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

const SEO = ({ intl }) => (
  <Helmet title={intl.formatMessage({ id: 'home.meta.title' })}>
    <meta
      name="description"
      content={intl.formatMessage({
        id: 'home.meta.description',
      })}
    />
    <meta
      property="og:title"
      content={intl.formatMessage({ id: 'home.meta.title' })}
    />
    <meta
      property="og:description"
      content={intl.formatMessage({
        id: 'home.meta.description',
      })}
    />
    <meta
      property="og:image"
      content={`https://www.bitcoin.com${intl.messages['home.meta.image']}`}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:site"
      content={`@${intl.formatMessage({ id: 'home.meta.twitter' })}`}
    />
    <meta
      name="twitter:title"
      content={intl.formatMessage({ id: 'home.meta.title' })}
    />
    <meta
      name="twitter:description"
      content={intl.formatMessage({
        id: 'home.meta.description',
      })}
    />
    <meta
      name="twitter:image"
      content={`https://www.bitcoin.com${intl.messages['home.meta.image']}`}
    />
    <link rel="canonical" href="https://www.bitcoin.com/" />
  </Helmet>
);

SEO.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
    messages: PropTypes.object,
  }).isRequired,
};

export default injectIntl(SEO);
