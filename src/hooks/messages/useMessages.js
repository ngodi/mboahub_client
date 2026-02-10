/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { ANONYMOUS_MESSAGE_URL, MESSAGE_CREATE_URL } from '../../routes/server';
import { postRequestWithToken } from '../../utils/requests';

export const useMessages = () => {
  const [messageloading, setMessageLoading] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const formatError = (errors) => {
    errors.forEach((error) => {
      if (error.toLowerCase().includes('validation')) {
        error = error.split(':');
        error = error[1].split(',');
        setError(error);
      }
    });
  };

  const handleSendMessage = (data) => {
    setError();
    const url = isLoggedIn ? MESSAGE_CREATE_URL : ANONYMOUS_MESSAGE_URL;
    (async () => {
      setMessageLoading(true);
      try {
        const res = await postRequestWithToken(data, url);
        setMessageLoading(false);
        if (res && res.success) {
          setResponse(true);
        } else {
          setResponse(false);
          formatError(res && res.errors);
        }
      } catch (e) {
        setMessageLoading(false);
        setResponse(false);
      }
    })();
  };

  return {
    error,
    response,
    messageloading,
    handleSendMessage,
  };
};
