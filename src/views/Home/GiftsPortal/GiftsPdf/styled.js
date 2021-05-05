import styled from '@react-pdf/styled-components';
import { Document, Page, View, Image } from '@react-pdf/renderer';

export const GiftsDoc = styled(Document)``;
export const TopSpace = styled(View)`
  height: 0.5cm;
`;

export const Gift = styled(Image)`
  display: inline-block;
  width: 3.4cm;
`;
export const GiftWrapper = styled(View)`
  display: inline-block;
  border: 3px solid #000;
`;
export const GiftsRow = styled(View)`
  margin-top: 0.5cm;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const GiftsPage = styled(Page)`
  padding: 0.5cm 1cm;
`;
