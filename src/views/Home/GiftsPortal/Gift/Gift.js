import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  ClaimedBlockOG,
  ClaimedBlockEZ,
  ExpiredBlock,
  ExpiredBlockOG,
  ExpiredBlockEZ,
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
  ShareMenuButtonCopy,
  LogoFooter,
  // ShareMenuButtonLink,
} from './styled';
import bchLogo from '../../../../../static/images/uploads/bch-icon-qrcode.png';
import bchLogoOldSchool from '../../../../../static/images/uploads/bch-icon-qrcode-og.png';
import bchLogoEZ from '../../../../../static/images/uploads/bch-icon-qrcode-ez.png';
import tipsLogo from '../../../../../static/images/uploads/logo-min.png';
import oldSchoolGiftsLogo from '../../../../../static/images/uploads/bitcoin-cash-logo-horizontal-small.png';
import ezPrintGiftsLogo from '../../../../../static/images/uploads/bitcoin-cash-logo-horizontal-grey.png';
import dotComLogo from '../../../../../static/images/uploads/logo_black.png';
import dotComLogoGrey from '../../../../../static/images/uploads/logo_bw.png';
import shareIcon from '../../../../../static/images/uploads/share-24px.svg';

const Gift = ({
  tipWallet,
  fiatAmount,
  fiatCurrency,
  dateStr,
  expirationDate,
  share,
  wifCopied,
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
        <>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={tipsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmount>
              <CryptoAmount>
                <FormattedMessage id="home.gift.youGot" />:
              </CryptoAmount>
              <FiatAmount>
                {fiatCurrency === 'JPY' && '¥'}
                {fiatCurrency === 'GBP' && '£'}
                {fiatCurrency === 'EUR' && '€'}
                {fiatCurrency === 'USD' ||
                  (fiatCurrency === 'CAD' && '$') ||
                  (fiatCurrency === 'AUD' && '$')}
                {tipWallet.sats !== 0 ? (
                  <>
                    {fiatAmount} {fiatCurrency}
                  </>
                ) : (
                  <>0 {fiatCurrency}</>
                )}
              </FiatAmount>
              <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
            </TipAmount>
            {dateStr !== null && (
              <TipExchangeRate>
                {tipWallet.sats !== 0 ? (
                  <>
                    1 BCH ~{fiatCurrency === 'JPY' && '¥'}
                    {fiatCurrency === 'GBP' && '£'}
                    {fiatCurrency === 'EUR' && '€'}
                    {fiatCurrency === 'USD' ||
                      (fiatCurrency === 'CAD' && '$') ||
                      (fiatCurrency === 'AUD' && '$')}
                    {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
                    {fiatCurrency} <FormattedMessage id="home.gift.on" />{' '}
                    {dateStr}
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </TipExchangeRate>
            )}
            {tipWallet.status === 'unclaimed' && (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                level="M"
                renderAs="svg"
                includeMargin
                imageSettings={
                  qrLogo
                    ? {
                        src: bchLogo,
                        x: null,
                        y: null,
                        height: 33,
                        width: 33,
                        excavate: false,
                      }
                    : {}
                }
              />
            )}
            {tipWallet.status !== 'expired' ? (
              <ClaimedBlock status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlock>
            ) : (
              <ExpiredBlock status={tipWallet.status}>
                [{tipWallet.status}]
              </ExpiredBlock>
            )}

            {expirationDate !== '' && (
              <TipExchangeRate>
                <FormattedMessage id="home.gift.claimBy" /> {expirationDate}
              </TipExchangeRate>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOne>
                  <FormattedMessage id="home.gift.stepOne" />
                </StepOne>
                <StepTwo>
                  <FormattedMessage id="home.gift.stepTwo" />
                </StepTwo>
                <StepThree>
                  <FormattedMessage id="home.gift.stepThree" />
                </StepThree>
              </HowToList>
            </HowToClaim>
            <LogoFooter>
              <DotComImg src={dotComLogo} />
            </LogoFooter>
            {showGiftNames && (
              <TipExchangeRate>
                <FormattedMessage id="home.gift.giftName" />:{' '}
                {tipWallet.callsign}
              </TipExchangeRate>
            )}
          </SnapshotHolder>
        </>
      )}
      {design === 'throwback' && (
        <>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={oldSchoolGiftsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmountThrowback>
              <CryptoAmount>
                <FormattedMessage id="home.gift.youGot" />:
              </CryptoAmount>
              <FiatAmount>
                {fiatCurrency === 'JPY' && '¥'}
                {fiatCurrency === 'GBP' && '£'}
                {fiatCurrency === 'EUR' && '€'}
                {fiatCurrency === 'USD' ||
                  (fiatCurrency === 'CAD' && '$') ||
                  (fiatCurrency === 'AUD' && '$')}
                {tipWallet.sats !== 0 ? (
                  <>
                    {fiatAmount} {fiatCurrency}
                  </>
                ) : (
                  <>0 {fiatCurrency}</>
                )}
              </FiatAmount>
              <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
            </TipAmountThrowback>
            {dateStr !== null && (
              <TipExchangeRateThrowback>
                {tipWallet.sats !== 0 ? (
                  <>
                    1 BCH ~{fiatCurrency === 'JPY' && '¥'}
                    {fiatCurrency === 'GBP' && '£'}
                    {fiatCurrency === 'EUR' && '€'}
                    {fiatCurrency === 'USD' ||
                      (fiatCurrency === 'CAD' && '$') ||
                      (fiatCurrency === 'AUD' && '$')}{' '}
                    {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
                    {fiatCurrency} <FormattedMessage id="home.gift.on" />{' '}
                    {dateStr}
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </TipExchangeRateThrowback>
            )}
            {tipWallet.status === 'unclaimed' && (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                level="M"
                renderAs="svg"
                includeMargin
                imageSettings={
                  qrLogo
                    ? {
                        src: bchLogoOldSchool,
                        x: null,
                        y: null,
                        height: 33,
                        width: 33,
                        excavate: false,
                      }
                    : {}
                }
              />
            )}
            {tipWallet.status !== 'expired' ? (
              <ClaimedBlockOG status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlockOG>
            ) : (
              <ExpiredBlockOG status={tipWallet.status}>
                [{tipWallet.status}]
              </ExpiredBlockOG>
            )}
            {expirationDate !== '' && (
              <TipExchangeRateThrowback>
                <FormattedMessage id="home.gift.claimBy" /> {expirationDate}
              </TipExchangeRateThrowback>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOneOG>
                  <FormattedMessage id="home.gift.stepOne" />
                </StepOneOG>
                <StepTwoOG>
                  <FormattedMessage id="home.gift.stepTwo" />
                </StepTwoOG>
                <StepThreeOG>
                  <FormattedMessage id="home.gift.stepThree" />
                </StepThreeOG>
              </HowToList>
            </HowToClaim>
            {showGiftNames && (
              <TipExchangeRateThrowback>
                <FormattedMessage id="home.gift.giftName" />:{' '}
                {tipWallet.callsign}
              </TipExchangeRateThrowback>
            )}
          </SnapshotHolder>
        </>
      )}

      {design === 'ezprint' && (
        <>
          <SnapshotHolder id={tipWallet.addr.substr(12)}>
            <TipHeader>
              <img src={ezPrintGiftsLogo} alt="Bitcoin Cash Tips" />
            </TipHeader>
            <TipAmountEZ>
              <CryptoAmount>
                <FormattedMessage id="home.gift.youGot" />:
              </CryptoAmount>
              <FiatAmount>
                {fiatCurrency === 'JPY' && '¥'}
                {fiatCurrency === 'GBP' && '£'}
                {fiatCurrency === 'EUR' && '€'}
                {fiatCurrency === 'USD' ||
                  (fiatCurrency === 'CAD' && '$') ||
                  (fiatCurrency === 'AUD' && '$')}
                {tipWallet.sats !== 0 ? (
                  <>
                    {fiatAmount} {fiatCurrency}
                  </>
                ) : (
                  <>0 {fiatCurrency}</>
                )}
              </FiatAmount>
              <CryptoAmount>{tipWallet.sats / 1e8} BCH</CryptoAmount>
            </TipAmountEZ>
            {dateStr !== null && (
              <TipExchangeRateEZ>
                {tipWallet.sats !== 0 ? (
                  <>
                    1 BCH ~{fiatCurrency === 'JPY' && '¥'}
                    {fiatCurrency === 'GBP' && '£'}
                    {fiatCurrency === 'EUR' && '€'}
                    {fiatCurrency === 'USD' ||
                      (fiatCurrency === 'CAD' && '$') ||
                      (fiatCurrency === 'AUD' && '$')}{' '}
                    {(fiatAmount / (tipWallet.sats / 1e8)).toFixed(0)}{' '}
                    {fiatCurrency} <FormattedMessage id="home.gift.on" />{' '}
                    {dateStr}
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </TipExchangeRateEZ>
            )}
            {tipWallet.status === 'unclaimed' && (
              <QRCode
                id="borderedQRCode"
                value={tipWallet.wif}
                size={125}
                level="M"
                renderAs="svg"
                includeMargin
                imageSettings={
                  qrLogo
                    ? {
                        src: bchLogoEZ,
                        x: null,
                        y: null,
                        height: 33,
                        width: 33,
                        excavate: false,
                      }
                    : {}
                }
              />
            )}
            {tipWallet.status !== 'expired' ? (
              <ClaimedBlockEZ status={tipWallet.status}>
                [{tipWallet.status}]
              </ClaimedBlockEZ>
            ) : (
              <ExpiredBlockEZ status={tipWallet.status}>
                [{tipWallet.status}]
              </ExpiredBlockEZ>
            )}
            {expirationDate !== '' && (
              <TipExchangeRateEZ>
                <FormattedMessage id="home.gift.claimBy" /> {expirationDate}
              </TipExchangeRateEZ>
            )}
            <HowToClaim show>
              <HowToList>
                <StepOneOG>
                  <FormattedMessage id="home.gift.stepOne" />
                </StepOneOG>
                <StepTwoOG>
                  <FormattedMessage id="home.gift.stepTwo" />
                </StepTwoOG>
                <StepThreeOG>
                  <FormattedMessage id="home.gift.stepThree" />
                </StepThreeOG>
              </HowToList>
            </HowToClaim>
            <LogoFooter>
              <DotComImg src={dotComLogoGrey} />
            </LogoFooter>
            {showGiftNames && (
              <TipExchangeRateEZ>
                <FormattedMessage id="home.gift.giftName" />:{' '}
                {tipWallet.callsign}
              </TipExchangeRateEZ>
            )}
          </SnapshotHolder>
        </>
      )}
    </TipBorder>
    <StatusWrap className="printHide">
      <StatusTable>
        <tbody>
          <tr>
            <LabelTd>
              <FormattedMessage id="home.gift.status" />:
            </LabelTd>
            {design === 'throwback' ? (
              <StatusTdOldschool funded={tipWallet.status === 'unclaimed'}>
                {tipWallet.status === 'unclaimed' ? (
                  'Unclaimed'
                ) : (
                  <>
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
                  </>
                )}
              </StatusTdOldschool>
            ) : (
              <StatusTd funded={tipWallet.status === 'unclaimed'}>
                {tipWallet.status === 'unclaimed' ? (
                  'Unclaimed'
                ) : (
                  <>
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
                  </>
                )}
              </StatusTd>
            )}
          </tr>
          <tr>
            <LabelTd>
              <FormattedMessage id="home.gift.label" />:
            </LabelTd>
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
            <LoadingButton>
              <FormattedMessage id="home.gift.downloading" />
            </LoadingButton>
          ) : (
            <ShareMenuButton
              type="button"
              data-id={tipWallet.addr.substr(12)}
              data-name={tipWallet.callsign}
              data-amount={fiatAmount}
              data-currency={fiatCurrency}
              onClick={share}
            >
              <FormattedMessage id="home.gift.jpg" />
            </ShareMenuButton>
          )}
          <CopyToClipboard text={tipWallet.wif} onCopy={wifCopied}>
            <ShareMenuButtonCopy type="button">
              <FormattedMessage id="home.gift.wif" />
            </ShareMenuButtonCopy>
          </CopyToClipboard>
          {/* <ShareMenuButtonPDF
            type="button"
            data-id={tipWallet.addr.substr(12)}
            onClick={share}
          >
            PDF
          </ShareMenuButtonPDF> */}

          {/* <ShareMenuButtonLink>Link</ShareMenuButtonLink> */}
        </ShareMenuList>
      </ShareMenu>
    </StatusWrap>
  </TipWrapper>
);

Gift.propTypes = {
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
  wifCopied: PropTypes.func.isRequired,
  showGiftNames: PropTypes.bool.isRequired,
  qrDots: PropTypes.bool.isRequired,
  qrLogo: PropTypes.bool.isRequired,
  pngLoading: PropTypes.bool.isRequired,
  design: PropTypes.string.isRequired,
};

Gift.defaultProps = {
  dateStr: null,
  expirationDate: null,
};

export default Gift;
