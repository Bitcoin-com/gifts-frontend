import React from 'react';
// Will use this after add localization to full app TODO
// eslint-disable-next-line no-unused-vars
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qrcode-logo';
import {
  TipWrapper,
  TipBorder,
  TipHeader,
  TipAmount,
  TipAmountThrowback,
  TipAmountEZ,
  CryptoAmount,
  FiatAmount,
  TipExchangeRate,
  TipExchangeRateThrowback,
  TipExchangeRateEZ,
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
  LoadingButton,
  ShareMenuButton,
} from './styled';
// import bchLogo from '../../../../static/images/uploads/bch-logo.png';
import bchLogo from '../../../../static/images/uploads/bch-square-green.svg';
import bchLogoOldSchool from '../../../../static/images/uploads/bch-logo-oldschool.png';
import bchLogoEZ from '../../../../static/images/uploads/bch-logo-grey.png';
import tipsLogo from '../../../../static/images/uploads/logo-min.png';
import oldSchoolGiftsLogo from '../../../../static/images/uploads/bitcoin-cash-logo-horizontal-small.png';
import ezPrintGiftsLogo from '../../../../static/images/uploads/bitcoin-cash-logo-horizontal-grey.png';
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
  design,
  qrDots,
  qrLogo,
  pngLoading,
}) => (
  <TipWrapper
    className={tipWallet.status === 'unclaimed' ? 'print' : 'printHide'}
  >
    <TipBorder>
      {design === 'default' && (
        <React.Fragment>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={tipsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmount>
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
              <TipExchangeRate>
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
            {tipWallet.status === 'unclaimed' ? (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                logoImage={qrLogo ? bchLogo : false}
                logoOpacity={0.25}
                logoWidth={125}
                qrStyle={qrDots ? 'dots' : 'squares'}
                ecLevel="M"
                quietZone={10}
                bgColor="#fff"
              />
            ) : (
              <ClaimedBlock status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlock>
            )}
            {expirationDate !== '' && (
              <TipExchangeRate>Claim by {expirationDate}</TipExchangeRate>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOne>
                  Download the <DotComImg src={dotComLogo} /> wallet
                </StepOne>
                <StepTwo>Select &quot;Settings&quot;</StepTwo>
                <StepThree>Select &quot;Paper Wallet Sweep&quot;</StepThree>
              </HowToList>
            </HowToClaim>
            {showGiftNames && (
              <TipExchangeRate>Gift Name: {tipWallet.callsign}</TipExchangeRate>
            )}
          </SnapshotHolder>
        </React.Fragment>
      )}
      {design === 'throwback' && (
        <React.Fragment>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={oldSchoolGiftsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmountThrowback>
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
            </TipAmountThrowback>
            {dateStr !== null && (
              <TipExchangeRateThrowback>
                {tipWallet.sats !== 0 ? (
                  <React.Fragment>
                    1 BCH ~ {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
                    {fiatCurrency} on {dateStr}
                  </React.Fragment>
                ) : (
                  <React.Fragment>&nbsp;</React.Fragment>
                )}
              </TipExchangeRateThrowback>
            )}
            {tipWallet.status === 'unclaimed' ? (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                logoImage={qrLogo ? bchLogoOldSchool : false}
                logoOpacity={0.25}
                logoWidth={125}
                qrStyle={qrDots ? 'dots' : 'squares'}
                ecLevel="M"
                quietZone={10}
                bgColor="#fff"
                fgColor="#000"
              />
            ) : (
              <ClaimedBlock status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlock>
            )}
            {expirationDate !== '' && (
              <TipExchangeRateThrowback>
                Claim by {expirationDate}
              </TipExchangeRateThrowback>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOneOG>Download the Bitcoin.com wallet</StepOneOG>
                <StepTwoOG>Select &quot;Settings&quot;</StepTwoOG>
                <StepThreeOG>Select &quot;Paper Wallet Sweep&quot;</StepThreeOG>
              </HowToList>
            </HowToClaim>
            {showGiftNames && (
              <TipExchangeRateThrowback>
                Gift Name: {tipWallet.callsign}
              </TipExchangeRateThrowback>
            )}
          </SnapshotHolder>
        </React.Fragment>
      )}

      {design === 'ezprint' && (
        <React.Fragment>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={ezPrintGiftsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmountEZ>
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
            </TipAmountEZ>
            {dateStr !== null && (
              <TipExchangeRateEZ>
                {tipWallet.sats !== 0 ? (
                  <React.Fragment>
                    1 BCH ~ {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
                    {fiatCurrency} on {dateStr}
                  </React.Fragment>
                ) : (
                  <React.Fragment>&nbsp;</React.Fragment>
                )}
              </TipExchangeRateEZ>
            )}
            {tipWallet.status === 'unclaimed' ? (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                logoImage={qrLogo ? bchLogoEZ : false}
                logoOpacity={0.25}
                logoWidth={125}
                qrStyle={qrDots ? 'dots' : 'squares'}
                ecLevel="M"
                quietZone={10}
                bgColor="#fff"
                fgColor="#000"
              />
            ) : (
              <ClaimedBlock status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlock>
            )}
            {expirationDate !== '' && (
              <TipExchangeRateEZ>Claim by {expirationDate}</TipExchangeRateEZ>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOneOG>Download the Bitcoin.com wallet</StepOneOG>
                <StepTwoOG>Select &quot;Settings&quot;</StepTwoOG>
                <StepThreeOG>Select &quot;Paper Wallet Sweep&quot;</StepThreeOG>
              </HowToList>
            </HowToClaim>
            {showGiftNames && (
              <TipExchangeRateEZ>
                Gift Name: {tipWallet.callsign}
              </TipExchangeRateEZ>
            )}
          </SnapshotHolder>
        </React.Fragment>
      )}
    </TipBorder>
    <StatusWrap className="printHide">
      <StatusTable>
        <tbody>
          <tr>
            <LabelTd>Status:</LabelTd>
            {design === 'throwback' ? (
              <StatusTdOldschool funded={tipWallet.status === 'unclaimed'}>
                {tipWallet.status === 'unclaimed' ? (
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
                        {tipWallet.status}
                      </a>
                    ) : (
                      `[${tipWallet.status}]`
                    )}
                  </React.Fragment>
                )}
              </StatusTdOldschool>
            ) : (
              <StatusTd funded={tipWallet.status === 'unclaimed'}>
                {tipWallet.status === 'unclaimed' ? (
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
                        {tipWallet.status}
                      </a>
                    ) : (
                      `${tipWallet.status}`
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
            <ShareIcon src={shareIcon} />
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
          {pngLoading ? (
            <LoadingButton>Downloading...</LoadingButton>
          ) : (
            <ShareMenuButton
              type="button"
              data-id={tipWallet.addr.substr(12)}
              data-name={tipWallet.callsign}
              data-amount={fiatAmount}
              data-currency={fiatCurrency}
              onClick={share}
            >
              PNG
            </ShareMenuButton>
          )}
          {/* <ShareMenuButtonPDF
            type="button"
            data-id={tipWallet.addr.substr(12)}
            onClick={share}
          >
            PDF
          </ShareMenuButtonPDF> */}

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
  qrDots: PropTypes.bool.isRequired,
  qrLogo: PropTypes.bool.isRequired,
  pngLoading: PropTypes.bool.isRequired,
  design: PropTypes.string.isRequired,
};

Tip.defaultProps = {
  dateStr: null,
  expirationDate: null,
};

export default Tip;
