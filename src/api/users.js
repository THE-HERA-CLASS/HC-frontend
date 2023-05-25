import api from '../axios/api';

const loginPost = async (formData) => {
  const response = await api.post(`/api/login`, formData);
  return response.data;
};

export { loginPost };
