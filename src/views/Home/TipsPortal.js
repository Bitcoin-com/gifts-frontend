import React from 'react';
import throttle from 'lodash.throttle';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BITBOX } from 'bitbox-sdk';
import { BadgerButton } from 'badger-components-react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import PropTypes from 'prop-types';
import {
  Card,
  InputLabel,
  Input,
  Select,
  Checkbox,
  H1,
  Paragraph,
  Loader,
} from 'bitcoincom-storybook';
import 'react-datepicker/dist/react-datepicker.css';
import merge from 'lodash/merge';
import htmlToImage from 'html-to-image';
import TipPdf from './TipPdf';

import {
  HeaderContentBlock,
  PrintableContentBlock,
  CardButton,
  CustomLink,
  MobileButton,
  CustomCardContainer,
  CustomFlexCardContainer,
  InputWrapper,
  AddressInputWrapper,
  Form,
  InputError,
  InputExtra,
  Red,
  TipContainer,
  WalletCard,
  MakeAndPayTipsCard,
  TipTable,
  MobileTipTable,
  TipTd,
  TipTh,
  MobileTipTh,
  BadgerWrap,
  MobileBadgerCover,
  DesktopBadgerCover,
  MobileBadgerUriOpener,
  ButtonHider,
  MobileButtonHider,
  TipContainerWrapper,
  SeedCard,
  SeedWrapperAbove,
  SeedReminderBelow,
  SeedWarning,
  Buttons,
  // CustomInfo,
  SeedReminderAbove,
  AddressForm,
  SweepNotice,
  AddressInputLabel,
  ErrorNotice,
  CustomDatePicker,
  ApiErrorPopup,
  ApiErrorPopupCloser,
  ApiErrorCard,
  ApiErrorWarning,
  ApiErrorPopupMsg,
  CustomSelect,
  SweepAllCard,
  GiftsControlPanel,
  ControlPanelForm,
  SweepInstructions,
  CustomParagraph,
  CustomPdfDownloadLink,
} from './styled';
import Tip from './Tip';

const Chance = require('chance');
const selectedCurrenciesFull = require('./currencies');
const callsigns = require('./Tip/callsigns');

const bitbox = new BITBOX({
  restURL: 'https://rest.bitcoin.com/v2/',
});

const inputState = { untouched: 0, valid: 1, invalid: 2 };

// Client websocket to watch for claimed tips in real time

const defaultRefundAddress =
  'bitcoincash:qq9qmugsdua78g7jjjykh9r4zku3wmyhnvdl8ucu0e';

// set api here
// Prod
const giftsBackendBase = 'https://gifts-api.bitcoin.com';
// Dev
// const giftsBackendBase = 'http://localhost:3001';
// Staging
// const giftsBackendBase = 'https://cashtips-api.btctest.net';

const giftsBackend = `${giftsBackendBase}/new`;
const giftsQuery = `${giftsBackendBase}/gifts`; // :creationTxid

const appStates = {
  initial: 0,
  seedGenerated: 1,
  seedSaved: 2,
  seedSavedConfirmed: 3,
  seedConfirmed: 4,
  seedImported: 5,
  tipsFunded: 6,
};

class TipsPortal extends React.Component {
  constructor(props) {
    super(props);
    this.wsTimeout = 250; // Initial timeout duration as a class variable
    this.initialFormData = {
      inputMnemonic: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      tipCount: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      tipAmountFiat: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      importedMnemonic: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      userConfirmedMnemonic: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      userRefundAddress: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      userRefundAddressOnCreate: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      expirationDate: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
      emailAddress: {
        value: '',
        state: inputState.untouched,
        error: null,
      },
    };
    this.handleSelectedCurrencyChange = this.handleSelectedCurrencyChange.bind(
      this,
    );
    this.handleSelectedCurrencyChangeFromSelect = this.handleSelectedCurrencyChangeFromSelect.bind(
      this,
    );
    this.generateNewWallet = this.generateNewWallet.bind(this);
    this.handleTipCountChange = this.handleTipCountChange.bind(this);
    this.handleTipAmountFiatChange = this.handleTipAmountFiatChange.bind(this);
    this.validateTipCount = this.validateTipCount.bind(this);
    this.handleImportedMnemonicChange = this.handleImportedMnemonicChange.bind(
      this,
    );
    this.validateImportedMnemonic = this.validateImportedMnemonic.bind(this);
    this.handleCreateTipSubmit = this.handleCreateTipSubmit.bind(this);
    this.handleCreateTipSubmitButton = this.handleCreateTipSubmitButton.bind(
      this,
    );
    this.importMnemonic = this.importMnemonic.bind(this);
    this.handleCancelInvoice = this.handleCancelInvoice.bind(this);
    this.invoiceSuccess = this.invoiceSuccess.bind(this);

    this.handleUserConfirmedMnemonicChange = this.handleUserConfirmedMnemonicChange.bind(
      this,
    );
    this.validateUserConfirmedMnemonic = this.validateUserConfirmedMnemonic.bind(
      this,
    );
    this.handleConfirmSeedButton = this.handleConfirmSeedButton.bind(this);
    this.handleConfirmedMnemonic = this.handleConfirmedMnemonic.bind(this);
    this.handleSeedCopied = this.handleSeedCopied.bind(this);
    this.handleUriCopied = this.handleUriCopied.bind(this);
    this.handleSeedSavedConfirmed = this.handleSeedSavedConfirmed.bind(this);
    this.goBackOneStep = this.goBackOneStep.bind(this);
    this.sweepAllTips = this.sweepAllTips.bind(this);
    this.handleUserRefundAddressChange = this.handleUserRefundAddressChange.bind(
      this,
    );
    this.validateUserRefundAddressChange = this.validateUserRefundAddressChange.bind(
      this,
    );
    this.handleUserRefundAddressOnCreateChange = this.handleUserRefundAddressOnCreateChange.bind(
      this,
    );
    this.handleSweepAllTipsButton = this.handleSweepAllTipsButton.bind(this);
    this.toggleSweepForm = this.toggleSweepForm.bind(this);
    this.appStateInitial = this.appStateInitial.bind(this);
    this.handleExpirationDateChange = this.handleExpirationDateChange.bind(
      this,
    );
    this.handleGiftDesignChange = this.handleGiftDesignChange.bind(this);
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
    this.createExpirationTxs = this.createExpirationTxs.bind(this);
    // this.handleNoCreationTxidInDb = this.handleNoCreationTxidInDb.bind(this);
    this.subscribeToGifts = this.subscribeToGifts.bind(this);
    this.unsubscribeToGifts = this.unsubscribeToGifts.bind(this);
    this.watchInvoiceByAddr = this.watchInvoiceByAddr.bind(this);
    this.setInvoiceInterval = this.setInvoiceInterval.bind(this);
    this.initializeWebsocket = this.initializeWebsocket.bind(this);
    this.reconnectWebsocket = this.reconnectWebsocket.bind(this);
    this.setClaimedFromWebsocket = this.setClaimedFromWebsocket.bind(this);
    this.postReturnTxInfos = this.postReturnTxInfos.bind(this);
    this.setDefaultExpirationDate = this.setDefaultExpirationDate.bind(this);
    this.retryPostReturnTxInfos = this.retryPostReturnTxInfos.bind(this);
    this.processRetryPostReturnTxInfos = this.processRetryPostReturnTxInfos.bind(
      this,
    );
    this.shareTip = this.shareTip.bind(this);
    this.makePdf = this.makePdf.bind(this);
    this.handleSelectedExpirationDateChange = this.handleSelectedExpirationDateChange.bind(
      this,
    );
    this.retryInvoiceSuccess = this.retryInvoiceSuccess.bind(this);
    this.toggleGiftNames = this.toggleGiftNames.bind(this);
    this.toggleQrDots = this.toggleQrDots.bind(this);
    this.toggleQrLogo = this.toggleQrLogo.bind(this);
    // Do not call invoiceSuccess more than once in a 10s window
    // Should only ever be called once, but Badger can send this signal multiple times
    this.invoiceSuccessThrottled = throttle(this.invoiceSuccess, 10000);

    this.state = {
      formData: merge({}, this.initialFormData),
      walletInfo: {
        mnemonic: '',
        // rootSeed: '',
        masterHDNode: '',
        derivePath: "m/44'/145'/0'/0/",
        // account: '',
        // change: '',
      },
      fundingAddress: '',
      selectedCurrency: 'USD',
      tipWallets: [], // this.testTipsData,
      invoiceUrl: '',
      importedMnemonic: false,
      calculatedFiatAmount: null,
      tipsFunded: false,
      appState: appStates.initial,
      invoiceGenerationError: '',
      sweptTxid: null,
      tipsSweptCount: 0,
      tipsClaimedCount: 0,
      showSweepForm: false,
      tipsAlreadySweptError: false,
      networkError: '',
      invoiceTxid: '',
      // eslint-disable-next-line react/no-unused-state
      returnTxInfos: [], // used for debugging
      importedGiftInfo: [],
      generatingInvoice: false,
      importingMnemonic: false,
      apiPostFailed: false,
      createExpirationTxsFailed: false,
      customExpirationDate: false,
      showGiftNames: false,
      qrDots: true,
      qrLogo: true,
      selectedGiftDesign: 'default',
      pngLoading: false,
      pdfLoading: false,
      pdfPngs: [],
      ws: null,
      invoiceInterval: null,
    };
  }

  componentDidMount() {
    this.initializeWebsocket();
  }

  componentWillUnmount() {
    this.invoiceSuccessThrottled.cancel();
  }

  // eslint-disable-next-line consistent-return
  setClaimedFromWebsocket(wsTx) {
    // console.log(`setClaimedFromWebsocket`);
    const { tipWallets } = this.state;
    try {
      const txAddr = bitbox.Address.toCashAddress(
        wsTx.x.inputs[0].prev_out.addr,
      );
      const claimedTxid = wsTx.x.hash;
      // console.log(`Tx at ${txAddr}`);
      // Set that tips status to claimed

      for (let i = 0; i < tipWallets.length; i += 1) {
        if (tipWallets[i].addr === txAddr) {
          // console.log(`Match found, updating status`);
          tipWallets[i].status = 'claimed';
          tipWallets[i].claimedTxid = claimedTxid;
        }
      }

      return this.setState({ tipWallets });
    } catch (err) {
      console.log(`Error in parsing websocket tx object for address`);
      console.log(err);
    }
  }

  setDefaultExpirationDate() {
    // Set expiration date to now + 1 month
    const { formData } = this.state;
    const expirationOffset = 1; // months
    const expirationDefault = new Date();

    expirationDefault.setMonth(expirationDefault.getMonth() + expirationOffset);

    this.setState({
      formData: {
        ...formData,
        [`expirationDate`]: {
          value: expirationDefault,
          state: inputState.untouched,
          error: null,
        },
      },
    });
  }

