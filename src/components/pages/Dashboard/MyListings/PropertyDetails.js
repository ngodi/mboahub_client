import React from 'react';
import { Link } from 'react-router-dom';

import { FaBed, FaBath } from 'react-icons/fa';
import { MdOutlineHouse, MdPeopleOutline, MdFence } from 'react-icons/md';
import { TiArrowBackOutline } from 'react-icons/ti';
import { GiRiceCooker } from 'react-icons/gi';

import Navbar from '../../../navigation/navbar/navbar';
import PropertyImageGallery from '../../../ImageGallery/PropertyImageGallery';
import MapComponent from '../../../MapComponent/MapComponent';

import { useFetchHouse } from '../../../../hooks/houses/useFetchHouse';

function PropertyDetails() {
  const { house } = useFetchHouse();

  return (
    <div>
      <Navbar />
      <div className="row property-content bg-gray">
        <div className="col-md-12">
          <Link to="/dashboard/my_listings">
            <span className="p-2 bg-primary text-white text-small mb-4 rounded">
              <TiArrowBackOutline size={30} />
              &nbsp;BACK
            </span>
          </Link>
          {house?.images?.length > 0 && <PropertyImageGallery images={house.images} />}
          <div className="amenities row text-small">
            <span className="col-md-3">
              <MdOutlineHouse size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Type</span>
              <br />
              Apartment/House
            </span>
            <span className="col-md-3">
              <MdPeopleOutline size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Accommodation</span>
              <br />
              {house && house.properties.sitting_room}
&nbsp;Sitting rooms
            </span>
            <span className="col-md-3">
              <FaBed size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Bedrooms</span>
              <br />
              {house && house.properties.num_bed_rooms}
            </span>
            <span className="col-md-3">
              <FaBath size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Bathrooms/Toilets</span>
              <br />
              {house && house.properties.num_toilets}
            </span>
          </div>
          <div className="amenities row text-small">
            <div className="col-md-3">
              <GiRiceCooker size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Kitchen</span>
              <br />
              {house && house.properties.kitchen ? 'Available' : 'None'}
            </div>
            <div className="col-md-3">
              <MdFence size={50} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Fence</span>
              <br />
              {house && house.properties.fenced ? 'Fenced' : 'Not fenced'}
            </div>
          </div>
          <div className="summary mt-4">
            <h5>About This Listing</h5>
            {house ? <p>{house.summary}</p> : <p>.....</p>}
          </div>
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
