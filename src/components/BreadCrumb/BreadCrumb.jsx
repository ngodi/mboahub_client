/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
// import ActionButton from '../common/ActionButton/ActionButton';
import './BreadCrumb.css';

function BreadCrumb({ house }) {
  const { pathname } = useLocation();
  return (
    <section className="breadcrumb-section shadow">
      <div className="container">
        <div>
          <Link to="/" className="text-blue">
            Home
          </Link>
          <Link to={pathname} className="text-blue">
            <span className="text-blue">{house && <BsDot size="30" />}</span>
            {house?.listing_name}
          </Link>
        </div>
        {/* <ActionButton text="Share" /> */}

      </div>
    </section>
  );
}

BreadCrumb.propTypes = {
  house: PropTypes.object.isRequired,
};

export default BreadCrumb;
