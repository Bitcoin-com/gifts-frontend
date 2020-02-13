import styled from '@react-pdf/styled-components';
import { Font, Document, Page, View, Text, Image } from '@react-pdf/renderer';

// Register font
Font.register({
  family: 'Gilroy',
  src: 'https://menu.cdn.bitcoindotcom.net/uni/dist/fonts.css',
  fontStyle: 'normal',
});

export const TipDoc = styled(Document)`
  font-family: 'Gilroy';
`;

export const TipsPage = styled(Page)``;

export const TipsLogo = styled(Image)``;
export const TipsQR = styled(Image)`
  width: 115px;
  height: 115px;
`;

export const TipLabel = styled(Text)`
  color: #0fcb97;
  font-weight: 700;
  font-style: italic;
  text-align: center;
`;
export const TipsWrapper = styled(View)`
  display: inline-block;
`;

export const TipWrapper = styled(View)`
  border: 1px solid black;
  background-color: white;
  height: 3.75in;
  width: 2in;
`;
export const TipHeader = styled(View)`
  margin: 0;
  padding: 10px 10px 0;
  text-align: center;
  > img {
    width: 100%;
  }
`;

export const Table = styled(View)`
  display: 'table';
  align-self: center;
  border-color: #000;
  border-width: 1;
  width: 3.5in;
`;

export const TipAmount = styled(View)`
  margin-top: 0px;
  padding: 6px 0px 4px;
  text-align: center;
  background-color: #0fcb97;
  color: #fff;
`;

export const TdText = styled(Text)``;

export const CryptoAmount = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;
export const FiatAmount = styled(Text)`
  font-size: 25px;
  font-weight: 600;
`;

export const TipExchangeRate = styled(Text)`
  padding: 3px 0px;
  text-align: center;
  background-color: #006531;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
`;
