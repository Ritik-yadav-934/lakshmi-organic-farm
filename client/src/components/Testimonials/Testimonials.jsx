import styles from './Testimonials.module.css';

const REVIEWS = [
  {
    text: 'The tomatoes actually taste like tomatoes again. My kids finally eat their sabzi without complaining.',
    name: 'Ritu Sharma',
    loc: 'Sonpur Town',
    color: '#6FA37E',
  },
  {
    text: 'We order for our whole hostel mess now. Reliable delivery, and prices that actually make sense in bulk.',
    name: 'Vivek Yadav',
    loc: 'Hostel Warden',
    color: '#E8B65C',
  },
  {
    text: "Ordering on WhatsApp is so easy — no app, no login, just a message and it's at my door by evening.",
    name: 'Anjali Kumari',
    loc: 'Station Road',
    color: '#C98A2E',
  },
];

export default function Testimonials() {
  return (
    <div className={styles.grid}>
      {REVIEWS.map((r) => (
        <div key={r.name} className={styles.card}>
          <div className={styles.stars}>★★★★★</div>
          <p>&quot;{r.text}&quot;</p>
          <div className={styles.who}>
            <svg viewBox="0 0 40 40" width="36" height="36">
              <circle cx="20" cy="20" r="20" fill={r.color} />
            </svg>
            <div>
              <div className={styles.name}>{r.name}</div>
              <div className={styles.loc}>{r.loc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
