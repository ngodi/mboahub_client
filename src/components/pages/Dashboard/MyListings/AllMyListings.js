/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useFetchMyHouses } from '../../../../hooks/houses/useFetchMyHouses';
import PropertyItem from './PropertyItem';
import './MyListings.scss';

function AllMyListings() {
  const { houses, houseloading } = useFetchMyHouses();

  return (
    <div className="all-my-listings">
      <strong className="text-dark-blue mb-4">YOUR LISTINGS</strong>
      <hr />
      <input type="search" placeholder="Search" className="form-control border w-25 my-4" />
      {houseloading && <Oval color="#00BFFF" height={80} width={80} />}
      {houses && (
        <div className="d-flex-between-center">
          {houses.map((house, i) => (
            <PropertyItem house={house} key={i} />
          ))}
        </div>
      )}
      {houses && houses.length === 0 && <h5 className="text-blue">YOU HAVE NO LISTINGS</h5>}
    </div>
  );
}

export default AllMyListings;
