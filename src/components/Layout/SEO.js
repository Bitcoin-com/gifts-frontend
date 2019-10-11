import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

class SEO extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
    };
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;
    if (typeof window.location === 'undefined') return;
    if (typeof window.location.host === 'undefined') return;
    this.setState({ origin: window.location.origin });
  }

  render() {
    const { origin } = this.state;
    const {
      intl: { locale },
    } = this.props;

    return (
      <Helmet>
        <html lang={locale} />
        <meta name="application-name" content="Bitcoin.com" />
        <meta name="msapplication-TileColor" content="#111724" />
        <meta
          name="msapplication-square70x70logo"
          content={`${origin}/images/tile.png`}
        />
        <meta
          name="msapplication-square150x150logo"
          content={`${origin}/images/tile.png`}
        />
        <meta
          name="msapplication-wide310x150logo"
          content={`${origin}/images/tile-wide.png`}
        />
        <meta
          name="msapplication-square310x310logo"
          content={`${origin}/images/tile.png`}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {origin && <base href={origin} />}
      </Helmet>
    );
  }
}

SEO.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default injectIntl(SEO);
