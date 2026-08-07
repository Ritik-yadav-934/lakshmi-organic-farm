import { useMemo } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { buildWhatsAppOrderLink } from '../../services/whatsapp.js';
import styles from './OrderSidebar.module.css';

export default function OrderSidebar({ products }) {
  const { cart, removeItem, itemCount } = useCart();

  const lineItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((p) => String(p.id) === String(id));
        if (!product) return null;
        return { product, qty, lineTotal: product.price * qty };
      })
      .filter(Boolean);
  }, [cart, products]);

  const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const waLink = useMemo(() => {
    if (lineItems.length === 0) return null;
    return buildWhatsAppOrderLink({
      intro: "Hi Lakshmi Organic Farm! I'd like to order:",
      lines: lineItems.map(
        (item) => `${item.qty} x ${item.product.name} (₹${item.product.price}/${item.product.unit})`
      ),
      total,
      outro: 'Please confirm delivery time.',
    });
  }, [lineItems, total]);

  return (
    <aside className={styles.cart}>
      <h3>
        Your Order <span className={styles.count}>{itemCount}</span>
      </h3>

      {lineItems.length === 0 ? (
        <p className={styles.empty}>Nothing added yet — tap &quot;Add&quot; on any vegetable to start your basket.</p>
      ) : (
        <>
          <div className={styles.items}>
            {lineItems.map(({ product, qty, lineTotal }) => (
              <div key={product.id} className={styles.item}>
                <span className={styles.left}>
                  <span className={styles.q}>{qty}×</span>
                  {product.name}
                </span>
                <span className={styles.right}>
                  ₹{lineTotal}
                  <button className={styles.remove} onClick={() => removeItem(product.id)}>
                    ✕
                  </button>
                </span>
              </div>
            ))}
          </div>

          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <a className="btn btn-primary" href={waLink} target="_blank" rel="noreferrer" style={{ width: '100%', marginTop: 16 }}>
            Send Order on WhatsApp
          </a>
        </>
      )}

      <p className={styles.note}>
        Delivery charges (if any) and exact weight-based pricing are confirmed on WhatsApp before dispatch.
      </p>
    </aside>
  );
}
