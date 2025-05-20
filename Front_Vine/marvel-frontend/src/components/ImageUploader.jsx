import { useState } from 'react';
import { uploadImage } from '../services/api';

function ImageUploader({ characterId, onImageUploaded }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    try {
      const response = await uploadImage(characterId, file);
      onImageUploaded(response.data); // imageId
      setFile(null);
      setError('');
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-red-500">Upload Image</h3>
      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-gray-300"
          accept="image/*"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}

export default ImageUploader;