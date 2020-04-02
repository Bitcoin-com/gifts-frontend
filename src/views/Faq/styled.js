import styled from 'styled-components';
import {
  H1,
  Link,
  Section,
  Accordion,
} from '@bitcoin-portal/bitcoincom-pkg-components';
import { colors } from '@bitcoin-portal/bitcoincom-pkg-theme';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.background.contrast};
`;
export const HeadSection = styled.div`
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export const FaqSection = styled(Section)`
  background-color: ${colors.solid.zircon};
`;
export const FaqAccordion = styled(Accordion)`
  padding: 12px;
  font-size: 24px;
  line-height: 48px;
  & > div {
    font-weight: bold;
    background-color: ${colors.solid.zirconDarkest};
    color: ${colors.solid.vulcan};
    padding: 24px;
  }
  & > div > div {
    background-color: white;
    color: black;
    border-radius: 3px;
  }
  & > div > div > div {
    padding: 0 12px;
  }
  & > div > div > div > span > a {
    color: ${colors.solid.caribbeanGreen};
  }
`;

export const FaqTitle = styled(H1)``;

export const FaqLink = styled(Link)`
  padding-top: 24px;
`;
