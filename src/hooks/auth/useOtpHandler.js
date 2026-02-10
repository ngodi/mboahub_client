/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../utils/requests';
import {
  OTP_RESEND_URL,
  OTP_VERIFY_URL,
  PASSWORD_FORGOT_URL,
  PASSWORD_VERIFY_URL,
} from '../../routes/server';
import { useOtpResendTimerContext } from '../../contexts/OtpResendTimerContext';

export const useOtpHandler = () => {
  const { startResendTimer } = useOtpResendTimerContext();

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatError = (errors) => {
    if (Array.isArray(errors)) {
      const formatedErrors = errors.map((error) => ({
        field: error.field,
        message: error.message,
      }));
      setErrors(formatedErrors);
    } else {
      setErrors(errors);
    }
  };

  const handleOtpVerify = (e) => {
    setLoading(true);
    e.preventDefault();

    if (!otp || otp.length < 4) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'otp', message: 'Otp must be 4 characters long' },
      ]);
    }

    if (!email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);
    }

    if (!otp || (otp && otp.length) < 4 || !email) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = { otp, email };

        const res = await postRequest(data, OTP_VERIFY_URL);
        if (res.success !== false) {
          setLoading(false);
        } else {
          console.log(res.message);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    })();
  };

  const passwordOtpVerify = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'otp', message: 'Otp must be 4 characters long' },
      ]);
    }

    if (!email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);
    }

    if (!otp || (otp && otp.length) < 4 || !email) {
      setLoading(false);
      return;
    }

    try {
      const data = { otp, email };

      const res = await postRequest(data, PASSWORD_VERIFY_URL);
      if (res.success !== false) {
        setLoading(false);
      } else {
        console.log(res.message, 'PASSWORD OTP VERIFY');
        setLoading(false);
      }
    } catch (e) {
      console.log(e, 'PASSWORD OTP VERIFY');
      setLoading(false);
    }
  };

  const newOtpSend = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);

      setLoading(false);
      return;
    }

    try {
      const data = { email };

      const res = await postRequest(data, OTP_RESEND_URL);
      if (res.success !== false) {
        //toast success
        startResendTimer();
        setLoading(false);
        navigate('/signin');
      } else {
        formatError(res.message);
        setLoading(false);
      }
      return;
    } catch (e) {
      setLoading(false);
    }
  };

  const forgotPasswordOtp = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email) {
      setErrors((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'email', message: 'Email is required' },
      ]);

      setLoading(false);
      return;
    }

    try {
      const data = { email };

      const res = await postRequest(data, PASSWORD_FORGOT_URL);
      if (res.success !== false) {
        //toast success
        startResendTimer();
        setLoading(false);
      } else {
        formatError(res.message);
        setLoading(false);
      }
      return;
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    setEmail,
    setOtp,
    response,
    loading,
    errors,
    setErrors,
    setResponse,
    email,
    otp,
    handleOtpVerify,
    newOtpSend,
    forgotPasswordOtp,
    passwordOtpVerify,
  };
};
