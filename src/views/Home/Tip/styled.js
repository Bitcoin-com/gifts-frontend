import styled from 'styled-components';
import { theme, media, Paragraph } from 'bitcoincom-storybook';

export const TipWrapper = styled.div`
  position: relative;
  border: 1px solid black;
  background-color: white;
  height: 3.04in;
  width: 2in;
  align-self: center;
  justify-self: center;

  @media print {
    display: inline-block;
    height: auto;
    page-break-inside: avoid !important;
  }
`;
export const StatusWrap = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  border-top: 1px solid black;

  background-color: ${({ funded = false }) =>
    funded === true ? '#0fcb97;' : 'none'};
`;
export const ClaimedBlock = styled.div`
  height: 175px;
  width: 145px;
`;
export const ClaimedSpan = styled.div`
  padding: 65px 20px;
  height: 145px;
`;
export const TipLabel = styled.div`
  color: #0fcb97;
  font-weight: 700;
  font-style: italic;
`;
export const ScanLabel = styled.div`
  color: #0fcb97;
  font-weight: 700;
  font-style: italic;
  font-size: 15px;
`;
export const TipAmount = styled.div`
  margin-top: 0px;
  padding: 6px 0px 4px;
  text-align: center;
  background-color: #0fcb97;
  color: #fff;
`;
export const TipHeader = styled.div`
  margin: 0;
  padding: 10px 10px 0;
  text-align: center;
  > img {
    width: 100%;
  }
`;
export const CryptoAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export const FiatAmount = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

export const Content = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.unit * 8}px;
  margin-top: ${theme.spacing.unit * 8}px;
  z-index: 2;

  ${media.md`
    margin-bottom: unset;
    margin-top: 0;
    text-align: left;
  `}
`;
export const TipExchangeRate = styled.div`
  padding: 3px 0px;
  text-align: center;
  background-color: #006531;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
`;

export const Text = styled(Paragraph)`
  margin-top: ${theme.spacing.unit * 2}px;
  margin-bottom: ${theme.spacing.unit * 4}px;

  ${media.md`
    margin-top: ${theme.spacing.unit * 3}px;
  `}
`;
