import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { Nav, Footer } from 'bitcoincom-universal';
import {
  Wrapper,
  HeadSection,
  CustomContentBlock,
  CustomCollapse,
  FaqTitle,
  FaqLink,
} from './styled';
import SEO from './SEO';

const Faq = ({ locale }) => {
  return (
    <React.Fragment>
      <SEO />
      <Wrapper>
        <HeadSection>
          {/* <Nav locale={locale} contrast languages={['en', 'zh']} /> */}
          <Nav locale={locale} contrast />
        </HeadSection>
        <CustomContentBlock>
          <FaqTitle>FAQ</FaqTitle>
          <CustomCollapse
            opened
            list={[
              {
                title: <FormattedMessage id="faq.questions.whatsThis" />,
                text: <FormattedMessage id="faq.answers.whatsThis" />,
              },
              {
                title: <FormattedMessage id="faq.questions.nonCustodial" />,
                text: <FormattedMessage id="faq.answers.nonCustodial" />,
              },
              {
                title: (
                  <FormattedMessage id="faq.questions.reallyNonCustodial" />
                ),
                text: <FormattedMessage id="faq.answers.reallyNonCustodial" />,
              },
              {
                title: <FormattedMessage id="faq.questions.infoShared" />,
                text: <FormattedMessage id="faq.answers.infoShared" />,
              },
              {
                title: <FormattedMessage id="faq.questions.openSource" />,
                text: <FormattedHTMLMessage id="faq.answers.openSource" />,
              },
              {
                title: <FormattedMessage id="faq.questions.loseKey" />,
                text: <FormattedMessage id="faq.answers.loseKey" />,
              },
            ]}
          ></CustomCollapse>
          {/* TODO
Add link to open source repo
more faq questions
deploy to staging and master */}
          <FaqLink href="/">Gifts Home</FaqLink>
        </CustomContentBlock>
        <Footer locale={locale} />
      </Wrapper>
    </React.Fragment>
  );
};

Faq.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
    messages: PropTypes.object,
  }).isRequired,
};

export default injectIntl(Faq);
