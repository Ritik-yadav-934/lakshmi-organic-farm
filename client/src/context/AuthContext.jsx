import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin } from '../services/authService.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'lof_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      const data = await adminLogin(email, password);
      setToken(data.access_token);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
