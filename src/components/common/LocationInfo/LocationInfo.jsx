import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';

function LocationInfo({ address, textColor }) {
  return (
    <span>
      <MdLocationOn size={25} color="#3270FC" />
      &nbsp;
      <span className={textColor}>{address}</span>
    </span>
  );
}

LocationInfo.propTypes = {
  address: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default LocationInfo;
