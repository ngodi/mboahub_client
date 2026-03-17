import React, { useEffect, useState } from 'react';
import { IoMdInformation, IoMdClose } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';

import FormInput from '../../forms/FormInput';
import SelectInput from '../../forms/SelectInput';
import TextAreaInput from '../../forms/TextAreaInput';
import ListingDetails from '../Dashboard/NewListing/ListingDetails';
import LocationSearch from '../../apis/Photon/LocationSearch/LocationSearch';

import useUpdateHouse from '../../../hooks/houses/useUpdateHouse';
import { useFetchHouse } from '../../../hooks/houses/useFetchHouse';
import { useUploadImage } from '../../../hooks/images/useUploadImage';
import LandedListingDetails from '../Dashboard/NewListing/LandedListingDetails';

function UpdateProperty() {
  const { house } = useFetchHouse();

  const [images, setImages] = useState([]);

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');

  const { imageLoading, ACCEPTED_TYPES, MAX_FILES, processFiles, errors } =
    useUploadImage(images, setImages);

  const {
    handleChange,
    handleSelect,
    handleUpdateHouse,
    data,
    progress,
    loading,
  } = useUpdateHouse(house?.id, images);

  /* ---------- preload property data ---------- */

  useEffect(() => {
    if (house) {
      Object.assign(data, house);

      setCity(house.city);
      setStreet(house.street);
      setCountry(house.country);

      setCoordinates({
        lat: house.lat,
        lng: house.lng,
      });
    }
  }, [house]);

  /* ---------- preload images ---------- */

  useEffect(() => {
    if (house?.images) {
      const existing = house.images.map((url, i) => ({
        id: `existing-${i}`,
        url,
        status: 'existing',
      }));

      setImages(existing);
    }
  }, [house]);

  useEffect(() => {
    data.city = city;
    data.street = street;
    data.lat = coordinates.lat;
    data.lng = coordinates.lng;
    data.country = country;
  }, [street, coordinates]);

  /* ---------- remove image ---------- */

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  /* ---------- options ---------- */

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

  return (
    <div className='new-listing'>
      <h5 className='my-2 pb-4 border-bottom'>UPDATE LISTING</h5>

      {/* ---------------- BASIC INFO ---------------- */}

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
            />
          </div>

          <div className='col-md-4'>
            <FormInput
              type='text'
              name='listingName'
              label='Listing Name'
              data={data.listingName}
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
            />
          </div>

          <div className='col-md-4 mt-4'>
            <SelectInput
              label='Property Status'
              options={propertyStatusOptions}
              name='propertyStatus'
              data={data.propertyStatus}
              handleSelect={handleSelect}
            />
          </div>

          <div className='col-md-4 mt-4'>
            <FormInput
              type='text'
              name='price'
              label='Listing Price'
              data={data.price}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ---------------- LOCATION ---------------- */}

      <div className='listing-info shadow'>
        <div className='text-blue text-bold d-flex'>
          <GoLocation />
          &nbsp;
          <h6 className='ml-2'>Location of Listing</h6>
        </div>

        <LocationSearch
          setCoordinates={setCoordinates}
          setCity={setCity}
          setStreet={setStreet}
          setCountry={setCountry}
        />

        <div className='row'>
          <div className='col-md-6'>
            <FormInput
              name='street'
              label='Street'
              data={data.street}
              handleChange={handleChange}
            />
          </div>

          <div className='col-md-6'>
            <FormInput
              name='city'
              label='City'
              data={data.city}
              handleChange={handleChange}
            />
          </div>

          <div className='col-md-6'>
            <FormInput
              name='country'
              label='Country'
              data={data.country}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ---------------- PROPERTY DETAILS ---------------- */}

      <div className='listing-info shadow'>
        <h6>Listing Details</h6>

        <div className='row'>
          <div className='col-md-6'>
            <FormInput
              name='totalArea'
              label='Total Area'
              data={data.totalArea}
              handleChange={handleChange}
            />
          </div>
        </div>

        {data?.propertyCategory === 'LAND' ? (
          <LandedListingDetails
            data={data}
            handleChange={handleChange}
            handleSelect={handleSelect}
          />
        ) : (
          <ListingDetails
            data={data}
            handleChange={handleChange}
            handleSelect={handleSelect}
          />
        )}

        <div className='row'>
          <div className='col-md-6'>
            <TextAreaInput
              name='summary'
              label='Listing Details'
              data={data.summary}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ---------------- IMAGE MANAGER ---------------- */}

      <div className='listing-info shadow'>
        <h6>Image Upload</h6>

        <span className='text-primary'>
          {images.length} / {MAX_FILES}
        </span>

        <div className='d-flex flex-wrap'>
          {images.map((img) => (
            <div
              key={img.id}
              className='position-relative'
              style={{ width: '100px' }}
            >
              {img.status === 'new' && (
                <div style={{ height: '3px', background: '#eee' }}>
                  <div
                    style={{
                      width: `${progress[img.id] ?? 0}%`,
                      background: '#c8a96e',
                      height: '100%',
                    }}
                  />
                </div>
              )}

              <img
                src={img.preview || img.url}
                alt='listing'
                className='img img-thumbnail m-1'
                style={{
                  width: '100px',
                  height: '75px',
                  objectFit: 'cover',
                }}
              />

              <button
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
                }}
              >
                <IoMdClose color='white' size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className='row mt-3'>
          <div className='col-md-8'>
            <input
              type='file'
              accept={ACCEPTED_TYPES.join(',')}
              className='form-control'
              disabled={imageLoading}
              onChange={(e) => processFiles(e.target.files)}
              multiple
            />

            {errors.length > 0 && (
              <div className='text-danger mt-4'>
                {errors.map((err, i) => (
                  <p key={i}>⚠ {err}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <br />

        <button
          type='button'
          className='btn btn-primary'
          disabled={loading}
          onClick={handleUpdateHouse}
        >
          {loading ? 'Updating...' : 'Update Listing'}
        </button>
      </div>
    </div>
  );
}

export default UpdateProperty;
