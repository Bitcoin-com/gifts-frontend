import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import memoize from 'memoize-one';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BITBOX } from 'bitbox-sdk';
import { BadgerButton } from 'badger-components-react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import PropTypes from 'prop-types';
import {
  ContentBlock,
  Card,
  InputLabel,
  Input,
  InputSelect,
} from 'bitcoincom-storybook';
import merge from 'lodash/merge';
import Tip from './Tip';
import {
  CardButton,
  CustomCardContainer,
  CustomFlexCardContainer,
  InputWrapper,
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
} from './styled';

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
    };

    this.getCurrenciesOptions = this.getCurrenciesOptions.bind(this);
    this.handleSelectedCurrencyChange = this.handleSelectedCurrencyChange.bind(
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
    this.importMnemonicOneByOne = this.importMnemonicOneByOne.bind(this);

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
      tipWallets: [],
      invoiceUrl: '',
      importedMnemonic: false,
      calculatedFiatAmount: null,
      tipsFunded: false,
      appState: appStates.initial,
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

  handleSelectedCurrencyChange(selectedCurrency) {
    this.setState({
      selectedCurrency,
    });
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

  goBackOneStep() {
    const { appState } = this.state;

    const backOne = appState - 1;

    this.setState({ appState: backOne });
  }

  handleSeedSavedConfirmed() {
    this.setState({
      appState: appStates.seedSavedConfirmed,
    });
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

  handleConfirmSeedButton() {
    // set state that seed is confirmed
  }

  invoiceSuccess() {
    console.log(`Invoice paid successfully`);
    this.setState({
      tipsFunded: true,
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

  handleCancelInvoice() {
    this.setState({
      invoiceUrl: '',
      tipWallets: [],
    });
  }

  generateNewWallet() {
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
    const { walletInfo, formData, selectedCurrency } = this.state;
    const { derivePath } = walletInfo;

    // reset to 0 in case the user is importing with tips already on the page
    const tipWallets = [];

    if (formData.importedMnemonic.state !== 1) {
      // console.log(`Invalid Mnemonic, kicked out of function`);
      return;
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
      // console.log(addrDetails);
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
        if (txHistory.length === 1 && addrDetails.balance > 0) {
          firstTipWallet.status = 'funded';
        } else if (txHistory.length > 1 && addrDetails.balance === 0) {
          firstTipWallet.status = 'claimed';
        }

        firstTipWallet.addr = fundingAddress;
        firstTipWallet.sats = addrDetails.totalReceivedSat;
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
              tipWallet.sats = potentialTipDetails[i].totalReceivedSat;
              if (
                potentialTipDetails[i].transactions.length === 1 &&
                potentialTipDetails[i].balance > 0
              ) {
                tipWallet.status = 'funded';
              } else if (
                potentialTipDetails[i].transactions.length > 1 &&
                (potentialTipDetails[i].balance === 0 ||
                  potentialTipDetails[i].unconfirmedBalanceSat < 0)
              ) {
                tipWallet.status = 'claimed';
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
      }

      // else just load the next stuff as usual

      // validate history for tip site behavior
      // if yes, load it as tip site
      // if no, say there seems to be something weird
    } catch (err) {
      console.log(`Error in bitbox.Address.details(firstTipAddr)`);
      console.log(err);
      return;
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

    this.setState({
      walletInfo,
      fundingAddress,
      tipWallets,
      calculatedFiatAmount,
      importedMnemonic: true,
      tipsFunded: true,
    });
  }

  async importMnemonicOneByOne() {}

  handleCreateTipSubmitButton() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { formData } = this.state;
    console.log(formData.tipAmountFiat.value);
    if (formData.tipAmountFiat.value === '') {
      formData.tipAmountFiat.error = formatMessage({
        id: 'home.errors.fiatTipAmountRequired',
      });
    }
    this.setState({ formData });
  }

  async handleCreateTipSubmit(e) {
    e.preventDefault();

    const { formData, walletInfo, selectedCurrency } = this.state;
    const { masterHDNode, derivePath } = walletInfo;

    if (formData.tipAmountFiat.value === '') {
      return;
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
    // console.log(`tipAmountSats: ${tipAmountSats}`);

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
            console.log(`Unhandled error in BIP070 invoice generation`);
            /*
            Sample response from request that should have been parsed by pay.bitcoin.com server:
            {
              "cause": {
                "name": "apollo.model.save.dberror"
              },
              "isOperational": true
            }
            */
          }
          console.log(`funding outputs used:`);
          console.log(fundingOutputs);
          const { paymentId } = res;
          this.setState({
            invoiceUrl: `https://pay.bitcoin.com/i/${paymentId}`,
          });
        },
        err => {
          console.log(`error creating invoice`);
          console.log(err);
        },
      );

    // badger invoice with that invoice url

    console.log(tipWallets);
    this.setState({ tipWallets });
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
    } = this.state;

    const currencies = this.getCurrenciesOptions(messages);

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

    return (
      <React.Fragment>
        <ContentBlock>
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
                Generate Tips
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
              </InputWrapper>

              <CardButton
                onClick={this.importMnemonic}
                style={{ margin: 'auto', paddingTop: '12px' }}
              >
                {!importedMnemonic ? `Load Tips` : `Refresh`}
              </CardButton>
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
              <Buttons>
                <CopyToClipboard
                  text={walletInfo.mnemonic}
                  onCopy={() => this.handleSeedCopied()}
                >
                  <CardButton primary>
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
              <Buttons>
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
                  </Form>

                  <CardButton
                    type="submit"
                    form="createTip"
                    primary
                    style={{ margin: 'auto' }}
                    onClick={this.handleCreateTipSubmitButton}
                    action="submit"
                  >
                    <FormattedMessage id="home.buttons.createTips" />
                  </CardButton>
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
                      failFn={console.log(`invoice failed`)}
                      successFn={this.invoiceSuccess}
                    />
                  </BadgerWrap>
                  {tipsFunded ? (
                    <CopyToClipboard
                      text={walletInfo.mnemonic}
                      onCopy={() => this.handleSeedCopied()}
                    >
                      <SeedWrapper>{walletInfo.mnemonic}</SeedWrapper>
                    </CopyToClipboard>
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
          <TipContainerWrapper maxWidth={displayWidth}>
            <TipContainer
              show={tipWallets.length > 0 && tipsFunded}
              columns={6}
            >
              {tipWallets.length > 0 && printingTips}
            </TipContainer>
          </TipContainerWrapper>
        </ContentBlock>
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