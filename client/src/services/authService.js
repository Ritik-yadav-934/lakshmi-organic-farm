import api from './api.js';

export async function adminLogin(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  // expected shape: { access_token: '...', token_type: 'bearer' }
  return data;
}

export async function getCurrentAdmin() {
  const { data } = await api.get('/auth/me');
  return data;
}
