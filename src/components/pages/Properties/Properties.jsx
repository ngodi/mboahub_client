import React, { useContext, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import useFetchHouses from '../../../hooks/houses/useFetchHouses';
import PropertyItem from '../../PropertyItem/PropertyItem';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';
import {
  HiChevronLeft,
  HiChevronRight,
  HiMap,
  HiViewGrid,
} from 'react-icons/hi';
import LeafLetPropertiesMap from '../../MapComponent/LeafLetPropertiesMap';

const TOP_OFFSET = 200;

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const { inputObj } = useContext(SearchInputContext);

  const {
    handlePageClickPrev,
    handlePageClickNext,
    goToPage,
    numPages,
    params,
    houses,
    houseloading,
    meta,
  } = useFetchHouses(inputObj);

  const currentPage = params.page;
  const pageCount = numPages || 1;
  const total = meta?.total ?? 0;
  const from = total === 0 ? 0 : (params.page - 1) * params.perPage + 1;
  const to = Math.min(params.page * params.perPage, total);

  const getPageNumbers = () => {
    if (pageCount <= 1) return [];
    if (pageCount <= 7)
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', pageCount];
    if (currentPage >= pageCount - 3)
      return [
        1,
        '...',
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ];
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      pageCount,
    ];
  };

  return (
    <div style={s.page}>
      <div style={s.searchWrapper}>
        <SearchBar />
        <button
          type='button'
          onClick={() => setShowMap((v) => !v)}
          style={s.mapToggle}
        >
          {showMap ? <HiViewGrid size={16} /> : <HiMap size={16} />}
          <span style={{ marginLeft: 6 }}>{showMap ? 'List' : 'Map'}</span>
        </button>
      </div>

      {showFilters && <MobileSearchBar setShowFilters={setShowFilters} />}

      <div style={s.body}>
        <div style={{ ...s.listPanel, width: showMap ? '52%' : '100%' }}>
          {!houseloading && total > 0 && (
            <div style={s.resultsHeader}>
              <p style={s.resultsCount}>
                Showing{' '}
                <strong>
                  {from}–{to}
                </strong>{' '}
                of <strong>{total}</strong> propert{total === 1 ? 'y' : 'ies'}
              </p>
            </div>
          )}

          {houseloading ? (
            <div style={s.loaderWrap}>
              <Oval
                color='#2563eb'
                secondaryColor='#bfdbfe'
                height={48}
                width={48}
                strokeWidth={3}
              />
              <p style={s.loaderText}>Finding properties…</p>
            </div>
          ) : houses && houses.length > 0 ? (
            <div
              style={{
                ...s.grid,
                gridTemplateColumns: showMap
                  ? 'repeat(2,1fr)'
                  : 'repeat(3,1fr)',
              }}
            >
              {houses.map((house) => (
                <div key={house.id} style={s.gridItem}>
                  <PropertyItem house={house} />
                </div>
              ))}
            </div>
          ) : (
            <div style={s.emptyState}>
              <span style={s.emptyIcon}>🏠</span>
              <p style={s.emptyTitle}>No properties found</p>
              <p style={s.emptySub}>Try adjusting your search filters</p>
            </div>
          )}

          {!houseloading && pageCount > 1 && (
            <div style={s.paginationWrap}>
              <div style={s.pagination}>
                <button
                  type='button'
                  onClick={handlePageClickPrev}
                  disabled={params.page <= 1}
                  style={{
                    ...s.pageBtn,
                    ...(params.page <= 1 ? s.pageBtnDisabled : s.pageBtnNav),
                  }}
                >
                  <HiChevronLeft size={18} />
                </button>

                {getPageNumbers().map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} style={s.ellipsis}>
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type='button'
                      onClick={() => goToPage(p)}
                      style={{
                        ...s.pageBtn,
                        ...(p === currentPage
                          ? s.pageBtnActive
                          : s.pageBtnInactive),
                      }}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type='button'
                  onClick={handlePageClickNext}
                  disabled={params.page >= pageCount}
                  style={{
                    ...s.pageBtn,
                    ...(params.page >= pageCount
                      ? s.pageBtnDisabled
                      : s.pageBtnNav),
                  }}
                >
                  <HiChevronRight size={18} />
                </button>
              </div>
              <p style={s.pageInfo}>
                Page {currentPage} of {pageCount}
              </p>
            </div>
          )}
        </div>

        {showMap && (
          <div
            style={{
              ...s.mapPanel,
              top: TOP_OFFSET,
              height: `calc(100vh - ${TOP_OFFSET}px)`,
            }}
          >
            <LeafLetPropertiesMap houses={houses} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .map-panel-fixed { display: none !important; }
          .map-toggle-btn  { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

const s = {
  page: {
    width: '100%',
    marginTop: '200px',
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
  },

  searchWrapper: {
    width: '100%',
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '10px 24px',
    position: 'fixed',
    top: 112,
    zIndex: 100,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  mapToggle: {
    display: 'none',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '7px 14px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  body: {
    display: 'flex',
    position: 'relative',
    flex: 1,
  },

  listPanel: {
    overflowY: 'auto',
    padding: '24px 20px 60px',
    boxSizing: 'border-box',
    minHeight: '100vh',
  },

  mapPanel: {
    position: 'fixed',
    right: 0,
    width: '48%',
    zIndex: 10,
    padding: '12px 16px 12px 8px',
    boxSizing: 'border-box',
    background: '#f8fafc',
  },

  resultsHeader: {
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e2e8f0',
  },
  resultsCount: { fontSize: '13px', color: '#64748b', margin: 0 },

  loaderWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 0',
    gap: '12px',
  },
  loaderText: { color: '#94a3b8', fontSize: '13px', margin: 0 },

  grid: {
    display: 'grid',
    gap: '20px',
    marginBottom: '32px',
    alignItems: 'start',
  },
  gridItem: { width: '100%', minWidth: 0 },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    gap: '8px',
  },
  emptyIcon: { fontSize: '40px' },
  emptyTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#334155',
    margin: 0,
  },
  emptySub: { fontSize: '13px', color: '#94a3b8', margin: 0 },

  paginationWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pageBtn: {
    minWidth: '36px',
    height: '36px',
    padding: '0 8px',
    borderRadius: '8px',
    border: '1px solid transparent',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    lineHeight: 1,
    background: 'none',
  },
  pageBtnActive: {
    background: '#2563eb',
    color: '#fff',
    border: '1px solid #2563eb',
    cursor: 'default',
  },
  pageBtnInactive: {
    background: '#fff',
    color: '#374151',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
  },
  pageBtnNav: {
    background: '#fff',
    color: '#374151',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
  },
  pageBtnDisabled: {
    background: '#f8fafc',
    color: '#cbd5e1',
    border: '1px solid #f1f5f9',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  ellipsis: {
    padding: '0 4px',
    color: '#94a3b8',
    fontSize: '15px',
    userSelect: 'none',
    lineHeight: '36px',
  },
  pageInfo: { fontSize: '12px', color: '#94a3b8', margin: 0 },
};

export default Properties;
