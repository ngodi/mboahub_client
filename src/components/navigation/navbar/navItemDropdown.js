/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export const NavItemDropdown = ({ title }) => (
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {title}
    </a>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li>
        <a className="dropdown-item" href="#">
          Action
        </a>
      </li>
    </ul>
  </li>
);
