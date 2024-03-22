/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { IoMdInformation } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';
import GooglePlaces from '../../../components/apis/GooglePlaces/GooglePlaces';
import FormInput from '../../../components/forms/FormInput';
import SelectInput from '../../../components/forms/SelectInput';

import './NewListing.css';
import { useUploadImage } from '../../../hooks/images/useUploadImage';
import useHouseCreate from '../../../hooks/houses/useHouseCreate';
import ListingDetails from './ListingDetails';
import LandedListingDetails from './LandedListingDetails';
import TextAreaInput from '../../../components/forms/TextAreaInput';

function NewListing() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const {
    files, urls, imageLoading, handleFileChange, uploadImage,
  } = useUploadImage();
  const {
    handleChange, handleSelect, handleCreateHouse, error, houseloading, response, data,
  } = useHouseCreate(urls);

  const houseOptions = [
    { label: 'Select house type', value: '' },
    { label: 'Single Room', value: 'single_room' },
    { label: 'Studio', value: 'studio' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Land', value: 'land' },
  ];

  let addressArr = '';

  useEffect(() => {
    addressArr = address.split(', ');
    data.city = address.split(', ')[0];
    data.street = address;
    data.lat = coordinates.lat;
    data.lng = coordinates.lng;
    data.country = addressArr[addressArr.length - 1];
  }, [address, coordinates]);

  return (
    <div className="new-listing">
      <h5 className="my-2 pb-4 border-bottom">ADD LISTING</h5>
      <form>
        <div className="listing-info shadow">
          <h6>
            <span className="text-blue text-bold">
              <IoMdInformation />
            </span>
            Basic Informations
          </h6>
          <div className="row">
            <div className="col-md-4 mt-4">
              <SelectInput
                label="For sale or rental"
                options={[
                  { label: 'Sale or rent', value: '' },
                  { label: 'For sale', value: 'for_sale' },
                  { label: 'For rent', value: 'for_rent' },
                ]}
                name="businessType"
                data={data.businessType}
                handleSelect={handleSelect}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormInput
                type="text"
                name="listing_name"
                placeholder="Title of your listing"
                label="Listing Title"
                data={data.listing_name}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-4 mt-4">
              <SelectInput
                label="Property Type"
                options={houseOptions}
                name="home_type"
                data={data.home_type}
                handleSelect={handleSelect}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                type="text"
                name="cost"
                placeholder="Listing Price"
                label="Listing Price"
                data={data.cost}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="listing-info shadow">
          <div className="text-blue text-bold d-flex">
            <GoLocation />
            <h6 className="ml-2">Location of Listing</h6>
          </div>
          <div className="row">
            <div className="col-md-12">
              <GooglePlaces
                address={address}
                setAddress={setAddress}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
              />
            </div>
            <div className="col-md-6">
              <FormInput type="text" name="city" placeholder="City" label="City" data={data.city} handleChange={handleChange} />
            </div>
            <div className="col-md-6">
              <FormInput
                type="text"
                name="country"
                placeholder="Enter Country"
                label="Listing Country"
                data={data.country}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="listing-info shadow">
          <h6>Listing Details</h6>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                type="text"
                name="totalArea"
                placeholder="Total Area in metres squared"
                label="Total Area"
                data={data.totalArea}
                handleChange={handleChange}
              />
            </div>
          </div>
          {
          data?.home_type === 'land'
            ? (
              <LandedListingDetails
                handleChange={handleChange}
                handleSelect={handleSelect}
                data={data}
              />
            )
            : (
              <ListingDetails
                handleChange={handleChange}
                handleSelect={handleSelect}
                data={data}
              />
            )
        }
          <div className="row">
            <div className="col-md-6">
              <TextAreaInput data={data.summary} handleChange={handleChange} label="Listing Details" name="summary" />
            </div>
          </div>
        </div>
        <div className="listing-info shadow">
          <div className="d-flex flex-wrap">
            {urls && urls.map((url, i) => <img alt="house-thumbnail" key={i} width="50px" className="img img-thumbnail m-1" src={url} />)}
            {imageLoading && 'uploading ...'}
          </div>
          <h6>Image Upload</h6>
          <div className="row">
            <div className="col-md-8 ">
              <div className="form-group">
                <input type="file" className="form-control" disabled={urls && urls.length >= 10} onChange={handleFileChange} multiple />
              </div>
            </div>
            <div className="col-md-4">
              <button disabled={files.length === 0} type="button" className="btn btn-primary btn-block" onClick={uploadImage}>
                {' '}
                {imageLoading ? '...' : 'Upload'}
              </button>
            </div>
          </div>
          <span className="text-danger">{error && error}</span>
          <br />
          <button type="button" disabled={imageLoading} className="btn btn-primary mt-4" onClick={handleCreateHouse}>
            {houseloading && '...'}
            Add House
          </button>
          {response && <div className="text-blue">House created successfully !!</div>}
        </div>
      </form>
    </div>
  );
}

export default NewListing;
