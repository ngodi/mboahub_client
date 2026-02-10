/* eslint-disable react/prop-types */
import React from 'react';
import './FormInput.css';

function FormInput({
  name,
  type,
  placeholder,
  label,
  data,
  handleChange,
  icon,
  disabled,
  error,
}) {
  return (
    <>
      <div className='form-group mb-3'>
        {label && (
          <label htmlFor={name} className='text-small text-dark-blue mb-2'>
            {label} &nbsp;
          </label>
        )}
        <div className='input-container'>
          {icon && <div className='input-icon text-blue'>{icon}</div>}
          <input
            disabled={disabled}
            type={type}
            value={data || ''}
            onChange={handleChange}
            id={name}
            name={name}
            placeholder={placeholder}
          />
        </div>
      </div>
      {error && <p className='text-danger'>{error}</p>}
    </>
  );
}

export default FormInput;
