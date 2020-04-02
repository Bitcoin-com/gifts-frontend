import styled from 'styled-components';
import { media } from '@bitcoin-portal/bitcoincom-pkg-theme';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const Content = styled.div`
  padding: 0 16px;
  ${media.md`
    padding: 0;
  `}
`;
