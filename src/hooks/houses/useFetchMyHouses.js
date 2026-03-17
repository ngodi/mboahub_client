import { useState, useEffect } from 'react';
import { getRequestWithToken } from '../../utils/requests';
import { MY_HOUSES_URL } from '../../routes/server';

export const useFetchMyHouses = () => {
  const [houses, setHouses] = useState();
  const [houseloading, setHouseLoading] = useState(false);
  const [meta, setMeta] = useState();
  const [error, setError] = useState();
  const [params, setParams] = useState({ perPage: 12, page: 1 });

  useEffect(() => {
    const fetchMyHouses = async () => {
      let url = `${MY_HOUSES_URL}?perPage=${params.perPage}&page=${params.page}`;
      setHouseLoading(true);
      const res = await getRequestWithToken(url);
      setHouseLoading(false);

      if (!res.success) {
        setError(res.errors);
      } else {
        setHouses(res.data);
        setMeta(res.meta);
        setParams((prev) => ({ ...prev, page: res.meta.page }));
      }
    };
    fetchMyHouses();
  }, [params.page]);

  return { houses, houseloading, error, meta, setParams };
};
