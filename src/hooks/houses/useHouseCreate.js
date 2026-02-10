/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { postRequestWithToken } from '../../utils/requests';
import { HOUSES_URL } from '../../routes/server';

export const useHouseCreate = (urls) => {
  const [data, setData] = useState({});
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [houseloading, setHouseLoading] = useState(false);

  const handleCreateHouse = async (e) => {
    e.preventDefault();
    setHouseLoading(true);

    const houseData = { ...data, images: urls };
    const res = await postRequestWithToken(houseData, HOUSES_URL);
    setHouseLoading(false);
    if (res && res.success) {
      setResponse(res);
    } else {
      console.log(res.errors);
      // formatError(res && res.errors);
      setError(res.errors);
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
    handleChange,
    handleSelect,
    handleCreateHouse,
    error,
    houseloading,
    response,
    data,
  };
};

export default useHouseCreate;
