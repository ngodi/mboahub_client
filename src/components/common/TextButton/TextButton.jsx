import React from 'react';
import './TextButton.css';
import PropTypes from 'prop-types';

function TextButton({ text, btnclass, icon }) {
  return (
    <button
      type="button"
      className={`bg-primary btn rounded text-white py-3 px-4 my-2 text-small ${btnclass}`}
    >
      <strong>
        {icon}
        {' '}
        {text}
      </strong>
    </button>
  );
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  btnclass: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default TextButton;
