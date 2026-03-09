/* eslint-disable  */
import { useState } from 'react';
import { postRequest } from '../../utils/requests';
import { LOGIN_URL } from '../../routes/server';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OTP_VERIFICATION_PATH } from '../../routes/frontend';

export const useLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);

  const { setLoading, setUser } = useAuth();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
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

    if (!data.email || !data.password) {
      setLoading(false);
      return;
    }

    try {
      const res = await postRequest(data, LOGIN_URL);
      if (res.success !== false) {
        if (res.data.user) {
          setUser(res.data.user);
          setLoading(false);
        } else {
          if (
            res.meta.error === 'EMAIL_VERIFY_ERROR' &&
            !res.meta.user.emailVerified
          ) {
            setErrors(res.message);
            navigate(OTP_VERIFICATION_PATH);
          } else {
            setErrors(res.errors);
          }
          setLoading(false);
        }
      }
      setErrors(res.errors);
      setLoading(false);
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

  return {
    data,
    remember,
    setRemember,
    errors,
    handleLogin,
    handleChange,
  };
};
