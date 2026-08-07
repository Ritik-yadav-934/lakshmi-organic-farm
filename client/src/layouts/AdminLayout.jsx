import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './AdminLayout.module.css';

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/products', label: 'Products', icon: '🥬' },
  { to: '/admin/inventory', label: 'Inventory', icon: '📦' },
  { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
            <circle cx="20" cy="20" r="20" fill="#1F4029" />
            <path d="M20 30V16" stroke="#E8B65C" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Lakshmi Admin
        </div>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>

        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
