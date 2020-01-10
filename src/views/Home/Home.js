import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Nav, Footer } from 'bitcoincom-universal';
import { Wrapper, HeadSection } from './styled';
import SEO from './SEO';
import TipsPortal from './TipsPortal';
import './print.css';

// Next steps

// DONE 1 - InputSelect for currency and amount
// 2 - next thing to get the app just working
// - import badger-react-components
// - based on input from create tips form, generate an invoice for badger-react-components
//    note: clicking the create tip button should hide the create tip button, lock the input,
//          and show an invoice with a "go back" option to undo all this
// - when invoice is paid, execute a function

// next; define what that function does; make it create tips

// 3 - stuff like login, polishing
// 4 - css review

// Display QR code -- actually do this with badger-components-react
// AFTER user has filled out what kind of tips they want

// make other card an 'import wallet' card

// use inputselect to pick a currency, like in price converter

// functionality for generate wallet
// functionality for import wallet
// that's it for today

// after wallet creation, prompt user to save their seed phrase, paste it back into a field
// THEN show next step

// App requirements
// seed validation
// login with seed
// handle payments of incorrect amounts
// consider max amount for tips, auto-return tips
// save sending address

const Home = ({ locale }) => {
  return (
    <React.Fragment>
      <SEO />
      <Wrapper className="print">
        <HeadSection className="noPrint">
          {/* <Nav locale={locale} contrast languages={['en', 'zh']} /> */}
          <Nav locale={locale} contrast />
        </HeadSection>
        <TipsPortal locale={locale} />

        <Footer locale={locale} />
      </Wrapper>
    </React.Fragment>
  );
};

Home.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
    messages: PropTypes.object,
  }).isRequired,
};

export default injectIntl(Home);
