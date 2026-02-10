import React, { useState, useEffect } from 'react';
import { IoMdInformation } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';
// import GooglePlaces from '../../../apis/GooglePlaces/GooglePlaces';
import FormInput from '../../../forms/FormInput';
import SelectInput from '../../../forms/SelectInput';

import './NewListing.css';
import { useUploadImage } from '../../../../hooks/images/useUploadImage';
import useHouseCreate from '../../../../hooks/houses/useHouseCreate';
import ListingDetails from './ListingDetails';
import LandedListingDetails from './LandedListingDetails';
import TextAreaInput from '../../../forms/TextAreaInput';

function NewListing() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const { files, urls, imageLoading, handleFileChange, uploadImage } =
    useUploadImage();
  const {
    handleChange,
    handleSelect,
    handleCreateHouse,
    error,
    houseloading,
    response,
    data,
  } = useHouseCreate(urls);

  const formErrors = Array.isArray(error)
    ? error.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {})
    : {};

  const houseOptions = [
    { label: 'Select house type', value: '' },
    { label: 'Single Room', value: 'SINGLE_ROOM' },
    { label: 'Studio', value: 'STUDIO' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'Hotel', value: 'HOTEL' },
    { label: 'Land', value: 'LAND' },
  ];

  const propertyStatusOptions = [
    { label: 'available', value: 'AVAILABLE' },
    { label: 'not available', value: 'UNAVAILABLE' },
    { label: 'pending', value: 'PENDING' },
    { label: 'sold', value: 'SOLD' },
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
    <div className='new-listing'>
      <h5 className='my-2 pb-4 border-bottom'>ADD LISTING</h5>
      <form>
        <div className='listing-info shadow'>
          <h6>
            <span className='text-blue text-bold'>
              <IoMdInformation />
            </span>
            Basic Informations
          </h6>
          <div className='row'>
            <div className='col-md-4'>
              <SelectInput
                label='For sale or rental'
                options={[
                  { label: 'Sale or rent', value: '' },
                  { label: 'For sale', value: 'SALE' },
                  { label: 'For rent', value: 'RENT' },
                ]}
                name='propertyType'
                data={data.propertyType}
                handleSelect={handleSelect}
                error={formErrors.propertyType}
              />
            </div>
            <div className='col-md-4'>
              <FormInput
                type='text'
                name='listingName'
                placeholder='Name of your listing'
                label='Listing Name'
                data={data.listingName}
                error={formErrors.listingName}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mt-4'>
              <SelectInput
                label='Property Category'
                options={houseOptions}
                name='propertyCategory'
                data={data.propertyCategory}
                handleSelect={handleSelect}
                error={formErrors.propertyCategory}
              />
            </div>
            <div className='col-md-4 mt-4'>
              <SelectInput
                label='Property Status'
                options={propertyStatusOptions}
                name='propertyStatus'
                data={data.propertyStatus}
                handleSelect={handleSelect}
                error={formErrors.propertyStatus}
              />
            </div>
            <div className='col-md-4 mt-4'>
              <FormInput
                type='text'
                name='price'
                placeholder='Listing Price'
                label='Listing Price'
                data={data.price}
                error={formErrors.price}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='listing-info shadow'>
          <div className='text-blue text-bold d-flex'>
            <GoLocation />
            &nbsp;
            <h6 className='ml-2'>Location of Listing</h6>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              {/* <GooglePlaces
                address={address}
                setAddress={setAddress}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
              /> */}
            </div>
            <div className='col-md-6'>
              <FormInput
                type='text'
                name='street'
                placeholder='Street'
                label='Street'
                data={data.street}
                error={formErrors.street}
                handleChange={handleChange}
              />
            </div>
            <div className='col-md-6'>
              <FormInput
                type='text'
                name='city'
                placeholder='City'
                label='City'
                data={data.city}
                error={formErrors.city}
                handleChange={handleChange}
              />
            </div>
            <div className='col-md-6'>
              <FormInput
                type='text'
                name='country'
                placeholder='Enter Country'
                label='Listing Country'
                data={data.country}
                error={formErrors.country}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='listing-info shadow'>
          <h6>Listing Details</h6>
          <div className='row'>
            <div className='col-md-6'>
              <FormInput
                type='text'
                name='totalArea'
                placeholder='Total Area in metres squared'
                label='Total Area'
                data={data.totalArea}
                error={formErrors.totalArea}
                handleChange={handleChange}
              />
            </div>
          </div>
          {data?.home_type === 'land' ? (
            <LandedListingDetails
              handleChange={handleChange}
              handleSelect={handleSelect}
              data={data}
            />
          ) : (
            <ListingDetails
              handleChange={handleChange}
              handleSelect={handleSelect}
              data={data}
              formErrors={formErrors}
            />
          )}
          <div className='row'>
            <div className='col-md-6'>
              <TextAreaInput
                data={data.summary}
                handleChange={handleChange}
                label='Listing Details'
                name='summary'
                error={formErrors.summary}
              />
            </div>
          </div>
        </div>
        <div className='listing-info shadow'>
          <div className='d-flex flex-wrap'>
            {urls &&
              urls.map((url, i) => (
                <img
                  alt='house-thumbnail'
                  key={i}
                  width='50px'
                  className='img img-thumbnail m-1'
                  src={url}
                />
              ))}
            {imageLoading && 'uploading ...'}
          </div>
          <h6>Image Upload</h6>
          <div className='row'>
            <div className='col-md-8 '>
              <div className='form-group'>
                <input
                  type='file'
                  className='form-control'
                  disabled={urls && urls.length >= 10}
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            </div>
            <div className='col-md-4'>
              <button
                disabled={files.length === 0}
                type='button'
                className='btn btn-primary btn-block'
                onClick={uploadImage}
              >
                {' '}
                {imageLoading ? '...' : 'Upload'}
              </button>
            </div>
          </div>
          {error && !Array.isArray(error) && (
            <p className='text-danger'>{error}</p>
          )}
          <br />
          <button
            type='button'
            disabled={imageLoading}
            className='btn btn-primary mt-4'
            onClick={handleCreateHouse}
          >
            {houseloading && '...'}
            Add House
          </button>
          {response && (
            <div className='text-blue'>House created successfully !!</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewListing;
