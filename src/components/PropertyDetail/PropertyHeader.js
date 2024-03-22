/* eslint-disable react/prop-types */
import React from 'react';

import { Oval } from 'react-loader-spinner';

// import { AiFillEye, AiFillHeart } from 'react-icons/ai';

// import ActionButton from '../common/ActionButton/ActionButton';
import LocationInfo from '../common/LocationInfo/LocationInfo';
import MainHeading from '../common/MainHeading/MainHeading';
import PropertyType from '../common/PropertyType/PropertyType';
// import Rating from '../common/Rating/Rating';

function PropertyHeader({ house }) {
  const backgroundImage = house && house.images[0];
  return (
    <div className="property-detail-header pb-4 bg-gray" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="property-detail-left">
        <div>
          <PropertyType type="Sale" />
          <PropertyType type="Apartment" />
        </div>
        <div className="mt-4">{house ? <MainHeading heading={house.listing_name} /> : <Oval color="#00BFFF" height={30} width={30} />}</div>
        <div className="mt-2 d-flex">
          <LocationInfo text_color="text-white" address={`${house ? house.location : '...'}`} />
          &nbsp;&nbsp;
          {/* <Rating classes="text-white" review="Good" /> */}
        </div>
        <div className="mt-2 mb-4 d-flex bold">
          <h5 className="text-white">
            Price:&nbsp;&nbsp;$&nbsp;
            <span className="price-color">{`${house ? house.price || 0 : '...'}`}</span>
          </h5>
          &nbsp;&nbsp;
          <span className="text-white font-weight-bold">
            Date:&nbsp;&nbsp;
            {`${house ? house.published_at : '...'}`}
          </span>
        </div>
      </div>
      <div className="property-detail-right mb-4">
        {/* <ActionButton text="Share" /> */}
        {/* <div className="mt-4 d-flex">
          <div className="">
            <AiFillEye color="#3270FC" />
            &nbsp;&nbsp;&nbsp;
            <span>Viewed - 156</span>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="">
            <AiFillHeart color="#3270FC" />
            &nbsp;&nbsp;&nbsp;
            <span>Bookmark - 24</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PropertyHeader;
