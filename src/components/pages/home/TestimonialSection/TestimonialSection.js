import React from 'react';

import TestimonialItem from './TestimonialItem';
import './TestimonialSection.scss';

function TestimonialSection() {
  return (
    <div className="bg-gray testimonial-section">
      <div className="text-center">
        <span className="primary-heading">TESTIMONILAS</span>
        <p className="secondary-heading">What Our Clients Say</p>
      </div>
      <div className="testimonial-listing mx-4 row">
        <TestimonialItem
          text="I'm beyond impressed with the seamless experience on your platform.
          Found my dream home within days of signing up! Thank you for
          making the search process so efficient and stress-free."
          imageUrl="/photos/female-placeholder-image.png"
          username="Adaeze Nwankwo"
        />
        <TestimonialItem
          text="The variety of listings and detailed information provided helped
            me narrow down my choices quickly. Ended up finding the
            perfect rental property for my family's needs. Highly recommend your website
            to anyone in search of quality real estate options!"
          imageUrl="/photos/male-placeholder-image.png"
          username="Ben Agbor"
        />
        <TestimonialItem
          text="Your marketplace exceeded my expectations.
             Not only did I sell my property faster than anticipated, but the
             support team was also incredibly helpful throughout the entire process.
             Will definitely be using your services again in the future!"
          imageUrl="/photos/female-placeholder-image.png"
          username="Ngozi Amadi"
        />
      </div>
    </div>
  );
}

export default TestimonialSection;
