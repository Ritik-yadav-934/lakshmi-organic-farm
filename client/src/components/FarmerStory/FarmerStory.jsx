import { useState } from 'react';
import styles from './FarmerStory.module.css';

const FARMERS = [
  {
    name: 'Ram Prasad Singh',
    role: 'Founder & Head Farmer',
    years: '42 years farming this land',
    avatar: '#C98A2E',
    bio: 'Started farming this land as a teenager alongside his father. Oversees crop planning and rotation across all 12 acres, and personally trains every new hire on harvest timing.',
  },
  {
    name: 'Sunita Devi',
    role: 'Harvest Lead',
    years: '18 years on the farm',
    avatar: '#3D7A4F',
    bio: 'Leads the dawn harvest crew and manages quality sorting — nothing leaves the farm without passing her check.',
  },
  {
    name: 'Manoj Kumar',
    role: 'Logistics & Delivery',
    years: '6 years on the farm',
    avatar: '#6FA37E',
    bio: 'Runs the delivery routes across Sonpur and coordinates WhatsApp order confirmations with customers directly.',
  },
];

export default function FarmerStory() {
  const [active, setActive] = useState(0);
  const farmer = FARMERS[active];

  return (
    <div className={styles.switcher}>
      <div className={styles.list}>
        {FARMERS.map((f, i) => (
          <div
            key={f.name}
            className={`${styles.tab} ${i === active ? styles.active : ''}`}
            onClick={() => setActive(i)}
          >
            <svg className={styles.avatar} viewBox="0 0 40 40" width="44" height="44">
              <circle cx="20" cy="20" r="20" fill={f.avatar} />
            </svg>
            <div>
              <div className={styles.name}>{f.name}</div>
              <div className={styles.role}>{f.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.detail}>
        <svg viewBox="0 0 40 40" width="84" height="84">
          <circle cx="20" cy="20" r="20" fill={farmer.avatar} />
        </svg>
        <div>
          <h3>{farmer.name}</h3>
          <div className={styles.detailRole}>{farmer.role}</div>
          <p className={styles.bio}>{farmer.bio}</p>
          <div className={styles.detailYears}>{farmer.years}</div>
        </div>
      </div>
    </div>
  );
}
