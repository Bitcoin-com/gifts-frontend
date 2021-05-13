import styled from 'styled-components';
import H1 from '@bitcoin-portal/bitcoincom-pkg-components/dist/H1';
import Link from '@bitcoin-portal/bitcoincom-pkg-components/dist/LinkV2';
import Section from '@bitcoin-portal/bitcoincom-pkg-components/dist/Paragraph';
import Accordion from '@bitcoin-portal/bitcoincom-pkg-components/dist/Accordion';
import { colors } from '@bitcoin-portal/bitcoincom-pkg-theme';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const FaqAccordion = styled(Accordion)`
  padding: 12px;
  font-size: 24px;
  line-height: 48px;
  border-radius: 24px;
  & > div {
    font-weight: bold;
    color: ${colors.solid.vulcan};
    padding: 24px;
  }
  & > div > div {
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
