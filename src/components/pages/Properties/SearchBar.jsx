import React, { useContext, useState } from 'react';
// import RangeSlider from 'react-range-slider-input';
import { AiOutlineSearch } from 'react-icons/ai';
import FormInput from '../../forms/FormInput';
import SelectInput from '../../forms/SelectInput';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import './styles.css';

const SearchBar = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [homeType, setHomeType] = useState('');
  // const [value, setValue] = useState([30, 60]);

  const { inputObj, setInputObj } = useContext(SearchInputContext);

  const houseOptions = [
    { label: 'Select house type', value: '' },
    { label: 'Single Room', value: 'single_room' },
    { label: 'Studio', value: 'studio' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Hotel', value: 'hotel' },
  ];

  const filterHouse = (e) => {
    e.preventDefault();
    setInputObj({
      ...inputObj, city, street, country, homeType,
    });
  };

  return (
    <div className="w-100 bg-white search-bar">
      <div className="search-bar-content row">
        <div className="mt-2 col-md-2">
          <FormInput
            type="text"
            name="street"
            placeholder="Street address"
            data={street}
            handleChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="mt-2 col-md-2">
          <FormInput type="text" name="city" placeholder="All Cities" data={city} handleChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="mt-2 mx-2 col-md-2">
          <FormInput
            type="text"
            name="country"
            placeholder="All Countries"
            data={country}
            handleChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="mt-2 col-md-2">
          <SelectInput options={houseOptions} name="homeType" data={homeType} handleSelect={(e) => setHomeType(e.target.value)} />
        </div>
        <button type="button" onClick={filterHouse} className="bg-primary rounded text-small text-bold text-white col-md-1">
          Filter&nbsp;&nbsp;
          <AiOutlineSearch size={20} />
          {/* <RangeSlider value={value} onInput={setValue} /> */}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
