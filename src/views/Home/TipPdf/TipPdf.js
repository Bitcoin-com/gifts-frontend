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

function TipPdf(props) {
  const { images } = props;
  // console.log(images[0]);
  const giftPngs = [];

  images.forEach(image => {
    giftPngs.push(
      <GiftWrapper>
        <Gift src={image}></Gift>
      </GiftWrapper>,
    );
  });

  return (
    <GiftsDoc>
      <GiftsPage size="A4">
        <TopSpace></TopSpace>
        {/* <TipLabel>{test}</TipLabel> */}
        <GiftsRow>{giftPngs}</GiftsRow>
      </GiftsPage>
    </GiftsDoc>
  );
}

TipPdf.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TipPdf;
