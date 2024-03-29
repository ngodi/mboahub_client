import React from 'react';
import './PropertyType.css';
import PropTypes from 'prop-types';

function PropertyType({ type }) {
  return <span className="property-type">{type}</span>;
}

PropertyType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PropertyType;
