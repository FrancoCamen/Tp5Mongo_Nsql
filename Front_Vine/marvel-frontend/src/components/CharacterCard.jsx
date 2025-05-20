import { Link } from 'react-router-dom';

function CharacterCard({ character, onDelete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-red-500">{character.name}</h3>
      <p className="text-gray-300">Real Name: {character.realName || 'N/A'}</p>
      <p className="text-gray-300">Debut Year: {character.debutYear}</p>
      <p className="text-gray-300">House: {character.house}</p>
      <div className="mt-3 flex space-x-2">
        <Link to={`/character/${character.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">View</Link>
        <Link to={`/edit/${character.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</Link>
        <button onClick={() => onDelete(character.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

export default CharacterCard;