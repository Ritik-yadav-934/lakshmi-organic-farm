import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton.jsx';
import SurveyButton from '../components/SurveyButton/SurveyButton.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import styles from './Home.module.css';
import React from "react";


export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero} id="top">
        <div className={`wrap ${styles.heroInner}`}>
          <div>
            <div className={styles.heroEyebrow}>
              <span className={styles.dot} />
              <span>Sonpur, Bihar — Est. on our family&apos;s own land</span>
            </div>
            <h1 className={styles.heroTitle}>
              Fresh vegetables,
              <br />
              straight from <em>our farm</em>
              <br />
              to your home.
            </h1>
            <p className={styles.heroSub}>
              Freshly harvested vegetables from our family farm in Sonpur, Bihar — picked at dawn, delivered the
              same day. No middlemen, no mandi markup, no mystery about where your food comes from.
            </p>
            <div className={styles.heroActions}>
              <WhatsAppButton />
              <Link className="btn btn-outline-dark" to="/products">View Products</Link>
              <SurveyButton variant="outline-dark" />
              <Link className="btn btn-outline-dark" to="/our-farm">View Farm</Link>
            </div>
          </div>
        </div>

        <div className={styles.trustStrip}>
          <div className={`wrap ${styles.trustInner}`}>
            <div className={styles.trustItem}>100% Fresh, No Storage</div>
            <div className={styles.trustItem}>Daily Harvest</div>
            <div className={styles.trustItem}>Home Delivery</div>
            <div className={styles.trustItem}>Trusted by 400+ Local Families</div>
          </div>
        </div>
      </section>

      {/* TODAY'S HARVEST TEASER */}
      <section className={styles.section} id="harvest">
        <div className="wrap">
          <span className="eyebrow">On the farm today</span>
          <h2 className={styles.h2}>Today&apos;s Fresh Harvest</h2>
          <p className={styles.lead}>
            What&apos;s ready today is pulled live from our inventory — see the full, up-to-date list on the
            Products page.
          </p>
          <Link className="btn btn-ghost" to="/products" style={{ marginTop: 20 }}>
            View Today&apos;s Harvest
          </Link>
        </div>
      </section>

      {/* BASKETS TEASER */}
      <section className={`${styles.section} ${styles.dark}`} id="baskets">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>Weekly family baskets</span>
          <h2 className={styles.h2} style={{ color: '#fff' }}>Subscribe once. Fresh vegetables, every week.</h2>
          <p className={styles.lead} style={{ color: 'rgba(255,255,255,0.72)', margin: '14px auto 0' }}>
            Starting at ₹199/week — cancel or pause anytime on WhatsApp.
          </p>
          <Link className="btn btn-primary" to="/subscription" style={{ marginTop: 20 }}>
            See Subscription Plans
          </Link>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className={styles.section} id="farm">
        <div className="wrap">
          <span className="eyebrow">How we work</span>
          <h2 className={styles.h2}>From our soil to your door, same day</h2>
          <div className={styles.steps}>
            <div className={styles.step}><div className={styles.stepNum}>01</div><h4>Harvested at dawn</h4><p>Our farmers pick each morning, only what the day&apos;s orders need.</p></div>
            <div className={styles.step}><div className={styles.stepNum}>02</div><h4>Packed, not stored</h4><p>Sorted and packed within hours — no cold storage, no ageing stock.</p></div>
            <div className={styles.step}><div className={styles.stepNum}>03</div><h4>On the road by noon</h4><p>Our own delivery routes cover Sonpur first, then nearby societies.</p></div>
            <div className={styles.step}><div className={styles.stepNum}>04</div><h4>At your door, same day</h4><p>Delivered fresh with a WhatsApp update the moment it arrives.</p></div>
          </div>
        </div>
      </section>

      {/* DELIVERY TEASER */}
      <section className={styles.section} id="delivery">
        <div className="wrap">
          <span className="eyebrow">Delivery areas</span>
          <h2 className={styles.h2}>Currently delivering across Sonpur — expanding soon</h2>
          <p className={styles.lead}>Check if we deliver to your exact area.</p>
          <Link className="btn btn-ghost" to="/delivery" style={{ marginTop: 20 }}>
            Check My Delivery Area
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={`${styles.section} ${styles.dark}`}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>What our customers say</span>
            <h2 className={styles.h2} style={{ color: '#fff' }}>Trusted by local families</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Ready to taste vegetables the way they&apos;re meant to taste?</h2>
          <div className={styles.ctaActions}>
            <WhatsAppButton variant="ghost" />
            <SurveyButton variant="outline" />
          </div>
        </div>
      </section>
      <div className={styles.adminLoginSection}>
        <Link
          to="/admin/login"
          className={styles.adminLoginButton}
        >
          Admin Login
        </Link>
      </div>


    </>
  );
}
