import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Faq from '../views/Faq';

const FaqPage = props => {
  const {
    pageContext,
    location: { pathname },
  } = props;
  const { locale } = pageContext;
  return (
    <Layout locale={locale} localeDir={pathname}>
      <Faq locale={locale} />
    </Layout>
  );
};

FaqPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default FaqPage;
