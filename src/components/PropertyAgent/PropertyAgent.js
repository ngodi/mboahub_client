import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineMail, AiOutlinePhone, AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillLinkedin,
} from 'react-icons/ai';

import { Link } from 'react-router-dom';
// import Rating from '../common/Rating/Rating';
import IconBox from '../common/IconBox/IconBox';
import SmallTextButton from '../common/Buttons/SmallTextButton/SmallTextButton';

const PropertyAgent = ({
  agentName, agencyName, description, agentListings, imageUrl,
}) => (
  <div className="property-agent border col-sm rounded my-4 mx-2">
    <Link to="/">
      <div className="property-agent-up" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="property-agent-up-left">
          <div className="up-left-top">
            <SmallTextButton text={`${agentListings} Listings`} />
          </div>
          {/* <Rating review="Average" classes="medium-font text-bold text-white" /> */}
        </div>
        <div className="property-agent-up-right">
          <div className="up-right-top">
            <IconBox icon={<AiFillFacebook size={20} />} bg_color="#2270FC" text_color="#000" icon_size="p-1 m-1" />
            <IconBox icon={<AiOutlineTwitter size={20} />} bg_color="#2270FC" text_color="#FFFFFF" icon_size="p-1 m-1" />
            <IconBox icon={<AiFillInstagram size={20} />} bg_color="#2270FC" text_color="#FFFFFF" icon_size="p-1 m-1" />
            <IconBox icon={<AiFillLinkedin size={20} />} bg_color="#2270FC" text_color="#FFFFFF" icon_size="p-1 m-1" />
          </div>
        </div>
      </div>
    </Link>
    <div className="property-agent-down bg-white">
      <strong className="text-dark-blue text-bold text-medium">{agentName}</strong>
      <br />
      <span className="text-gray text-bold">{agencyName}</span>
      <p className="mt-2">{description}</p>

      <div className="agent-info">
        <SmallTextButton text="View Profile" />
        <div className="d-flex text-light-gray">
          <AiOutlinePhone size="20" />
            &nbsp;&nbsp;
          <AiOutlineMail size="20" />
        </div>
      </div>
    </div>
  </div>
);

PropertyAgent.propTypes = {
  agentName: PropTypes.string.isRequired,
  agencyName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  agentListings: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default PropertyAgent;
