import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService.js';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, freshToday: 0, outOfStock: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setStats({
          total: products.length,
          available: products.filter((p) => p.available).length,
          freshToday: products.filter((p) => p.fresh_today).length,
          outOfStock: products.filter((p) => !p.available).length,
        });
      })
      .catch(() => {
        // Non-fatal on the dashboard — stat cards just show 0 if the API isn't reachable yet
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.sub}>A quick snapshot of the catalog. Full sales/order analytics land in a later phase.</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.label}>Total Products</div>
          <div className={styles.value}>{loading ? '—' : stats.total}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Available Now</div>
          <div className={styles.value}>{loading ? '—' : stats.available}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Marked Fresh Today</div>
          <div className={styles.value}>{loading ? '—' : stats.freshToday}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Out of Stock</div>
          <div className={styles.value}>{loading ? '—' : stats.outOfStock}</div>
        </div>
      </div>

      <div className={styles.notice}>
        Only the <strong>Products</strong> module is fully wired to the backend in this version. Inventory and
        Analytics are placeholders reserved for future phases (demand forecasting, Power BI-style dashboards,
        recommendation engine).
      </div>
    </div>
  );
}
