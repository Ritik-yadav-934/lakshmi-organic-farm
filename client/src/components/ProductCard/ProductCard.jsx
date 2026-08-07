import { useCart } from '../../context/CartContext.jsx';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { cart, changeQty } = useCart();
  const qty = cart[product.id] || 0;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} />
          ) : (
            <span className={styles.placeholder}>🥬</span>
          )}
        </div>
        {product.fresh_today && <span className={styles.tag}>Fresh Today</span>}
        {!product.available && <span className={`${styles.tag} ${styles.out}`}>Out of Stock</span>}
      </div>

      <h3>{product.name}</h3>
      <p className={styles.desc}>{product.description}</p>
      <div className={styles.meta}>{product.category?.toUpperCase()}</div>

      <div className={styles.priceRow}>
        <div className={styles.price}>
          ₹{product.price}
          <span> /{product.unit}</span>
        </div>

        {product.available && qty > 0 && (
          <div className={styles.qty}>
            <button onClick={() => changeQty(product.id, -1)}>−</button>
            <span>{qty}</span>
            <button onClick={() => changeQty(product.id, 1)}>+</button>
          </div>
        )}
      </div>

      {product.available && qty === 0 && (
        <button className={styles.addBtn} onClick={() => changeQty(product.id, 1)}>
          Add to Order
        </button>
      )}
    </div>
  );
}
