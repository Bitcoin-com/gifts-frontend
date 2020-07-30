/* eslint-disable radix */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import htmlToImage from 'html-to-image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Input,
  Button,
  Loader,
} from '@bitcoin-portal/bitcoincom-pkg-components';
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
  EmailError,
  EmailInputWrap,
  InputLabel,
  Red,
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
  ShareMenuButtonEmail,
  LogoFooter,
  InputError,
  EmailPopup,
  EmailCloseIcon,
  EmailPopupCloser,
  PopupEmailForm,
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
  emailApi,
  wifCopied,
  showGiftNames,
  design,
  qrDots,
  qrLogo,
  pngLoading,
  formatMessage,
}) => {
  const [data, setData] = React.useState({
    email: '',
    from: '',
    memo: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [emailSuccess, setEmailSuccess] = React.useState(false);
  const [apiError, setApiError] = React.useState(false);

  const handleChange = e => {
    const { value, name } = e.target;

    setData(p => ({ ...p, [name]: value }));
  };

  const toggleEmail = e => {
    setShowEmail(!showEmail);
  };

  const dismissApiError = e => {
    setApiError(false);
  };

  // Disabling, used for branching
  // eslint-disable-next-line consistent-return
  async function postEmail(e) {
    e.preventDefault();
    if (emailSuccess) {
      return;
    }
    setLoading(true);
    const { from, email, memo } = data;
    // console.log(`from: ${from}, email: ${email}`);

    // test email
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(email).toLowerCase());

    let isValidFrom = false;

    if (from.length <= 64) {
      isValidFrom = true;
    }
    if (isValidEmail && isValidFrom) {
      // console.log(`Good data. Creating API request.`);
    } else {
      setLoading(false);
      // eslint-disable-next-line consistent-return
      return console.log(`Bad data. Exiting function.`);
    }
    // Get image
    const node = document.getElementById(tipWallet.addr.substr(12));
    const giftImage = await htmlToImage.toBlob(node);

    const file = new File([giftImage], 'fileName.png', { type: 'image/png' });

    const emailPayload = new FormData();
    emailPayload.append('giftAddress', tipWallet.addr);
    emailPayload.append('giftWif', tipWallet.wif);
    emailPayload.append('sharedEmail', email);
    emailPayload.append('creatorEmail', '');
    emailPayload.append('sharedBy', from);
    emailPayload.append('memo', memo);
    emailPayload.append('fiatAmount', fiatAmount);
    emailPayload.append('fiatCurrency', fiatCurrency);
    emailPayload.append('expirationDate', expirationDate);
    emailPayload.append('source', 'gifts');
    emailPayload.append('giftImage', file);

    let postEmailResponse;
    let postEmailJson;
    // console.log(`Endpoint: ${emailApi}`);
    try {
      postEmailResponse = await fetch(emailApi, {
        method: 'POST',
        /* headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, */
        body: emailPayload,
        // body: JSON.stringify(emailPayloadObj),
      });
    } catch (err) {
      console.log(`Error in API request:`);
      console.log(err);
      setApiError(true);
    }
    try {
      postEmailJson = await postEmailResponse.json();
    } catch (err) {
      console.log(`Error in JSON conversion:`);
      console.log(err);
      setApiError(true);
    }
    console.log(postEmailJson);
    if (postEmailJson.status === 'ok') {
      setEmailSuccess(true);
    } else {
      setApiError(true);
    }
    setLoading(false);
  }
  return (
    <TipWrapper
      className={tipWallet.status === 'unclaimed' ? 'print' : 'printHide'}
    >
      <TipBorder>
        <EmailPopup open={showEmail} onClose={toggleEmail}>
          <>
            <EmailPopupCloser>
              <EmailCloseIcon size={24} />
            </EmailPopupCloser>
            <PopupEmailForm className="printHide">
              <EmailInputWrap>
                <InputLabel style={{ paddingTop: '8px' }}>
                  <FormattedMessage id="home.labels.giftTo" /> <Red>*</Red>
                </InputLabel>
                <Input
                  style={{ marginTop: '0px' }}
                  disabled={emailSuccess}
                  type="text"
                  name="email"
                  onChange={e => handleChange(e)}
                  placeholder={formatMessage({
                    id: 'home.placeholders.giftEmail',
                  })}
                />
                <InputError>
                  {/* eslint-disable-next-line no-useless-escape */}
                  {!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    String(data.email).toLowerCase(),
                  ) &&
                    data.email !== '' && (
                      <FormattedMessage id="home.errors.invalidGiftEmail" />
                    )}
                </InputError>
              </EmailInputWrap>
              <EmailInputWrap>
                <InputLabel>
                  <FormattedMessage id="home.labels.giftFrom" /> <Red>*</Red>
                </InputLabel>
                <Input
                  style={{ marginTop: '0px' }}
                  type="text"
                  name="from"
                  disabled={emailSuccess}
                  onChange={e => handleChange(e)}
                  placeholder={formatMessage({
                    id: 'home.placeholders.from',
                  })}
                />
                <InputError>
                  {data.from && data.from.length > 64 && (
                    <FormattedMessage id="home.errors.invalidGiftFrom" />
                  )}
                </InputError>
              </EmailInputWrap>
              <EmailInputWrap>
                <InputLabel>
                  <FormattedMessage id="home.labels.giftMemo" /> <Red>*</Red>
                </InputLabel>
                <Input
                  style={{ marginTop: '0px' }}
                  type="text"
                  name="memo"
                  disabled={emailSuccess}
                  onChange={e => handleChange(e)}
                  placeholder={formatMessage({
                    id: 'home.placeholders.memo',
                  })}
                />
                {data.memo.length > 0 && data.memo.length <= 500 && (
                  <InputError style={{ color: 'black' }}>
                    {500 - data.memo.length}{' '}
                    <FormattedMessage id="home.errors.remaining" />
                  </InputError>
                )}
                {data.memo.length > 500 && (
                  <InputError>
                    {data.memo.length - 500}{' '}
                    <FormattedMessage id="home.errors.over" />
                  </InputError>
                )}
                <InputError>
                  {data.memo && data.memo.length > 500 && (
                    <FormattedMessage id="home.errors.invalidGiftMemo" />
                  )}
                </InputError>
              </EmailInputWrap>
              {loading ? (
                <Loader style={{ margin: 'auto', display: 'block' }} />
              ) : (
                <Button
                  design="primary"
                  style={{ margin: 'auto', display: 'block' }}
                  onClick={postEmail}
                  disabled={emailSuccess}
                >
                  {emailSuccess ? (
                    <FormattedMessage id="home.buttons.emailSuccess" />
                  ) : (
                    <FormattedMessage id="home.buttons.send" />
                  )}
                </Button>
              )}
            </PopupEmailForm>
          </>
        </EmailPopup>
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
                      {fiatAmount.toLocaleString()} {fiatCurrency}
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
                      {/* eslint-disable-next-line radix */}
                      {parseInt(
                        (fiatAmount / (tipWallet.sats / 1e8)).toFixed(0),
                      ).toLocaleString()}
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
                      {fiatAmount.toLocaleString()} {fiatCurrency}
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
                      {parseInt(
                        (fiatAmount / (tipWallet.sats / 1e8)).toFixed(0),
                      ).toLocaleString()}
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
                      {fiatAmount.toLocaleString()} {fiatCurrency}
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
                      {parseInt(
                        (fiatAmount / (tipWallet.sats / 1e8)).toFixed(0),
                      ).toLocaleString()}
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
      {apiError && (
        <EmailError>
          <FormattedMessage id="home.errors.emailApiError" />
          <Button
            design="dark"
            onClick={dismissApiError}
            style={{ margin: 'auto', marginTop: '24px' }}
          >
            <FormattedMessage id="home.buttons.dismiss" />
          </Button>
        </EmailError>
      )}

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
              <StatusTd>{tipWallet.callsign.substr(0, 23)}</StatusTd>
            </tr>
          </tbody>
        </StatusTable>
        {tipWallet.status === 'unclaimed' && (
          <ShareMenu
            trigger={
              <ShareButton type="button">
                <ShareIcon src={shareIcon} />
              </ShareButton>
            }
            position="bottom right"
            on="click"
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
              <ShareMenuButtonEmail onClick={toggleEmail}>
                <FormattedMessage id="home.gift.email" />
              </ShareMenuButtonEmail>
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
        )}
      </StatusWrap>
    </TipWrapper>
  );
};
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
  emailApi: PropTypes.string.isRequired,
  wifCopied: PropTypes.func.isRequired,
  showGiftNames: PropTypes.bool.isRequired,
  qrDots: PropTypes.bool.isRequired,
  qrLogo: PropTypes.bool.isRequired,
  pngLoading: PropTypes.bool.isRequired,
  design: PropTypes.string.isRequired,
  formatMessage: PropTypes.func.isRequired,
};

Gift.defaultProps = {
  dateStr: null,
  expirationDate: null,
};

export default Gift;
