import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../../services/productService.js';
import Loading from '../../components/Loading/Loading.jsx';
import ErrorState from '../../components/ErrorState/ErrorState.jsx';
import styles from './AdminProducts.module.css';

const EMPTY_FORM = {
  id: null,
  name: '',
  category: 'leafy',
  description: '',
  price: '',
  unit: 'kg',
  image_url: '',
  quantity: '',
  available: true,
  fresh_today: false,
};

const CATEGORIES = ['leafy', 'root', 'seasonal', 'desi', 'organic'];
const UNITS = ['kg', 'bunch', 'pc', 'g', 'dozen'];

export default function AdminProducts() {
  const { products, loading, error, refetch } = useProducts();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  function startCreate() {
    setForm(EMPTY_FORM);
    setIsEditing(true);
    setFormError(null);
  }

  function startEdit(product) {
    setForm({ ...product });
    setIsEditing(true);
    setFormError(null);
  }

  function cancelEdit() {
    setForm(EMPTY_FORM);
    setIsEditing(false);
    setFormError(null);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadProductImage(file);
      updateField('image_url', result.url);
    } catch (err) {
      setFormError('Image upload failed. You can still save the product and add an image later.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        unit: form.unit,
        image_url: form.image_url,
        quantity: Number(form.quantity),
        available: form.available,
        fresh_today: form.fresh_today,
      };

      if (form.id) {
        await updateProduct(form.id, payload);
      } else {
        await createProduct(payload);
      }

      cancelEdit();
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Could not save this product. Please check the fields and try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    try {
      await deleteProduct(product.id);
      refetch();
    } catch (err) {
      alert('Could not delete this product. Please try again.');
    }
  }

  async function toggleField(product, field) {
    try {
      await updateProduct(product.id, { ...product, [field]: !product[field] });
      refetch();
    } catch (err) {
      alert('Could not update this product. Please try again.');
    }
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.sub}>Everything here writes directly to PostgreSQL and updates the live site instantly.</p>
        </div>
        {!isEditing && (
          <button className="btn btn-primary" onClick={startCreate}>
            + Add Product
          </button>
        )}
      </div>

      {isEditing && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>{form.id ? 'Edit Product' : 'New Product'}</h3>

          <div className={styles.formGrid}>
            <label>
              Name
              <input value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
            </label>

            <label>
              Category
              <select value={form.category} onChange={(e) => updateField('category', e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            <label>
              Price (₹)
              <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => updateField('price', e.target.value)} required />
            </label>

            <label>
              Unit
              <select value={form.unit} onChange={(e) => updateField('unit', e.target.value)}>
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </label>

            <label>
              Quantity in stock
              <input type="number" min="0" value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} required />
            </label>

            <label>
              Product Image
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {uploading && <span className={styles.uploading}>Uploading…</span>}
              {form.image_url && !uploading && (
                <img src={form.image_url} alt="preview" className={styles.preview} />
              )}
            </label>

            <label className={styles.fullWidth}>
              Description
              <textarea rows={2} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
            </label>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={form.available} onChange={(e) => updateField('available', e.target.checked)} />
              Available (uncheck to mark Out of Stock)
            </label>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={form.fresh_today} onChange={(e) => updateField('fresh_today', e.target.checked)} />
              Fresh Today badge
            </label>
          </div>

          {formError && <div className={styles.formError}>{formError}</div>}

          <div className={styles.formActions}>
            <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Product'}
            </button>
          </div>
        </form>
      )}

      {loading && <Loading label="Loading products…" />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Fresh Today</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className={styles.rowImg} />
                  ) : (
                    <div className={styles.rowImgPlaceholder} />
                  )}
                </td>
                <td>{product.name}</td>
                <td className={styles.mono}>{product.category}</td>
                <td>₹{product.price}/{product.unit}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className={`${styles.pill} ${product.available ? styles.pillOn : styles.pillOff}`}
                    onClick={() => toggleField(product, 'available')}
                  >
                    {product.available ? 'Available' : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  <button
                    className={`${styles.pill} ${product.fresh_today ? styles.pillOn : styles.pillMuted}`}
                    onClick={() => toggleField(product, 'fresh_today')}
                  >
                    {product.fresh_today ? 'Fresh Today' : '—'}
                  </button>
                </td>
                <td className={styles.actions}>
                  <button onClick={() => startEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product)} className={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.emptyRow}>
                  No products yet — click &quot;+ Add Product&quot; to create the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
