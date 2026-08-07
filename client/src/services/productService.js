import api from './api.js';

/**
 * All product data comes from the backend — nothing here is hardcoded.
 * These functions are the ONLY place product data is fetched or mutated.
 */

export async function getProducts(params = {}) {
  // params can include: category, search, availableOnly
  const { data } = await api.get('/products', { params });
  return data;
}

export async function getTodaysHarvest() {
  const { data } = await api.get('/today');
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post('/products', payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

export async function uploadProductImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data; // expected shape: { url: 'https://res.cloudinary.com/...' }
}
