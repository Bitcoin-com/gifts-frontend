import React from 'react';
import PropTypes from 'prop-types';

const Preview = ({ value, field }) => (
  <div>
    <b>{field.get('label')}</b>
    {value && (
      <React.Fragment>
        <br />
        <b>Latitude : </b>
        {value.latitude}
        <br />
        <b>Longitude :</b>
        {value.longitude}
      </React.Fragment>
    )}
  </div>
);

Preview.propTypes = {
  value: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  field: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};

export default Preview;
