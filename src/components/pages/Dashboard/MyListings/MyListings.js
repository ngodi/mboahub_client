import React from 'react';
import { Outlet } from 'react-router-dom';

import './MyListings.scss';

function MyListings() {
  return (
    <div className="my-listings">
      <Outlet />
    </div>
  );
}

export default MyListings;
