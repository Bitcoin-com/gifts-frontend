import styled from 'styled-components';
import { theme, ContentBlock, Image, media } from 'bitcoincom-storybook';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const HeadSection = styled.div`
  background-color: ${theme.palette.background.dark};
`;

export const CustomContentBlock = styled(ContentBlock)`
  & > div > div:first-child > img {
    max-height: 300px;
  }

  & h1 {
    ${theme.palette.p3green.text};
  }

  ${media.md`
    & > div {
      justify-content: space-between;
    }

    & > div > div {
      max-width: 46%;
    }

    & > div > div:first-child > img {
      max-height: 400px;
    }
  `};
`;

export const Logo = styled(Image)`
  width: 100%;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;
