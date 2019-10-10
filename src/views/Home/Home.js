import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Nav, Footer, Newsletter } from 'bitcoincom-universal';
import { H1, Paragraph } from 'bitcoincom-storybook';
import { Wrapper, Logo, HeadSection, CustomContentBlock } from './styled';
import SEO from './SEO';

const Home = ({ locale, intl: { formatMessage } }) => {
  return (
    <React.Fragment>
      <SEO />
      <Wrapper>
        <HeadSection>
          <Nav locale={locale} contrast languages={['en', 'zh']} />
        </HeadSection>
        <CustomContentBlock
          image={formatMessage({ id: 'home.content.image' })}
          imageAlt={formatMessage({ id: 'home.content.image-alt' })}
          background={CustomContentBlock.background.dark}
        >
          <Logo
            src={formatMessage({ id: 'home.content.logo' })}
            alt={formatMessage({ id: 'home.content.logo-alt' })}
          />
          <H1>
            <FormattedMessage id="home.content.title" />
          </H1>
          <Paragraph contrast balanced>
            <FormattedHTMLMessage id="home.content.subtitle" />
          </Paragraph>
        </CustomContentBlock>
        <Newsletter
          title={formatMessage({ id: 'home.newsletter.title' })}
          text={formatMessage({ id: 'home.newsletter.text' })}
          button={formatMessage({ id: 'home.newsletter.button' })}
          acList={formatMessage({ id: 'home.newsletter.acList' })}
        />
        <Footer locale={locale} />
      </Wrapper>
    </React.Fragment>
  );
};

Home.propTypes = {
  locale: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
};

export default injectIntl(Home);
