import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/productService.js';

/**
 * Fetches products from the API. Nothing is hardcoded — an empty/failed
 * response means an empty product list, not a fallback array.
 */
export function useProducts({ category, search } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (category && category !== 'all') params.category = category;
      if (search) params.search = search;
      const data = await getProducts(params);
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
