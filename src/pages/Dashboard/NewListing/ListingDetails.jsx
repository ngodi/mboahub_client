/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../../../components/forms/FormInput';
import SelectInput from '../../../components/forms/SelectInput';

const ListingDetails = ({ handleChange, handleSelect, data }) => (
  <div className="row">
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-6">
          <FormInput
            type="text"
            name="num_bed_rooms"
            placeholder="No. of bedrooms"
            label="Bedrooms"
            data={data.num_bed_rooms}
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <FormInput
            type="text"
            name="sitting_room"
            placeholder="No. of Sitting Room"
            label="Sitting rooms"
            data={data.sitting_room}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <SelectInput
            name="parking"
            label="Garage"
            data={data.parking}
            options={[
              { label: 'Has Parking', value: true },
              { label: 'No Parking', value: false },
            ]}
            handleSelect={handleSelect}
          />
        </div>
        <div className="col-md-6">
          <SelectInput
            name="kitchen"
            label="Kitchen ?"
            data={data.kitchen}
            options={[
              { label: 'Has Kitchen', value: true },
              { label: 'No Kitchen', value: false },
            ]}
            handleSelect={handleSelect}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-3">
          <SelectInput
            name="fence"
            label="Fenced ?"
            data={data.fence}
            options={[
              { label: 'Is Fenced', value: true },
              { label: 'Not Fenced', value: false },
            ]}
            handleSelect={handleSelect}
          />
        </div>
        <div className="col-md-6">
          <FormInput
            type="text"
            name="num_toilets"
            placeholder="No. of Toilets"
            label="Toilets"
            data={data.num_toilets}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  </div>
);

ListingDetails.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ListingDetails;
