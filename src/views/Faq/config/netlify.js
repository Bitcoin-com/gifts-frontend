import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { IntlProvider } from 'react-intl';
import Faq from '../Faq';
import Layout from '../../../components/Layout/Layout';
import { DEFAULT_LOCALE } from '../../../i18n';
import flattenMessages from '../../../helpers/flattenMessages';
import { fieldMeta, fieldNewsletter } from '../../../cms/commonFields';

export const FaqPreview = ({ entry }) => {
  const iframe = document.getElementsByTagName('iframe')[1];
  const iframeHeadElem = iframe.contentDocument.head;
  const messages = entry.toJS().data;

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={flattenMessages(messages, 'faq')}
      >
        <Layout location={{ pathname: '/faq' }}>
          <Faq locale={DEFAULT_LOCALE} />
        </Layout>
      </IntlProvider>
    </StyleSheetManager>
  );
};

FaqPreview.propTypes = {
  entry: PropTypes.shape({
    toJS: PropTypes.func,
  }).isRequired,
};

const faqConfig = {
  label: 'Faq',
  name: 'faq.content',
  fields: [
    {
      label: 'Header',
      widget: 'object',
      name: 'header',
      fields: [{ name: 'title', label: 'title', widget: 'string' }],
    },
    {
      label: 'questions',
      widget: 'object',
      name: 'questions',
      fields: [
        { name: 'whatsThis', label: 'whatsThis', widget: 'string' },
        { name: 'nonCustodial', label: 'nonCustodial', widget: 'string' },
        {
          name: 'reallyNonCustodial',
          label: 'reallyNonCustodial',
          widget: 'string',
        },
        { name: 'openSource', label: 'openSource', widget: 'string' },
        { name: 'infoShared', label: 'infoShared', widget: 'string' },
        { name: 'loseKey', label: 'loseKey', widget: 'string' },
      ],
    },
    {
      label: 'answers',
      widget: 'object',
      name: 'answers',
      fields: [
        { name: 'whatsThis', label: 'whatsThis', widget: 'string' },
        { name: 'nonCustodial', label: 'nonCustodial', widget: 'string' },
        {
          name: 'reallyNonCustodial',
          label: 'reallyNonCustodial',
          widget: 'string',
        },
        { name: 'openSource', label: 'openSource', widget: 'string' },
        { name: 'infoShared', label: 'infoShared', widget: 'string' },
        { name: 'loseKey', label: 'loseKey', widget: 'string' },
      ],
    },
    {
      label: 'links',
      widget: 'object',
      name: 'links',
      fields: [{ name: 'home', label: 'home', widget: 'string' }],
    },
    fieldNewsletter,
    fieldMeta,
  ],
};

export const enFaqConfig = {
  ...faqConfig,
  file: 'src/data/faq/locales/en.json',
};

export const zhFaqConfig = {
  ...faqConfig,
  file: 'src/data/faq/locales/zh.json',
};
