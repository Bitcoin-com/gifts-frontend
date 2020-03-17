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
        <Layout location={{ pathname: '/' }}>
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
      label: 'Content',
      widget: 'object',
      name: 'content',
      fields: [
        { name: 'logo', label: 'Logo image', widget: 'image' },
        { name: 'logo-alt', label: 'Logo image alt', widget: 'string' },
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'subtitle', label: 'Description', widget: 'text' },
        { name: 'image', label: 'Image', widget: 'image' },
        { name: 'image-alt', label: 'Image Alt', widget: 'string' },
      ],
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
