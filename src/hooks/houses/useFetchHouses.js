import { useState, useEffect } from 'react';
import { getRequest } from '../../utils/requests';
import { HOUSES_URL } from '../../routes/server';

export const useFetchHouses = (inputObj) => {
  const [houses, setHouses] = useState();
  const [houseCount, setHouseCount] = useState();
  const [houseloading, setHouseLoading] = useState(false);
  const [error, setError] = useState();
  const [meta, setMeta] = useState();
  const [params, setParams] = useState({ perPage: 12, page: 1 });

  const numPages = Math.ceil(houseCount / params.perPage);

  useEffect(() => {
    (async () => {
      setHouseLoading(true);
      let url = `${HOUSES_URL}?perPage=${params.perPage}&page=${params.page}`;

      if (inputObj?.listingName)
        url += `&filters[listingName]=${inputObj.listingName}`;
      if (inputObj?.propertType)
        url += `&filters[propertType]=${inputObj.propertType}`;
      if (inputObj?.street) url += `&filters[street]=${inputObj.street}`;
      if (inputObj?.city) url += `&filters[city]=${inputObj.city}`;
      if (inputObj?.country) url += `&filters[country]=${inputObj.country}`;
      if (inputObj?.propertyCategory)
        url += `&filters[propertyCategory]=${inputObj.propertyCategory}`;

      const res = await getRequest(url);

      try {
        if (res.success) {
          setHouses(res.data);
          setHouseCount(res.meta.total);
          setMeta(res.meta);
        } else {
          setError(res.errors);
        }
      } catch {
        setError('a server error occurred');
      } finally {
        setHouseLoading(false);
      }
    })();
  }, [params, inputObj]);

  function handlePageClickPrev() {
    if (params.page <= 0) return;
    setParams((prev) => ({ ...prev, page: prev.page - 1 }));
  }

  function handlePageClickNext() {
    if (params.page >= numPages) return;
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  function goToPage(page) {
    if (page <= 0 || page > numPages) return;
    setParams((prev) => ({ ...prev, page }));
  }

  return {
    handlePageClickPrev,
    handlePageClickNext,
    goToPage,
    numPages,
    params,
    houses,
    houseloading,
    error,
    meta,
  };
};

export default useFetchHouses;
