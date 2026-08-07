import { useState } from 'react';
import styles from './DeliveryAreas.module.css';

const ZONES = [
  { name: 'Sonpur Town', pin: '844121', status: 'active', slot: 'Delivery slots: 10 AM – 1 PM' },
  { name: 'Sonpur Station Road', pin: '844121', status: 'active', slot: 'Delivery slots: 10 AM – 1 PM' },
  { name: 'Chirand Road Societies', pin: '844121', status: 'active', slot: 'Delivery slots: 11 AM – 2 PM' },
  { name: 'Hathi Dah', pin: '844122', status: 'active', slot: 'Delivery slots: 11 AM – 2 PM' },
  { name: 'Doriganj', pin: '841222', status: 'active', slot: 'Delivery slots: 12 PM – 3 PM' },
  { name: 'Hajipur City', pin: '844101', status: 'soon', slot: 'Phase 2 — target Q4 2026' },
  { name: 'Hajipur Industrial Area', pin: '844102', status: 'soon', slot: 'Phase 2 — target Q4 2026' },
  { name: 'Patna — Kankarbagh', pin: '800020', status: 'soon', slot: 'Phase 3 — target 2027' },
  { name: 'Patna — Boring Road', pin: '800001', status: 'soon', slot: 'Phase 3 — target 2027' },
];

export default function DeliveryAreas() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [zoneFilter, setZoneFilter] = useState('all');

  function checkDelivery(value = input) {
    const val = value.trim().toLowerCase();
    if (!val) {
      setResult({ type: 'no', title: 'Type an area name or pincode', desc: 'We need something to check against — try one of the examples below.' });
      return;
    }
    const activeMatch = ZONES.find((z) => z.status === 'active' && (z.name.toLowerCase().includes(val) || z.pin === val));
    const soonMatch = ZONES.find((z) => z.status === 'soon' && (z.name.toLowerCase().includes(val) || z.pin === val));

    if (activeMatch) {
      setResult({ type: 'yes', title: `Yes — we deliver to ${activeMatch.name}`, desc: `${activeMatch.slot}. Place your order on WhatsApp and we'll confirm your exact slot.` });
    } else if (soonMatch) {
      setResult({ type: 'soon', title: `${soonMatch.name} is coming soon`, desc: `${soonMatch.slot}. Message us on WhatsApp and we'll notify you the day we launch there.` });
    } else {
      setResult({ type: 'no', title: "We don't deliver there yet", desc: "We're currently focused on Sonpur, with Hajipur and Patna next. Message us on WhatsApp — new areas are added based on demand." });
    }
  }

  function tryChip(val) {
    setInput(val);
    checkDelivery(val);
  }

  const zones = ZONES.filter((z) => zoneFilter === 'all' || z.status === zoneFilter);

  return (
    <>
      <section className={styles.head}>
        <div className="wrap">
          <span className="eyebrow">Delivery Areas</span>
          <h1 className={styles.title}>Check if we deliver to you</h1>
          <p className={styles.sub}>
            We only deliver where we can guarantee same-day freshness — type your area or pincode below to check
            instantly.
          </p>
        </div>
      </section>

      <section className={styles.checkerSection}>
        <div className="wrap">
          <div className={styles.checkerCard}>
            <h3>Delivery Checker</h3>
            <p className={styles.checkerSub}>Enter your locality name or 6-digit pincode</p>

            <div className={styles.checkerForm}>
              <input
                type="text"
                value={input}
                placeholder="e.g. Sonpur Station Road or 844121"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkDelivery()}
              />
              <button className="btn btn-primary" onClick={() => checkDelivery()}>
                Check
              </button>
            </div>

            {result && (
              <div className={`${styles.result} ${styles[result.type]}`}>
                <div className={styles.resultTitle}>{result.title}</div>
                <div className={styles.resultDesc}>{result.desc}</div>
              </div>
            )}

            <div className={styles.tryChips}>
              <span className={styles.tryLabel}>TRY:</span>
              {['Sonpur', '844121', 'Hajipur', 'Patna', 'Delhi'].map((v) => (
                <button key={v} className={styles.tryChip} onClick={() => tryChip(v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.zonesSection}>
        <div className="wrap">
          <div className={styles.zoneTabs}>
            {[
              { f: 'all', label: 'All Zones' },
              { f: 'active', label: 'Delivering Now' },
              { f: 'soon', label: 'Coming Soon' },
            ].map((tab) => (
              <button
                key={tab.f}
                className={`${styles.zoneTab} ${zoneFilter === tab.f ? styles.zoneTabActive : ''}`}
                onClick={() => setZoneFilter(tab.f)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.zoneGrid}>
            {zones.map((z) => (
              <div key={z.name} className={styles.zoneCard}>
                <div className={styles.zoneTop}>
                  <div className={styles.zoneName}>{z.name}</div>
                  <span className={`${styles.statusPill} ${z.status === 'active' ? styles.statusActive : styles.statusSoon}`}>
                    {z.status === 'active' ? 'Delivering' : 'Coming Soon'}
                  </span>
                </div>
                <div className={styles.pin}>PIN {z.pin}</div>
                <div className={styles.slot}>{z.slot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
