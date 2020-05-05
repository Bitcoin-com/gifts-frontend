import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import Navbar from '@bitcoin-portal/navbar';
import Footer from '@bitcoin-portal/footer';
import {
  H1,
  Paragraph,
  ContentBlock,
  Link,
} from '@bitcoin-portal/bitcoincom-pkg-components';
import { Wrapper } from './styled';
import SEO from './SEO';

const ErrorPage = ({ locale, intl: { messages } }) => (
  <>
    <SEO />
    <Wrapper>
      <Navbar locale={locale} showLang={false} />
      <ContentBlock
        image={messages['404.content.image']}
        imageAlt={messages['404.content.image-alt']}
      >
        <H1>
          <FormattedMessage id="404.content.title" />
        </H1>
        <Paragraph>
          <FormattedMessage id="404.content.subtitle" />
        </Paragraph>
        <Paragraph>
          <Link href="/">
            <FormattedMessage id="404.link.home" />
          </Link>
        </Paragraph>
      </ContentBlock>
      <Footer locale={locale} />
    </Wrapper>
  </>
);

ErrorPage.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object,
  }).isRequired,
};
export default injectIntl(ErrorPage);
