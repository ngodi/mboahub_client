/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react';
import { IMAGE_UPLOAD_URL } from '../../routes/server';

const MAX_FILES = 10;
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export const useUploadImage = (images, setImages) => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);

  const data = new FormData();

  const processFiles = useCallback((files) => {
    const newErrors = [];
    const incoming = Array.from(files);

    const valid = incoming.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        newErrors.push(
          `"${file.name}" is not a supported format (JPG, PNG, WEBP).`,
        );
        return false;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        newErrors.push(`"${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`);
        return false;
      }
      return true;
    });

    setErrors(newErrors);

    setImages((prev) => {
      const remaining = MAX_FILES - prev.length;
      if (remaining <= 0) {
        setErrors((e) => [...e, `Maximum ${MAX_FILES} images allowed.`]);
        return prev;
      }

      const toAdd = valid.slice(0, remaining).map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        isCover: false,
      }));

      return [...prev, ...toAdd];
    });
  }, []);

  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // Revoke the object URL to free memory
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  }, []);

  const handleFileChange = (e) => {
    // setFiles(e.target.files);
    setFiles(Array.from(e.target.files));
  };

  return {
    files,
    handleFileChange,
    images,
    ACCEPTED_TYPES,
    MAX_FILES,
    processFiles,
    removeImage,
    errors,
  };
};

export const useSingleImageUpload = () => {
  const [imageUrl, setImageUrl] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const [imageCoverUrl, setImageCoverUrl] = useState();
  const [imageCoverLoading, setImageCoverLoading] = useState(false);

  const imageUpload = (imageFile) => {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', process.env.REACT_APP_USER_PRESET);
    data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);

    const res = fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => data.url)
      .catch((err) => err);

    return res;
  };

  const handleImageUpload = (event) => {
    setImageLoading(true);
    const fileImage = event.target.files[0];

    imageUpload(fileImage)
      .then((imageUrl) => {
        setImageUrl(imageUrl);
        setImageLoading(false);
      })
      .catch((err) => {
        setImageLoading(false);
        console.log(err);
      });
  };

  const handleCoverImageUpload = (event) => {
    setImageCoverLoading(true);
    const fileImage = event.target.files[0];

    imageUpload(fileImage)
      .then((imageUrl) => {
        setImageCoverUrl(imageUrl);
        setImageCoverLoading(false);
      })
      .catch((err) => {
        setImageCoverLoading(false);
      });
  };

  return {
    imageUrl,
    imageLoading,
    imageCoverUrl,
    imageCoverLoading,
    handleImageUpload,
    handleCoverImageUpload,
  };
};
