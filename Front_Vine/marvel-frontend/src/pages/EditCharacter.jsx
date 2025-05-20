import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterForm from '../components/CharacterForm';
import { getCharacterById, updateCharacter } from '../services/api';

function EditCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await getCharacterById(id);
        setCharacter(response.data);
      } catch (err) {
        console.error('Failed to load character:', err);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateCharacter(id, formData);
      navigate(`/character/${id}`);
    } catch (err) {
      console.error('Failed to update character:', err);
    }
  };

  if (!character) return <div className="container mx-auto p-6 text-gray-300">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Edit Hero</h1>
      <CharacterForm initialData={character} onSubmit={handleSubmit} buttonText="Update Hero" />
    </div>
  );
}

export default EditCharacter;