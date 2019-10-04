import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyle } from './styled';
import SEO from './SEO';

export const LocationContext = React.createContext();

const Layout = ({ children, location }) => (
  <React.Fragment>
    <SEO />
    <GlobalStyle />
    <LocationContext.Provider value={location}>
      <React.Fragment>{children}</React.Fragment>
    </LocationContext.Provider>
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Layout;
