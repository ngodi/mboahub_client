/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import LocationInfo from '../../../common/LocationInfo/LocationInfo';
import Rating from '../../../common/Rating/Rating';

const PropertyItem = ({ house, key }) => (
  <div key={key} className="house-preview border shadow rounded">
    <div className="image-container">
      <img src={house.images[0]} alt="house" />
      <button type="button" className="btn btn-primary">
        <Link to={`${house.id}`}>View</Link>
      </button>
    </div>
    <div className="house-preview-content">
      <div className="p-2">
        <strong className="text-small text-gray">{house.listing_name}</strong>
        <br />
        <LocationInfo address={house.location} text_color="lightgray" />
        <Rating />
      </div>
      <div className="listing-actions">
        <span className="text-small views">Viewed - 645</span>
        <div className="listing-actions-items">
          <span>
            <FiEdit color="#3270FC" />
          </span>
          <span>
            <FiEdit color="#3270FC" />
          </span>
          <span>
            <MdOutlineDeleteForever color="#3270FC" />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PropertyItem;
