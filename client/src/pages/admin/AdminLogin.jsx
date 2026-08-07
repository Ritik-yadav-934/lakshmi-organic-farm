import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      const dest = location.state?.from?.pathname || '/admin/dashboard';
      navigate(dest, { replace: true });
    }
  }

  return (
    <div className={styles.shell}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <svg viewBox="0 0 40 40" fill="none" width="34" height="34">
            <circle cx="20" cy="20" r="20" fill="#1F4029" />
            <path d="M20 30V16" stroke="#E8B65C" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Lakshmi Admin
        </div>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.sub}>Admin access only — no customer login in this version.</p>

        <label className={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@lakshmiorganicfarm.in"
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
