/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { PASSWORD_UPDATE_URL, USER_DETAILS_URL } from '../../routes/server';
import { getRequestWithToken, putRequestWithToken } from '../../utils/requests';

export const useUserDetails = () => {
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [socialsLoading, setSocialsLoading] = useState(false);

  const { token } = JSON.parse(localStorage.getItem('login'));
  if (!token) {
    localStorage.removeItem('login');
  }

  const formatError = (errors) => {
    errors.forEach((error) => {
      if (error.toLowerCase().includes('validation')) {
        error = error.split(':');
        error = error[1].split(',');
        setErrors(error);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await getRequestWithToken(token, USER_DETAILS_URL);
        if (res.success) {
          setData(res.data);
          setLoading(false);
        } else {
          formatError(res.errors);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleUpdate = (e, next) => {
    const updateData = {
      address: {
        city: data.city || '',
        street: data.street || '',
        country: data.country || '',
      },
      personal: {
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        image_url: data.image_url || '',
        image_cover_url: data.image_cover_url || '',
        agency: data.agency || '',
        phone: data.phone || '',
        facebook_url: data.facebook_url || '',
        twitter_url: data.twitter_url || '',
        instagram_url: data.instagram_url || '',
        about: data.about || '',
      },
    };
    e.preventDefault();
    next(true);
    (async () => {
      try {
        const res = await putRequestWithToken(
          updateData,
          token,
          USER_DETAILS_URL,
        );
        if (res.success) {
          setData(res.data);
          next(false);
        } else {
          formatError(res.errors);
          next(false);
        }
      } catch (e) {
        next(false);
      }
    })();
  };

  const handleSocialsUpdate = (e) => {
    handleUpdate(e, setSocialsLoading);
  };

  const handlePersonalInfoUpdate = (e) => {
    handleUpdate(e, setPersonalInfoLoading);
  };

  const handlePasswordChange = (
    current_password,
    new_password,
    password_confirmation,
  ) => {
    setPasswordLoading(true);
    const updateData = {
      current_password,
      password: new_password,
      password_confirmation,
    };

    (async () => {
      try {
        const res = await putRequestWithToken(
          updateData,
          token,
          PASSWORD_UPDATE_URL,
        );
        if (res.success) {
          setData(res.data);
          setPasswordLoading(false);
        } else {
          formatError(res.errors);
          setPasswordLoading(false);
        }
      } catch (e) {
        setPasswordLoading(false);
      }
    })();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    handlePasswordChange,
    handleChange,
    handleSocialsUpdate,
    handlePersonalInfoUpdate,
    socialsLoading,
    personalInfoLoading,
    passwordLoading,
    errors,
    loading,
    data,
  };
};
