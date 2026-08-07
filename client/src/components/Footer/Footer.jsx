import { Link } from 'react-router-dom';
import { buildWhatsAppGenericLink } from '../../services/whatsapp.js';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>
              <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
                <circle cx="20" cy="20" r="20" fill="#3D7A4F" />
                <path d="M20 30V16" stroke="#E8B65C" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Lakshmi Organic Farm
            </div>
            <p>Farm-to-home vegetable delivery from our family's own fields in Sonpur, Bihar. No middlemen, ever.</p>
          </div>

          <div className={styles.col}>
            <h5>Explore</h5>
            <Link to="/our-farm">Our Farm</Link>
            <Link to="/products">Products</Link>
          </div>

          <div className={styles.col}>
            <h5>Customers</h5>
            <Link to="/subscription">Subscription Plans</Link>
            <Link to="/delivery">Delivery Areas</Link>
          </div>

          <div className={styles.col}>
            <h5>Contact</h5>
            <a href={buildWhatsAppGenericLink()} target="_blank" rel="noreferrer">Order on WhatsApp</a>
            <span>Sonpur, Bihar, India</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Lakshmi Organic Farm. All rights reserved.</span>
          <span>Grown, packed &amp; delivered by our family — every single day.</span>
        </div>
      </div>
    </footer>
  );
}
