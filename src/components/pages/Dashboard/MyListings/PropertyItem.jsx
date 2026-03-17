/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import LocationInfo from '../../../common/LocationInfo/LocationInfo';
import Rating from '../../../common/Rating/Rating';
import { defaultImage } from '../../../../constants/houseDetails';
import axios from 'axios';
import { HOUSES_URL } from '../../../../routes/server';

const handlePropertyDelete = async (id) => {
  // eslint-disable-next-line no-restricted-globals
  const response = confirm('Are you sure you want to delete this property?');
  if (response === true) {
    const res = await axios.delete(`${HOUSES_URL}/${id}`);
    if (res.status === 204) {
      window.location.reload();
    }
  }
};

const PropertyItem = ({ house }) => (
  <div className='house-preview border shadow rounded'>
    {/* Image column */}
    <div className='image-container'>
      <img
        src={house.images[0] ?? defaultImage}
        alt={house.listingName ?? 'property'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <button type='button' className='btn btn-primary btn-sm'>
        <Link to={`my_listings/${house.id}`}>View</Link>
      </button>
    </div>

    {/* Content column */}
    <div className='house-preview-content'>
      <div className='p-2'>
        <strong className='text-small text-gray d-block text-truncate'>
          {house.listingName}
        </strong>
        <div className='mt-3' />
        <LocationInfo address={house.street} text_color='lightgray' />
      </div>

      <div className='listing-actions'>
        <span className='text-small views'>Viewed — {house.views ?? 0}</span>
        <Rating />
        <div className='listing-actions-items'>
          <Link to={`my_listings/${house.id}/update`} title='Edit listing'>
            <FiEdit color='#3270FC' />
          </Link>
          <span
            role='button'
            tabIndex={0}
            title='Delete listing'
            style={{ cursor: 'pointer' }}
            onClick={() => handlePropertyDelete(house.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePropertyDelete(house.id);
            }}
          >
            <MdOutlineDeleteForever color='#fc326f' size={20} />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PropertyItem;
