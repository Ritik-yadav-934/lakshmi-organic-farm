import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className={styles.close} onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
