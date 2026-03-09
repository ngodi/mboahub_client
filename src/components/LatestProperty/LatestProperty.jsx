/* eslint-disable react/no-array-index-key */
/* eslint-disable  */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import TextButton from '../common/TextButton/TextButton';
import PropertyItem from '../PropertyItem/PropertyItem';

import './LatestProperty.css';
import { useFetchHouses } from '../../hooks/houses/useFetchHouses';
import { ALL, FOR_RENT, FOR_SALE } from '../../constants/houseDetails';

function LatestProperty() {
  const [item, setItem] = useState(ALL);

  const navigate = useNavigate();

  const { houses, houseloading } = useFetchHouses();

  const allStyle =
    item === ALL
      ? 'latest-property-header-item-active'
      : 'latest-property-header-item';
  const forSaleStyle =
    item === FOR_SALE
      ? 'latest-property-header-item-active'
      : 'latest-property-header-item';
  const forRent =
    item === FOR_RENT
      ? 'latest-property-header-item-active'
      : 'latest-property-header-item';

  const allProperties =
    item === ALL
      ? houses
      : houses?.filter((property) => property.propertyType === item);

  return (
    <div className='latest-property'>
      <div className='container'>
        <div className='latest-property-header'>
          <div className='latest-property-header-left my-2'>
            <span className='primary-heading'>BROWSE HOT OFFERS</span>
            <br />
            <span className='secondary-heading'>Latest Properties</span>
          </div>
          <div className='latest-property-header-right my-2 rounded'>
            <span onClick={() => setItem(ALL)} className={allStyle}>
              All Categories
            </span>
            <span onClick={() => setItem(FOR_SALE)} className={forSaleStyle}>
              For Sale
            </span>
            <span onClick={() => setItem(FOR_RENT)} className={forRent}>
              For rent
            </span>
          </div>
        </div>
        <div className='latest-property-items'>
          {houseloading ? (
            <div className='mx-auto'>
              <Oval color='#00BFFF' height={200} width={200} />
            </div>
          ) : (
            allProperties &&
            allProperties.map(
              (house, i) =>
                i < 8 && (
                  <div key={i} className='latest-property-item'>
                    <PropertyItem house={house} key={house.id} />
                  </div>
                ),
            )
          )}
        </div>
        <div onClick={() => navigate('/properties')}>
          <TextButton text='View all properties' />
        </div>
      </div>
    </div>
  );
}

export default LatestProperty;
