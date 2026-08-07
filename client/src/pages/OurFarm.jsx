import { useState } from 'react';
import Modal from '../components/Modal/Modal.jsx';
import FarmerStory from '../components/FarmerStory/FarmerStory.jsx';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton.jsx';
import { Link } from 'react-router-dom';
import styles from './OurFarm.module.css';

const STAGES = [
  { title: 'Sowing', time: 'Season start', desc: "Seeds are sown by hand across rotated plots, timed to Bihar's growing calendar for each vegetable." },
  { title: 'Growing & tending', time: '4–10 weeks', desc: 'Daily watering, weeding, and natural pest checks — no set-and-forget chemical spraying.' },
  { title: 'Dawn harvest', time: 'Daily, 5:30–7:00 AM', desc: "Only what the day's confirmed orders need is picked — nothing sits waiting for a buyer." },
  { title: 'Sort & pack', time: '7:00–10:00 AM', desc: 'Sorted by hand for quality, weighed, and packed fresh — no cold storage in between.' },
  { title: 'Delivery', time: '10:00 AM–6:00 PM', desc: 'Out on our own delivery routes across Sonpur, reaching most homes the same day.' },
];

const GALLERY = [
  { cap: 'Morning fog over the fields', desc: 'Fields just before sunrise harvest begins.', color: '#1F4029' },
  { cap: 'Rows of leafy greens', desc: 'Palak and mustard greens grown in rotated beds.', color: '#F0E6D4' },
  { cap: 'Hand-picked tomatoes', desc: 'Harvested by hand to avoid bruising.', color: '#FBF8F2' },
  { cap: 'Farmyard compost pile', desc: 'Our compost system, built from crop residue and manure.', color: '#E8E1D2' },
  { cap: "Sorting the day's harvest", desc: 'Sorted and graded before packing, every morning.', color: '#1F4029' },
  { cap: 'Delivery crates, ready to go', desc: 'Packed and loaded for same-day routes.', color: '#F0E6D4' },
  { cap: 'Irrigation channel', desc: 'Simple gravity-fed channels water each plot in turn.', color: '#FBF8F2' },
  { cap: 'Evening at the farmhouse', desc: 'The family home at the edge of the fields.', color: '#1F4029' },
];

export default function OurFarm() {
  const [openStage, setOpenStage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  function navLightbox(delta) {
    setLightboxIndex((i) => (i + delta + GALLERY.length) % GALLERY.length);
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>Our Farm</span>
          <h1 className={styles.heroTitle}>One family. One farm. Sonpur, Bihar.</h1>
          <p className={styles.heroSub}>
            Everything you order comes from the same fields — no aggregation, no unnamed suppliers. Here&apos;s
            exactly how it&apos;s grown, harvested, and looked after.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}><div className={styles.statN}>12</div><div className={styles.statL}>Acres Under Cultivation</div></div>
            <div className={styles.stat}><div className={styles.statN}>3</div><div className={styles.statL}>Generations Farming</div></div>
            <div className={styles.stat}><div className={styles.statN}>18</div><div className={styles.statL}>Vegetables Grown</div></div>
            <div className={styles.stat}><div className={styles.statN}>0</div><div className={styles.statL}>Middlemen Involved</div></div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className={styles.section}>
        <div className="wrap">
          <span className="eyebrow">Growing &amp; harvest process</span>
          <h2 className={styles.h2}>From seed to your basket</h2>
          <p className={styles.lead}>Tap any stage to see what actually happens on the farm.</p>

          <div className={styles.timeline}>
            {STAGES.map((stage, i) => (
              <div key={stage.title} className={`${styles.tlStep} ${openStage === i ? styles.tlOpen : ''}`}>
                <div className={styles.tlHead} onClick={() => setOpenStage(openStage === i ? -1 : i)}>
                  <div className={styles.tlLeft}>
                    <div className={styles.tlNum}>0{i + 1}</div>
                    <div>
                      <div className={styles.tlTitle}>{stage.title}</div>
                      <div className={styles.tlTime}>{stage.time}</div>
                    </div>
                  </div>
                  <span className={styles.chevron}>{openStage === i ? '▲' : '▼'}</span>
                </div>
                {openStage === i && (
                  <div className={styles.tlBody}>
                    <p>{stage.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.gallerySection}>
        <div className="wrap">
          <span className="eyebrow">Farm gallery</span>
          <h2 className={styles.h2}>A look at the fields</h2>
          <p className={styles.lead}>Click any photo to view it larger.</p>

          <div className={styles.galGrid}>
            {GALLERY.map((g, i) => (
              <div
                key={g.cap}
                className={styles.galTile}
                style={{ background: g.color }}
                onClick={() => setLightboxIndex(i)}
              >
                <div className={styles.galCap}>{g.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal open={lightboxIndex !== null} onClose={() => setLightboxIndex(null)}>
        {lightboxIndex !== null && (
          <>
            <div className={styles.lightboxSwatch} style={{ background: GALLERY[lightboxIndex].color }} />
            <div className={styles.lightboxCap}>{GALLERY[lightboxIndex].cap}</div>
            <div className={styles.lightboxDesc}>{GALLERY[lightboxIndex].desc}</div>
            <div className={styles.lightboxNav}>
              <button onClick={() => navLightbox(-1)}>←</button>
              <button onClick={() => navLightbox(1)}>→</button>
            </div>
          </>
        )}
      </Modal>

      {/* FARMERS */}
      <section className={`${styles.section} ${styles.dark}`}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>Meet our farmers</span>
          <h2 className={styles.h2} style={{ color: '#fff' }}>The people behind every harvest</h2>
          <div style={{ marginTop: 40 }}>
            <FarmerStory />
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Curious what&apos;s growing this week?</h2>
          <div className={styles.ctaActions}>
            <Link className="btn btn-ghost" to="/products">View Today&apos;s Harvest</Link>
            <WhatsAppButton variant="outline" label="Ask on WhatsApp" />
          </div>
        </div>
      </section>
    </>
  );
}
