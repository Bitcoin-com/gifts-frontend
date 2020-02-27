import React from 'react';
import throttle from 'lodash.throttle';
import { injectIntl, FormattedMessage } from 'react-intl';
import memoize from 'memoize-one';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BITBOX } from 'bitbox-sdk';
import { BadgerButton } from 'badger-components-react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import QRCode from 'qrcode';
import PropTypes from 'prop-types';
import {
  Card,
  InputLabel,
  Input,
  InputSelect,
  Select,
} from 'bitcoincom-storybook';
import 'react-datepicker/dist/react-datepicker.css';
import merge from 'lodash/merge';

// import { PDFDownloadLink } from '@react-pdf/renderer';

import {
  PrintableContentBlock,
  CardButton,
  CustomCardContainer,
  CustomFlexCardContainer,
  InputWrapper,
  AddressInputWrapper,
  Form,
  InputError,
  Red,
  TipContainer,
  WalletCard,
  MakeAndPayTipsCard,
  TipTable,
  TipTd,
  TipTh,
  BadgerWrap,
  ButtonHider,
  TipContainerWrapper,
  SeedCard,
  SeedWrapper,
  SeedWarning,
  Buttons,
  CustomInfo,
  SeedReminder,
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
} from './styled';
import Tip from './Tip';
// disable PDF functionality
// import TipPdf from './TipPdf';
// import TipPdfDocument from './TipPdfDocument';

const bitbox = new BITBOX({
  restURL: 'https://rest.bitcoin.com/v2/',
});

