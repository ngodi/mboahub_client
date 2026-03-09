import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ImageGallery.css';

function PropertyImageGallery({ images }) {
  const imagesObject = images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className='image-gallery'>
      <ImageGallery items={imagesObject} />
    </div>
  );
}

export default PropertyImageGallery;
