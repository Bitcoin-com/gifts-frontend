import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Navbar from '@bitcoin-portal/navbar';
import Footer from '@bitcoin-portal/footer';
import Paragraph from '@bitcoin-portal/bitcoincom-pkg-components/dist/Paragraph';
import Link from '@bitcoin-portal/bitcoincom-pkg-components/dist/LinkV2';
import { Wrapper, HeadSection, Notice } from './styled';
import SEO from './SEO';
import GiftsPortal from './GiftsPortal';
import icon from '../../../static/icons/info-circle-outline.svg';
import './helpers/print.css';

const Home = ({ locale, intl: { formatMessage } }) => {
  return (
    <>
      <SEO />
      <Wrapper className="print">
        <HeadSection className="noPrint">
          <Navbar locale={locale} />
        </HeadSection>
        <Notice>
          <img src={icon} alt="" />
          <div>
            <Paragraph contrast>
              Thank you for your support! This service will be discontinued soon
              and moved to{' '}
              <Link href="https://wallet.bitcoin.com">Bitcoin.com Wallet</Link>.
            </Paragraph>
            <Paragraph contrast>
              Auto refund has been temporarily disabled. Please back up a copy of
              your gifts to reclaim.
            </Paragraph>
          </div>
        </Notice>
        <GiftsPortal locale={locale} />
        <Footer locale={locale} />
      </Wrapper>
    </>
  );
};

Home.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(Home);
