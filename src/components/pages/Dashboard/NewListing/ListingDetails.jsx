import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../../../forms/FormInput';
import SelectInput from '../../../forms/SelectInput';

const ListingDetails = ({ handleChange, handleSelect, data, formErrors }) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-6'>
            <FormInput
              type='text'
              name='bedrooms'
              placeholder='No. of bedrooms'
              label='Bedrooms'
              data={data?.bedrooms}
              error={formErrors?.bedrooms}
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6'>
            <FormInput
              type='text'
              name='sittingRoom'
              placeholder='No. of Sitting Room'
              label='Sitting rooms'
              data={data?.sittingRoom}
              error={formErrors?.sittingRoom}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <SelectInput
              name='parking'
              label='Garage'
              data={data?.parking}
              options={[
                { label: 'Has Parking', value: true },
                { label: 'No Parking', value: false },
              ]}
              handleSelect={handleSelect}
              error={formErrors?.parking}
            />
          </div>
          <div className='col-md-6'>
            <FormInput
              type='text'
              name='kitchens'
              placeholder='No. of Kitchens'
              label='Kitchens'
              data={data?.kitchens}
              error={formErrors?.kitchens}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <SelectInput
              name='fence'
              label='Fenced ?'
              data={data?.fenced}
              options={[
                { label: 'Is Fenced', value: true },
                { label: 'Not Fenced', value: false },
              ]}
              handleSelect={handleSelect}
              error={formErrors?.fenced}
            />
          </div>
          <div className='col-md-6'>
            <FormInput
              type='text'
              name='toilets'
              placeholder='No. of Toilets'
              label='Toilets'
              data={data?.toilets}
              error={formErrors?.toilets}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ListingDetails.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
};

export default ListingDetails;
