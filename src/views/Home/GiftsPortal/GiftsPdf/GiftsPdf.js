import React from 'react';
import PropTypes from 'prop-types';
import {
  GiftsDoc,
  GiftsPage,
  GiftsRow,
  GiftWrapper,
  Gift,
  TopSpace,
} from './styled';

function GiftsPdf(props) {
  const { images } = props;
  // console.log(images[0]);
  const giftPngs = [];

  images.forEach((image, index) => {
    giftPngs.push(
      // eslint-disable-next-line react/no-array-index-key
      <GiftWrapper key={index}>
        <Gift src={image} />
      </GiftWrapper>,
    );
  });

  return (
    <GiftsDoc>
      <GiftsPage size="A4">
        <TopSpace />
        {/* <TipLabel>{test}</TipLabel> */}
        <GiftsRow>{giftPngs}</GiftsRow>
      </GiftsPage>
    </GiftsDoc>
  );
}

GiftsPdf.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GiftsPdf;
