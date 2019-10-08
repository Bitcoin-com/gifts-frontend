import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { Nav, Footer } from 'bitcoincom-universal';
import { H1, Paragraph, ContentBlock } from 'bitcoincom-storybook';
import { Wrapper } from './styled';
import SEO from './SEO';

const ErrorPage = ({ locale, intl: { messages } }) => (
  <React.Fragment>
    <SEO />
    <Wrapper>
      <Nav locale={locale} showLang={false} />
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
          <FormattedHTMLMessage id="404.content.action" />
        </Paragraph>
      </ContentBlock>
      <Footer locale={locale} />
    </Wrapper>
  </React.Fragment>
);

ErrorPage.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.object,
  }).isRequired,
};
export default injectIntl(ErrorPage);
