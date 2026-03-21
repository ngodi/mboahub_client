import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    padding: 0 12px;
  }

  @media (max-width: 639px) {
    padding: 0 8px;
  }
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
    background: '#3270FC' /* brand blue */,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(50,112,252,0.30)',
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

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 0',
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
};
