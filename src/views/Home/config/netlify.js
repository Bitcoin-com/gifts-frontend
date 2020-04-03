import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { IntlProvider } from 'react-intl';
import Home from '../Home';
import Layout from '../../../components/Layout/Layout';
import { DEFAULT_LOCALE } from '../../../i18n';
import flattenMessages from '../../../helpers/flattenMessages';
import { fieldMeta, fieldNewsletter } from '../../../cms/commonFields';

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

const homeConfig = {
  label: 'Home',
  name: 'home.content',
  fields: [
    {
      label: 'Header',
      widget: 'object',
      name: 'header',
      fields: [
        { name: 'title', label: 'title', widget: 'string' },
        { name: 'description', label: 'description', widget: 'string' },
      ],
    },
    {
      label: 'Cards',
      widget: 'object',
      name: 'cards',
      fields: [
        {
          name: 'sweep',
          label: 'sweep',
          widget: 'object',
          fields: [
            { name: 'title', label: 'title', widget: 'string' },
            { name: 'instructions', label: 'instructions', widget: 'string' },
          ],
        },
        {
          name: 'manage',
          label: 'manage',
          widget: 'object',
          fields: [
            { name: 'title', label: 'title', widget: 'string' },
            { name: 'claimedCount', label: 'claimedCount', widget: 'string' },
          ],
        },
        {
          name: 'customize',
          label: 'customize',
          widget: 'object',
          fields: [{ name: 'title', label: 'title', widget: 'string' }],
        },
        {
          name: 'new',
          label: 'new',
          widget: 'object',
          fields: [{ name: 'title', label: 'title', widget: 'string' }],
        },
        {
          name: 'seed',
          label: 'seed',
          widget: 'object',
          fields: [
            { name: 'title', label: 'title', widget: 'string' },
            { name: 'reminder', label: 'reminder', widget: 'string' },
            { name: 'warning', label: 'warning', widget: 'string' },
          ],
        },
        {
          name: 'build',
          label: 'build',
          widget: 'object',
          fields: [{ name: 'title', label: 'title', widget: 'string' }],
        },
        {
          name: 'confirm',
          label: 'confirm',
          widget: 'object',
          fields: [{ name: 'title', label: 'title', widget: 'string' }],
        },
        {
          name: 'apiPostFailed',
          label: 'apiPostFailed',
          widget: 'object',
          fields: [
            { name: 'title', label: 'title', widget: 'string' },
            {
              name: 'desc',
              label: 'desc',
              widget: 'object',
              fields: [
                { name: 'one', label: 'one', widget: 'string' },
                { name: 'two', label: 'two', widget: 'string' },
                { name: 'three', label: 'three', widget: 'string' },
              ],
            },
          ],
        },
        {
          name: 'reclaimTxsFailed',
          label: 'reclaimTxsFailed',
          widget: 'object',
          fields: [
            { name: 'title', label: 'title', widget: 'string' },
            {
              name: 'desc',
              label: 'desc',
              widget: 'object',
              fields: [
                { name: 'one', label: 'one', widget: 'string' },
                { name: 'two', label: 'two', widget: 'string' },
                { name: 'three', label: 'three', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Links',
      widget: 'object',
      name: 'links',
      fields: [{ name: 'faq', label: 'faq', widget: 'string' }],
    },
    {
      label: 'Strings',
      widget: 'object',
      name: 'strings',
      fields: [{ name: 'inputExtra', label: 'inputExtra', widget: 'string' }],
    },
    {
      label: 'gift',
      widget: 'object',
      name: 'gift',
      fields: [
        { name: 'downloading', label: 'downloading', widget: 'string' },
        { name: 'jpg', label: 'jpg', widget: 'string' },
        { name: 'youGot', label: 'youGot', widget: 'string' },
        { name: 'on', label: 'on', widget: 'string' },
        { name: 'claimBy', label: 'claimBy', widget: 'string' },
        { name: 'stepOne', label: 'stepOne', widget: 'string' },
        { name: 'stepTwo', label: 'stepTwo', widget: 'string' },
        { name: 'stepThree', label: 'stepThree', widget: 'string' },
        { name: 'giftName', label: 'giftName', widget: 'string' },
        { name: 'status', label: 'status', widget: 'string' },
        { name: 'label', label: 'label', widget: 'string' },
      ],
    },
    {
      label: 'labels',
      widget: 'object',
      name: 'labels',
      fields: [
        { name: 'tipCount', label: 'tipCount', widget: 'string' },
        { name: 'tipAmountFiat', label: 'tipAmountFiat', widget: 'string' },
        { name: 'refundAddress', label: 'refundAddress', widget: 'string' },
        { name: 'localCurrency', label: 'localCurrency', widget: 'string' },
        { name: 'changeCurrency', label: 'changeCurrency', widget: 'string' },
        { name: 'selectCurrency', label: 'selectCurrency', widget: 'string' },
        { name: 'expirationDate', label: 'expirationDate', widget: 'string' },
        {
          name: 'expirationDateSelect',
          label: 'expirationDateSelect',
          widget: 'string',
        },
        { name: 'emailAddress', label: 'emailAddress', widget: 'string' },
        {
          name: 'giftDesignSelect',
          label: 'giftDesignSelect',
          widget: 'string',
        },
        { name: 'tableQty', label: 'tableQty', widget: 'string' },
        { name: 'tableValue', label: 'tableValue', widget: 'string' },
        { name: 'tableCurrency', label: 'tableCurrency', widget: 'string' },
        { name: 'tableExpiration', label: 'tableExpiration', widget: 'string' },
      ],
    },
    {
      label: 'notifications',
      widget: 'object',
      name: 'notifications',
      fields: [
        { name: 'seedCopied', label: 'seedCopied', widget: 'string' },
        { name: 'giftsSwept', label: 'giftsSwept', widget: 'string' },
      ],
    },
    {
      label: 'buttons',
      widget: 'object',
      name: 'buttons',
      fields: [
        { name: 'createTips', label: 'createTips', widget: 'string' },
        { name: 'goBack', label: 'goBack', widget: 'string' },
        { name: 'copyUri', label: 'copyUri', widget: 'string' },
        { name: 'copySeed', label: 'copySeed', widget: 'string' },
        { name: 'sweepAll', label: 'sweepAll', widget: 'string' },
        { name: 'newTips', label: 'newTips', widget: 'string' },
        { name: 'loading', label: 'loading', widget: 'string' },
        { name: 'loadTips', label: 'loadTips', widget: 'string' },
        { name: 'refresh', label: 'refresh', widget: 'string' },
        { name: 'processing', label: 'processing', widget: 'string' },
        { name: 'loadingPdf', label: 'loadingPdf', widget: 'string' },
        { name: 'downloadPdf', label: 'downloadPdf', widget: 'string' },
        { name: 'mobilePay', label: 'mobilePay', widget: 'string' },
        { name: 'next', label: 'next', widget: 'string' },
        { name: 'confirm', label: 'confirm', widget: 'string' },
        { name: 'repost', label: 'repost', widget: 'string' },
        { name: 'retry', label: 'retry', widget: 'string' },
        { name: 'makePdf', label: 'makePdf', widget: 'string' },
        { name: 'getAddr', label: 'getAddr', widget: 'string' },
      ],
    },
    {
      label: 'placeholders',
      widget: 'object',
      name: 'placeholders',
      fields: [
        { name: 'tipCount', label: 'tipCount', widget: 'string' },
        { name: 'tipAmountFiat', label: 'tipAmountFiat', widget: 'string' },
        { name: 'importMnemonic', label: 'importMnemonic', widget: 'string' },
        {
          name: 'userConfirmedMnemonic',
          label: 'userConfirmedMnemonic',
          widget: 'string',
        },
        {
          name: 'userRefundAddress',
          label: 'userRefundAddress',
          widget: 'string',
        },
        {
          name: 'userRefundAddressOnCreate',
          label: 'userRefundAddressOnCreate',
          widget: 'string',
        },
        { name: 'emailAddress', label: 'emailAddress', widget: 'string' },
      ],
    },
    {
      label: 'alerts',
      widget: 'object',
      name: 'alerts',
      fields: [
        { name: 'warning', label: 'warning', widget: 'string' },
        { name: 'giftDidNotPost', label: 'giftDidNotPost', widget: 'string' },
        { name: 'reclaim', label: 'reclaim', widget: 'string' },
      ],
    },
    {
      label: 'errors',
      widget: 'object',
      name: 'errors',
      fields: [
        { name: 'tipCountNoTips', label: 'tipCountNoTips', widget: 'string' },
        {
          name: 'tipCountNotInteger',
          label: 'tipCountNotInteger',
          widget: 'string',
        },
        { name: 'tipCountNum', label: 'tipCountNum', widget: 'string' },
        { name: 'tipCountNum', label: 'tipCountNum', widget: 'string' },
        {
          name: 'fiatTipAmountNum',
          label: 'fiatTipAmountNum',
          widget: 'string',
        },
        {
          name: 'fiatTipAmountRequired',
          label: 'fiatTipAmountRequired',
          widget: 'string',
        },
        {
          name: 'fiatGiftAmountIsNaN',
          label: 'fiatGiftAmountIsNaN',
          widget: 'string',
        },
        { name: 'noMnemonic', label: 'noMnemonic', widget: 'string' },
        { name: 'invalidMnemonic', label: 'invalidMnemonic', widget: 'string' },
        {
          name: 'noTipsAtMnemonic',
          label: 'noTipsAtMnemonic',
          widget: 'string',
        },
        {
          name: 'invalidUserMnemonic',
          label: 'invalidUserMnemonic',
          widget: 'string',
        },
        {
          name: 'invoiceGenerationError',
          label: 'invoiceGenerationError',
          widget: 'string',
        },
        {
          name: 'invalidRefundAddress',
          label: 'invalidRefundAddress',
          widget: 'string',
        },
        {
          name: 'youreTooCheap',
          label: 'youreTooCheap',
          widget: 'string',
        },
        {
          name: 'tipCountTooManyTips',
          label: 'tipCountTooManyTips',
          widget: 'string',
        },
        {
          name: 'networkError',
          label: 'networkError',
          widget: 'string',
        },
        {
          name: 'invalidExpirationDate',
          label: 'invalidExpirationDate',
          widget: 'string',
        },
        {
          name: 'invalidEmail',
          label: 'invalidEmail',
          widget: 'string',
        },
        {
          name: 'expirationMustBeFuture',
          label: 'expirationMustBeFuture',
          widget: 'string',
        },
        {
          name: 'priceApiError',
          label: 'priceApiError',
          widget: 'string',
        },
        {
          name: 'cannotSweep',
          label: 'cannotSweep',
          widget: 'string',
        },
        {
          name: 'bitbox',
          label: 'bitbox',
          widget: 'string',
        },
      ],
    },
    fieldNewsletter,
    fieldMeta,
  ],
};

export const enHomeConfig = {
  ...homeConfig,
  file: 'src/data/home/locales/en.json',
};

export const zhHomeConfig = {
  ...homeConfig,
  file: 'src/data/home/locales/zh.json',
};
