import React from 'react';
// Will use this after add localization to full app TODO
// eslint-disable-next-line no-unused-vars
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qrcode-logo';
import {
  TipWrapper,
  TipHeader,
  TipAmount,
  CryptoAmount,
  FiatAmount,
  TipExchangeRate,
  StatusWrap,
  ClaimedBlock,
  HowToClaim,
  HowToList,
  StepOne,
  StepTwo,
  StepThree,
  DotComImg,
  StatusTable,
  LabelTd,
  StatusTd,
  ShareIcon,
  SnapshotHolder,
  ShareButton,
} from './styled';
// import bchLogo from '../../../../static/images/uploads/bch-logo.png';
import bchLogo from '../../../../static/images/uploads/bch-logo-2.png';
import tipsLogo from '../../../../static/images/uploads/logo-min.png';
import dotComLogo from '../../../../static/images/uploads/logo_black.png';
import shareIcon from '../../../../static/images/uploads/share-24px.svg';

const Tip = ({
  tipWallet,
  fiatAmount,
  fiatCurrency,
  dateStr,
  expirationDate,
  share,
}) => (
  <TipWrapper className={tipWallet.status === 'funded' ? 'print' : 'printHide'}>
    <SnapshotHolder id={tipWallet.addr.substr(12)}>
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
          {expirationDate !== '' && (
            <TipExchangeRate>Claim by {expirationDate}</TipExchangeRate>
          )}

          <HowToClaim>
            <HowToList>
              <StepOne>
                Download the <DotComImg src={dotComLogo} /> wallet
              </StepOne>
              <StepTwo>Select &quot;Settings&quot;</StepTwo>
              <StepThree>Select &quot;Sweep Paper Wallet&quot;</StepThree>
            </HowToList>
          </HowToClaim>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClaimedBlock>[Claimed]</ClaimedBlock>
          {expirationDate !== '' && (
            <TipExchangeRate>Claim by {expirationDate}</TipExchangeRate>
          )}
          <HowToClaim>
            <HowToList>
              <StepOne>
                Download the <DotComImg src={dotComLogo} /> wallet
              </StepOne>
              <StepTwo>Select &quot;Settings&quot;</StepTwo>
              <StepThree>Select &quot;Sweep Paper Wallet&quot;</StepThree>
            </HowToList>
          </HowToClaim>
        </React.Fragment>
      )}
    </SnapshotHolder>
    <StatusWrap className="printHide">
      <StatusTable>
        <tbody>
          <tr>
            <LabelTd>Status:</LabelTd>
            <StatusTd funded={tipWallet.status === 'funded'}>
              {tipWallet.status === 'funded' ? (
                'Unclaimed'
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
            </StatusTd>
          </tr>
          <tr>
            <LabelTd>Label:</LabelTd>
            <StatusTd>{tipWallet.callsign}</StatusTd>
          </tr>
        </tbody>
      </StatusTable>
      <ShareButton type="button" data-save="test" onClick={share}>
        <ShareIcon data-id={tipWallet.addr.substr(12)} src={shareIcon} />
      </ShareButton>
    </StatusWrap>
  </TipWrapper>
);

Tip.propTypes = {
  fiatAmount: PropTypes.number.isRequired,
  fiatCurrency: PropTypes.string.isRequired,
  dateStr: PropTypes.string,
  expirationDate: PropTypes.string,
  tipWallet: PropTypes.shape({
    addr: PropTypes.string.isRequired,
    wif: PropTypes.string.isRequired,
    sats: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    callsign: PropTypes.string,
    claimedTxid: PropTypes.string,
  }).isRequired,
  share: PropTypes.func.isRequired,
};

Tip.defaultProps = {
  dateStr: null,
  expirationDate: null,
};

export default Tip;
