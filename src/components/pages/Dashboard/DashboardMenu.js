import React from 'react';
import { NavLink } from 'react-router-dom';

function DashboardMenu({ name, link, icon, setShowMenu }) {
  return (
    <NavLink
      to={`${link}`}
      end
      onClick={() => setShowMenu(false)}
      className={({ isActive }) => (isActive ? 'nav-link-active' : '')}
    >
      <span className='text-blue'>{icon}</span>
      &nbsp;&nbsp;
      <span className='text-dark-blue text-bold'>{name}</span>
    </NavLink>
  );
}

export default DashboardMenu;
