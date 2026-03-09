/* eslint-disable  */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_URL } from '../../routes/server';
import { postRequest } from '../../utils/requests';
import { useOtpResendTimerContext } from '../../contexts/OtpResendTimerContext';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { startResendTimer } = useOtpResendTimerContext();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [response, setResponse] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!data.name) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'name', message: 'Name is required' },
      ]);
    }

    if (!data.email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);
    }

    if (!data.password) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'password', message: 'Password is required' },
      ]);
    }

    if (!data.passwordConfirmation) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          field: 'passwordConfirmation',
          message: 'Password confirmation is required',
        },
      ]);
    }

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.passwordConfirmation
    ) {
      setLoading(false);
      return;
    }

    try {
      const res = await postRequest(data, SIGNUP_URL);
      if (res.success !== false) {
        startResendTimer();
        navigate('/otp_verification');
        setLoading(false);
      } else {
        formatError(res);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    handleSelect,
    handleSignup,
    handleChange,
    response,
    loading,
    errors,
    setResponse,
    data,
  };
};
