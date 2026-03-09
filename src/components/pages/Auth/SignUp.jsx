/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../../forms/FormInput';
import './SignInSignUp.css';
import { useSignUp } from '../../../hooks/auth/useSignUp';

const SignUp = () => {
  const { handleSignup, handleChange, loading, errors, data } = useSignUp();

  // const roleOptions = [
  //   { label: 'Buyer or Tenant', value: 'buyer_or_tenant' },
  //   { label: 'Property Owner', value: 'owner' },
  //   { label: 'Property Agent', value: 'agent' },
  // ];
  const formErrors = Array.isArray(errors)
    ? errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {})
    : {};

  return (
    <div className='col-md-12'>
      <FormInput
        type='text'
        name='name'
        placeholder='Enter Name'
        label='Name'
        data={data.name}
        error={formErrors.name}
        handleChange={handleChange}
      />

      <FormInput
        type='email'
        name='email'
        placeholder='Enter Email'
        label='Email'
        data={data.email}
        error={formErrors.email}
        handleChange={handleChange}
      />

      <FormInput
        type='password'
        name='password'
        placeholder='Enter Password'
        label='Password'
        data={data.password}
        error={formErrors.password}
        handleChange={handleChange}
      />
      <FormInput
        type='password'
        name='passwordConfirmation'
        placeholder='Enter Password Confirmation'
        label='Password Confirmation'
        data={data.passwordConfirmation}
        error={formErrors.passwordConfirmation}
        handleChange={handleChange}
      />

      <div className='d-flex align-items-center justify-content-between flex-wrap mt-3'>
        <>
          <div className='form-row align-items-center'>
            <div className='col-auto'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='autoSizingCheck'
                />
                &nbsp;
                <label className='form-check-label' htmlFor='autoSizingCheck'>
                  Remember me
                </label>
              </div>
            </div>
          </div>
        </>
        <Link to='/password_reset'>Forgot password ?</Link>
      </div>
      <button
        type='submit'
        onClick={handleSignup}
        className='btn btn-primary mt-3 btn btn-block'
        disabled={loading}
      >
        {loading ? 'please wait..' : 'Register'}
      </button>
      {errors && !Array.isArray(errors) && (
        <p className='text-danger'>{errors}</p>
      )}
    </div>
  );
};

export default SignUp;
