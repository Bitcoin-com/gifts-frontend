import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { TipsPage, TipDoc } from './styled';
import TipPdf from '../TipPdf';

function TipPdfDocument(props) {
  const { tipWallets, qrCodeImgs, fiatAmount, fiatCurrency, dateStr } = props;
  const pdfTips = [];
  const modTipWallets = tipWallets;
  for (let i = 0; i < modTipWallets.length; i++) {
    modTipWallets[i].qrCodeImg = qrCodeImgs[i];
  }
  console.log(modTipWallets);
  modTipWallets.forEach(modTipWallet => {
    pdfTips.push(
      <TipPdf
        tipWallet={modTipWallet}
        fiatAmount={fiatAmount}
        fiatCurrency={fiatCurrency}
        dateStr={dateStr}
      />,
    );
  });
  return (
    <TipPdf
      tipWallets={tipWallets}
      qrCodeImgs={qrCodeImgs}
      fiatAmount={fiatAmount}
      fiatCurrency={fiatCurrency}
      dateStr={dateStr}
    />
  );
}

TipPdfDocument.propTypes = {
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

export default TipPdf;
