import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Home from '../../views/Home';

const SubPage = props => {
  const {
    pageContext,
    location: { pathname },
  } = props;
  const { locale } = pageContext;
  return (
    <Layout locale={locale} localeDir={pathname}>
      <Home locale={locale} />
    </Layout>
  );
};

SubPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default SubPage;
