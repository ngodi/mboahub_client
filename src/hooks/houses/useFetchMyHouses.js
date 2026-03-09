/* eslint-disable no-unreachable */
/* eslint-disable  */
import { useState, useEffect } from 'react';
import { getRequestWithToken } from '../../utils/requests';
import { MY_HOUSES_URL } from '../../routes/server';
import housesSample from '../../data/housesSample';

export const useFetchMyHouses = () => {
  const [houses, setHouses] = useState();
  const [houseloading, setHouseLoading] = useState(false);
  const [error, setError] = useState();

  // stub houses data for testing, while backend not hosted
  const { housesList } = housesSample;

  useEffect(() => {
    // temporal set for testing while backend is not hosted
    setHouseLoading(true);
    setTimeout(() => {
      setHouses(housesList);
      setHouseLoading(false);
    }, 1000);
    return;
    // end of temporal code

    (async () => {
      setHouseLoading(true);
      const res = await getRequestWithToken(MY_HOUSES_URL);
      setHouseLoading(false);
      if (res && Object.keys(res).includes('errors')) {
        setError(res.error);
      } else {
        setHouses(res);
      }
    })();
  }, [error, housesList]);

  return { houses, houseloading, error };
};
