/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export const NavItem = ({ title }) => (
  <li className="nav-item">
    <a className="nav-link rounded">{title}</a>
  </li>
);
