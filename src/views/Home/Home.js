import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Nav, Footer } from 'bitcoincom-universal';
import { Wrapper, HeadSection } from './styled';
import SEO from './SEO';
import TipsPortal from './TipsPortal';
import './print.css';

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
