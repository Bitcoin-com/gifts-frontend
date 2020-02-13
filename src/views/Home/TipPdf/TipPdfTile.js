import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import {
  TipDoc,
  TipsPage,
  TipWrapper,
  TipHeader,
  Table,
  TipAmount,
  TdText,
  TipsLogo,
  TipsQR,
  TipLabel,
  CryptoAmount,
  FiatAmount,
  TipExchangeRate,
} from './styled';
import bchLogo from '../../../../static/images/uploads/bch-logo-2.png';
import tipsLogo from '../../../../static/images/uploads/bitcoin-cash-tips-logo-horizontal-grn.png';

const TipPdfTile = ({
  tipWallets,
  qrCodeImgs,
  fiatAmount,
  fiatCurrency,
  dateStr,
}) => (
  <TipDoc>
    <TipsPage size="LETTER">
      <TipWrapper>
        <TipHeader>
          <TipsLogo src={tipsLogo} />
        </TipHeader>
        <TipLabel>Tip Amount</TipLabel>
        <TipAmount>
          <CryptoAmount>{tipWallets[0].sats / 1e8} BCH</CryptoAmount>
          <FiatAmount>~ {fiatAmount} USD</FiatAmount>
        </TipAmount>
        <TipExchangeRate>
          1 BCH ~ {(fiatAmount / (tipWallets[0].sats / 1e8)).toFixed(0)}{' '}
          {fiatCurrency} on {dateStr}
        </TipExchangeRate>
        <TipLabel>Scan to claim</TipLabel>
        <TipsQR src={qrCodeImgs[0]} />
      </TipWrapper>
    </TipsPage>
  </TipDoc>
);

TipPdfTile.propTypes = {
  tipWallets: PropTypes.arrayOf(
    PropTypes.shape({
      addr: PropTypes.string.isRequired,
      wif: PropTypes.string.isRequired,
      sats: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  qrCodeImgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  fiatAmount: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
  dateStr: PropTypes.string.isRequired,
};

export default TipPdfTile;
