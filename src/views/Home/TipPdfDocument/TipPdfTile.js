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
  tipWallet,

  fiatAmount,
  fiatCurrency,
  dateStr,
}) => (
  <TipWrapper>
    <TipHeader>
      <TipsLogo src={tipsLogo} />
    </TipHeader>
    <TipLabel>Tip Amount</TipLabel>
    <TipAmount>
      <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
      <FiatAmount>
        ~ {fiatAmount} {fiatCurrency}
      </FiatAmount>
    </TipAmount>
    <TipExchangeRate>
      1 BCH ~ {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)} {fiatCurrency}{' '}
      on {dateStr}
    </TipExchangeRate>
    <TipLabel>{tipWallet.test}</TipLabel>
    <TipsQR src={tipWallet.qrCodeImg} />
  </TipWrapper>
);

TipPdfTile.propTypes = {
  tipWallet: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    wif: PropTypes.string.isRequired,
    qrCodeImg: PropTypes.string.isRequired,
    test: PropTypes.string.isRequired,
    sats: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,

  fiatAmount: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
  dateStr: PropTypes.string.isRequired,
};

export default TipPdfTile;
