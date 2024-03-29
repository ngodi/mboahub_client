import React from 'react';

import './BestCities.scss';
import BestCitiesMain from './BestCitiesMain';
import BestCityItem from './BestCityItem';

function BestCities() {
  return (
    <div className="best-cities">
      <BestCitiesMain />
      <BestCityItem
        city="Douala"
        imageUrl="/photos/douala-monument.jpeg"
        propertiesCount={100}
        desc="Discover Douala's real estate scene where you can explore a diverse range of properties,
          from modern apartments to spacious villas, tailored to your lifestyle."
      />
      <BestCityItem
        city="Yaounde"
        imageUrl="/photos/yaounde-monument.jpeg"
        propertiesCount={210}
        desc="Delve into Yaounde's real estate landscape,
        where you'll find a varied array of properties, spanning from stylish apartments
        to expansive villas, designed to complement your unique lifestyle."
      />
      <BestCityItem
        city="Limbe"
        imageUrl="/photos/limbe-monument.jpeg"
        propertiesCount={60}
        desc="Embark on a journey through Limbe's captivating real estate offerings,
          nestled within a backdrop of stunning natural beauty and
          rich cultural heritage. "
      />
    </div>
  );
}

export default BestCities;
