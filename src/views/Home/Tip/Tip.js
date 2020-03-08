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
  StepOneOG,
  StepTwoOG,
  StepThreeOG,
  DotComImg,
  StatusTable,
  LabelTd,
  StatusTd,
  StatusTdOldschool,
  ShareIcon,
  SnapshotHolder,
  ShareButton,
  ShareMenu,
  ShareMenuList,
  ShareMenuButton,
  ShareMenuButtonSpan,
  ShareMenuListItem,
} from './styled';
// import bchLogo from '../../../../static/images/uploads/bch-logo.png';
import bchLogo from '../../../../static/images/uploads/bch-logo-2.png';
import bchLogoOldSchool from '../../../../static/images/uploads/bch-logo-oldschool.png';
import tipsLogo from '../../../../static/images/uploads/logo-min.png';
import oldSchoolGiftsLogo from '../../../../static/images/uploads/bitcoin-cash-logo-horizontal-small.png';
import dotComLogo from '../../../../static/images/uploads/logo_black.png';
import shareIcon from '../../../../static/images/uploads/share-24px.svg';

const Tip = ({
  tipWallet,
  fiatAmount,
  fiatCurrency,
  dateStr,
  expirationDate,
  share,
  showGiftNames,
  oldSchool,
}) => (
  <TipWrapper className={tipWallet.status === 'funded' ? 'print' : 'printHide'}>
    <SnapshotHolder id={tipWallet.addr.substr(12)}>
      <TipHeader>
        {oldSchool ? (
          <img src={oldSchoolGiftsLogo} alt="Bitcoin Cash Tips" />
        ) : (
          <img src={tipsLogo} alt="Bitcoin Cash Tips" />
        )}
      </TipHeader>

      <TipAmount oldSchool={oldSchool}>
        <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
        <FiatAmount>
          {tipWallet.sats !== 0 ? (
            <React.Fragment>
              ~ {fiatAmount} {fiatCurrency}
            </React.Fragment>
          ) : (
            <React.Fragment>0 {fiatCurrency}</React.Fragment>
          )}
        </FiatAmount>
      </TipAmount>
      {dateStr !== null && (
        <TipExchangeRate oldSchool={oldSchool}>
          {tipWallet.sats !== 0 ? (
            <React.Fragment>
              1 BCH ~ {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
              {fiatCurrency} on {dateStr}
            </React.Fragment>
          ) : (
            <React.Fragment>&nbsp;</React.Fragment>
          )}
        </TipExchangeRate>
      )}
      {tipWallet.status === 'funded' ? (
        <React.Fragment>
          {/* <ScanLabel>Download the Bitcoin.com wallet and scan to claim</ScanLabel> */}
          {oldSchool ? (
            <QRCode
              id="borderedQRCode"
              value={tipWallet.wif}
              size={125}
              logoImage={bchLogoOldSchool}
              logoOpacity={0.25}
              logoWidth={125}
              qrStyle="dots"
              ecLevel="H"
              quietZone={10}
              bgColor="#fff"
              fgColor="#4d4d4d"
            />
          ) : (
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
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ClaimedBlock>[Claimed]</ClaimedBlock>
        </React.Fragment>
      )}
      {expirationDate !== '' && (
        <TipExchangeRate oldSchool={oldSchool}>
          Claim by {expirationDate}
        </TipExchangeRate>
      )}
      <HowToClaim show>
        <HowToList>
          {oldSchool ? (
            <React.Fragment>
              <StepOneOG>Download the Bitcoin.com wallet</StepOneOG>
              <StepTwoOG>Select &quot;Settings&quot;</StepTwoOG>
              <StepThreeOG>Select &quot;Sweep Paper Wallet&quot;</StepThreeOG>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <StepOne>
                Download the <DotComImg src={dotComLogo} /> wallet
              </StepOne>
              <StepTwo>Select &quot;Settings&quot;</StepTwo>
              <StepThree>Select &quot;Sweep Paper Wallet&quot;</StepThree>
            </React.Fragment>
          )}
        </HowToList>
      </HowToClaim>
      {showGiftNames && (
        <TipExchangeRate oldSchool={oldSchool}>
          Gift Name: {tipWallet.callsign}
        </TipExchangeRate>
      )}
    </SnapshotHolder>
    <StatusWrap className="printHide">
      <StatusTable>
        <tbody>
          <tr>
            <LabelTd>Status:</LabelTd>
            {oldSchool ? (
              <StatusTdOldschool funded={tipWallet.status === 'funded'}>
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
              </StatusTdOldschool>
            ) : (
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
            )}
          </tr>
          <tr>
            <LabelTd>Label:</LabelTd>
            <StatusTd>{tipWallet.callsign}</StatusTd>
          </tr>
        </tbody>
      </StatusTable>
      <ShareMenu
        trigger={
          <ShareButton type="button">
            <ShareIcon data-id={tipWallet.addr.substr(12)} src={shareIcon} />
          </ShareButton>
        }
        position="bottom right"
        on="hover"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: '0px', border: 'none', width: '130px' }}
        arrow={false}
      >
        <ShareMenuList>
          <ShareMenuButton
            type="button"
            data-id={tipWallet.addr.substr(12)}
            onClick={share}
          >
            PNG
          </ShareMenuButton>

          {/* <ShareMenuListItem>pdf</ShareMenuListItem> */}
        </ShareMenuList>
      </ShareMenu>
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
  showGiftNames: PropTypes.bool.isRequired,
  oldSchool: PropTypes.bool.isRequired,
};

Tip.defaultProps = {
  dateStr: null,
  expirationDate: null,
};

export default Tip;
