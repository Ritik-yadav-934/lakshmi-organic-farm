import Button from '../Button/Button.jsx';
import styles from './ErrorState.module.css';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="#B0442F" strokeWidth="2" width="30" height="30">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
      <p>{message}</p>
      {onRetry && (
        <Button variant="outline" size="small" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
