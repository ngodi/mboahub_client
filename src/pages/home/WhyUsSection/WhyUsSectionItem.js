/* eslint-disable react/prop-types */
import React from 'react';

import IconBox from '../../../components/common/IconBox/IconBox';

export default function WhyUsSectionItem({
  img, title, content, icon,
}) {
  return (
    <div className="why-items mt-4">
      <div className="why-item-desc">
        <div className="why-us-content">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <IconBox icon={icon} textColor="white" bgColor="#3270FC" iconSize="p-4" />
                &nbsp;&nbsp;
            <h3 className="fourth-heading ml-2">{title}</h3>
          </div>
          <p className="mt-4 mx-4">{content}</p>
        </div>
        <div className="why-us-img-container">
          <img src={img} alt="why-us" />
        </div>
      </div>
    </div>
  );
}
