import React from 'react';
// Will use this after add localization to full app TODO
// eslint-disable-next-line no-unused-vars
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qrcode-logo';
import {
  TipWrapper,
  TipHeader,
  TipLabel,
  ScanLabel,
  TipAmount,
  CryptoAmount,
  FiatAmount,
  TipExchangeRate,
  StatusWrap,
  ClaimedBlock,
} from './styled';
// import bchLogo from '../../../../static/images/uploads/bch-logo.png';
import bchLogo from '../../../../static/images/uploads/bch-logo-2.png';
import tipsLogo from '../../../../static/images/uploads/bitcoin-cash-tips-logo-horizontal-grn.png';

const Tip = ({ tipWallet, fiatAmount, fiatCurrency, dateStr }) => (
  <TipWrapper className={tipWallet.status === 'funded' ? 'print' : 'printHide'}>
    <TipHeader>
      <img src={tipsLogo} alt="Bitcoin Cash Tips" />
    </TipHeader>

    <TipAmount>
      <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
      <FiatAmount>
        ~ {fiatAmount} {fiatCurrency}
      </FiatAmount>
    </TipAmount>
    {dateStr !== null && (
      <TipExchangeRate>
        1 BCH ~ {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
        {fiatCurrency} on {dateStr}
      </TipExchangeRate>
    )}
    {tipWallet.status === 'funded' ? (
      <React.Fragment>
        {/* <ScanLabel>Download the Bitcoin.com wallet and scan to claim</ScanLabel> */}
        <QRCode
          id="borderedQRCode"
          value={tipWallet.wif}
          size={125}
          logoImage={bchLogo}
          logoWidth={32}
          qrStyle="squares"
          ecLevel="M"
          quietZone={10}
          bgColor="#fff"
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <TipLabel>Already claimed</TipLabel>
        <ClaimedBlock></ClaimedBlock>
      </React.Fragment>
    )}

    <StatusWrap funded={tipWallet.status === 'funded'} className="printHide">
      {tipWallet.status === 'funded' ? (
        'Funded'
      ) : (
        <React.Fragment>
          {tipWallet.claimedTxid !== undefined &&
          tipWallet.claimedTxid !== '' ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://explorer.bitcoin.com/bch/tx/${tipWallet.claimedTxid}`}
            >
              Claimed
            </a>
          ) : (
            `Claimed`
          )}
        </React.Fragment>
      )}
    </StatusWrap>
  </TipWrapper>
);

Tip.propTypes = {
  fiatAmount: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
  dateStr: PropTypes.string,
  tipWallet: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    wif: PropTypes.string.isRequired,
    sats: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    claimedTxid: PropTypes.string,
  }).isRequired,
};

Tip.defaultProps = {
  dateStr: null,
};

export default Tip;
