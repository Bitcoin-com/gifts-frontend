import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { IntlProvider } from 'react-intl';
import Home from '../Home';
import Layout from '../../../components/Layout/Layout';
import { DEFAULT_LOCALE } from '../../../i18n';
import flattenMessages from '../../../helpers/flattenMessages';

export const HomePreview = ({ entry }) => {
  const iframe = document.getElementsByTagName('iframe')[1];
  const iframeHeadElem = iframe.contentDocument.head;
  const messages = entry.toJS().data;

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={flattenMessages(messages, 'home')}
      >
        <Layout location={{ pathname: '/' }}>
          <Home locale={DEFAULT_LOCALE} />
        </Layout>
      </IntlProvider>
    </StyleSheetManager>
  );
};

HomePreview.propTypes = {
  entry: PropTypes.shape({
    toJS: PropTypes.func,
  }).isRequired,
};

export const homeConfig = {
  label: 'Home',
  name: 'home.content',
  file: 'src/data/home/locales/en.json',
  fields: [
    {
      label: 'Page Meta',
      widget: 'object',
      name: 'meta',
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'description', label: 'Description', widget: 'text' },
        { name: 'twitter', label: 'Twitter', widget: 'string' },
        { name: 'image', label: 'SM Image', widget: 'image' },
      ],
    },
    {
      label: 'Content',
      widget: 'object',
      name: 'content',
      fields: [
        { name: 'logo', label: 'Logo image', widget: 'image' },
        { name: 'logo-alt', label: 'Logo image alt', widget: 'string' },
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'subtitle', label: 'Description', widget: 'text' },
        { name: 'link', label: 'Link', widget: 'string' },
        { name: 'image', label: 'Image', widget: 'image' },
        { name: 'image-alt', label: 'Image Alt', widget: 'string' },
      ],
    },
    {
      label: 'Newsletter',
      widget: 'object',
      name: 'newsletter',
      fields: [
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'text', label: 'Description', widget: 'text' },
        { name: 'button', label: 'Button Text', widget: 'string' },
        { name: 'acList', label: 'Active Campaign List', widget: 'string' },
      ],
    },
  ],
};
