import React, { useContext, useState } from 'react';
// import RangeSlider from 'react-range-slider-input';
import { AiOutlineSearch } from 'react-icons/ai';
import FormInput from '../../forms/FormInput';
import SelectInput from '../../forms/SelectInput';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import './styles.css';
import { FiSettings } from 'react-icons/fi';

const SearchBar = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');
  // const [value, setValue] = useState([30, 60]);

  const { inputObj, setInputObj } = useContext(SearchInputContext);

  const houseOptions = [
    { label: 'Select house type', value: '' },
    { label: 'Single Room', value: 'SINGLE_ROOM' },
    { label: 'Studio', value: 'STUDIO' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'Hotel', value: 'HOTEL' },
  ];

  const filterHouse = (e) => {
    e.preventDefault();
    setInputObj({
      ...inputObj,
      city,
      street,
      country,
      propertyCategory,
    });
  };

  return (
    <div className='w-100 bg-white search-bar'>
      <div className='search-bar-content row'>
        <div className='mt-2 col-md-2'>
          <FormInput
            type='text'
            name='street'
            placeholder='Street address'
            data={street}
            handleChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className='mt-2 col-md-2'>
          <FormInput
            type='text'
            name='city'
            placeholder='All Cities'
            data={city}
            handleChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='mt-2 mx-2 col-md-2'>
          <FormInput
            type='text'
            name='country'
            placeholder='All Countries'
            data={country}
            handleChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className='mt-2 col-md-2'>
          <SelectInput
            options={houseOptions}
            name='propertyCategory'
            data={propertyCategory}
            handleSelect={(e) => setPropertyCategory(e.target.value)}
          />
        </div>
        <button
          type='button'
          onClick={filterHouse}
          className='bg-primary rounded text-small text-bold text-white col-md-1'
        >
          Filter&nbsp;&nbsp;
          <AiOutlineSearch size={20} />
          {/* <RangeSlider value={value} onInput={setValue} /> */}
        </button>
        <span
          onClick={() => setInputObj({})}
          style={{ cursor: 'pointer' }}
          className='col-md-1 rounded text-small text-bold text-primary reset-btn'
        >
          <FiSettings size={20} /> Reset
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
