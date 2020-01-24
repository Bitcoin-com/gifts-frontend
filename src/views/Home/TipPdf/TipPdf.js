import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';

const TipPdf = ({ data }) => (
  <Document>
    <Page>
      <View>
        <Text>{data[0].addr}</Text>
      </View>
    </Page>
  </Document>
);

TipPdf.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      addr: PropTypes.string.isRequired,
      wif: PropTypes.string.isRequired,
      sats: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TipPdf;
