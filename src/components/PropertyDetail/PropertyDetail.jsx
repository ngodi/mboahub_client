import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FaBed, FaBath } from 'react-icons/fa';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { MdOutlineHouse, MdPeopleOutline, MdFence } from 'react-icons/md';
import { TiArrowBackOutline } from 'react-icons/ti';
import { GiRiceCooker } from 'react-icons/gi';

import ButtonHeading from '../common/ButtonHeading/ButtonHeading';
import ContactItem from '../common/ContactItem/ContactItem';
// import Rating from '../common/Rating/Rating';
import TextButton from '../common/TextButton/TextButton';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import ContactForm from '../ContactForm/ContactForm';
import Footer from '../layouts/Footer/Footer';
import MapComponent from '../MapComponent/MapComponent';

import './PropertyDetail.css';
import PropertyHeader from './PropertyHeader';
import Navbar from '../layouts/navbar/navbar';
import { useFetchHouse } from '../../hooks/houses/useFetchHouse';
import PropertyImageGallery from '../ImageGallery/PropertyImageGallery';

function PropertyDetail() {
  const { house } = useFetchHouse();
  const avatar = house?.user?.avatar || '/photos/avatar.png';

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <PropertyHeader house={house && house} />
      <BreadCrumb house={house && house} />
      <div className="row mx-auto property-content bg-gray">
        <div className="col-md-1" />
        <div className="col-md-5">
          <button style={{ border: 'none' }} type="button" onClick={() => navigate(-1)}>
            <span className="p-2 bg-primary text-white text-small mb-4 rounded">
              <TiArrowBackOutline size={30} />
              &nbsp;BACK
            </span>
          </button>
          {house?.images && <PropertyImageGallery images={house.images} />}
          <div className="amenities text-small">
            <div>
              <MdOutlineHouse size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Type</span>
              <br />
              Apartment/House
            </div>
            <div>
              <MdPeopleOutline size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Accommodation</span>
              <br />
              {house && house.properties.sitting_room}
              &nbsp;Sitting rooms
            </div>
            <div>
              <FaBed size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Bedrooms</span>
              <br />
              {house && house.properties.num_bed_rooms}
            </div>
            <div>
              <FaBath size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Bathrooms/Toilets</span>
              <br />
              {house && house.properties.num_toilets}
            </div>
            <div>
              <GiRiceCooker size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">Kitchen</span>
              <br />
              {house && house.properties.kitchen ? 'Available' : 'None'}
            </div>
            <div>
              <MdFence size={40} color="#3270FC" />
              <br />
              <span className="text-dark-blue text-bold">&nbsp;</span>
              <br />
              {house && house.properties.fenced ? 'Fenced' : 'Not fenced'}
            </div>
          </div>
          <div className="summary mt-4">
            <h5>About This Listing</h5>
            {house ? <p>{house.summary}</p> : <p>.....</p>}
          </div>
          <MapComponent height="40vh" width="100%" house={house && house} />
        </div>
        <div className="col-md-1" />
        <div className="col-md-4">
          <div className="agent-container rounded">
            <div className="agent-top rounded-top">
              <div className="agent-photo bg-white rounded shadow p-3 d-flex justify-content-around">
                <img className="img img-thumbnail" src={`${avatar}`} width="120px" alt="agent" />
                <div className="text-blue bold text-small">
                  <p>{house && house.user.published_by}</p>
                  <p>
                    {house && house.user.house_count}
                    &nbsp;&nbsp;
                    <span className="text-gray">Property Listings</span>
                  </p>
                  {/* <Rating /> */}
                </div>
              </div>
            </div>
            <div className="agent-bottom bg-white shadow rounded-bottom py-4 text-small">
              <ContactItem icon={<AiOutlinePhone size="20" />} title="Phone" text={house?.user?.phone || 'UNAVAILABLE'} />
              <ContactItem icon={<AiOutlineMail size="20" />} title="Mail" text={house?.user?.email} />
              <div className="pt-3 px-3 border-top">
                <TextButton text="View Profile" />
              </div>
            </div>
            <div className="mt-4 shadow rounded bg-white">
              <ButtonHeading text="Contact Property" />
              <ContactForm
                ownerId={house && house.user.id}
                houseId={house && house.id}
                phone={house?.user?.phone}
              />
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
      <Footer />
    </div>
  );
}

export default PropertyDetail;
