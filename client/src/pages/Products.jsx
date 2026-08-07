import { useState } from 'react';
import { useProducts } from '../hooks/useProducts.js';
import ProductCard from '../components/ProductCard/ProductCard.jsx';
import ProductFilter from '../components/ProductFilter/ProductFilter.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import OrderSidebar from '../components/OrderSidebar/OrderSidebar.jsx';
import Loading from '../components/Loading/Loading.jsx';
import ErrorState from '../components/ErrorState/ErrorState.jsx';
import styles from './Products.module.css';

export default function Products() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { products, loading, error, refetch } = useProducts({ category, search });

  return (
    <>
      <section className={styles.head}>
        <div className="wrap">
          <span className="eyebrow">Full catalog</span>
          <h1 className={styles.title}>Everything grown on our farm this season</h1>
          <p className={styles.sub}>
            Build your basket below — add items, and when you&apos;re ready we&apos;ll turn it into a WhatsApp
            order with one tap. No account needed.
          </p>
        </div>
      </section>

      <div className={styles.controls}>
        <div className={`wrap ${styles.controlsInner}`}>
          <ProductFilter active={category} onChange={setCategory} />
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className={`wrap ${styles.catalog}`}>
        <div className={styles.grid}>
          {loading && <Loading label="Loading today's produce…" />}
          {!loading && error && <ErrorState message={error} onRetry={refetch} />}
          {!loading && !error && products.length === 0 && (
            <div className={styles.empty}>
              <p>No vegetables match your filters right now. Try a different category or search term.</p>
            </div>
          )}
          {!loading &&
            !error &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <OrderSidebar products={products} />
      </div>
    </>
  );
}
