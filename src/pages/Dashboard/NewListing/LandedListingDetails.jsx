/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../../../components/forms/FormInput';
import SelectInput from '../../../components/forms/SelectInput';

const LandedListingDetails = ({ handleChange, handleSelect, data }) => (
  <div className="row">
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <SelectInput
            name="hasTitle"
            label="Has Land Title"
            data={data.parking}
            options={[
              { label: 'Title', value: true },
              { label: 'No Title', value: false },
            ]}
            handleSelect={handleSelect}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <FormInput
            type="text"
            name="dimensions"
            placeholder="List dimensions separated by commas e.g (North: 20m, East: 10m, North-East: 8m)"
            label="Dimentions"
            data={data.dimensions}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  </div>
);

LandedListingDetails.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default LandedListingDetails;
