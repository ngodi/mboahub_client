import React, { useContext, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import useFetchHouses from '../../../hooks/houses/useFetchHouses';
import PropertyItem from '../../PropertyItem/PropertyItem';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';
import { HiMap, HiViewGrid } from 'react-icons/hi';
import LeafLetPropertiesMap from '../../MapComponent/LeafLetPropertiesMap';
import './Properties.css';
import Pagination from '../../../utils/Pagination';

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false); // off by default on mobile
  const { inputObj } = useContext(SearchInputContext);

  const { setParams, params, houses, houseloading, meta } =
    useFetchHouses(inputObj);

  const total = meta?.total ?? 0;
  const from = total === 0 ? 0 : (params.page - 1) * params.perPage + 1;
  const to = Math.min(params.page * params.perPage, total);

  return (
    <div className='properties-page'>
      {/* ── Sticky search bar ──────────────────────────────── */}
      <div className='properties-search-wrapper'>
        <SearchBar />
        <button
          type='button'
          onClick={() => setShowMap((v) => !v)}
          className='map-toggle-btn'
          aria-label={showMap ? 'Switch to list view' : 'Switch to map view'}
        >
          {showMap ? <HiViewGrid size={16} /> : <HiMap size={16} />}
          <span>{showMap ? 'List' : 'Map'}</span>
        </button>
      </div>

      {/* ── Mobile filter drawer ────────────────────────────── */}
      {showFilters && <MobileSearchBar setShowFilters={setShowFilters} />}

      {/* ── Body: list panel + map panel ──────────────────── */}
      <div className={`properties-body${showMap ? ' map-open' : ''}`}>
        {/* List panel */}
        <div className='list-panel'>
          {/* Results count */}
          {!houseloading && total > 0 && (
            <div className='results-header'>
              <p className='results-count'>
                Showing{' '}
                <strong>
                  {from}–{to}
                </strong>{' '}
                of <strong>{total}</strong> propert{total === 1 ? 'y' : 'ies'}
              </p>
            </div>
          )}
          {/* Loader */}
          {houseloading ? (
            <div className='loader-wrap'>
              <Oval
                color='#3270FC'
                secondaryColor='#bfdbfe'
                height={48}
                width={48}
                strokeWidth={3}
              />
              <p className='loader-text'>Finding properties…</p>
            </div>
          ) : houses && houses.length > 0 ? (
            /* Property grid — columns controlled by CSS */
            <div className='property-grid'>
              {houses.map((house) => (
                <div key={house.id} className='grid-item'>
                  <PropertyItem house={house} />
                </div>
              ))}
              <div className='pagination-wrap'>
                <Pagination
                  meta={meta}
                  onPageChange={(page) =>
                    setParams((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className='empty-state'>
              <span className='empty-icon'>🏠</span>
              <p className='empty-title'>No properties found</p>
              <p className='empty-sub'>Try adjusting your search filters</p>
            </div>
          )}
        </div>

        {/* Map panel — hidden on mobile unless showMap is true */}
        <aside className={`map-panel${showMap ? ' map-panel-visible' : ''}`}>
          <LeafLetPropertiesMap houses={houses} />
        </aside>
      </div>
    </div>
  );
};

export default Properties;
