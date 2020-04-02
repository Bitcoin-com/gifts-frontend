import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { IntlProvider } from 'react-intl';
import Layout from '../../../components/Layout/Layout';
import { DEFAULT_LOCALE } from '../../../i18n';
import flattenMessages from '../../../helpers/flattenMessages';
import Error from '../404';

export const Error404Preview = ({ entry }) => {
  const iframe = document.getElementsByTagName('iframe')[1];
  const iframeHeadElem = iframe.contentDocument.head;
  const messages = entry.toJS().data;

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={flattenMessages(messages, '404')}
      >
        <Layout location={{ pathname: '/404' }}>
          <Error locale={DEFAULT_LOCALE} />
        </Layout>
      </IntlProvider>
    </StyleSheetManager>
  );
};

Error404Preview.propTypes = {
  entry: PropTypes.shape({
    toJS: PropTypes.func,
  }).isRequired,
};

export const error404Config = {
  label: '404',
  name: '404.content',
  file: 'src/data/404/locales/en.json',
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
        { name: 'title', label: 'Title', widget: 'string' },
        { name: 'subtitle', label: 'Description', widget: 'text' },
        { name: 'action', label: 'Action', widget: 'string' },
        { name: 'image', label: 'Image', widget: 'image' },
        { name: 'image-alt', label: 'Image Alt', widget: 'string' },
      ],
    },
    {
      label: 'Link',
      widget: 'object',
      name: 'link',
      fields: [{ name: 'home', label: 'home', widget: 'string' }],
    },
  ],
};
