import React from 'react';
import './Rating.css';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

function Rating({ review, classes }) {
  return (
    <div className="property-rating">
      <div>
        <span>
          <FaStar color="#FACC39" size={13} />
        </span>
        <span>
          <FaStar color="#FACC39" size={13} />
        </span>
        <span>
          <FaStar color="#FACC39" size={13} />
        </span>
        <span>
          <FaStar color="#FACC39" size={13} />
        </span>
        <span>
          <FaStar color="#FACC39" size={13} />
        </span>
      </div>
      &nbsp;&nbsp;
      <h5 className={classes}>{review}</h5>
    </div>
  );
}

Rating.propTypes = {
  review: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Rating;
