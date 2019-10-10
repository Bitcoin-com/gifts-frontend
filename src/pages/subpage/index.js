import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import merge from 'lodash/merge';
import Layout from '../../components/Layout';
import Home from '../../views/Home';
import { DEFAULT_LOCALE } from '../../i18n';

const IndexPage = ({ pageContext, location }) => {
  const messages = merge(
    {},
    pageContext.locales[DEFAULT_LOCALE],
    pageContext.locales[pageContext.locale],
  );
  return (
    <IntlProvider
      locale={pageContext.locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
    >
      <Layout location={location}>
        <Home locale={pageContext.locale} />
      </Layout>
    </IntlProvider>
  );
};

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string,
    locales: PropTypes.shape({
      [PropTypes.string]: PropTypes.string,
    }),
    settings: PropTypes.object,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default IndexPage;
