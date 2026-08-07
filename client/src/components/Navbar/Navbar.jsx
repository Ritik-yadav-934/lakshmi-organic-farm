import { NavLink } from 'react-router-dom';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/subscription', label: 'Subscriptions' },
  { to: '/our-farm', label: 'Our Farm' },
  { to: '/delivery', label: 'Delivery Areas' },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <NavLink to="/" className={styles.brand}>
          {/* <svg viewBox="0 0 40 40" fill="none" width="30" height="30">
            <circle cx="20" cy="20" r="20" fill="#1F4029" />
            <path d="M20 30V16" stroke="#E8B65C" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 16C20 16 12 16 12 9C19 9 20 16 20 16Z" fill="#6FA37E" />
          </svg> */}
          <img src="/images/logo.png" alt="lakshmi Orgmaic Farm" className={styles.logo} />

          <span> Lakshmi Organic Farm</span> 
          </NavLink>

        <nav className={styles.links}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <WhatsAppButton variant="ghost" size="small" label="Order on WhatsApp" />
      </div>
    </header>
  );
}
