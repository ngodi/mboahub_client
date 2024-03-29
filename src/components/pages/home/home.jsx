/* eslint-disable import/prefer-default-export */
import React from 'react';

import Banner from '../../Banner/Banner';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import LatestProperty from '../../LatestProperty/LatestProperty';
import WhyUsSection from './WhyUsSection/WhyUsSection';

import './home.css';
import BestCities from './BestCities/BestCities';
import PropertyAgentSection from '../../PropertyAgent/PropertyAgentSection';
import CountSection from './CountSection/CountSection';
import TestimonialSection from './TestimonialSection/TestimonialSection';
import NewsLetterSection from './NewsLetterSection/NewsLetterSection';
import Footer from '../../Footer/Footer';
import MapComponent from '../../MapComponent/MapComponent';

export const Home = () => (
  <div className="home">
    <Banner />
    <BreadCrumb />
    <LatestProperty />
    <MapComponent />
    <WhyUsSection />
    <BestCities />
    <PropertyAgentSection />
    <CountSection />
    <TestimonialSection />
    <NewsLetterSection />
    <Footer />
  </div>
);
