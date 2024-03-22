import React from 'react';
import { RiDoubleQuotesR } from 'react-icons/ri';
import PropTypes from 'prop-types';

import SmallTextButton from '../../../components/common/Buttons/SmallTextButton/SmallTextButton';
import Rating from '../../../components/common/Rating/Rating';

function TestimonialItem({ text, username, imageUrl }) {
  return (
    <div className="testimonial-item col-sm">
      <div className="testimonial-item-header">
        <div className="d-flex align-items-center">
          <img src={imageUrl} alt="testimonial" className="rounded-circle" width="75px" height="75px" />
          <div>
            <strong className="text-dark-blue text-small">{username}</strong>
            <Rating />
          </div>
        </div>
        <RiDoubleQuotesR size={20} color="lightgray" />
      </div>
      <p className="testimonial-item-text py-4 text-small">
        {text}
      </p>
      <SmallTextButton text="Via Twitter" />
    </div>
  );
}

TestimonialItem.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default TestimonialItem;
