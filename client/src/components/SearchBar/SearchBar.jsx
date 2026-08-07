import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search vegetables…', debounceMs = 300 }) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onChange(local);
    }, debounceMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  return (
    <div className={styles.box}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={local}
        placeholder={placeholder}
        onChange={(e) => setLocal(e.target.value)}
      />
    </div>
  );
}
