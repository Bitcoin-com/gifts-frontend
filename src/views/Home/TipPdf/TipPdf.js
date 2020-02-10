import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import {
  TipsPage,
  Table,
  TipAmount,
  TdText,
  TipsLogo,
  TipLabel,
  CryptoAmount,
  FiatAmount,
} from './styled';
import bchLogo from '../../../../static/images/uploads/bch-logo-2.png';
import tipsLogo from '../../../../static/images/uploads/bitcoin-cash-tips-logo-horizontal-grn.png';

const TipPdf = ({ data }) => (
  <Document>
    <TipsPage size="LETTER">
      <Table>
        <TipsLogo src={tipsLogo} />
        <TipLabel>Tip Amount</TipLabel>
      </Table>
      <TipAmount>
        <CryptoAmount>{data[0].sats / 1e8} BCH</CryptoAmount>
        <FiatAmount>~ 15 USD</FiatAmount>
      </TipAmount>
    </TipsPage>
  </Document>
);

TipPdf.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      addr: PropTypes.string.isRequired,
      wif: PropTypes.string.isRequired,
      sats: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TipPdf;
