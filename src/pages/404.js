import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Error from '../views/404';

const ErrorPage = props => {
  const {
    pageContext,
    location: { pathname },
  } = props;
  const { locale } = pageContext;
  return (
    <Layout locale={locale} localeDir={pathname}>
      <Error locale={locale} />
    </Layout>
  );
};

ErrorPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default ErrorPage;
