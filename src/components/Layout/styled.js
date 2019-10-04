import { createGlobalStyle } from 'styled-components';
import { theme } from 'bitcoincom-storybook';

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  html,
  body,
  ___gatsby,
  ___gatsby > div {
    font-family: ${theme.typography.fontFamily}, sans-serif;
    margin: 0;
    padding: 0;
    color: ${theme.palette.text.primary};
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background-color: ${theme.palette.background.light};
    @media screen and (min-width: ${theme.breakpoints.md}px) {
      font-size: 20px;
    }
  }

  a {
    display: inline-block;
    color: ${theme.palette.text.link};
    letter-spacing: 0;
    font-weight: 600;
    text-decoration: none;
  }
`;
