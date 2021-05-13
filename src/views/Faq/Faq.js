import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import Navbar from '@bitcoin-portal/navbar';
import Footer from '@bitcoin-portal/footer';
import ContentBlock from '@bitcoin-portal/bitcoincom-pkg-components/dist/ContentBlock';
import Link from '@bitcoin-portal/bitcoincom-pkg-components/dist/LinkV2';
import Paragraph from '@bitcoin-portal/bitcoincom-pkg-components/dist/Paragraph';
import {
  Wrapper,
  HeadSection,
  FaqSection,
  FaqAccordion,
  FaqTitle,
} from './styled';
import SEO from './SEO';

const Faq = ({ locale, intl: { messages } }) => (
  <>
    <SEO />
    <Wrapper>
      <Navbar locale={locale} />
      <ContentBlock>
        <FaqTitle>
          <FormattedMessage id="faq.header.title" />
        </FaqTitle>
        <Paragraph>
          <Link href="/">
            <FormattedMessage id="faq.links.home" />
          </Link>
          / <FormattedMessage id="faq.header.title" />
        </Paragraph>
        <FaqAccordion
          singleOpen
          items={[
            {
              title: <FormattedMessage id="faq.questions.whatsThis" />,
              content: <FormattedMessage id="faq.answers.whatsThis" />,
            },
            {
              title: <FormattedMessage id="faq.questions.nonCustodial" />,
              content: <FormattedMessage id="faq.answers.nonCustodial" />,
            },
            {
              title: (
                <FormattedMessage id="faq.questions.reallyNonCustodial" />
              ),
              content: (
                <FormattedMessage id="faq.answers.reallyNonCustodial" />
              ),
            },
            {
              title: <FormattedMessage id="faq.questions.infoShared" />,
              content: <FormattedMessage id="faq.answers.infoShared" />,
            },
            {
              title: <FormattedMessage id="faq.questions.openSource" />,
              content: <FormattedHTMLMessage id="faq.answers.openSource" />,
            },
            {
              title: <FormattedMessage id="faq.questions.loseKey" />,
              content: <FormattedMessage id="faq.answers.loseKey" />,
            },
          ]}
        />

          {/* TODO
Add link to open source repo
more faq questions
deploy to staging and master */}
        </ContentBlock>
      <Footer locale={locale} />
    </Wrapper>
  </>
);

Faq.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object,
  }).isRequired,
};
export default injectIntl(Faq);