const inputState = { untouched: 0, valid: 1, invalid: 2 };
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

    this.getCurrenciesOptions = this.getCurrenciesOptions.bind(this);
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
    this.createPdfQrCodes = this.createPdfQrCodes.bind(this);
    this.handleExpirationDateChange = this.handleExpirationDateChange.bind(
      this,
    );
    this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
    this.createExpirationTxs = this.createExpirationTxs.bind(this);
    this.postReturnTxInfos = this.postReturnTxInfos.bind(this);
    this.setDefaultExpirationDate = this.setDefaultExpirationDate.bind(this);
    this.retryPostReturnTxInfos = this.retryPostReturnTxInfos.bind(this);
    this.processRetryPostReturnTxInfos = this.processRetryPostReturnTxInfos.bind(
      this,
    );
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
      // eslint-disable-next-line react/no-unused-state
      qrCodeImgs: [],
      invoiceTxid: '',
      // eslint-disable-next-line react/no-unused-state
      returnTxInfos: [], // used for debugging
      generatingInvoice: false,
      apiPostFailed: false,
    };
  }

  getCurrenciesOptions = memoize(messages => {
    const currenciesOptions = {};
    Object.keys(messages).forEach(m => {
      if (m.startsWith('home.currenciesOptions')) {
        const split = m.split('.');
        const fiat = split[2];
        const field = split[3];
        const value = messages[m];
        if (typeof currenciesOptions[fiat] === 'undefined') {
          currenciesOptions[fiat] = {};
        }
        currenciesOptions[fiat][field] = value;
      }
    });
    return currenciesOptions;
  });

  componentDidMount() {
    // this.setDefaultExpirationDate();
  }

  componentWillUnmount() {
    this.invoiceSuccessThrottled.cancel();
  }

  setDefaultExpirationDate() {
    // Set expiration date to now + 3 months
    const { formData } = this.state;
    const expirationOffset = 3; // months
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
    if (date > expirationMax) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.invalidExpirationDate',
      });
    } else if (date < now) {
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
    }
    return field;
  };

  handleTipAmountFiatChange(e) {
    const value = e;
    const name = 'tipAmountFiat';
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

    field.value = value;
    field.state = inputState.valid;
    field.error = null;
    if (!value) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.fiatTipAmountNum',
      });
    } else if (value <= 0) {
      field.state = inputState.invalid;
      field.error = formatMessage({
        id: 'home.errors.fiatTipAmountRequired',
      });
    }
    return field;
  };

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

  postReturnTxInfos(returnTxInfos) {
    // Dev
    // const api = 'http://localhost:3001/setClaimChecks';
    // Prod
    const api = 'https://cashtips-api.btctest.net/setClaimChecks';
    fetch(api, {
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
    const api = 'https://cashtips-api.btctest.net/setClaimChecks';
    const { returnTxInfos } = this.state;
    fetch(api, {
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
        return this.setState(
          { apiPostFailed: true, returnTxInfos },
          this.handleReturnTxInfosError(),
        );
      },
    );
  }

  async createExpirationTxs() {
    console.log(`createExpirationTxs`);
    // Function is similar to sweepAllTips, however creates a rawTx for each input instead of one sweep tx
    // Build this for the case of "you just made the tips" first; simpler than the import case
    const {
      formData,
      tipWallets,
      invoiceTxid,
      selectedCurrency,
      invoiceUrl,
    } = this.state;
    const refundAddress = formData.userRefundAddressOnCreate.value;
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
    const u = await bitbox.Address.utxo(sweepAddresses);

    // Add the utxos to the sweepbuilder array
    // iterate over utxo object
    // if the address matches a sweepbuilder entry, add it to that entry
    // might be best to do this step in the txbuilder loop

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
    console.log(returnRawTxs);

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
      returnTxInfo.creationPaymentUrl = invoiceUrl;
      returnTxInfo.creationTxid = invoiceTxid;
      returnTxInfo.fiatCode = selectedCurrency;
      returnTxInfo.fiatAmount = fiatAmount;
      returnTxInfo.fiatRate = fiatRate;
      returnTxInfo.email = formData.emailAddress.value;
      returnTxInfo.rawTx = returnRawTxs[i];
      returnTxInfo.expirationStamp = expirationStamp;
      returnTxInfo.tipAddress = tipAddress;
      returnTxInfo.refundAddress = refundAddress;
      returnTxInfos.push(returnTxInfo);
    }
    console.log(returnTxInfos);
    return this.postReturnTxInfos(returnTxInfos);
  }

  invoiceSuccess() {
    const { tipWallets } = this.state;
    console.log(`Invoice paid successfully`);
    // build the output object for the tip claiming expiration here
    // get txid of invoice funding transaction
    bitbox.Address.details(tipWallets[0].addr).then(
      res => {
        console.log(res);
        let invoiceTxid = null;
        if (res.transactions.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          invoiceTxid = res.transactions[0];
        }
        return this.setState({ invoiceTxid, tipsFunded: true }, async () => {
          try {
            await this.createExpirationTxs();
          } catch (e) {
            console.log(`Error in createExpirationTxs()`);
          }
        });
      },
      err => {
        console.log(`Error in fetching txid of invoice payment transaction`);
        console.log(err);
        return this.setState(
          { invoiceTxid: null, tipsFunded: true },
          async () => {
            try {
              await this.createExpirationTxs();
            } catch (e) {
              console.log(`Error in createExpirationTxs()`);
            }
          },
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

    toast.notify('Recovery seed copied to clipboard', {
      position: 'bottom-right',
      duration: 1500,
    });
    if (appState === appStates.seedGenerated) {
      this.setState({ appState: appStates.seedSaved });
    }
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
    console.log(sweepBuilder);
    // TODO can you get batch utxos from more than 20 addresses?
    // check balances of addresses in one async batch
    const u = await bitbox.Address.utxo(sweepAddresses);
    // todo handle errors here with try/catch
    console.log(`utxos:`);
    console.log(u);

    // Add the utxos to the sweepbuilder array
    // iterate over utxo object
    // if the address matches a sweepbuilder entry, add it to that entry
    // might be best to do this step in the txbuilder loop

    for (let i = 0; i < u.length; i += 1) {
      // utxos come back in same order they were sent
      // handle case that not all addresses will have utxos later
      sweepBuilder[i].utxos = u[i].utxos;
    }
    console.log(`completed sweepBuilder:`);
    console.log(sweepBuilder);

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
        console.log(`Input ${inputCount + 1}: { ${utxo.txid} , ${utxo.vout}}`);

        transactionBuilder.addInput(utxo.txid, utxo.vout);
        inputCount += 1;
      }
    }
    if (originalAmount < 1) {
      console.log(`originalAmount is 0, handle as error`);
      return this.setState({ tipsAlreadySweptError: true });
    }
    console.log(`Total inputs: ${inputCount}`);
    const byteCount = bitbox.BitcoinCash.getByteCount(
      { P2PKH: inputCount },
      { P2PKH: 1 },
    );
    // Use 2 sats/byte to avoid any mempool errors
    const fee = Math.ceil(2 * byteCount);
    console.log(`fee: ${fee}`);
    // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    const sendAmount = originalAmount - fee;
    console.log(`sendAmount: ${sendAmount}`);

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
        console.log(
          `Signed input ${i} round ${j} with ${sweepBuilder[j].ecPair.d[0]}`,
        );
      }
    }
    // build tx
    const tx = transactionBuilder.build();
    // output rawhex
    const hex = tx.toHex();
    console.log(hex);

    try {
      const txid = await bitbox.RawTransactions.sendRawTransaction([hex]);
      const txidStr = txid[0];
      console.log(typeof txid);
      console.log(`txidStr: ${txidStr}`);
      console.log(`txid: ${txid}`);
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
    });
  }

  async handleSelectedCurrencyChangeFromSelect(e) {
    const { tipWallets } = this.state;
    const currency = e.value;
    const currencyCode = currency.toLowerCase();
    const price = await fetch(
      `https://index-api.bitcoin.com/api/v0/cash/price/${currencyCode}`,
    );

    const priceJson = await price.json();

    const fiatPrice = priceJson.price / 100;
    // console.log(`fiatPrice: ${fiatPrice}`);
    const calculatedFiatAmount = parseFloat(
      ((tipWallets[0].sats / 1e8) * fiatPrice).toFixed(2),
    );
    this.setState({
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

  handleSelectedCurrencyChange(selectedCurrency) {
    this.setState({
      selectedCurrency,
    });
  }

  handleCancelInvoice() {
    this.setState({
      invoiceUrl: '',
      tipWallets: [],
    });
  }

  generateNewWallet() {
    this.setDefaultExpirationDate();
    const { walletInfo } = this.state;
    const entropy = bitbox.Crypto.randomBytes(16);
    //
    // turn entropy to 12 word mnemonic
    const mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
    // const mnemonic = 'road adapt scorpion buzz home sentence puzzle bracket carry potato fault arrow';
    // const mnemonic ='report enact exclude useless fun scale recipe moral join lobster wasp flower';
    console.log(`test: has latest code been pushed to testnet?`);
    console.log(mnemonic);

    // root seed buffer
    const rootSeed = bitbox.Mnemonic.toSeed(mnemonic);
    console.log(`rootSeed generated`);

    // master HDNode
    const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, 'mainnet');
    console.log(`masterHDNode generated`);

    // HDNode of BIP44 account
    const account = bitbox.HDNode.derivePath(
      masterHDNode,
      `${walletInfo.derivePath}0`,
    );
    console.log(`account generated`);

    const fundingAddress = bitbox.HDNode.toCashAddress(account);

    console.log(`cashAddress: ${fundingAddress}`);

    walletInfo.mnemonic = mnemonic;
    walletInfo.masterHDNode = masterHDNode;

    this.setState({
      walletInfo,
      fundingAddress,
      appState: appStates.seedGenerated,
    });
  }

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
    const { derivePath } = walletInfo;
    let claimedTipCount = 0;

    // reset to 0 in case the user is importing with tips already on the page
    const tipWallets = [];

    if (formData.importedMnemonic.state !== 1) {
      // console.log(`Invalid Mnemonic, kicked out of function`);
      return;
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
    // const mnemonic = 'road adapt scorpion buzz home sentence puzzle bracket carry potato fault arrow';
    // const mnemonic ='report enact exclude useless fun scale recipe moral join lobster wasp flower';
    console.log(mnemonic);

    // root seed buffer
    const rootSeed = bitbox.Mnemonic.toSeed(mnemonic);

    // master HDNode
    const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, 'bitcoincash');

    // HDNode of BIP44 account
    /*
    const account = bitbox.HDNode.derivePath(
      masterHDNode,
      `${walletInfo.derivePath}0`,
    );
    */

    // get the first child node
    const childNode = masterHDNode.derivePath(`${derivePath}${0}`);

    // const account = bitbox.HDNode.createAccount([childNode]);
    // const test = account.getChainAddress(0);
    // console.log(`chainAddress:`);
    // console.log(test);
    const fundingAddress = bitbox.HDNode.toCashAddress(childNode);
    const fundingWif = bitbox.HDNode.toWIF(childNode);

    console.log(`cashAddress: ${fundingAddress}`);

    // Check if tips have already been created for this mnemonic
    // 1 - check balance of the first address
    // 2 - if balance, keep checking balances of ith addresses until you hit a zero balance
    // 3 - load page based on number of tips already created
    // NB that there could be an issue if the user created 10 tips and the first 1 has been claimed, but not next 9
    // So...probably better to check tx history and not only balance

    try {
      const addrDetails = await bitbox.Address.details(fundingAddress);
      console.log(addrDetails);
      const txHistory = addrDetails.transactions;
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

        if (
          txHistory.length === 1 &&
          (addrDetails.balance > 0 || addrDetails.unconfirmedBalanceSat > 0)
        ) {
          firstTipWallet.status = 'funded';
        } else if (txHistory.length > 1 && addrDetails.balance === 0) {
          firstTipWallet.status = 'claimed';
        }

        firstTipWallet.addr = fundingAddress;
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
          };
          const potentialChildNode = masterHDNode.derivePath(
            `${derivePath}${i}`,
          );
          const potentialTipAddress = bitbox.HDNode.toCashAddress(
            potentialChildNode,
          );
          const potentialTipWif = bitbox.HDNode.toWIF(potentialChildNode);
          // console.log(`${derivePath}${i}: ${potentialTipAddress}`);

          potentialTipWallet.addr = potentialTipAddress;
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
          console.log(potentialTipDetails);

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
                tipWallet.status = 'funded';
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
              tipWallets.push(tipWallet);
            } else {
              console.log(`You have ${i} tips in this wallet`);
              break;
            }
          }
          console.log(`tipWallets:`);
          console.log(tipWallets);
        } catch (err) {
          console.log(`Error in bitbox.Address.details[potentialTipDetails]`);
          console.log(err);
          return;
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
        });
      }

      // else just load the next stuff as usual

      // validate history for tip site behavior
      // if yes, load it as tip site
      // if no, say there seems to be something weird
    } catch (err) {
      console.log(`Error in bitbox.Address.details(firstTipAddr)`);
      console.log(err);
      // eslint-disable-next-line consistent-return
      return this.setState({
        networkError: formatMessage({
          id: 'home.errors.networkError',
        }),
      });
    }

    // Calculate tip amounts
    const currencyCode = selectedCurrency.toLowerCase();
    const price = await fetch(
      `https://index-api.bitcoin.com/api/v0/cash/price/${currencyCode}`,
    );
    const priceJson = await price.json();

    // NEXT STEP
    // get the forex endpoint working, you can use legacy
    // get tips created with forex and all the data you want on them
    // log in with a mnemonic
    const fiatPrice = priceJson.price / 100;
    // console.log(`fiatPrice: ${fiatPrice}`);
    const calculatedFiatAmount = parseFloat(
      ((tipWallets[0].sats / 1e8) * fiatPrice).toFixed(2),
    );
    // console.log(`tipValue: ${calculatedFiatAmount}`);

    walletInfo.mnemonic = mnemonic;
    walletInfo.masterHDNode = masterHDNode;
    let allTipsSwept = false;
    console.log(`claimedTipCount: ${claimedTipCount}`);
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
      },
      this.createPdfQrCodes(tipWallets),
    );
  }

  createPdfQrCodes(tipWallets) {
    // console.log(`createPdfQrCodes()`);
    // get array of wifs from tipWallets
    // make array of promises
    // promise.all with a .then to set state
    const qrPromises = [];
    for (let i = 0; i < tipWallets.length; i += 1) {
      const wifToQr = tipWallets[i].wif;
      const wifToQrPromise = QRCode.toDataURL(wifToQr);
      qrPromises.push(wifToQrPromise);
    }
    Promise.all(qrPromises).then(
      res => {
        // console.log(res);
        this.setState({
          // TODO get rid of this function if you do not need it for pdf generation
          // eslint-disable-next-line react/no-unused-state
          qrCodeImgs: res,
        });
      },
      err => {
        console.log(err);
      },
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
    this.setState({ generatingInvoice: true });
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
      return this.setState({ generatingInvoice: true });
    }

    // Generate addresses and private keys for tips to be created

    const tipCount = formData.tipCount.value;
    const tipAmountFiat = formData.tipAmountFiat.value;

    const currencyCode = selectedCurrency.toLowerCase();
    const price = await fetch(
      `https://index-api.bitcoin.com/api/v0/cash/price/${currencyCode}`,
    );
    const priceJson = await price.json();

    // NEXT STEP
    // get the forex endpoint working, you can use legacy
    // get tips created with forex and all the data you want on them
    // log in with a mnemonic
    const fiatPrice = priceJson.price / 100;
    console.log(`fiatPrice: ${fiatPrice}`);
    // convert this to sats
    // given, 1.0 BCH in local currency
    // find, tipAmountFiat in satoshis
    const tipAmountSats = Math.round((tipAmountFiat / fiatPrice) * 1e8);
    console.log(`tipAmountSats: ${tipAmountSats}`);
    if (tipAmountSats < 5000) {
      // error
      return this.setState({
        generatingInvoice: false,
        invoiceGenerationError: formatMessage({
          id: 'home.errors.youreTooCheap',
        }),
      });
    }

    const invoiceMemo = `Funding transaction for ${tipCount} BCH tips of ${tipAmountFiat} dollars each`;
    const tipWallets = [];
    const fundingOutputs = [];

    for (let i = 0; i < tipCount; i += 1) {
      const tipWallet = { addr: '', wif: '', sats: '', status: 'funded' };
      const fundingOutput = { address: '', amount: '' };
      // derive the ith external change address from the BIP44 account HDNode
      // get a child node
      const childNode = masterHDNode.derivePath(`${derivePath}${i}`);

      // get the cash address
      const fundingAddress = bitbox.HDNode.toCashAddress(childNode);
      console.log(`${derivePath}${i}: ${fundingAddress}`);

      // get the priv key in wallet import format
      const wif = bitbox.HDNode.toWIF(childNode);

      // Build tip object
      tipWallet.addr = fundingAddress;
      tipWallet.wif = wif;
      tipWallet.sats = tipAmountSats;

      tipWallets[i] = tipWallet;

      fundingOutput.address = fundingAddress;
      fundingOutput.amount = tipAmountSats;
      fundingOutputs.push(fundingOutput);
    }
    console.log(`Building invoice with these funding outputs:`);
    console.log(fundingOutputs);

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
          console.log(res);
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
          console.log(`funding outputs used:`);
          console.log(fundingOutputs);
          const { paymentId } = res;
          return this.setState(
            {
              generatingInvoice: false,
              invoiceUrl: `https://pay.bitcoin.com/i/${paymentId}`,
              tipWallets,
            },
            this.createPdfQrCodes(tipWallets),
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
      intl: { formatMessage, messages },
    } = this.props;
    const {
      formData,
      walletInfo,
      fundingAddress,
      selectedCurrency,
      tipWallets,
      invoiceUrl,
      importedMnemonic,
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
      // qrCodeImgs,
      // invoiceTxid,
      generatingInvoice,
      apiPostFailed,
    } = this.state;

    const currencies = this.getCurrenciesOptions(messages);

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

    const printingTips = [];
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dateStr = `${monthNames[today.getMonth()]} ${date}, ${year}`;
    const tipWidth = 2;
    let displayWidth = '500px';
    if (tipWallets.length >= 6) {
      displayWidth = `${6 * tipWidth}in`;
    } else {
      displayWidth = `${tipWallets.length * tipWidth}in`;
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
                : calculatedFiatAmount
            }
            fiatCurrency={selectedCurrency}
            dateStr={dateStr}
            status={tipWallet.status}
          ></Tip>,
        );
      });
    }
    const sweepNotice = (
      <React.Fragment>
        <SweepNotice>
          {tipsSweptCount} of original {tipWallets.length} tips have been{' '}
          <a
            href={`https://explorer.bitcoin.com/bch/tx/${sweptTxid}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            swept
          </a>{' '}
          to{' '}
          <a
            href={`https://explorer.bitcoin.com/bch/address/${formData.userRefundAddress.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formData.userRefundAddress.value}
          </a>
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
          Error: Cannot sweep tips, all tips have already been claimed!
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
        <PrintableContentBlock>
          <ApiErrorPopup open={apiPostFailed}>
            <ApiErrorPopupCloser>X</ApiErrorPopupCloser>
            <ApiErrorPopupMsg>
              <ApiErrorWarning>Warning!</ApiErrorWarning>
              <ApiErrorWarning>
                Tip information failed to post to backend. Your tips will not be
                automatically returned to you on expiration.
              </ApiErrorWarning>
            </ApiErrorPopupMsg>
          </ApiErrorPopup>
          <CustomCardContainer
            show={fundingAddress === '' || importedMnemonic}
            columns={!importedMnemonic ? 2 : 1}
          >
            <WalletCard show={!importedMnemonic} title="Make New Tips">
              <CardButton
                primary
                style={{ margin: 'auto' }}
                onClick={this.generateNewWallet}
              >
                <FormattedMessage id="home.buttons.createTips" />
              </CardButton>
            </WalletCard>
            <Card title="Manage Created Tips">
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
                  {!importedMnemonic ? `Load Tips` : `Refresh`}
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
                      <InputError>
                        {formData.userRefundAddress.error}
                      </InputError>
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
              {importedMnemonic && (
                <React.Fragment>
                  <p>
                    {tipsClaimedCount} of {tipWallets.length} tips have been
                    claimed
                  </p>
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
              <SeedWarning>
                Please write down your recovery seed. This 12-word phrase will
                be the only way to recover your tips!
              </SeedWarning>
              <CopyToClipboard
                text={walletInfo.mnemonic}
                onCopy={() => this.handleSeedCopied()}
              >
                <SeedWrapper>{walletInfo.mnemonic}</SeedWrapper>
              </CopyToClipboard>
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
                    Fund Tips
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
                  Confirm
                </CardButton>
                <CardButton onClick={this.goBackOneStep}>Back</CardButton>
              </Buttons>
            </SeedCard>
          </CustomFlexCardContainer>
          <CustomFlexCardContainer
            show={appState === appStates.seedConfirmed}
            columns={2}
          >
            <MakeAndPayTipsCard title={tipsFunded ? '' : 'Create your tips'}>
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
                      <InputSelect
                        name="tipAmountFiat"
                        min="0"
                        step="0.01"
                        selected={selectedCurrency}
                        value={formData.tipAmountFiat.value}
                        onChange={this.handleTipAmountFiatChange}
                        select={this.handleSelectedCurrencyChange}
                        options={currencies}
                        initialOptions={messages['home.initialCurrencies']}
                        searchable
                        placeholder={formatMessage({
                          id: 'home.placeholders.tipAmountFiat',
                        })}
                        searchPlaceholder="Search Currency"
                        type="currency"
                        required
                      />
                      <InputError>{formData.tipAmountFiat.error}</InputError>
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
                        <Red>*</Red>
                      </InputLabel>
                      <Input
                        name="userRefundAddressOnCreate"
                        type="text"
                        value={formData.userRefundAddressOnCreate.value}
                        onChange={this.handleUserRefundAddressOnCreateChange}
                        placeholder={formatMessage({
                          id: 'home.placeholders.userRefundAddressOnCreate',
                        })}
                        required
                      />
                      <InputError>
                        {formData.userRefundAddressOnCreate.error}
                      </InputError>
                    </InputWrapper>

                    <InputWrapper show>
                      <InputLabel>
                        <FormattedMessage id="home.labels.expirationDate" />{' '}
                        <Red>*</Red>
                      </InputLabel>
                      <CustomDatePicker
                        selected={formData.expirationDate.value}
                        onChange={this.handleExpirationDateChange} // only when value has changed
                        showTimeSelect
                        timeIntervals={1}
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
                        <TipTh>Quantity</TipTh>
                        <TipTh>Value per tip</TipTh>
                        <TipTh>Currency</TipTh>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <TipTd>{formData.tipCount.value}</TipTd>
                        <TipTd>{formData.tipAmountFiat.value.toFixed(2)}</TipTd>
                        <TipTd>{selectedCurrency}</TipTd>
                      </tr>
                    </tbody>
                  </TipTable>
                  <BadgerWrap>
                    <BadgerButton
                      text={tipsFunded ? 'Tips Funded' : 'Fund Your Tips'}
                      currency={selectedCurrency}
                      paymentRequestUrl={invoiceUrl}
                      isRepeatable={false}
                      successFn={this.invoiceSuccessThrottled}
                    />
                  </BadgerWrap>
                  {tipsFunded ? (
                    <React.Fragment>
                      <CopyToClipboard
                        text={walletInfo.mnemonic}
                        onCopy={() => this.handleSeedCopied()}
                      >
                        <SeedWrapper>{walletInfo.mnemonic}</SeedWrapper>
                      </CopyToClipboard>
                      <CopyToClipboard
                        text={walletInfo.mnemonic}
                        onCopy={() => this.handleSeedCopied()}
                      >
                        <CardButton
                          primary
                          style={{ margin: 'auto', maxWidth: '212px' }}
                        >
                          <FormattedMessage id="home.buttons.copySeed" />
                        </CardButton>
                      </CopyToClipboard>
                      <SeedReminder>
                        Save this seed to access your tips in the future.
                      </SeedReminder>
                      {sweptTxid === null && (
                        <React.Fragment>
                          <AddressForm
                            id="userRefundAddressForm"
                            onSubmit={this.sweepAllTips}
                            show={sweptTxid === null}
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
                          <CardButton
                            type="submit"
                            form="userRefundAddressForm"
                            primary
                            style={{ margin: 'auto', marginBottom: '12px' }}
                            onClick={this.handleSweepAllTipsButton}
                            action="submit"
                          >
                            <FormattedMessage id="home.buttons.sweepAll" />
                          </CardButton>
                        </React.Fragment>
                      )}

                      <ButtonHider show={sweptTxid !== null}>
                        {sweepNotice}
                      </ButtonHider>
                      <ButtonHider show={tipsAlreadySweptError}>
                        {tipsAlreadySweptNotice}
                      </ButtonHider>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <ButtonHider show={!tipsFunded}>
                        <CustomInfo>Not what you wanted?</CustomInfo>
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
                Failed to post your tip expiration claim transactions to the
                server.
              </ApiErrorWarning>{' '}
              <ApiErrorWarning>
                Tips will not automatically expire!
              </ApiErrorWarning>{' '}
              <ApiErrorWarning>
                Please try to repost your tip information. If the issue
                persists, contact tips-support@bitcoin.com
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
                Repost
              </CardButton>
            </ApiErrorCard>
          </CustomFlexCardContainer>
          <TipContainerWrapper maxWidth={displayWidth}>
            <TipContainer
              show={tipWallets.length > 0 && tipsFunded}
              columns={6}
            >
              {tipWallets.length > 0 && printingTips}
            </TipContainer>
          </TipContainerWrapper>
          {/* tipWallets.length > 0 && qrCodeImgs.length > 0 && (
            <PDFDownloadLink
              document={
                <TipPdfDocument
                  tipWallets={tipWallets}
                  qrCodeImgs={qrCodeImgs}
                  fiatAmount={
                    calculatedFiatAmount === null
                      ? formData.tipAmountFiat.value
                      : calculatedFiatAmount
                  }
                  fiatCurrency={selectedCurrency}
                  dateStr={dateStr}
                />
              }
              fileName="gifts.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading...' : 'Print PDF'
              }
            </PDFDownloadLink>
            ) */}
          <InputWrapper className="noPrint" show={importedMnemonic}>
            <InputLabel>
              <FormattedMessage id="home.labels.changeCurrency" /> <Red>*</Red>
            </InputLabel>
            <Select
              onChange={this.handleSelectedCurrencyChangeFromSelect}
              options={selectCurrencies}
              selectedOption={selectCurrencies[0]}
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
