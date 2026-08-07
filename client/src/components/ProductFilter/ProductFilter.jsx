import styles from './ProductFilter.module.css';

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'leafy', label: 'Leafy Vegetables' },
  { value: 'root', label: 'Root Vegetables' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'desi', label: 'Desi Vegetables' },
  { value: 'organic', label: 'Organic Collection' },
];

export default function ProductFilter({ active, onChange }) {
  return (
    <div className={styles.chips}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          className={`${styles.chip} ${active === cat.value ? styles.active : ''}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export { CATEGORIES };
