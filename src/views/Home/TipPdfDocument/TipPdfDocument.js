import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import TipPdfTile from './TipPdfTile';
import { TipsPage, TipDoc, TipsWrapper } from './styled';
import TipPdf from '../TipPdf';

function TipPdfDocument(props) {
  const { tipWallets, qrCodeImgs, fiatAmount, fiatCurrency, dateStr } = props;

  const pdfTips = [];
  const modTipWallets = tipWallets;
  for (let i = 0; i < modTipWallets.length; i++) {
    modTipWallets[i].qrCodeImg = qrCodeImgs[i];
    modTipWallets[i].test = `${i}`;
  }

  modTipWallets.forEach(modTipWallet => {
    pdfTips.push(
      <TipPdfTile
        tipWallet={modTipWallet}
        fiatAmount={fiatAmount}
        fiatCurrency={fiatCurrency}
        dateStr={dateStr}
      ></TipPdfTile>,
    );
  });
  return (
    <TipDoc>
      <TipsPage size="LETTER">
        <TipsWrapper>{pdfTips}</TipsWrapper>
      </TipsPage>
    </TipDoc>
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
