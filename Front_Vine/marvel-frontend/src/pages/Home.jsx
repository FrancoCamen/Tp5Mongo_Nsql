import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import { getCharacters, deleteCharacter } from '../services/api';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters();
        setCharacters(response.data);
      } catch (err) {
        setError('Failed to load characters');
      }
    };
    fetchCharacters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCharacter(id);
      setCharacters(characters.filter((character) => character.id !== id));
    } catch (err) {
      setError('Failed to delete character');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Marvel Heroes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;