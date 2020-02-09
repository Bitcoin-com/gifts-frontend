import styled from 'styled-components';
import { Document, Page, View, Text } from '@react-pdf/renderer';

export const Table = styled(View)`
  display: 'table';
  width: 'auto';
  border-color: #000;
  border-width: 1;
`;

export const TdText = styled(Text)`
  color: red !important;
  text-decoration: underline !important;
`;
