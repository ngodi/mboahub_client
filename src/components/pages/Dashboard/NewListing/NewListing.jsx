import React, { useState, useEffect } from 'react';
import { IoMdInformation, IoMdClose } from 'react-icons/io';
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
import LocationSearch from '../../../apis/Photon/LocationSearch/LocationSearch';

function NewListing() {
  const [images, setImages] = useState([]);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const {
    imageLoading,
    ACCEPTED_TYPES,
    MAX_FILES,
    processFiles,
    removeImage,
    errors,
  } = useUploadImage(images, setImages);

  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
  }, []);

  const {
    handleChange,
    handleSelect,
    handleCreateHouse,
    error,
    houseloading,
    response,
    data,
    progress,
  } = useHouseCreate(images);

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

  useEffect(() => {
    data.city = city;
    data.street = street;
    data.lat = coordinates.lat;
    data.lng = coordinates.lng;
    data.country = country;
  }, [street, coordinates]);

  return (
    <div className='new-listing'>
      <h5 className='my-2 pb-4 border-bottom'>ADD LISTING</h5>
      <form enctype='multipart/form-data'>
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
              <LocationSearch
                setCoordinates={setCoordinates}
                setCity={setCity}
                setStreet={setStreet}
                setCountry={setCountry}
              />
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
          <h6>Image Upload</h6>
          <span className='text-primary'>
            {images.length} / {MAX_FILES}
          </span>
          <div className='d-flex flex-wrap'>
            {images.map((img, idx) => (
              <>
                <div style={{ height: '3px', background: '#eee' }}>
                  <div
                    style={{
                      width: `${progress[img.id] ?? 0}%`,
                      background: '#c8a96e',
                      height: '100%',
                    }}
                  />
                </div>
                <div
                  className='position-relative'
                  key={img.id}
                  style={{ width: '100px' }}
                >
                  <img
                    alt={img.name}
                    className='img img-thumbnail m-1'
                    style={{
                      width: '100px',
                      height: '75px',
                      objectFit: 'cover',
                    }}
                    src={img.preview}
                  />
                  <button
                    title='Remove'
                    onClick={() => removeImage(img.id)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <IoMdClose color='white' size={14} />
                  </button>
                </div>
              </>
            ))}
          </div>
          <div className='row'>
            <div className='col-md-8 '>
              <div className='form-group'>
                <input
                  type='file'
                  accept={ACCEPTED_TYPES.join(',')}
                  className='form-control'
                  disabled={imageLoading}
                  onChange={(e) => processFiles(e.target.files)}
                  multiple
                />
              </div>
              {errors.length > 0 && (
                <div className='text-danger mt-4'>
                  {errors.map((err, i) => (
                    <p key={i} className='text-danger'>
                      ⚠ {err}
                    </p>
                  ))}
                </div>
              )}
              {formErrors.image && (
                <p className='text-danger'>⚠ {formErrors.image}</p>
              )}
            </div>
          </div>
          {error && !Array.isArray(error) && (
            <p className='text-danger'>{error}</p>
          )}
          <br />
          <button
            type='button'
            disabled={imageLoading}
            className='btn btn-primary'
            onClick={handleCreateHouse}
          >
            {houseloading ? '... creating' : 'Add House'}
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
