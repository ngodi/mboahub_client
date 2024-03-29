import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: '200px', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <button type="button" onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default NotFound;
