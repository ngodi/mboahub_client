/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useFetchMyHouses } from '../../../../hooks/houses/useFetchMyHouses';
import PropertyItem from './PropertyItem';
import './MyListings.scss';
import Pagination from '../../../../utils/Pagination';

function AllMyListings() {
  const { houses, houseloading, meta, setParams } = useFetchMyHouses();

  return (
    <div className='my-listings'>
      <div className='listings-header'>
        <strong className='listings-title'>Your Listings</strong>
        <hr />
        <input
          type='search'
          placeholder='Search by name or location…'
          className='listings-search'
        />
      </div>

      <div className='all-my-listings'>
        {/* Loading spinner */}
        {houseloading && (
          <div className='d-flex justify-content-center py-5'>
            <Oval color='#3270FC' height={60} width={60} />
          </div>
        )}

        {/* Property grid */}
        {houses && houses.length > 0 && (
          <>
            <div className='property-grid'>
              {houses.map((house, i) => (
                <PropertyItem house={house} key={i} />
              ))}
            </div>

            <div className='pagination-wrapper'>
              <Pagination
                meta={meta}
                onPageChange={(page) =>
                  setParams((prev) => ({ ...prev, page }))
                }
              />
            </div>
          </>
        )}

        {/* Empty state */}
        {houses && houses.length === 0 && (
          <div className='no-listings'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#3270FC'
              strokeWidth='1.5'
            >
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
              <polyline points='9 22 9 12 15 12 15 22' />
            </svg>
            <h5>You have no listings yet</h5>
            <p>Add your first property to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMyListings;
