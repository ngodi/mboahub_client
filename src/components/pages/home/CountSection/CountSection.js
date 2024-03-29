/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import './CountSection.scss';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

function CountSection() {
  const [animateCount, setAnimateCount] = useState(false);

  function countItem(count, text) {
    return (
      <ScrollTrigger onEnter={() => setAnimateCount(true)} onExit={() => setAnimateCount(false)}>
        <div className="count-item text-white">
          <strong className="text-big">
            {animateCount && <CountUp end={count} />}
          </strong>
          <br />
          <span className="text-medium">{text}</span>
        </div>
      </ScrollTrigger>
    );
  }

  return (
    <div className="count-section bg-primary">
      <div className="container d-flex flex-md-row flex-sm-column justify-content-between px-4">
        {countItem(572, 'New Listings')}
        {countItem(600, 'Completed Transactions')}
        {countItem(400, 'Listings  Sold/Rented')}
        {countItem(440, 'Satisfied Clients')}
      </div>
    </div>
  );
}

export default CountSection;
