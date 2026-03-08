/* eslint-disable no-param-reassign */
import { useState } from 'react';
import axios from 'axios';
import { HOUSES_URL, PRESIGNED_URL } from '../../routes/server';

export const useHouseCreate = (images) => {
  const [data, setData] = useState({ propertyStatus: 'AVAILABLE' });
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [houseloading, setHouseLoading] = useState(false);
  const [progress, setProgress] = useState({});

  const handleCreateHouse = async (e) => {
    e.preventDefault();
    setHouseLoading(true);
    setResponse();
    setError();
    let errorCount = 0;

    const required_fields = [
      'propertyType',
      'listingName',
      'propertyCategory',
      'propertyStatus',
      'price',
      'city',
      'country',
    ];

    required_fields.map((field) => {
      if (!data[field]) {
        setError((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          { field: field, message: `${field} is required` },
        ]);
        errorCount++;
      }
    });

    if (!images) {
      setError((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { field: 'images', message: 'images are required' },
      ]);
      errorCount++;
    }

    if (errorCount > 0) {
      setHouseLoading(false);
      return;
    }

    try {
      const sanitizeFilename = (name) =>
        name
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9.\-_]/g, '');

      // Step 1: Get presigned URLs for each image
      const { data: presignedUrls } = await axios.post(PRESIGNED_URL, {
        files: images.map((img) => ({
          filename: sanitizeFilename(img.file.name),
          contentType: img.file.type,
        })),
      });
      // Step 2: Upload each image directly to S3
      await Promise.all(
        presignedUrls.map(({ url }, idx) =>
          uploadToS3(url, images[idx].file, images[idx].id),
        ),
      );

      // Step 3: Create the property with the final S3 URLs
      const s3Urls = presignedUrls.map(({ fileUrl }) => fileUrl);
      const res = await axios.post(HOUSES_URL, {
        ...data,
        images: s3Urls,
      });

      setHouseLoading(false);
      if (res && res.data.success) {
        setHouseLoading(false);
        setResponse(res.data.success);
      } else {
        setHouseLoading(false);
        setError(res.data.errors);
      }
    } catch (error) {
      setHouseLoading(false);

      if (error?.response !== undefined) {
        const data = error.response.data;

        if (Array.isArray(data.errors)) {
          setError(data.errors);
        } else if (typeof data.message === 'string') {
          setError(data.message);
        } else if (typeof data.error === 'string') {
          // { error: "Failed to create property" }
          setError(data.error);
        } else {
          setError('An unexpected error occurred.');
        }
      } else {
        // Network error, timeout, etc.
        setError('Network error. Please check your connection.');
      }
    }
  };

  const uploadToS3 = async (url, file, imageId) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setProgress((prev) => ({ ...prev, [imageId]: pct }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 204) resolve();
        else reject(new Error(`Upload failed: ${xhr.status}`));
      };

      xhr.onerror = () => reject(new Error('Upload error'));

      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    handleChange,
    handleSelect,
    handleCreateHouse,
    error,
    houseloading,
    response,
    data,
    progress,
  };
};

export default useHouseCreate;
