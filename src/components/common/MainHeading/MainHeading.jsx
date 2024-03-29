import React from 'react';
import './MainHeading.css';
import PropTypes from 'prop-types';

function MainHeading({ heading }) {
  return <h3 className="main-heading">{heading}</h3>;
}

MainHeading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default MainHeading;
