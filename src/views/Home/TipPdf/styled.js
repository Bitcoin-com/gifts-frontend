import styled from '@react-pdf/styled-components';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';

export const TipsPage = styled(Page)``;

export const TipsLogo = styled(Image)`
  margin: 0;
  padding: 10px 10px 0;
  text-align: center;
  width: 100%;
`;

export const TipLabel = styled(Text)`
  color: #0fcb97;
  font-weight: 700;
  font-style: italic;
`;

export const Table = styled(View)`
  display: 'table';
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
