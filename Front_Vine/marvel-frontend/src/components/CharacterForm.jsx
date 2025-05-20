import { useState } from 'react';

function CharacterForm({ initialData = {}, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    realName: initialData.realName || '',
    debutYear: initialData.debutYear || '',
    house: initialData.house || '',
    biography: initialData.biography || '',
    equipment: initialData.equipment || '',
    imageIds: initialData.imageIds || ['placeholder'],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <div>
        <label className="block text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Real Name</label>
        <input
          type="text"
          name="realName"
          value={formData.realName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
      </div>
      <div>
        <label className="block text-gray-300">Debut Year</label>
        <input
          type="number"
          name="debutYear"
          value={formData.debutYear}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">House</label>
        <input
          type="text"
          name="house"
          value={formData.house}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Biography</label>
        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Equipment</label>
        <input
          type="text"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
      </div>
      <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">{buttonText}</button>
    </form>
  );
}

export default CharacterForm;