import React, { useContext, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { PageWrapper } from './style';
import useFetchHouses from '../../../hooks/houses/useFetchHouses';
import PropertyItem from '../../PropertyItem/PropertyItem';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
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
    if (pageCount < 1) return [];
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f8fafc',
      }}
    >
      {/* ── Search bar ── */}
      <div style={styles.searchWrapper}>
        <SearchBar />
      </div>

      {showFilters && <MobileSearchBar setShowFilters={setShowFilters} />}

      <PageWrapper>
        <div style={styles.container}>
          {/* Results count */}
          {!houseloading && total > 0 && (
            <div style={styles.resultsHeader}>
              <p style={styles.resultsCount}>
                Showing{' '}
                <strong>
                  {from}–{to}
                </strong>{' '}
                of <strong>{total}</strong> propert{total === 1 ? 'y' : 'ies'}
              </p>
            </div>
          )}

          {/* Grid */}
          {houseloading ? (
            <div style={styles.loaderWrap}>
              <Oval
                color='#2563eb'
                secondaryColor='#bfdbfe'
                height={56}
                width={56}
                strokeWidth={3}
              />
              <p style={styles.loaderText}>Finding properties…</p>
            </div>
          ) : houses && houses.length > 0 ? (
            <div style={styles.grid}>
              {houses.map((house) => (
                <div key={house.id} style={styles.gridItem}>
                  <PropertyItem house={house} />
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🏠</div>
              <p style={styles.emptyTitle}>No properties found</p>
              <p style={styles.emptySub}>Try adjusting your search filters</p>
            </div>
          )}

          {/* ── Pagination ── */}
          {!houseloading && pageCount > 1 && (
            <div style={styles.paginationWrap}>
              <div style={styles.pagination}>
                {/* Prev */}
                <button
                  type='button'
                  onClick={handlePageClickPrev}
                  disabled={params.page <= 1}
                  style={{
                    ...styles.pageBtn,
                    ...(params.page <= 1
                      ? styles.pageBtnDisabled
                      : styles.pageBtnNav),
                  }}
                >
                  <HiChevronLeft size={18} />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} style={styles.ellipsis}>
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type='button'
                      onClick={() => goToPage(p)}
                      style={{
                        ...styles.pageBtn,
                        ...(p === currentPage
                          ? styles.pageBtnActive
                          : styles.pageBtnInactive),
                      }}
                    >
                      {p}
                    </button>
                  ),
                )}

                {/* Next */}
                <button
                  type='button'
                  onClick={handlePageClickNext}
                  disabled={params.page >= pageCount}
                  style={{
                    ...styles.pageBtn,
                    ...(params.page >= pageCount
                      ? styles.pageBtnDisabled
                      : styles.pageBtnNav),
                  }}
                >
                  <HiChevronRight size={18} />
                </button>
              </div>

              <p style={styles.pageInfo}>
                Page {currentPage} of {pageCount}
              </p>
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

const styles = {
  searchWrapper: {
    width: '100%',
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    marginTop: '150px',
    padding: '28px 20px 60px',
    width: '100%',
  },
  resultsHeader: {
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e2e8f0',
  },
  resultsCount: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  loaderWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 0',
    gap: '16px',
  },
  loaderText: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
    marginBottom: '40px',
    alignItems: 'start',
  },
  gridItem: {
    width: '100%',
    minWidth: 0,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 0',
    gap: '8px',
  },
  emptyIcon: { fontSize: '48px', marginBottom: '8px' },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#334155',
    margin: 0,
  },
  emptySub: { fontSize: '14px', color: '#94a3b8', margin: 0 },
  paginationWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginTop: '8px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pageBtn: {
    minWidth: '38px',
    height: '38px',
    padding: '0 10px',
    borderRadius: '8px',
    border: '1px solid transparent',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    lineHeight: 1,
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
    fontSize: '16px',
    userSelect: 'none',
    lineHeight: '38px',
  },
  pageInfo: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: 0,
  },
};

export default Properties;
