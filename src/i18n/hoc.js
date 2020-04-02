import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import merge from 'lodash/merge';

import flattenMessages from '../helpers/flattenMessages';

import enHome from './home/en.json';
import enFaq from './faq/en.json';
import en404 from './404/en.json';

import zhHome from './home/zh.json';
import zhFaq from './faq/zh.json';
import zh404 from './404/zh.json';

import { DEFAULT_LOCALE } from '.';

const Intl = props => {
  const { localeDir, children, locale } = props;
  const messagesMap = {
    '/': {
      en: {
        ...flattenMessages(enHome, 'home'),
        ...flattenMessages(en404, '404'),
      },
      zh: {
        ...flattenMessages(zhHome, 'home'),
        ...flattenMessages(zh404, '404'),
      },
    },
    '/faq': {
      en: {
        ...flattenMessages(enFaq, 'faq'),
      },
      zh: {
        ...flattenMessages(zhFaq, 'faq'),
      },
    },
    '/404.html': {
      en: { ...flattenMessages(en404, '404') },
      zh: { ...flattenMessages(zh404, '404') },
    },
    '/404': {
      en: { ...flattenMessages(en404, '404') },
      zh: { ...flattenMessages(zh404, '404') },
    },
  };

  const locales =
    messagesMap[localeDir === '/' ? localeDir : localeDir.replace(/\/$/, '')] ||
    messagesMap['/'];

  const messages = merge({}, locales[DEFAULT_LOCALE], locales[locale]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

Intl.propTypes = {
  locale: PropTypes.string.isRequired,
  localeDir: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Intl;
