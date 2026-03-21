import React, { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineFilterAltOff } from 'react-icons/md';
import FormInput from '../../forms/FormInput';
import SelectInput from '../../forms/SelectInput';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import './SearchBar.css';

const houseOptions = [
  { label: 'All Types', value: '' },
  { label: 'Single Room', value: 'SINGLE_ROOM' },
  { label: 'Studio', value: 'STUDIO' },
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'Villa', value: 'VILLA' },
  { label: 'Hotel', value: 'HOTEL' },
];

const SearchBar = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');

  const { inputObj, setInputObj } = useContext(SearchInputContext);

  const handleFilter = (e) => {
    e.preventDefault();
    setInputObj({ ...inputObj, city, street, country, propertyCategory });
  };

  const handleReset = () => {
    setStreet('');
    setCity('');
    setCountry('');
    setPropertyCategory('');
    setInputObj({});
  };

  return (
    <form
      className='search-bar'
      onSubmit={handleFilter}
      role='search'
      aria-label='Search properties'
    >
      <div className='search-bar-fields'>
        <FormInput
          type='text'
          name='street'
          placeholder='Street address'
          data={street}
          handleChange={(e) => setStreet(e.target.value)}
        />
        <FormInput
          type='text'
          name='city'
          placeholder='All Cities'
          data={city}
          handleChange={(e) => setCity(e.target.value)}
        />
        <FormInput
          type='text'
          name='country'
          placeholder='All Countries'
          data={country}
          handleChange={(e) => setCountry(e.target.value)}
        />
        <SelectInput
          options={houseOptions}
          name='propertyCategory'
          data={propertyCategory}
          handleSelect={(e) => setPropertyCategory(e.target.value)}
        />
      </div>

      <div className='search-bar-actions'>
        <button type='submit' className='btn-search'>
          <AiOutlineSearch size={17} />
          <span>Search</span>
        </button>

        <button
          type='button'
          className='btn-reset'
          onClick={handleReset}
          aria-label='Reset search filters'
        >
          <MdOutlineFilterAltOff size={17} />
          <span>Reset</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
