/* eslint-disable import/no-named-as-default */
import React, { useContext, useState } from 'react';
import 'react-range-slider-input/dist/style.css';
import { Oval } from 'react-loader-spinner';
import { PageWrapper } from './style';
import useFetchHouses from '../../../hooks/houses/useFetchHouses';
import PropertyItem from '../../PropertyItem/PropertyItem';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import SearchBar from './SearchBar';
import './styles.css';
import MobileSearchBar from './MobileSearchBar';
import { AiOutlineSearch } from 'react-icons/ai';

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { inputObj } = useContext(SearchInputContext);

  const {
    handlePageClickPrev,
    handlePageClickNext,
    numPages,
    params,
    houses,
    houseloading,
  } = useFetchHouses(inputObj);

  return (
    <>
      <button
        type='button'
        onClick={() => setShowFilters(true)}
        className='filter-trigger bg-primary rounded text-small text-bold text-white col-md-1'
        style={{ position: 'fixed', top: 120, right: 10 }}
      >
        Filter&nbsp;&nbsp;
        <AiOutlineSearch size={20} />
        {/* <RangeSlider value={value} onInput={setValue} /> */}
      </button>
      <SearchBar />
      {showFilters && <MobileSearchBar setShowFilters={setShowFilters} />}
      <PageWrapper>
        <div className='w-100 bg-white properties-list'>
          <div style={{ height: '50vh' }} className='mx-2 row'>
            {houseloading ? (
              <div className='mx-auto col-md-6'>
                <Oval color='#00BFFF' height={200} width={200} />
              </div>
            ) : (
              houses &&
              houses.map((house) => (
                <div key={house.id} className='col-sm'>
                  <PropertyItem house={house} key={house.id} />
                </div>
              ))
            )}
            <div className='ml-4'>
              {params.page > 0 && (
                <>
                  <span className='rounded bg-white border border-primary text-primary p-2 mx-2'>
                    {1}
                  </span>
                  <span className='text-primary p-2 mx-2'>...</span>
                  <button
                    type='button'
                    className='bg-primary text-white p-1'
                    onClick={handlePageClickPrev}
                  >
                    Prev
                  </button>
                </>
              )}
              {params.page > 0 && (
                <span className='bg-white text-primary p-2 border mx-1 rounded border-primary'>
                  {params.page + 1}
                </span>
              )}
              {params.page < numPages - 1 && (
                <>
                  <button
                    type='button'
                    className='bg-primary text-white p-1'
                    onClick={handlePageClickNext}
                  >
                    Next
                  </button>
                  <span className='text-primary p-2 mx-2'>...</span>
                  <span className='rounded bg-white border border-primary text-primary p-2 mx-2'>
                    {numPages}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Properties;
