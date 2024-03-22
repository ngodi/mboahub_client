import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SmallTextButton from '../../../components/common/Buttons/SmallTextButton/SmallTextButton';
import { SearchInputContext } from '../../../contexts/SearchInputContext';
import { PROPERTIES_URL } from '../../../routes/frontend';

function BestCityItem({
  city, propertiesCount, desc, imageUrl,
}) {
  const { inputObj, setInputObj } = useContext(SearchInputContext);

  const handleCityFilter = () => {
    setInputObj({ ...inputObj, city });
  };

  return (
    <Link to={PROPERTIES_URL} style={{ backgroundImage: `url(${imageUrl})` }} className="best-city-content text-white" onClick={handleCityFilter}>
      <SmallTextButton text={`${propertiesCount} Properties`} />
      <strong className="text-medium my-2">
        Find Dream in
        &nbsp;
        {city}
      </strong>
      <p className="text-small best-cities-desc-text">{desc}</p>
    </Link>
  );
}

BestCityItem.propTypes = {
  city: PropTypes.string.isRequired,
  propertiesCount: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default BestCityItem;
