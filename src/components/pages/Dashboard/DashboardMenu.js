/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function DashboardMenu({
  name, link, icon, setShowMenu,
}) {
  return (
    <>
      <Link to={`${link}`} onClick={() => setShowMenu(false)}>
        <span className="text-blue">{icon}</span>
        &nbsp;&nbsp;
        <span className="text-dark-blue text-bold">{name}</span>
      </Link>
    </>
  );
}

export default DashboardMenu;
