import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { getCharacterById, getImage } from '../services/api';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await getCharacterById(id);
        setCharacter(response.data);
        // Cargar imágenes
        const imagePromises = response.data.imageIds.map(async (imageId) => {
          if (imageId !== 'placeholder') {
            try {
              const imgResponse = await getImage(imageId);
              return URL.createObjectURL(imgResponse.data);
            } catch (err) {
              console.error(`Failed to load image ${imageId}:`, err);
              return null;
            }
          }
          return null;
        });
        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls.filter((url) => url !== null));
      } catch (err) {
        setError('Failed to load character');
      }
    };
    fetchCharacter();
  }, [id]);

  const handleImageUploaded = (imageId) => {
    setCharacter((prev) => ({
      ...prev,
      imageIds: [...prev.imageIds, imageId],
    }));
    getImage(imageId).then((response) => {
      const imageUrl = URL.createObjectURL(response.data);
      setImages((prev) => [...prev, imageUrl]);
    }).catch((err) => {
      console.error('Failed to load uploaded image:', err);
    });
  };

  if (!character) return <div className="container mx-auto p-6 text-gray-300">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate('/')} className="text-blue-500 hover:underline mb-4">Back to Home</button>
      <h1 className="text-3xl font-bold text-red-500 mb-4">{character.name}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300"><strong>Real Name:</strong> {character.realName || 'N/A'}</p>
        <p className="text-gray-300"><strong>Debut Year:</strong> {character.debutYear}</p>
        <p className="text-gray-300"><strong>House:</strong> {character.house}</p>
        <p className="text-gray-300"><strong>Biography:</strong> {character.biography}</p>
        <p className="text-gray-300"><strong>Equipment:</strong> {character.equipment || 'N/A'}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-red-500">Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {images.length > 0 ? (
              images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.error(`Failed to render image ${index}`);
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-300">No images available.</p>
            )}
          </div>
        </div>
        <ImageUploader characterId={id} onImageUploaded={handleImageUploaded} />
      </div>
    </div>
  );
}

export default CharacterDetail;