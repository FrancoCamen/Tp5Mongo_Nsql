import { useNavigate } from 'react-router-dom';
import CharacterForm from '../components/CharacterForm';
import { createCharacter } from '../services/api';

function CreateCharacter() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createCharacter(formData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create character:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Create New Hero</h1>
      <CharacterForm onSubmit={handleSubmit} buttonText="Create Hero" />
    </div>
  );
}

export default CreateCharacter;