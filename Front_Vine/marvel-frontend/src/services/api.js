import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCharacters = () => api.get('/characters');
export const getCharacterById = (id) => api.get(`/characters/${id}`);
export const createCharacter = (character) => api.post('/characters', character);
export const updateCharacter = (id, character) => api.put(`/characters/${id}`, character);
export const deleteCharacter = (id) => api.delete(`/characters/${id}`);
export const uploadImage = (characterId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/characters/upload-image/${characterId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const getImage = (imageId) => api.get(`/characters/image/${imageId}`, { responseType: 'blob' });
export const deleteImage = (imageId) => api.delete(`/characters/image/${imageId}`);

export default api;