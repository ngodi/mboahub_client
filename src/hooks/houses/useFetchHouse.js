/* eslint-disable no-unreachable */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/requests';
import { getHouseUrl } from '../../routes/server';

export const useFetchHouse = () => {
  const [house, setHouse] = useState();
  const [houseloading, setHouseLoading] = useState(false);
  const [error, setError] = useState();

  const { house_id } = useParams();
  const HOUSE_URL = getHouseUrl(house_id);

  useEffect(() => {
    // stubbing house detail fetch
    setHouseLoading(true);
    setTimeout(() => {
      setHouseLoading(false);
    }, 1000);
    (async () => {
      setHouseLoading(true);
      try {
        const res = await getRequest(HOUSE_URL);
        setHouseLoading(false);
        setHouse(res.data);
      } catch (e) {
        setHouseLoading(false);
        setError(e);
      }
    })();
  }, [HOUSE_URL]);

  return { house, houseloading, error };
};
