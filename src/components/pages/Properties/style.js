import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  min-height: 120vh;
  display: flex;
`;

export const styles = {
  filterTrigger: {
    position: 'fixed',
    top: 100,
    right: 16,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37,99,235,0.35)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 16px 48px',
    width: '100%',
  },
  resultsHeader: {
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9',
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
    padding: '80px 0',
    gap: '16px',
  },
  loaderText: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  gridItem: {
    minWidth: 0,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
    gap: '8px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#334155',
    margin: 0,
  },
  emptySub: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '8px',
  },
  pageBtn: {
    minWidth: '36px',
    height: '36px',
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
  },
  pageBtnNav: {
    background: '#fff',
    color: '#374151',
    border: '1px solid #e2e8f0',
  },
  pageBtnDisabled: {
    background: '#f8fafc',
    color: '#cbd5e1',
    border: '1px solid #f1f5f9',
    cursor: 'not-allowed',
  },
  ellipsis: {
    padding: '0 4px',
    color: '#94a3b8',
    fontSize: '14px',
    userSelect: 'none',
  },
  pageInfo: {
    textAlign: 'center',
    marginTop: '12px',
    fontSize: '13px',
    color: '#94a3b8',
  },
};
