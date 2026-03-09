/* eslint-disable  */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './MapComponent.scss';
// import { GoLocation } from 'react-icons/go';
import mapStyles from './mapStyles';

// const houses = [
//   {
//     id: '6c4797bd-a4e3-4593-9daf-212129a86746',
//     listing_name: 'Kimberlie Kling',
//     summary: 'Et culpa nihil. Quaerat amet et. Enim esse ab.',
//     home_type: 'studio',
//     cost: '10000',
//     location: 'Lucioville, 729 Osinski Square',
//     properties: {
//       num_bed_rooms: 1,
//       sitting_room: 3,
//       parking: null,
//       kitchen: 0,
//       fence: false,
//       num_toilets: 2,
//     },
//     published_at: '2023-05-19',
//     images: [
//       'https://homeradar.kwst.net/images/all/9.jpg',
//       'https://homeradar.kwst.net/images/all/9.jpg',
//       'https://homeradar.kwst.net/images/all/9.jpg',
//     ],
//     published_by: 'jj46867538',
//     house_count: 2,
//     email: 'jj46867538@gmail.com',
//     lat: 2.05,
//     lng: 9.05,
//   },
// ];

function MapComponent({ height, width, houses }) {
  const [coords, setCoords] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
    );
  }, []);
  return (
    <div style={{ height: `${height}`, width: `${width}` }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
        }}
      >
        {houses &&
          houses.map((house) => (
            <div
              className='marker-container radius'
              lat={Number(house.lat)}
              lng={Number(house.lng)}
              key={house.id}
            >
              <span>{house.listing_name}</span>
              <img
                alt='house icon'
                className='pointer'
                width='100%'
                src={house.images[1]}
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
}

export default MapComponent;
