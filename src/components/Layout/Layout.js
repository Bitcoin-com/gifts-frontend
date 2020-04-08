import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Footer } from '@bitcoin-portal/bitcoincom-universal';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import themes from '@bitcoin-portal/bitcoincom-pkg-theme';
import Intl from '../../i18n/hoc';

const GlobalStyle = createGlobalStyle`
 html {
    scroll-behavior: smooth;
  }

  html,
  body,
  ___gatsby,
  ___gatsby > div {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.palette.text.default};
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: auto;

    font-size: 16px;
    background-color: ${({ theme }) => theme.palette.background.default};

  }

  #gatsby-focus-wrapper {
    overflow: hidden;
  }

  a {
    display: inline-block;
    color: ${({ theme }) => theme.palette.text.link || ''};
    letter-spacing: 0;
    font-weight: 600;
    text-decoration: none;
  }

`;

const Layout = props => {
  const { localeDir, children, locale, showNav } = props;

  const providerTheme = themes.light;

  return (
    <Intl locale={locale} localeDir={localeDir}>
      {showNav && <Nav locale={locale} />}
      <ThemeProvider theme={providerTheme}>
        {/* <SEO /> */}
        <GlobalStyle />

        {children}
      </ThemeProvider>
      {showNav && <Footer locale={locale} />}
    </Intl>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
  showNav: PropTypes.bool,
  localeDir: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  showNav: false,
};

export default Layout;
