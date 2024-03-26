/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React from 'react';

import { BiSupport } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';
import { MdOutlinePayments } from 'react-icons/md';

import './WhyUsSection.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import WhyUsSectionItem from './WhyUsSectionItem';

const twentyFourSupport = 'Round-the-clock assistance: We provide 24/7 support to ensure you have a smooth and hassle-free experience.';
const userAdminPanel = 'Convenient management: Our user admin panel gives you complete control over your real estate activities. Easily manage your listings, view analytics, and track user interactions.';
const securePayments = 'Our secure payments panel ensures the safety and confidentiality of your financial transactions.';

function WhyUsSection() {
  return (
    <div className="main-margin">
      <div className="why-us-section container">
        <div className="secondary-heading">Why Choose Our Properties</div>
        <div className="tertiary-heading">Find out more about us.</div>
        <Carousel autoPlay showThumbs={false} interval={3000} infiniteLoop transitionTime={2000}>
          <WhyUsSectionItem img="/photos/why-us-1.webp" title="24 Hours Support" content={twentyFourSupport} icon={<BiSupport size="30" />} />
          <WhyUsSectionItem img="/photos/why-us-1.webp" title="User Admin Panel" content={userAdminPanel} icon={<GrUserAdmin size="30" />} />
          <WhyUsSectionItem img="/photos/why-us-1.webp" title="Secure Payments Panel" content={securePayments} icon={<MdOutlinePayments size="30" />} />
        </Carousel>
      </div>
    </div>
  );
}

export default WhyUsSection;
