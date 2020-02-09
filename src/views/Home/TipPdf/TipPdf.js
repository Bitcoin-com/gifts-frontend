import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { Table, TdText } from './styled';

const TipPdf = ({ data }) => (
  <Document>
    <Page>
      <Table>
        <TdText>{data[0].addr}</TdText>
      </Table>
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
