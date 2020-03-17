import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { IntlProvider } from 'react-intl';
import Layout from '../components/Layout';
import Faq from '../views/Faq';
import { DEFAULT_LOCALE } from '../i18n';

const FaqPage = ({ pageContext, location }) => {
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
        <Faq locale={pageContext.locale} />
      </Layout>
    </IntlProvider>
  );
};

FaqPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string,
    locales: PropTypes.shape({
      [PropTypes.string]: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FaqPage;
