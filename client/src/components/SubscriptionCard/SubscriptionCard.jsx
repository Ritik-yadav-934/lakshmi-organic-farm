import styles from './SubscriptionCard.module.css';

export default function SubscriptionCard({ plan, price, frequency, selected, onSelect }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''} ${plan.badge ? styles.featured : ''}`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
      <div className={styles.check}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#1F4029" strokeWidth="3" width="12" height="12">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h3>{plan.name}</h3>
      <div className={styles.sub}>{plan.sub}</div>
      <div className={styles.price}>
        ₹{price}
        <span> / {frequency === 'weekly' ? 'week' : 'month'}</span>
      </div>

      <ul className={styles.list}>
        {plan.features.map((f) => (
          <li key={f}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
