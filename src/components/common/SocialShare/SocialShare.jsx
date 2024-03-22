/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';
import { ShareSocial } from 'react-share-social';

const SocialShare = ({ url }) => (
  <ShareSocial
    url={url}
    socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'WhatsApp']}
  />
);

SocialShare.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SocialShare;
