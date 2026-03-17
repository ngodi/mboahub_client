/* eslint-disable no-param-reassign */
import { useState } from 'react';
import axios from 'axios';
import { HOUSES_URL, PRESIGNED_URL } from '../../routes/server';

export const useUpdateHouse = (houseId, images) => {
  const [data, setData] = useState({});
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});

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

  const handleUpdateHouse = async () => {
    setLoading(true);
    setError();

    try {
      const newImages = images.filter((img) => img.status === 'new');
      const existingImages = images
        .filter((img) => img.status === 'existing')
        .map((img) => img.url);

      const removedImages = images.filter(
        (img) => !existingImages.includes(img),
      );

      let uploadedUrls = [];

      if (newImages.length > 0) {
        const sanitizeFilename = (name) =>
          name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9.\-_]/g, '');

        const { data: presignedUrls } = await axios.post(PRESIGNED_URL, {
          files: newImages.map((img) => ({
            filename: sanitizeFilename(img.file.name),
            contentType: img.file.type,
          })),
        });

        await Promise.all(
          presignedUrls.map(({ url }, idx) =>
            uploadToS3(url, newImages[idx].file, newImages[idx].id),
          ),
        );

        uploadedUrls = presignedUrls.map(({ fileUrl }) => fileUrl);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const res = await axios.put(`${HOUSES_URL}/${houseId}`, {
        ...data,
        images: finalImages,
      });

      setLoading(false);

      if (res.data.success) {
        setResponse(res.data.success);
      } else {
        setError(res.data.errors);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to update property');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    handleChange,
    handleSelect,
    handleUpdateHouse,
    data,
    progress,
    loading,
    response,
    error,
  };
};

export default useUpdateHouse;