  validateExpirationDateChange = ({ date }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData.expirationDate;

    field.value = date;
    field.state = inputState.valid;
    field.error = null;

    // If date is > 1 year from today, error
    const expirationMaxOffset = 12; // months
    const expirationMax = new Date();
    expirationMax.setMonth(expirationMax.getMonth() + expirationMaxOffset);

    // If date is in the past, also error
    const now = new Date();
    const expirationMinOffset = 1; // hours
    const expirationMin = new Date(
      now.setHours(now.getHours() + expirationMinOffset),
    );

    if (date > expirationMax) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidExpirationDate',
      });
    } else if (date < expirationMin) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.expirationMustBeFuture',
      });
    }

    return field;
  };

  validateUserRefundAddressChange = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData[name];

    field.value = value;
    field.state = inputState.valid;
    field.error = null;

    // validation goes here
    try {
      bitbox.Address.toLegacyAddress(value);
    } catch (err) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidRefundAddress',
      });
    }

    return field;
  };

  validateUserConfirmedMnemonic = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData, walletInfo } = this.state;

    const field = formData[name];

    field.value = value;
    field.state = inputState.valid;
    field.error = null;

    if (value !== walletInfo.mnemonic) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidUserMnemonic',
      });
    }
    return field;
  };

  validateEmailAddress = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData[name];

    field.value = value;
    field.state = inputState.valid;
    field.error = null;

    // Basic email address validation
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(value).toLowerCase());

    if (!isValidEmail && value !== '') {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidEmail',
      });
      return field;
    }

    return field;
  };

  validateImportedMnemonic = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData[name];

    field.value = value;
    field.state = inputState.valid;
    field.error = null;

    const isValidMnemonic = bitbox.Mnemonic.validate(value);
    if (isValidMnemonic !== 'Valid mnemonic') {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidMnemonic',
      });
      return field;
    }

    if (!value) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.noMnemonic',
      });
    }
    return field;
  };

  // eslint-disable-next-line react/sort-comp
  handleTipCountChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [name]: this.validateTipCount({ name, value }) },
    });
  }

  validateTipCount = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData[name];

    field.value = value;
    field.state = inputState.valid;
    field.error = null;
    if (!value) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.tipCountNum',
      });
    } else if (value <= 0) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.tipCountNoTips',
      });
    } else if (value > 20) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.tipCountTooManyTips',
      });
    } else if (!Number.isInteger(parseFloat(value))) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.tipCountNotInteger',
      });
    }
    return field;
  };

  handleTipAmountFiatChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: this.validateTipAmountFiat({ name, value }),
      },
    });
  }

  validateTipAmountFiat = ({ name, value }) => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;

    const field = formData[name];

    const valueAsNum = parseFloat(value);

    field.value = valueAsNum;
    field.state = inputState.valid;
    field.error = null;
    if (!valueAsNum) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.fiatTipAmountRequired',
      });
    } else if (valueAsNum <= 0) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.fiatTipAmountRequired',
      });
    }
    return field;
  };

  initializeWebsocket() {
    const { tipWallets } = this.state;
    let connectInterval;

    const ws = new WebSocket('wss://ws.blockchain.info/bch/inv');
    const that = this; // cache the this
    ws.onmessage = event => {
      const wsTx = JSON.parse(event.data);
      // console.log(`New tx:`);
      // console.log(wsTx);
      return this.setClaimedFromWebsocket(wsTx);
    };
    ws.onopen = () => {
      console.log('Websocket connected');

      if (tipWallets.length > 0) {
        console.log(`Reconnected. Subscribing to Gifts...`);
        this.setState({ ws }, this.subscribeToGifts(tipWallets));
      } else {
        // console.log('No Gifts to watch');
        this.setState({ ws });
      }
      that.wsTimeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };
    // websocket onclose event listener
    // eslint-disable-next-line consistent-return
    ws.onclose = e => {
      console.log(`Websocket closed.`);
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.wsTimeout + that.wsTimeout) / 1000,
        )} s`,
        e.reason,
      );

      that.wsTimeout += that.wsTimeout; // increment retry interval
      console.log(that.wsTimeout);
      if (that.wsTimeout > 8000) {
        // stop trying to reconnect
        return console.log(`Websocket is unavailable.`);
      }

      connectInterval = setTimeout(
        this.reconnectWebsocket,
        Math.min(10000, that.wsTimeout),
      ); // call check function after timeout
    };
    ws.onerror = err => {
      console.error(
        'Webocket encountered error: ',
        err.message,
        'Closing websocket',
      );
      ws.close();
    };
  }

  reconnectWebsocket() {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      this.initializeWebsocket();
    }
  }

  watchInvoiceByAddr() {
    const { fundingAddress, invoiceInterval } = this.state;
    bitbox.Address.details(fundingAddress).then(
      details => {
        // console.log(details);
        const txs = details.transactions;
        // console.log(`Transactions seen: ${txs.length}`);
        if (txs.length > 0) {
          // stop watching the interval
          clearInterval(invoiceInterval);
          // return invoiceSuccess
          this.setState({ invoiceInterval: null }, this.invoiceSuccess());
        }
      },
      err => {
        console.log(`Error in watching address details for ${fundingAddress}`);
        console.log(err);
        clearInterval(invoiceInterval);
        // Probably a rate limiting error, clear it again in  30s
        setTimeout(this.setInvoiceInterval, 30000);
        this.setState({ invoiceInterval: null });
        // clear interval and set timeout to set it again
      },
    );
    // Instead of trying to watch the invoice, watch your tipWallets for a transaction
  }

  // eslint-disable-next-line react/sort-comp
  setInvoiceInterval() {
    console.log(`Setting interval again`);
    let { invoiceInterval } = this.state;
    invoiceInterval = setInterval(this.watchInvoiceByAddr, 1000);
    this.setState({ invoiceInterval });
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line consistent-return
  subscribeToGifts(tipWallets, paymentId = null) {
    const { ws } = this.state;
    let invoiceInterval;
    // if there is an invoice url in  state, start watching it
    if (paymentId !== null) {
      invoiceInterval = setInterval(this.watchInvoiceByAddr, 3000);
      this.setState({ invoiceInterval });
    }
    if (ws === null) {
      return console.log(`No websocket connect, cannot subscribe to addresses`);
    }
    // Parse for addresses
    for (let i = 0; i < tipWallets.length; i += 1) {
      // Get address of Gift
      const watchedAddr = bitbox.Address.toLegacyAddress(tipWallets[i].addr);
      // Subscribe to websocket for gift address
      ws.send(JSON.stringify({ op: 'addr_sub', addr: watchedAddr }));
      console.log(`Subscribed to ${watchedAddr}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line consistent-return
  unsubscribeToGifts(tipWallets) {
    const { ws } = this.state;
    if (ws === null) {
      return console.log(
        `No websocket connect, cannot unsubscribe from addresses`,
      );
    }
    // Parse for addresses
    for (let i = 0; i < tipWallets.length; i += 1) {
      // Get address of Gift
      const watchedAddr = bitbox.Address.toLegacyAddress(tipWallets[i].addr);
      // Subscribe to websocket for gift address
      ws.send(JSON.stringify({ op: 'addr_unsub', addr: watchedAddr }));
      console.log(`Unsubscribed to ${watchedAddr}`);
    }
  }

  toggleGiftNames(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ showGiftNames: value });
  }

  toggleQrDots(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ qrDots: value });
  }

  toggleQrLogo(e) {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ qrLogo: value });
  }

  handleSelectedExpirationDateChange(e) {
    const { formData, customExpirationDate } = this.state;
    // today
    const now = new Date();

    const dateSelection = e.value;
    if (dateSelection === 'custom') {
      return this.setState({ customExpirationDate: true });
    }
    if (customExpirationDate) {
      this.setState({ customExpirationDate: false });
    }
    let expirationDate;

    switch (dateSelection) {
      case 'oneDay':
        expirationDate = new Date(now.setDate(now.getDate() + 1));
        break;
      case 'oneWeek':
        expirationDate = new Date(now.setDate(now.getDate() + 7));
        break;
      case 'twoWeeks':
        expirationDate = new Date(now.setDate(now.getDate() + 14));
        break;
      case 'oneMonth':
        expirationDate = new Date(now.setMonth(now.getMonth() + 1));
        break;
      case 'threeMonths':
        expirationDate = new Date(now.setMonth(now.getMonth() + 3));
        break;
      default:
        // 3 months
        expirationDate = new Date(now.setMonth(now.getMonth() + 3));
    }
    const field = {};
    field.value = expirationDate;
    field.error = null;
    field.state = inputState.valid;
    return this.setState({
      formData: {
        ...formData,
        [`expirationDate`]: field,
      },
    });
  }

  makePdf() {
    this.setState({ pdfLoading: true, pdfPngs: [] });
    const { tipWallets } = this.state;
    const imagePromises = [];
    for (let i = 0; i < tipWallets.length; i += 1) {
      const tipWallet = tipWallets[i];
      const elementId = tipWallet.addr.substr(12);
      const node = document.getElementById(elementId);
      const imagePromise = htmlToImage.toPng(node);
      imagePromises.push(imagePromise);
    }
    Promise.all(imagePromises).then(
      imgArr => {
        console.log(`Images processed for pdf`);
        // console.log(imgArr);
        this.setState({
          pdfPngs: imgArr,
          pdfLoading: false,
        });
        // put it in state, then pdf element can get it
        // then mb just call this function by default when gifts are created
      },
      err => {
        console.log(`Error in Promise.all(imagePromises)`);
        console.log(err);
        this.setState({
          pdfLoading: false,
        });
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  shareTip(e) {
    this.setState({ pngLoading: true });
    const elementId = e.target.dataset.id;
    const giftName = elementId.substr(elementId.length - 4);
    const fiatAmount = e.target.dataset.amount;
    const { currency } = e.target.dataset;
    // console.log(`elementId: ${elementId}`);
    const node = document.getElementById(elementId);
    htmlToImage.toJpeg(node).then(
      dataUrl => {
        // console.log(dataUrl);
        const imageType = 'image/jpg';
        // Download the image
        const fileName = `BCH_Gift_${fiatAmount}${currency}_${giftName}`;
        const link = document.createElement('a');
        link.download = `${fileName}.jpg`;
        link.href = dataUrl.replace(imageType, 'image/octet-stream');
        link.click();

        this.setState({ pngLoading: false });
      },
      err => {
        console.log(`Error in this.shareTip(e) PNG download:`);
        console.log(err);
        this.setState({ pngLoading: false });
      },
    );
  }

  handleImportedMnemonicChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [name]: this.validateImportedMnemonic({ name, value }),
      },
    });
  }

  handleEmailAddressChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [name]: this.validateEmailAddress({ name, value }),
      },
    });
  }

  handleUserConfirmedMnemonicChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [name]: this.validateUserConfirmedMnemonic({ name, value }),
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSweepAllTipsButton() {
    // stub method
    // console.log(`handleSweepAllTipsButton`);
  }

  handleUserRefundAddressOnCreateChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [name]: this.validateUserRefundAddressChange({ name, value }),
      },
    });
  }

  handleUserRefundAddressChange(e) {
    const { value, name } = e.target;
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [name]: this.validateUserRefundAddressChange({ name, value }),
      },
    });
  }

  // eslint-disable-next-line consistent-return
  postReturnTxInfos(returnTxInfos) {
    // Before posting, check to make sure it hasn't happened already
    // eslint-disable-next-line react/destructuring-assignment
    const returnTxInfosInState = this.state.returnTxInfos.length;
    const { apiPostFailed } = this.state;

    // If the api post did not fail and the returnTxInfos in state are identical to what went to this function
    if (!apiPostFailed && returnTxInfosInState > 0) {
      // Then the API post has already happened, don't do it again
      return console.log(`Packet already sent to server, not re-sending`);
    }
    fetch(giftsBackend, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(returnTxInfos),
    }).then(
      res => {
        console.log(`returnTxInfos successully posted to API`);
        console.log(res);

        // eslint-disable-next-line react/no-unused-state
        return this.setState({ returnTxInfos });
      },
      err => {
        console.log(`Error in postReturnTxInfos`);
        console.log(err);
        // should try to post it again here, mb email the error to admin
        return this.setState({ apiPostFailed: true, returnTxInfos });
      },
    );
  }

  retryPostReturnTxInfos() {
    this.setState(
      { apiPostFailed: false },
      this.processRetryPostReturnTxInfos(),
    );
  }

  processRetryPostReturnTxInfos() {
    const { returnTxInfos } = this.state;
    fetch(giftsBackend, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(returnTxInfos),
    }).then(
      res => {
        console.log(`returnTxInfos successully posted to API`);
        console.log(res);

        // eslint-disable-next-line react/no-unused-state
        return this.setState({ apiPostFailed: false });
      },
      err => {
        console.log(`Error in postReturnTxInfos`);
        console.log(err);
        // should try to post it again here, mb email the error to admin
        return this.setState({ apiPostFailed: true, returnTxInfos });
      },
    );
  }

  retryInvoiceSuccess() {
    this.setState({ createExpirationTxsFailed: false }, this.invoiceSuccess);
  }

  /*
  handleNoCreationTxidInDb() {
    // Function to create one expiration tx to get tip info from db if creationTxid was not collected
    // Probably not worth the dev effort, would only take effect in case where
    // 1) creationTxid failed to post to server
    // 2) At least one of tipWallets has been claimed
  } */

  createExpirationTxs() {
    // console.log(`createExpirationTxs`);
    // Function is similar to sweepAllTips, however creates a rawTx for each input instead of one sweep tx
    // Build this for the case of "you just made the tips" first; simpler than the import case
    const {
      formData,
      tipWallets,
      invoiceTxid,
      selectedCurrency,
      invoiceUrl,
    } = this.state;
    let refundAddress = formData.userRefundAddressOnCreate.value;
    // If no refund address is specified, set to Bitcoin.com donation
    if (refundAddress === '') {
      refundAddress = defaultRefundAddress;
    }
    // Scan through tip wallets by wif, see if there is money to sweep, and output a new object
    // of what you need to build your sweeping tx
    const sweepBuilder = [];
    const sweepAddresses = [];
    tipWallets.forEach(tipWallet => {
      const sweepChunk = {};
      // get ec pair from wif
      const ecPair = bitbox.ECPair.fromWIF(tipWallet.wif);
      // get address from ecpair
      const fromAddr = bitbox.ECPair.toCashAddress(ecPair);
      sweepChunk.ecPair = ecPair;
      sweepChunk.fromAddr = fromAddr;
      sweepAddresses.push(fromAddr);
      sweepBuilder.push(sweepChunk);
    });
    // TODO can you get batch utxos from more than 20 addresses?
    // check balances of addresses in one async batch
    bitbox.Address.utxo(sweepAddresses).then(
      u => {
        for (let i = 0; i < u.length; i += 1) {
          // utxos come back in same order they were sent
          sweepBuilder[i].utxos = u[i].utxos;
        }
        // now make return txs
        const returnRawTxs = [];
        for (let i = 0; i < sweepBuilder.length; i += 1) {
          const transactionBuilder = new bitbox.TransactionBuilder();
          let originalAmount = 0;
          // Only 1 utxo, what you just paid
          const utxo = sweepBuilder[i].utxos[0];
          originalAmount += utxo.satoshis;
          transactionBuilder.addInput(utxo.txid, utxo.vout);
          if (originalAmount < 1) {
            returnRawTxs[
              i
            ] = `Error, no utxo found for wallet at address ${sweepBuilder[i].fromAddr}`;
          }
          // Calc fee for 1 input 1 output
          const byteCount = bitbox.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 1 },
          );
          // Make fee 2 sat/byte to make sure even smallest tips get swept
          const fee = Math.ceil(2 * byteCount);
          // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
          const sendAmount = originalAmount - fee;

          // add output w/ address and amount to send
          transactionBuilder.addOutput(refundAddress, sendAmount);
          // Loop through each input and sign
          let redeemScript;
          // Sign your input (only 1)

          const keyPair = sweepBuilder[i].ecPair;

          transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            utxo.satoshis,
          );

          // build tx
          const tx = transactionBuilder.build();
          // output rawhex
          const hex = tx.toHex();
          returnRawTxs.push(hex);
        }
        // console.log(returnRawTxs);

        // Build & set the server broadcast object in state
        const returnTxInfos = [];
        for (let i = 0; i < returnRawTxs.length; i += 1) {
          const returnTxInfo = {};
          // Calculate BCH exchange rate from sats, as it was originally calculated to determine sats

          const fiatAmount = formData.tipAmountFiat.value;
          // Calculate this for each tip in case you add a feature for tips of diff value later
          const fiatRate = parseFloat(
            (fiatAmount / (tipWallets[i].sats / 1e8)).toFixed(2),
          );
          const expirationStamp = Math.round(
            formData.expirationDate.value.getTime() / 1000,
          );
          const tipAddress = tipWallets[i].addr;
          const tipNote = tipWallets[i].callsign;

          returnTxInfo.creationPaymentUrl = invoiceUrl;
          returnTxInfo.creationTxid = invoiceTxid;
          returnTxInfo.fiatCode = selectedCurrency;
          returnTxInfo.fiatAmount = fiatAmount;
          returnTxInfo.fiatRate = fiatRate;

          returnTxInfo.email = formData.emailAddress.value;
          returnTxInfo.rawTx = returnRawTxs[i];
          returnTxInfo.expirationStamp = expirationStamp;
          returnTxInfo.giftAddress = tipAddress;
          returnTxInfo.giftNote = tipNote;
          returnTxInfo.refundAddress = refundAddress;
          returnTxInfos.push(returnTxInfo);
        }
        console.log(returnTxInfos);
        return this.postReturnTxInfos(returnTxInfos);
      },
      err => {
        console.log(`Error in bitbox.Address.utxo(sweepAddresses)`);
        console.log(err);
        return this.setState({ createExpirationTxsFailed: true });
        // Handle this error, let user retry invoiceSuccess
      },
    );

    // Add the utxos to the sweepbuilder array
    // iterate over utxo object
    // if the address matches a sweepbuilder entry, add it to that entry
    // might be best to do this step in the txbuilder loop
  }

  invoiceSuccess() {
    const { tipWallets } = this.state;
    // console.log(`Invoice paid successfully`);
    // build the output object for the tip claiming expiration here
    // get txid of invoice funding transaction
    bitbox.Address.details(tipWallets[0].addr).then(
      res => {
        // console.log(res);
        let invoiceTxid = null;
        if (res.transactions.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          invoiceTxid = res.transactions[0];
        }
        return this.setState(
          { invoiceTxid, tipsFunded: true },
          this.createExpirationTxs,
        );
      },
      err => {
        console.log(`Error in fetching txid of invoice payment transaction`);
        console.log(err);
        return this.setState(
          { invoiceTxid: null, tipsFunded: true },
          this.createExpirationTxs,
        );
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  handleConfirmSeedButton() {
    // set state that seed is confirmed
    // Leave in as stub method for now
  }

  handleConfirmedMnemonic(e) {
    e.preventDefault();
    const { formData } = this.state;

    if (formData.userConfirmedMnemonic.state !== 1) {
      return;
    }

    this.setState({
      appState: appStates.seedConfirmed,
    });
    // make sure not error state
    // if not, show next stuff
  }

  handleSeedSavedConfirmed() {
    this.setState({
      appState: appStates.seedSavedConfirmed,
    });
  }

  goBackOneStep() {
    const { appState } = this.state;

    const backOne = appState - 1;

    this.setState({ appState: backOne });
  }

  handleSeedCopied() {
    const { appState } = this.state;
    const {
      intl: { formatMessage },
    } = this.props;

    const seedCopied = formatMessage({ id: 'home.notifications.seedCopied' });

    toast.notify(seedCopied, {
      position: 'bottom-right',
      duration: 1500,
    });
    if (appState === appStates.seedGenerated) {
      this.setState({ appState: appStates.seedSaved });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleUriCopied() {
    toast.notify('Invoice URI copied to clipboard', {
      position: 'bottom-right',
      duration: 1500,
    });
  }

  // TODO refactor for try catch on the other await statement
  // eslint-disable-next-line consistent-return
  async sweepAllTips(e) {
    e.preventDefault();
    // Accept a validated cash address from user input
    // Scan addresses from this HD node for a balance
    // Use a tipCount var in state; if your tips were just created, you'll have it
    // Figure out a way to find tipCount from import as well
    // reference: https://github.com/Bitcoin-com/bch-cli-wallet/blob/master/src/commands/sweep.js
    // key difference is that you will be building 1 transaction with utxos from different addresses
    // Build this for the case of "you just made the tips" first; simpler than the import case
    const { formData, tipWallets } = this.state;
    const refundAddress = formData.userRefundAddress.value;
    // Scan through tip wallets by wif, see if there is money to sweep, and output a new object
    // of what you need to build your sweeping tx
    const sweepBuilder = [];
    const sweepAddresses = [];
    tipWallets.forEach(tipWallet => {
      const sweepChunk = {};
      // get ec pair from wif
      const ecPair = bitbox.ECPair.fromWIF(tipWallet.wif);
      // get address from ecpair
      const fromAddr = bitbox.ECPair.toCashAddress(ecPair);
      sweepChunk.ecPair = ecPair;
      sweepChunk.fromAddr = fromAddr;
      sweepAddresses.push(fromAddr);
      sweepBuilder.push(sweepChunk);
    });
    // console.log(sweepBuilder);
    // TODO can you get batch utxos from more than 20 addresses?
    // check balances of addresses in one async batch
    let u;
    try {
      u = await bitbox.Address.utxo(sweepAddresses);
    } catch (err) {
      console.log(`Error in fetching utxos in sweepAll()`);
      console.log(err);
    }

    // todo handle errors here with try/catch
    // console.log(`utxos:`);
    // console.log(u);

    // Add the utxos to the sweepbuilder array
    // iterate over utxo object
    // if the address matches a sweepbuilder entry, add it to that entry
    // might be best to do this step in the txbuilder loop

    for (let i = 0; i < u.length; i += 1) {
      // utxos come back in same order they were sent
      // handle case that not all addresses will have utxos later
      sweepBuilder[i].utxos = u[i].utxos;
    }
    // console.log(`completed sweepBuilder:`);
    // console.log(sweepBuilder);

    // now make that return tx
    const transactionBuilder = new bitbox.TransactionBuilder();
    let originalAmount = 0;
    let inputCount = 0;

    // loop over sweepBuilder
    for (let j = 0; j < sweepBuilder.length; j += 1) {
      // Loop through all for each tip with utxos and add as inputs
      for (let i = 0; i < sweepBuilder[j].utxos.length; i += 1) {
        const utxo = sweepBuilder[j].utxos[i];

        originalAmount += utxo.satoshis;
        // console.log(`Input ${inputCount + 1}: { ${utxo.txid} , ${utxo.vout}}`);

        transactionBuilder.addInput(utxo.txid, utxo.vout);
        inputCount += 1;
      }
    }
    if (originalAmount < 1) {
      console.log(`originalAmount is 0, handle as error`);
      return this.setState({ tipsAlreadySweptError: true });
    }
    // console.log(`Total inputs: ${inputCount}`);
    const byteCount = bitbox.BitcoinCash.getByteCount(
      { P2PKH: inputCount },
      { P2PKH: 1 },
    );
    // Use 2 sats/byte to avoid any mempool errors
    const fee = Math.ceil(2 * byteCount);
    // console.log(`fee: ${fee}`);
    // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    const sendAmount = originalAmount - fee;
    // console.log(`sendAmount: ${sendAmount}`);

    // add output w/ address and amount to send
    transactionBuilder.addOutput(
      bitbox.Address.toLegacyAddress(refundAddress),
      sendAmount,
    );

    // Loop through each input and sign
    let redeemScript;
    let signedInputCount = 0;
    for (let j = 0; j < sweepBuilder.length; j += 1) {
      for (let i = 0; i < sweepBuilder[j].utxos.length; i += 1) {
        const utxo = sweepBuilder[j].utxos[i];
        // console.log(`utxo[${i}]: ${utxo.vout}`);
        // console.log(utxo);
        // console.log(`signing ecPair:`);
        // console.log(sweepBuilder[j].ecPair);
        transactionBuilder.sign(
          signedInputCount,
          sweepBuilder[j].ecPair,
          redeemScript,
          transactionBuilder.hashTypes.SIGHASH_ALL,
          utxo.satoshis,
        );
        signedInputCount += 1;
        /*
        console.log(
          `Signed input ${i} round ${j} with ${sweepBuilder[j].ecPair.d[0]}`,
        ); */
      }
    }
    // build tx
    const tx = transactionBuilder.build();
    // output rawhex
    const hex = tx.toHex();
    // console.log(hex);

    try {
      const txid = await bitbox.RawTransactions.sendRawTransaction([hex]);
      const txidStr = txid[0];
      // console.log(typeof txid);
      // console.log(`txidStr: ${txidStr}`);
      // console.log(`txid: ${txid}`);
      // set tips as claimed by this txid
      const claimedTipWallets = [];
      tipWallets.forEach(tipWallet => {
        const claimedTipWallet = tipWallet;
        // Only apply to tips that were not previously claimed
        if (claimedTipWallet.status !== 'claimed') {
          claimedTipWallet.status = 'claimed';
          claimedTipWallet.claimedTxid = txidStr;
        }
        claimedTipWallets.push(claimedTipWallet);
      });
      return this.setState({
        sweptTxid: txidStr,
        tipsSweptCount: signedInputCount,
        tipWallets: claimedTipWallets,
      });
    } catch (err) {
      console.log(`Error in broadcasting transaction:`);
      console.log(err);
      // TODO handle error
    }

    // ...a thought. you probably must make 1 tx for each tip. probably can't batch a tx from utxos from different addresses...? nah you definitely can...
  }

  toggleSweepForm() {
    const { showSweepForm } = this.state;
    this.setState({ showSweepForm: !showSweepForm });
  }

  appStateInitial() {
    this.setState({
      formData: merge({}, this.initialFormData),
      walletInfo: {
        mnemonic: '',
        // rootSeed: '',
        masterHDNode: '',
        derivePath: "m/44'/145'/0'/0/",
        // account: '',
        // change: '',
      },
      fundingAddress: '',
      selectedCurrency: 'USD',
      tipWallets: [],
      invoiceUrl: '',
      importedMnemonic: false,
      calculatedFiatAmount: null,
      tipsFunded: false,
      appState: appStates.initial,
      invoiceGenerationError: '',
      sweptTxid: null,
      tipsSweptCount: 0,
      showSweepForm: false,
      tipsAlreadySweptError: false,
      networkError: '',
      apiPostFailed: false,
      importingMnemonic: false,
      generatingInvoice: false,
      customExpirationDate: false,
      returnTxInfos: [],
      importedGiftInfo: [],
      createExpirationTxsFailed: false,
      showGiftNames: false,
      qrDots: true,
      qrLogo: true,
      selectedGiftDesign: 'default',
      pngLoading: false,
      pdfLoading: false,
      pdfPngs: [],
      ws: null,
      invoiceInterval: null,
    });
  }

  async handleSelectedCurrencyChangeFromSelect(e) {
    const { tipWallets } = this.state;
    const currency = e.value;

    const priceSource = `https://markets.api.bitcoin.com/rates/convertor?c=BCH&q=${currency}`;
    let price;
    let priceJson;
    try {
      price = await fetch(priceSource);
    } catch (err) {
      console.log(
        `Error fetching price in handleSelectedCurrencyChangeFromSelect()`,
      );
      return console.log(err);
    }

    try {
      priceJson = await price.json();
    } catch (err) {
      console.log(
        `Error converting price api output to JSON in handleSelectedCurrencyChangeFromSelect()`,
      );
      return console.log(err);
    }

    const fiatPrice = priceJson[currency].rate;
    const calculatedFiatAmount = parseFloat(
      ((tipWallets[0].sats / 1e8) * fiatPrice).toFixed(2),
    );
    return this.setState({
      selectedCurrency: currency,
      calculatedFiatAmount,
    });
  }

  handleExpirationDateChange(date) {
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        [`expirationDate`]: this.validateExpirationDateChange({ date }),
      },
    });
  }

  handleGiftDesignChange(selectedGiftDesignOption) {
    const { value } = selectedGiftDesignOption;
    this.setState({ selectedGiftDesign: value, pdfPngs: [] });
  }

  handleSelectedCurrencyChange(e) {
    const currency = e.value;
    this.setState({
      selectedCurrency: currency,
    });
  }

  handleCancelInvoice() {
    const { invoiceInterval } = this.state;
    console.log(`Clearing interval ${invoiceInterval}`);
    clearInterval(invoiceInterval);
    this.setState({
      invoiceUrl: '',
      tipWallets: [],
      invoiceInterval: null,
    });
  }

  generateNewWallet() {
    this.setDefaultExpirationDate();
    const { walletInfo } = this.state;
    const entropy = bitbox.Crypto.randomBytes(16);

    // turn entropy to 12 word mnemonic
    const mnemonic = bitbox.Mnemonic.fromEntropy(entropy);

    // console.log(mnemonic);

    // root seed buffer
    const rootSeed = bitbox.Mnemonic.toSeed(mnemonic);

    // master HDNode
    const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, 'mainnet');

    // HDNode of BIP44 account
    const account = bitbox.HDNode.derivePath(
      masterHDNode,
      `${walletInfo.derivePath}0`,
    );

    const fundingAddress = bitbox.HDNode.toCashAddress(account);

    walletInfo.mnemonic = mnemonic;
    walletInfo.masterHDNode = masterHDNode;

    this.setState({
      walletInfo,
      fundingAddress,
      appState: appStates.seedGenerated,
    });
  }

  // eslint-disable-next-line consistent-return
  async importMnemonic() {
    const {
      intl: { formatMessage },
    } = this.props;
    const {
      walletInfo,
      formData,
      selectedCurrency,
      sweptTxid,
      tipsAlreadySweptError,
      showSweepForm,
    } = this.state;
    let { tipWallets } = this.state;
    // If you are doing this with a seed already loaded, unsubscribe from previous websockets
    if (tipWallets.length > 0) {
      this.unsubscribeToGifts(tipWallets);
      // Re-initialize
      tipWallets = [];
    }
    const { derivePath } = walletInfo;
    let claimedTipCount = 0;
    this.setState({ importingMnemonic: true, networkError: '' });

    // reset to 0 in case the user is importing with tips already on the page

    if (formData.importedMnemonic.state !== 1) {
      // console.log(`Invalid Mnemonic, kicked out of function`);
      return this.setState({ importingMnemonic: false });
    }

    // If user has already swept tips, remove that notice on refresh
    if (tipsAlreadySweptError) {
      this.setState({ tipsAlreadySweptError: false });
    }
    if (sweptTxid !== null) {
      this.setState({ sweptTxid: null });
    }
    if (showSweepForm) {
      this.setState({ showSweepForm: false });
    }
    // Use already-validated user mnemonic
    const mnemonic = formData.importedMnemonic.value;

    // console.log(mnemonic);

    // root seed buffer
    const rootSeed = bitbox.Mnemonic.toSeed(mnemonic);

    // master HDNode
    const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, 'bitcoincash');

    // get the first child node
    const childNode = masterHDNode.derivePath(`${derivePath}${0}`);

    const fundingAddress = bitbox.HDNode.toCashAddress(childNode);
    const fundingWif = bitbox.HDNode.toWIF(childNode);

    // console.log(`cashAddress: ${fundingAddress}`);

    // Check if tips have already been created for this mnemonic
    // 1 - check balance of the first address
    // 2 - if balance, keep checking balances of ith addresses until you hit a zero balance
    // 3 - load page based on number of tips already created
    // NB that there could be an issue if the user created 10 tips and the first 1 has been claimed, but not next 9
    // So...probably better to check tx history and not only balance

    try {
      const addrDetails = await bitbox.Address.details(fundingAddress);
      // console.log(addrDetails);
      const txHistory = addrDetails.transactions;
      // console.log(txHistory);
      // check tx history
      // actually what you need to do first is get an object with all the tips
      const potentialTipWallets = [];

      if (txHistory.length > 0) {
        const firstTipWallet = {
          addr: '',
          wif: '',
          sats: '',
          status: '',
          claimedTxid: '',
        };
        // determine status
        const creationTxid = txHistory[0];

        if (
          txHistory.length === 1 &&
          (addrDetails.balance > 0 || addrDetails.unconfirmedBalanceSat > 0)
        ) {
          firstTipWallet.status = 'unclaimed';
          // get creation txid
          // eslint-disable-next-line prefer-destructuring
        } else if (txHistory.length > 1 && addrDetails.balance === 0) {
          firstTipWallet.status = 'claimed';
        }

        // console.log(`Creation txid: ${creationTxid}`);
        const queryApi = `${giftsQuery}/${creationTxid}`;
        let importedGiftInfo;
        let importedGiftInfoJson;
        let importedGifts;

        try {
          importedGiftInfo = await fetch(queryApi);
          // console.log(`Fetched importedGiftInfo:`);
          // console.log(importedGiftInfo);
          try {
            importedGiftInfoJson = await importedGiftInfo.json();
            // console.log(`Fetched importedGiftInfo:`);
            // console.log(importedGiftInfoJson);
            // console.log(`Server Data for Gifts at Imported Seed:`);
            importedGifts = importedGiftInfoJson.result;
            console.log(importedGifts);

            // If this is empty, chance that first tip is claimed and you don't have the right txid
            // Try that
            if (importedGifts.length === 0) {
              const creationTxidTakeTwo = txHistory[txHistory.length - 1];
              const queryApiRetry = `${giftsQuery}/${creationTxidTakeTwo}`;
              try {
                importedGiftInfo = await fetch(queryApiRetry);
                try {
                  importedGiftInfoJson = await importedGiftInfo.json();
                  // console.log(`Fetched importedGiftInfo:`);
                  // console.log(importedGiftInfoJson);
                  // console.log(`Server Data for Gifts at Imported Seed:`);
                  importedGifts = importedGiftInfoJson.result;
                  console.log(importedGifts);
                } catch (err) {
                  console.log(`Error in importedGiftInfo JSON retry:`);
                  console.log(err);
                }
              } catch (err) {
                console.log(`Error in importedGiftInfo retry:`);
                console.log(err);
              }
            }

            this.setState({ importedGiftInfo: importedGifts });
          } catch (err) {
            console.log(`Error parsing gift info from server to json`);
          }
        } catch (err) {
          console.log(`Error getting tip info from server`);
        }

        firstTipWallet.addr = fundingAddress;
        const callsignPicker = new Chance(`${fundingAddress}BCHPLS`);
        const callsign =
          callsigns[Math.floor(callsignPicker.random() * callsigns.length)];
        firstTipWallet.callsign = callsign;
        if (addrDetails.totalReceivedSat > 0) {
          firstTipWallet.sats = addrDetails.totalReceivedSat;
        } else {
          firstTipWallet.sats = addrDetails.unconfirmedBalanceSat;
        }

        firstTipWallet.wif = fundingWif;
        potentialTipWallets.push(firstTipWallet);
        const potentialTipAddresses = [fundingAddress];
        // Start at 1 bc you already have the 0 address

        for (let i = 1; i < 20; i += 1) {
          const potentialTipWallet = {
            addr: '',
            wif: '',
            sats: '',
            status: '',
            claimedTxid: '',
            callsign: '',
          };
          const potentialChildNode = masterHDNode.derivePath(
            `${derivePath}${i}`,
          );
          const potentialTipAddress = bitbox.HDNode.toCashAddress(
            potentialChildNode,
          );
          const potentialTipCallsignPicker = new Chance(
            `${potentialTipAddress}BCHPLS`,
          );
          const potentialTipCallsign =
            callsigns[
              Math.floor(potentialTipCallsignPicker.random() * callsigns.length)
            ];
          const potentialTipWif = bitbox.HDNode.toWIF(potentialChildNode);
          // console.log(`${derivePath}${i}: ${potentialTipAddress}`);

          potentialTipWallet.addr = potentialTipAddress;
          potentialTipWallet.callsign = potentialTipCallsign;
          potentialTipWallet.wif = potentialTipWif;

          // Note that using push and not the specific index only works because everything is in HD order
          potentialTipWallets.push(potentialTipWallet);

          potentialTipAddresses.push(potentialTipAddress);
        }
        // console.log(potentialTipAddresses);

        // get the tx history for those 20
        try {
          const potentialTipDetails = await bitbox.Address.details(
            potentialTipAddresses,
          );
          // console.log(potentialTipDetails);

          for (let i = 0; i < potentialTipDetails.length; i += 1) {
            if (potentialTipDetails[i].transactions.length > 0) {
              const tipWallet = potentialTipWallets[i];
              if (potentialTipDetails[i].totalReceivedSat > 0) {
                tipWallet.sats = potentialTipDetails[i].totalReceivedSat;
              } else {
                // handle 0 conf
                tipWallet.sats = potentialTipDetails[i].unconfirmedBalanceSat;
              }

              if (
                potentialTipDetails[i].transactions.length === 1 &&
                (potentialTipDetails[i].balance > 0 ||
                  potentialTipDetails[i].unconfirmedBalanceSat > 0)
              ) {
                tipWallet.status = 'unclaimed';
              } else if (
                potentialTipDetails[i].transactions.length > 1 &&
                (potentialTipDetails[i].balance === 0 ||
                  potentialTipDetails[i].unconfirmedBalanceSat < 0)
              ) {
                tipWallet.status = 'claimed';
                claimedTipCount += 1;
                // eslint-disable-next-line prefer-destructuring
                tipWallet.claimedTxid = potentialTipDetails[i].transactions[0];
              }
              if (typeof importedGifts !== 'undefined') {
                if (importedGifts.length > 0) {
                  try {
                    tipWallet.status = importedGifts[i].status;
                  } catch (err) {
                    console.log(`Error in applying server tip status`);
                    console.log(err);
                  }
                }
              }

              tipWallets.push(tipWallet);
            } else {
              // console.log(`You have ${i} tips in this wallet`);
              break;
            }
          }
          // console.log(`tipWallets:`);
          // console.log(tipWallets);
        } catch (err) {
          console.log(`Error in bitbox.Address.details[potentialTipDetails]`);
          console.log(err);
          return this.setState({ importingMnemonic: false });
        }
      } else {
        // there is no tx history at the first address
        // if there are no potential tips, ask user if they would like to make tips with this seed
        // for now, just set an import error
        const noTipsAtMnemonic = {
          value: formData.importedMnemonic.value,
          state: inputState.invalid,
          error: formatMessage({
            id: 'home.errors.noTipsAtMnemonic',
          }),
        };
        // eslint-disable-next-line consistent-return
        return this.setState({
          formData: {
            ...formData,
            importedMnemonic: noTipsAtMnemonic,
          },
          importingMnemonic: false,
        });
      }
    } catch (err) {
      console.log(`Error in bitbox.Address.details(firstTipAddr)`);
      console.log(err);
      // eslint-disable-next-line consistent-return
      return this.setState({
        networkError: formatMessage({
          id: 'home.errors.networkError',
        }),
        importingMnemonic: false,
      });
    }

    // Calculate tip amounts

    // If imported successfully, use those

    const priceSource = `https://markets.api.bitcoin.com/rates/convertor?c=BCH&q=${selectedCurrency}`;
    let price;
    let priceJson;
    try {
      price = await fetch(priceSource);
    } catch (err) {
      console.log(`Error fetching price in importMnemonic()`);
      console.log(err);
      return this.setState({
        networkError: formatMessage({
          id: 'home.errors.priceApiError',
        }),
        importingMnemonic: false,
      });
    }

    try {
      priceJson = await price.json();
    } catch (err) {
      console.log(
        `Error converting price api output to JSON in importMnemonic()`,
      );
      console.log(err);
      return this.setState({
        networkError: formatMessage({
          id: 'home.errors.priceApiError',
        }),
        importingMnemonic: false,
      });
    }

    const fiatPrice = priceJson[selectedCurrency].rate;
    // console.log(`fiatPrice: ${fiatPrice}`);
    const calculatedFiatAmount = parseFloat(
      ((tipWallets[0].sats / 1e8) * fiatPrice).toFixed(2),
    );
    // console.log(`tipValue: ${calculatedFiatAmount}`);

    walletInfo.mnemonic = mnemonic;
    walletInfo.masterHDNode = masterHDNode;
    let allTipsSwept = false;
    // console.log(`claimedTipCount: ${claimedTipCount}`);
    if (claimedTipCount === tipWallets.length) {
      allTipsSwept = true;
    }

    this.setState(
      {
        walletInfo,
        fundingAddress,
        tipWallets,
        calculatedFiatAmount,
        importedMnemonic: true,
        tipsFunded: true,
        tipsClaimedCount: claimedTipCount,
        tipsAlreadySweptError: allTipsSwept,
        importingMnemonic: false,
      },
      this.subscribeToGifts(tipWallets),
    );
  }

  handleCreateTipSubmitButton() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData, invoiceGenerationError } = this.state;

    if (formData.tipAmountFiat.value === '') {
      formData.tipAmountFiat.error = formatMessage({
        id: 'home.errors.fiatTipAmountRequired',
      });
    }
    this.setState({ formData });

    // Reset to blank in case user is creating another invoice after an error
    if (invoiceGenerationError !== '') {
      this.setState({ invoiceGenerationError: '' });
    }
  }

  // TODO deal with this error
  // eslint-disable-next-line consistent-return
  async handleCreateTipSubmit(e) {
    e.preventDefault();
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData, walletInfo, selectedCurrency } = this.state;
    const { masterHDNode, derivePath } = walletInfo;
    this.setState({ generatingInvoice: true });

    if (formData.tipAmountFiat.value === '') {
      return this.setState({ generatingInvoice: false });
    }
    // Date picker form validation doesn't work with onsubmit, catch here
    if (
      formData.tipAmountFiat.error !== null ||
      formData.expirationDate.error !== null ||
      formData.tipCount.error !== null ||
      formData.emailAddress.error !== null
    ) {
      return this.setState({ generatingInvoice: false });
    }

    // Generate addresses and private keys for tips to be created

    const tipCount = formData.tipCount.value;
    const tipAmountFiat = formData.tipAmountFiat.value;

    const priceSource = `https://markets.api.bitcoin.com/rates/convertor?c=BCH&q=${selectedCurrency}`;
    let price;
    let priceJson;
    try {
      price = await fetch(priceSource);
    } catch (err) {
      console.log(`Error fetching price in handleCreateTipSubmit()`);
      console.log(err);
      return this.setState({
        generatingInvoice: false,
        invoiceGenerationError: formatMessage({
          id: 'home.errors.priceApiError',
        }),
      });
    }

    try {
      priceJson = await price.json();
    } catch (err) {
      console.log(
        `Error converting price api output to JSON in handleCreateTipSubmit()`,
      );
      console.log(err);
      return this.setState({
        generatingInvoice: false,
        invoiceGenerationError: formatMessage({
          id: 'home.errors.priceApiError',
        }),
      });
    }

    // log in with a mnemonic
    const fiatPrice = priceJson[selectedCurrency].rate;
    // console.log(`fiatPrice: ${fiatPrice}`);
    // convert this to sats
    // given, 1.0 BCH in local currency
    // find, tipAmountFiat in satoshis
    const tipAmountSats = Math.round((tipAmountFiat / fiatPrice) * 1e8);
    // console.log(`tipAmountSats: ${tipAmountSats}`);
    if (tipAmountSats < 5000) {
      // error
      return this.setState({
        generatingInvoice: false,
        invoiceGenerationError: formatMessage({
          id: 'home.errors.youreTooCheap',
        }),
      });
    }

    const invoiceMemo = `Funding transaction for ${tipCount} BCH gifts of ${tipAmountFiat} ${selectedCurrency} each`;
    const tipWallets = [];
    const fundingOutputs = [];

    for (let i = 0; i < tipCount; i += 1) {
      const tipWallet = { addr: '', wif: '', sats: '', status: 'unclaimed' };
      const fundingOutput = { address: '', amount: '' };
      // derive the ith external change address from the BIP44 account HDNode
      // get a child node
      const childNode = masterHDNode.derivePath(`${derivePath}${i}`);

      // get the cash address
      const fundingAddress = bitbox.HDNode.toCashAddress(childNode);
      // console.log(`${derivePath}${i}: ${fundingAddress}`);

      // get the priv key in wallet import format
      const wif = bitbox.HDNode.toWIF(childNode);

      // Assign a human readable name based on the address
      const callsignPicker = new Chance(`${fundingAddress}BCHPLS`);
      const callsign =
        callsigns[Math.floor(callsignPicker.random() * callsigns.length)];

      // Build tip object
      tipWallet.addr = fundingAddress;
      tipWallet.callsign = callsign;
      tipWallet.wif = wif;
      tipWallet.sats = tipAmountSats;

      tipWallets[i] = tipWallet;

      fundingOutput.address = fundingAddress;
      fundingOutput.amount = tipAmountSats;
      fundingOutputs.push(fundingOutput);
    }
    // console.log(`Building invoice with these funding outputs:`);
    // console.log(fundingOutputs);

    // get invoice
    fetch('https://pay.bitcoin.com/create_invoice', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        outputs: fundingOutputs,
        memo: invoiceMemo,
      }),
    })
      .then(response => response.json())
      .then(
        res => {
          // console.log(res);
          // catch errors that aren't handled by pay.bitcoin.com
          if (res.cause) {
            console.log(`Error in BIP070 invoice generation`);
            /*
            Sample response from request that should have been parsed by pay.bitcoin.com server:
            {
              "cause": {
                "name": "apollo.model.save.dberror"
              },
              "isOperational": true
            }
            */
            // handle this error
            return this.setState({
              generatingInvoice: false,
              invoiceGenerationError: formatMessage({
                id: 'home.errors.invoiceGenerationError',
              }),
            });
          }
          // console.log(`funding outputs used:`);
          // console.log(fundingOutputs);
          const { paymentId } = res;
          return this.setState(
            {
              generatingInvoice: false,
              invoiceUrl: `https://pay.bitcoin.com/i/${paymentId}`,
              tipWallets,
            },
            this.subscribeToGifts(tipWallets, paymentId),
          );
        },
        err => {
          console.log(`Error creating invoice`);
          console.log(err);
          return this.setState({
            generatingInvoice: false,
            invoiceGenerationError: formatMessage({
              id: 'home.errors.invoiceGenerationError',
            }),
          });
        },
      );
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const {
      formData,
      walletInfo,
      fundingAddress,
      selectedCurrency,
      tipWallets,
      invoiceUrl,
      importedMnemonic,
      importedGiftInfo,
      calculatedFiatAmount,
      tipsFunded,
      appState,
      invoiceGenerationError,
      sweptTxid,
      tipsSweptCount,
      showSweepForm,
      tipsAlreadySweptError,
      tipsClaimedCount,
      networkError,
      // invoiceTxid,
      generatingInvoice,
      importingMnemonic,
      apiPostFailed,
      createExpirationTxsFailed,
      customExpirationDate,
      showGiftNames,
      qrDots,
      qrLogo,
      selectedGiftDesign,
      pngLoading,
      pdfLoading,
      pdfPngs,
    } = this.state;

    const selectCurrencies = [
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
      { value: 'JPY', label: 'JPY' },
      { value: 'CNY', label: 'CNY' },
      { value: 'AUD', label: 'AUD' },
      { value: 'HKD', label: 'HKD' },
      { value: 'CAD', label: 'CAD' },
    ];

    const expirationDateOptions = [
      { value: 'oneDay', label: '24 hours' },
      { value: 'oneWeek', label: '1 week' },
      { value: 'twoWeeks', label: '2 weeks' },
      { value: 'oneMonth', label: '1 month' },
      { value: 'threeMonths', label: '3 months' },
      { value: 'custom', label: 'Custom' },
    ];

    const giftDesignOptions = [
      { value: 'default', label: 'Bitcoin.com' },
      { value: 'throwback', label: 'Classic' },
      { value: 'ezprint', label: 'Easy Print' },
    ];

    const printingTips = [];
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dateStr = `${monthNames[today.getMonth()]} ${date}, ${year}`;

    // Invoice URI
    const invoiceUri = `bitcoincash:?r=${invoiceUrl}`;

    let expirationDate;
    let giftInfoSuccess = false;
    let giftInfoFiatCurrency = selectedCurrency;
    let giftInfoFiatAmount = calculatedFiatAmount;
    let giftInfoGiftQty;
    let pdfDownloadFiatAmount = formData.tipAmountFiat.value;

    if (importedMnemonic) {
      try {
        expirationDate = importedGiftInfo[0].expirationStamp * 1000;
        giftInfoFiatCurrency = importedGiftInfo[0].fiatCode;
        giftInfoFiatAmount = importedGiftInfo[0].fiatAmount;
        giftInfoGiftQty = importedGiftInfo.length;
        giftInfoSuccess = true;
        pdfDownloadFiatAmount = giftInfoFiatAmount;
      } catch (err) {
        expirationDate = formData.expirationDate.value;
        pdfDownloadFiatAmount = giftInfoFiatAmount;
      }
    } else {
      expirationDate = formData.expirationDate.value;
    }

    if (expirationDate !== '') {
      expirationDate = new Date(expirationDate);
      const expirationDay = expirationDate.getDate();
      const expirationYear = expirationDate.getFullYear();
      expirationDate = `${
        monthNames[expirationDate.getMonth()]
      } ${expirationDay}, ${expirationYear}`;
    }

    const tipWidth = 2.5; // in
    const tipSpaceBetweenCols = 0.2; // in
    let displayWidth = '500px';
    if (tipWallets.length >= 4) {
      displayWidth = `${4 * tipWidth + 3 * tipSpaceBetweenCols}in`;
    } else {
      displayWidth = `${tipWallets.length * tipWidth +
        (tipWallets.length - 1) * tipSpaceBetweenCols}in`;
    }
    // console.log(`displayWidth: ${displayWidth}`);

    if (tipWallets.length > 0) {
      tipWallets.forEach(tipWallet => {
        printingTips.push(
          <Tip
            key={tipWallet.addr}
            tipWallet={tipWallet}
            fiatAmount={
              calculatedFiatAmount === null
                ? formData.tipAmountFiat.value
                : giftInfoFiatAmount
            }
            fiatCurrency={giftInfoFiatCurrency}
            dateStr={dateStr}
            expirationDate={expirationDate}
            status={tipWallet.status}
            share={this.shareTip}
            showGiftNames={showGiftNames}
            qrDots={qrDots}
            qrLogo={qrLogo}
            design={selectedGiftDesign}
            pngLoading={pngLoading}
          ></Tip>,
        );
      });
    }
    const sweepNotice = (
      <React.Fragment>
        <SweepNotice>
          <FormattedHTMLMessage
            id="home.notifications.giftsSwept"
            values={{
              tipsSweptCount,
              tipWalletsCount: tipWallets.length,
              sweptTxid,
              userRefundAddress: formData.userRefundAddress.value,
            }}
          />
          <br />
          <CardButton
            primary
            onClick={this.appStateInitial}
            style={{ marginTop: '24px' }}
          >
            <FormattedMessage id="home.buttons.newTips" />
          </CardButton>
        </SweepNotice>
      </React.Fragment>
    );
    const tipsAlreadySweptNotice = (
      <React.Fragment>
        <ErrorNotice>
          <FormattedMessage id="home.errors.cannotSweep" />
          <br />
          <CardButton
            primary
            onClick={this.appStateInitial}
            style={{ marginTop: '24px' }}
          >
            <FormattedMessage id="home.buttons.newTips" />
          </CardButton>
        </ErrorNotice>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {appState === appStates.initial && !importedMnemonic && (
          <HeaderContentBlock hero>
            <H1>
              <FormattedMessage id="home.header.title" />
            </H1>
            <Paragraph center>
              <FormattedMessage id="home.header.description" />
            </Paragraph>
            <CustomLink href="/faq">
              <FormattedMessage id="home.strings.faq" />
            </CustomLink>
          </HeaderContentBlock>
        )}
        <PrintableContentBlock>
          <ApiErrorPopup open={apiPostFailed}>
            <ApiErrorPopupCloser>X</ApiErrorPopupCloser>
            <ApiErrorPopupMsg>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.warning" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.giftDidNotPost" />
              </ApiErrorWarning>
            </ApiErrorPopupMsg>
          </ApiErrorPopup>
          <ApiErrorPopup open={createExpirationTxsFailed}>
            <ApiErrorPopupCloser>X</ApiErrorPopupCloser>
            <ApiErrorPopupMsg>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.warning" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.reclaim" />
              </ApiErrorWarning>
            </ApiErrorPopupMsg>
          </ApiErrorPopup>
          <CustomCardContainer
            show={fundingAddress === '' || importedMnemonic}
            columns={!importedMnemonic ? 2 : 1}
          >
            <WalletCard
              show={!importedMnemonic}
              title={formatMessage({
                id: 'home.cardTitles.makeNew',
              })}
            >
              <CardButton
                primary
                style={{ margin: 'auto' }}
                onClick={this.generateNewWallet}
              >
                <FormattedMessage id="home.buttons.createTips" />
              </CardButton>
            </WalletCard>
            <Card
              title={formatMessage({
                id: 'home.cardTitles.manageGifts',
              })}
            >
              <InputWrapper show>
                <Input
                  name="importedMnemonic"
                  type="text"
                  value={formData.importedMnemonic.value}
                  onChange={this.handleImportedMnemonicChange}
                  placeholder={formatMessage({
                    id: 'home.placeholders.importMnemonic',
                  })}
                  required
                />
                <InputError>{formData.importedMnemonic.error}</InputError>
                {networkError !== '' && <InputError>{networkError}</InputError>}
              </InputWrapper>
              <Buttons show={!showSweepForm || sweptTxid !== null}>
                <CardButton onClick={this.importMnemonic}>
                  {!importingMnemonic ? (
                    <FormattedMessage id="home.buttons.loadTips" />
                  ) : (
                    <FormattedMessage id="home.buttons.processing" />
                  )}
                </CardButton>
                {sweptTxid === null &&
                  importedMnemonic &&
                  !tipsAlreadySweptError && (
                    <CardButton primary onClick={this.toggleSweepForm}>
                      <FormattedMessage id="home.buttons.sweepAll" />
                    </CardButton>
                  )}
                {sweptTxid !== null ||
                  (tipsAlreadySweptError && (
                    <CardButton primary onClick={this.appStateInitial}>
                      <FormattedMessage id="home.buttons.newTips" />
                    </CardButton>
                  ))}
              </Buttons>
              {showSweepForm && (
                <React.Fragment>
                  <AddressForm
                    id="userRefundAddressFormOnImport"
                    onSubmit={this.sweepAllTips}
                    show={sweptTxid === null && !tipsAlreadySweptError}
                  >
                    <AddressInputWrapper show>
                      <AddressInputLabel>
                        <FormattedMessage id="home.labels.refundAddress" />{' '}
                        <Red>*</Red>
                      </AddressInputLabel>
                      <Input
                        name="userRefundAddress"
                        type="text"
                        value={formData.userRefundAddress.value}
                        onChange={this.handleUserRefundAddressChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.userRefundAddress',
                        })}
                        required
                      />

                      <InputError>
                        {formData.userRefundAddress.error}
                      </InputError>
                    </AddressInputWrapper>
                  </AddressForm>
                  <Buttons show={sweptTxid === null && !tipsAlreadySweptError}>
                    <CardButton
                      type="submit"
                      form="userRefundAddressFormOnImport"
                      primary
                      onClick={this.handleSweepAllTipsButton}
                      action="submit"
                    >
                      <FormattedMessage id="home.buttons.sweepAll" />
                    </CardButton>
                    <CardButton dark onClick={this.toggleSweepForm}>
                      <FormattedMessage id="home.buttons.goBack" />
                    </CardButton>
                  </Buttons>
                  <ButtonHider show={sweptTxid !== null}>
                    {sweepNotice}
                  </ButtonHider>
                  <ButtonHider show={tipsAlreadySweptError}>
                    {tipsAlreadySweptNotice}
                  </ButtonHider>
                </React.Fragment>
              )}
              {importedMnemonic && (
                <React.Fragment>
                  <CustomParagraph>
                    <FormattedMessage
                      id="home.strings.claimedCount"
                      values={{
                        tipsClaimedCount,
                        tipsTotalCount: tipWallets.length,
                      }}
                    />
                  </CustomParagraph>
                </React.Fragment>
              )}
            </Card>
          </CustomCardContainer>
          <CustomFlexCardContainer
            show={
              appState === appStates.seedGenerated ||
              appState === appStates.seedSaved
            }
          >
            <SeedCard title="Save Your Recovery Seed">
              <SeedReminderAbove>
                <FormattedMessage id="home.strings.seedReminderAbove" />
              </SeedReminderAbove>
              <CopyToClipboard
                text={walletInfo.mnemonic}
                onCopy={() => this.handleSeedCopied()}
              >
                <SeedWrapperAbove>{walletInfo.mnemonic}</SeedWrapperAbove>
              </CopyToClipboard>
              <SeedWarning>
                <FormattedMessage id="home.strings.seedWarning" />
              </SeedWarning>
              <Buttons show>
                <CopyToClipboard
                  text={walletInfo.mnemonic}
                  onCopy={() => this.handleSeedCopied()}
                >
                  <CardButton primary style={{ maxWidth: '212px' }}>
                    <FormattedMessage id="home.buttons.copySeed" />
                  </CardButton>
                </CopyToClipboard>
                <ButtonHider show={appState === appStates.seedSaved}>
                  <CardButton dark onClick={this.handleSeedSavedConfirmed}>
                    <FormattedMessage id="home.buttons.next" />
                  </CardButton>
                </ButtonHider>
              </Buttons>
            </SeedCard>
          </CustomFlexCardContainer>
          <CustomFlexCardContainer
            show={appState === appStates.seedSavedConfirmed}
          >
            <SeedCard title="Confirm Your Recovery Seed">
              <Form id="confirmSeed" onSubmit={this.handleConfirmedMnemonic}>
                <InputWrapper show>
                  <Input
                    name="userConfirmedMnemonic"
                    type="text"
                    value={formData.userConfirmedMnemonic.value}
                    onChange={this.handleUserConfirmedMnemonicChange}
                    placeholder={formatMessage({
                      id: 'home.placeholders.userConfirmedMnemonic',
                    })}
                    required
                  />
                  <InputError>
                    {formData.userConfirmedMnemonic.error}
                  </InputError>
                </InputWrapper>
              </Form>
              <Buttons show>
                <CardButton
                  type="submit"
                  form="confirmSeed"
                  primary
                  onClick={this.handleConfirmSeedButton}
                  action="submit"
                >
                  <FormattedMessage id="home.buttons.confirm" />
                </CardButton>
                <CardButton onClick={this.goBackOneStep}>
                  <FormattedMessage id="home.buttons.goBack" />
                </CardButton>
              </Buttons>
            </SeedCard>
          </CustomFlexCardContainer>
          <CustomFlexCardContainer
            show={appState === appStates.seedConfirmed}
            columns={2}
          >
            <MakeAndPayTipsCard title={tipsFunded ? '' : 'Build Your Gifts'}>
              {invoiceUrl === '' ? (
                <React.Fragment>
                  <Form id="createTip" onSubmit={this.handleCreateTipSubmit}>
                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.tipCount" />{' '}
                        <Red>*</Red>
                      </InputLabel>
                      <Input
                        id="tipCount"
                        name="tipCount"
                        type="number"
                        min="1"
                        max="20"
                        step="1"
                        value={formData.tipCount.value}
                        onChange={this.handleTipCountChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.tipCount',
                        })}
                        required
                      />
                      <InputError>{formData.tipCount.error}</InputError>
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.tipAmountFiat" />{' '}
                        <Red>*</Red>
                      </InputLabel>
                      <Input
                        id="tipAmountFiat"
                        name="tipAmountFiat"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.tipAmountFiat.value}
                        onChange={this.handleTipAmountFiatChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.tipAmountFiat',
                        })}
                        required
                      />
                      <InputError>{formData.tipAmountFiat.error}</InputError>
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.selectCurrency" />
                        <Red>*</Red>
                      </InputLabel>
                      <CustomSelect
                        onChange={this.handleSelectedCurrencyChange}
                        options={selectedCurrenciesFull}
                        defaultValue={selectedCurrenciesFull[40]}
                        isSearchable
                      />
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.emailAddress" />
                      </InputLabel>
                      <Input
                        id="emailAddress"
                        name="emailAddress"
                        type="text"
                        value={formData.emailAddress.value}
                        onChange={this.handleEmailAddressChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.emailAddress',
                        })}
                      />
                      <InputError>{formData.emailAddress.error}</InputError>
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.refundAddress" />{' '}
                      </InputLabel>
                      <Input
                        name="userRefundAddressOnCreate"
                        type="text"
                        value={formData.userRefundAddressOnCreate.value}
                        onChange={this.handleUserRefundAddressOnCreateChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.userRefundAddressOnCreate',
                        })}
                      />
                      <InputExtra>
                        <FormattedMessage id="home.strings.inputExtra" />
                      </InputExtra>
                      <InputError>
                        {formData.userRefundAddressOnCreate.error}
                      </InputError>
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.expirationDateSelect" />{' '}
                        <Red>*</Red>
                      </InputLabel>
                      <CustomSelect
                        onChange={this.handleSelectedExpirationDateChange}
                        options={expirationDateOptions}
                        defaultValue={expirationDateOptions[3]}
                      />
                    </InputWrapper>

                    <InputWrapper show={customExpirationDate}>
                      <InputLabel>
                        <FormattedMessage id="home.labels.expirationDate" />{' '}
                        <Red>*</Red>
                      </InputLabel>
                      <CustomDatePicker
                        selected={formData.expirationDate.value}
                        onChange={this.handleExpirationDateChange} // only when value has changed
                        dateFormat="Pp"
                      />
                      <InputError>{formData.expirationDate.error}</InputError>
                    </InputWrapper>
                  </Form>
                  <CardButton
                    type="submit"
                    form="createTip"
                    primary
                    style={{
                      margin: 'auto',
                      marginBottom: '12px',
                      zIndex: '1',
                    }}
                    onClick={this.handleCreateTipSubmitButton}
                    action="submit"
                  >
                    {generatingInvoice ? (
                      <FormattedMessage id="home.buttons.loading" />
                    ) : (
                      <FormattedMessage id="home.buttons.createTips" />
                    )}
                  </CardButton>

                  <ErrorNotice>{invoiceGenerationError}</ErrorNotice>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TipTable>
                    <thead>
                      <tr>
                        <TipTh>
                          <FormattedMessage id="home.labels.tableQty" />
                        </TipTh>
                        <TipTh>
                          <FormattedMessage id="home.labels.tableValue" />
                        </TipTh>
                        <TipTh>
                          <FormattedMessage id="home.labels.tableCurrency" />
                        </TipTh>
                        <TipTh>
                          <FormattedMessage id="home.labels.tableExpiration" />
                        </TipTh>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <TipTd>{formData.tipCount.value}</TipTd>
                        <TipTd>{formData.tipAmountFiat.value.toFixed(2)}</TipTd>
                        <TipTd>{selectedCurrency}</TipTd>
                        <TipTd>
                          {formData.expirationDate.value.toString()}
                        </TipTd>
                      </tr>
                    </tbody>
                  </TipTable>
                  <MobileTipTable>
                    <tbody>
                      <tr>
                        <MobileTipTh>
                          <FormattedMessage id="home.labels.tableQty" />
                        </MobileTipTh>
                        <TipTd>{formData.tipCount.value}</TipTd>
                      </tr>
                      <tr>
                        <MobileTipTh>
                          <FormattedMessage id="home.labels.tableValue" />
                        </MobileTipTh>
                        <TipTd>{formData.tipAmountFiat.value.toFixed(2)}</TipTd>
                      </tr>
                      <tr>
                        <MobileTipTh>
                          <FormattedMessage id="home.labels.tableCurrency" />
                        </MobileTipTh>
                        <TipTd>{selectedCurrency}</TipTd>
                      </tr>
                      <tr>
                        <MobileTipTh>
                          <FormattedMessage id="home.labels.tableExpiration" />
                        </MobileTipTh>
                        <TipTd>
                          {formData.expirationDate.value.toString()}
                        </TipTd>
                      </tr>
                    </tbody>
                  </MobileTipTable>
                  {!tipsFunded && (
                    <React.Fragment>
                      <SeedReminderAbove>
                        <FormattedMessage id="home.strings.seedReminderAbove" />
                      </SeedReminderAbove>
                      <CopyToClipboard
                        text={walletInfo.mnemonic}
                        onCopy={() => this.handleSeedCopied()}
                      >
                        <SeedWrapperAbove>
                          {walletInfo.mnemonic}
                        </SeedWrapperAbove>
                      </CopyToClipboard>
                    </React.Fragment>
                  )}

                  <BadgerWrap>
                    <MobileBadgerCover>
                      <a href={invoiceUri}>
                        <MobileBadgerUriOpener></MobileBadgerUriOpener>
                      </a>
                    </MobileBadgerCover>
                    <DesktopBadgerCover></DesktopBadgerCover>
                    <BadgerButton
                      text={tipsFunded ? 'Gifts Funded' : 'Fund Your Gifts'}
                      currency={selectedCurrency}
                      paymentRequestUrl={invoiceUrl}
                      isRepeatable={false}
                      successFn={this.invoiceSuccessThrottled}
                    />
                  </BadgerWrap>
                  {!tipsFunded && (
                    <React.Fragment>
                      <MobileButtonHider show={!tipsFunded}>
                        <MobileButton
                          primary
                          link
                          href={invoiceUri}
                          style={{
                            margin: 'auto',
                            marginBottom: '12px',
                          }}
                        >
                          <FormattedMessage id="home.buttons.mobilePay" />
                        </MobileButton>
                      </MobileButtonHider>
                      <ButtonHider show={!tipsFunded}>
                        <CopyToClipboard
                          text={invoiceUri}
                          onCopy={() => this.handleUriCopied()}
                        >
                          <CardButton
                            style={{
                              margin: 'auto',
                              marginBottom: '12px',
                            }}
                          >
                            <FormattedMessage id="home.buttons.copyUri" />
                          </CardButton>
                        </CopyToClipboard>
                      </ButtonHider>
                      <ButtonHider show={!tipsFunded}>
                        <CardButton
                          dark
                          style={{
                            margin: 'auto',
                          }}
                          onClick={this.handleCancelInvoice}
                        >
                          <FormattedMessage id="home.buttons.goBack" />
                        </CardButton>
                      </ButtonHider>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </MakeAndPayTipsCard>
          </CustomFlexCardContainer>
          <CustomFlexCardContainer show={apiPostFailed}>
            <ApiErrorCard show={apiPostFailed}>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.apiErrorWarningAlpha" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.apiErrorWarningBeta" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.apiErrorWarningGamma" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.apiErrorWarningDelta" />
              </ApiErrorWarning>
              <CardButton
                dark
                style={{
                  margin: 'auto',
                  marginTop: '12px',
                  zIndex: '1',
                }}
                onClick={this.retryPostReturnTxInfos}
              >
                <FormattedMessage id="home.buttons.repost" />
              </CardButton>
            </ApiErrorCard>
          </CustomFlexCardContainer>
          <CustomFlexCardContainer show={createExpirationTxsFailed}>
            <ApiErrorCard show={createExpirationTxsFailed}>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.txErrorWarningAlpha" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.txErrorWarningBeta" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.txErrorWarningGamma" />
              </ApiErrorWarning>
              <ApiErrorWarning>
                <FormattedMessage id="home.alerts.txErrorWarningDelta" />
              </ApiErrorWarning>
              <CardButton
                dark
                style={{
                  margin: 'auto',
                  marginTop: '12px',
                  zIndex: '1',
                }}
                onClick={this.retryInvoiceSuccess}
              >
                <FormattedMessage id="home.buttons.retry" />
              </CardButton>
            </ApiErrorCard>
          </CustomFlexCardContainer>
          <GiftsControlPanel
            title={formatMessage({
              id: 'home.cardTitles.customize',
            })}
            className="noPrint"
            show={tipWallets.length > 0 && tipsFunded}
          >
            <SeedReminderAbove>
              <FormattedMessage id="home.strings.seedReminderAbove" />
            </SeedReminderAbove>
            <CopyToClipboard
              text={walletInfo.mnemonic}
              onCopy={() => this.handleSeedCopied()}
            >
              <SeedWrapperAbove>{walletInfo.mnemonic}</SeedWrapperAbove>
            </CopyToClipboard>
            <SeedReminderBelow>
              <FormattedMessage id="home.strings.seedReminderBelow" />
            </SeedReminderBelow>
            {importedMnemonic && giftInfoSuccess && (
              <React.Fragment>
                <TipTable>
                  <thead>
                    <tr>
                      <TipTh>
                        <FormattedMessage id="home.labels.tableQty" />
                      </TipTh>
                      <TipTh>
                        <FormattedMessage id="home.labels.tableValue" />
                      </TipTh>
                      <TipTh>
                        <FormattedMessage id="home.labels.tableCurrency" />
                      </TipTh>
                      <TipTh>
                        <FormattedMessage id="home.labels.tableExpiration" />
                      </TipTh>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <TipTd>{giftInfoGiftQty}</TipTd>
                      <TipTd>{giftInfoFiatAmount}</TipTd>
                      <TipTd>{giftInfoFiatCurrency}</TipTd>
                      <TipTd>{expirationDate}</TipTd>
                    </tr>
                  </tbody>
                </TipTable>
                <MobileTipTable>
                  <tbody>
                    <tr>
                      <MobileTipTh>
                        <FormattedMessage id="home.labels.tableQty" />
                      </MobileTipTh>
                      <TipTd>{giftInfoGiftQty}</TipTd>
                    </tr>
                    <tr>
                      <MobileTipTh>
                        <FormattedMessage id="home.labels.tableValue" />
                      </MobileTipTh>
                      <TipTd>{giftInfoFiatAmount}</TipTd>
                    </tr>
                    <tr>
                      <MobileTipTh>
                        <FormattedMessage id="home.labels.tableCurrency" />
                      </MobileTipTh>
                      <TipTd>{giftInfoFiatCurrency}</TipTd>
                    </tr>
                    <tr>
                      <MobileTipTh>
                        <FormattedMessage id="home.labels.tableExpiration" />
                      </MobileTipTh>
                      <TipTd>{expirationDate}</TipTd>
                    </tr>
                  </tbody>
                </MobileTipTable>
              </React.Fragment>
            )}

            <ControlPanelForm style={{ margin: 'auto' }}>
              <InputWrapper>
                <Checkbox
                  name="qrDots"
                  text="QR Code Dots?"
                  checked={qrDots}
                  onChange={this.toggleQrDots}
                ></Checkbox>
              </InputWrapper>
              <InputWrapper>
                <Checkbox
                  name="qrLogo"
                  text="QR Code Logo?"
                  checked={qrLogo}
                  onChange={this.toggleQrLogo}
                ></Checkbox>
              </InputWrapper>
              <InputWrapper>
                <Checkbox
                  name="showGiftNames"
                  text="Show gift names?"
                  checked={showGiftNames}
                  onChange={this.toggleGiftNames}
                ></Checkbox>
              </InputWrapper>
              <InputWrapper show>
                <InputLabel>
                  <FormattedMessage id="home.labels.giftDesignSelect" />{' '}
                  <Red>*</Red>
                </InputLabel>
                <CustomSelect
                  onChange={this.handleGiftDesignChange}
                  options={giftDesignOptions}
                  defaultValue={giftDesignOptions[0]}
                  isSearchable={false}
                />
              </InputWrapper>
            </ControlPanelForm>

            {pdfLoading ? (
              <Loader style={{ margin: 'auto' }}></Loader>
            ) : (
              <CardButton
                primary
                onClick={this.makePdf}
                style={{ margin: 'auto' }}
              >
                <FormattedMessage id="home.buttons.makePdf" />
              </CardButton>
            )}

            {pdfPngs.length > 0 && (
              <React.Fragment>
                <br></br>
                <CustomPdfDownloadLink
                  document={<TipPdf images={pdfPngs} />}
                  fileName={`${pdfDownloadFiatAmount}${giftInfoFiatCurrency}x${tipWallets.length}_gifts.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <FormattedMessage id="home.buttons.loadingPdf" />
                    ) : (
                      <FormattedMessage id="home.buttons.downloadPdf" />
                    )
                  }
                </CustomPdfDownloadLink>
                {/* <PDFViewer>
                <TipPdf images={pdfPngs} />
              </PDFViewer> */}
              </React.Fragment>
            )}
          </GiftsControlPanel>

          <TipContainerWrapper maxWidth={displayWidth}>
            <TipContainer
              show={tipWallets.length > 0 && tipsFunded && !importingMnemonic}
              columns={4}
            >
              {tipWallets.length > 0 && printingTips}
            </TipContainer>
          </TipContainerWrapper>

          {tipWallets.length > 0 && tipsFunded && !importingMnemonic && (
            <React.Fragment>
              <ButtonHider className="noPrint" show>
                {pdfLoading ? (
                  <Loader style={{ margin: 'auto' }}></Loader>
                ) : (
                  <CardButton
                    primary
                    onClick={this.makePdf}
                    style={{ margin: 'auto' }}
                  >
                    <FormattedMessage id="home.buttons.makePdf" />
                  </CardButton>
                )}
              </ButtonHider>
            </React.Fragment>
          )}

          {pdfPngs.length > 0 && (
            <React.Fragment>
              <br></br>
              <CustomPdfDownloadLink
                className="noPrint"
                document={<TipPdf images={pdfPngs} />}
                fileName={`${pdfDownloadFiatAmount}${giftInfoFiatCurrency}x${tipWallets.length}_gifts.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <FormattedMessage id="home.buttons.loadingPdf" />
                  ) : (
                    <FormattedMessage id="home.buttons.downloadPdf" />
                  )
                }
              </CustomPdfDownloadLink>
              {/* <PDFViewer>
                <TipPdf images={pdfPngs} />
              </PDFViewer> */}
            </React.Fragment>
          )}

          <SweepAllCard
            title={formatMessage({
              id: 'home.cardTitles.sweepTitle',
            })}
            className="noPrint"
            show={tipWallets.length > 0 && tipsFunded}
          >
            <SweepInstructions>
              <FormattedMessage id="home.strings.sweepInstructions" />
            </SweepInstructions>
            <ButtonHider show={!showSweepForm}>
              <CardButton
                primary
                onClick={this.toggleSweepForm}
                style={{ margin: 'auto' }}
              >
                <FormattedMessage id="home.buttons.sweepAll" />
              </CardButton>
            </ButtonHider>
            {showSweepForm && (
              <React.Fragment>
                <AddressForm
                  id="userRefundAddressForm"
                  onSubmit={this.sweepAllTips}
                  show={sweptTxid === null && !tipsAlreadySweptError}
                >
                  <AddressInputWrapper show>
                    <AddressInputLabel>
                      <FormattedMessage id="home.labels.refundAddress" />{' '}
                      <Red>*</Red>
                    </AddressInputLabel>
                    <Input
                      name="userRefundAddress"
                      type="text"
                      value={formData.userRefundAddress.value}
                      onChange={this.handleUserRefundAddressChange}
                      placeholder={formatMessage({
                        id: 'home.placeholders.userRefundAddress',
                      })}
                      required
                    />
                    <InputError>{formData.userRefundAddress.error}</InputError>
                  </AddressInputWrapper>
                </AddressForm>
                <Buttons show={sweptTxid === null && !tipsAlreadySweptError}>
                  <CardButton
                    type="submit"
                    form="userRefundAddressForm"
                    primary
                    onClick={this.handleSweepAllTipsButton}
                    action="submit"
                  >
                    <FormattedMessage id="home.buttons.sweepAll" />
                  </CardButton>
                  <CardButton dark onClick={this.toggleSweepForm}>
                    <FormattedMessage id="home.buttons.goBack" />
                  </CardButton>
                </Buttons>
                <ButtonHider show={sweptTxid !== null}>
                  {sweepNotice}
                </ButtonHider>
                <ButtonHider show={tipsAlreadySweptError}>
                  {tipsAlreadySweptNotice}
                </ButtonHider>
              </React.Fragment>
            )}
          </SweepAllCard>
          <InputWrapper
            className="noPrint"
            show={importedMnemonic && !giftInfoSuccess}
          >
            <InputLabel>
              <FormattedMessage id="home.labels.changeCurrency" /> <Red>*</Red>
            </InputLabel>
            <Select
              onChange={this.handleSelectedCurrencyChangeFromSelect}
              options={selectCurrencies}
              defaultValue={selectCurrencies[0]}
              isSearchable
            />
          </InputWrapper>
        </PrintableContentBlock>
      </React.Fragment>
    );
  }
}

TipsPortal.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
    messages: PropTypes.object,
  }).isRequired,
};

export default injectIntl(TipsPortal);
