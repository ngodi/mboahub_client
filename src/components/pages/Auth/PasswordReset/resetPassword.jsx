import { PASSWORD_RESET_URL } from '../../../../routes/server';
import { SIGNIN_PATH } from '../../../../routes/frontend';
import { useNavigate } from 'react-router-dom';
import { useOtpHandler } from '../../../../hooks/auth/useOtpHandler';
import { postRequest } from '../../../../utils/requests';
import { useState } from 'react';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { email, setEmail } = useOtpHandler();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);
    }

    if (!password) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'password', message: 'Password is required' },
      ]);
    }

    if (!passwordConfirmation) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          field: 'passwordConfirmation',
          message: 'Password confirmation is required',
        },
      ]);
    }

    if (!password || !passwordConfirmation || !email) {
      setLoading(false);
      return;
    }

    try {
      const data = { password, passwordConfirmation, email };
      const res = await postRequest(data, PASSWORD_RESET_URL);
      if (res.success !== false) {
        navigate(SIGNIN_PATH);
        setLoading(false);
      } else {
        formatError(res);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const formErrors = Array.isArray(errors)
    ? errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {})
    : {};

  const formatError = (res) => {
    if (Array.isArray(res.errors)) {
      const formatedErrors = res.errors.map((error) => ({
        field: error.field,
        message: error.message,
      }));
      setErrors(formatedErrors);
    } else {
      setErrors(res.message);
    }
  };
  return (
    <div>
      <h5 className='text-center'>Password Reset</h5>
      <FormInput
        type='text'
        name='email'
        placeholder='Enter email'
        label='Email'
        data={email}
        error={formErrors?.email || ''}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        type='text'
        name='password'
        placeholder='Enter new Password'
        label='New Password'
        data={password}
        error={formErrors.password || ''}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <FormInput
        type='text'
        name='passwordConfirmation'
        placeholder='Enter new Password Confirmation'
        label='New Password Confirmation'
        data={passwordConfirmation}
        error={formErrors.passwordConfirmation || ''}
        handleChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <div className='d-flex flex-direction-row justify-content-between'>
        <button
          type='submit'
          onClick={handlePasswordReset}
          className='btn btn-primary mt-3 btn btn-block'
          disabled={loading}
        >
          {loading ? 'please wait..' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};
