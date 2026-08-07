import { useState, useMemo } from 'react';
import SubscriptionCard from '../components/SubscriptionCard/SubscriptionCard.jsx';
import { buildWhatsAppOrderLink } from '../services/whatsapp.js';
import styles from './Subscription.module.css';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter Weekly Basket',
    badge: null,
    sub: 'For individuals & couples',
    weekly: 199,
    features: ['6–7 daily-use vegetables', 'Good for 1–2 people', 'One fixed delivery slot'],
  },
  {
    id: 'family',
    name: 'Family Basket',
    badge: 'Most popular',
    sub: 'For families of 4–5',
    weekly: 399,
    features: ['10–12 vegetables, mixed', 'Good for families of 4–5', 'Free swap of 1 item/week'],
  },
  {
    id: 'premium',
    name: 'Premium Basket',
    badge: null,
    sub: 'For larger, health-conscious households',
    weekly: 599,
    features: ['15+ items incl. organic picks', 'Priority morning delivery', 'Seasonal specials first'],
  },
];

const ADDONS = [
  { id: 'fruit', name: 'Seasonal Fruit Box', weekly: 99 },
  { id: 'ghee', name: 'Farm A2 Ghee (500ml)', weekly: 180 },
  { id: 'herbs', name: 'Fresh Herbs Pack', weekly: 40 },
  { id: 'eggs', name: 'Farm Country Eggs (6)', weekly: 70 },
];

const MONTHLY_DISCOUNT = 0.92; // 8% off

function priceFor(weeklyPrice, frequency) {
  if (frequency === 'weekly') return weeklyPrice;
  return Math.round(weeklyPrice * 4 * MONTHLY_DISCOUNT);
}

export default function Subscription() {
  const [frequency, setFrequency] = useState('weekly');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [activeAddons, setActiveAddons] = useState(new Set());

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId);

  function toggleAddon(id) {
    setActiveAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const summary = useMemo(() => {
    if (!selectedPlan) return null;
    const planPrice = priceFor(selectedPlan.weekly, frequency);
    const addonList = [...activeAddons].map((id) => ADDONS.find((a) => a.id === id));
    const addonTotal = addonList.reduce((sum, a) => sum + priceFor(a.weekly, frequency), 0);
    const total = planPrice + addonTotal;

    const lines = [
      `${selectedPlan.name} — ₹${planPrice}/${frequency === 'weekly' ? 'week' : 'month'}`,
      ...addonList.map((a) => `+ ${a.name} — ₹${priceFor(a.weekly, frequency)}/${frequency === 'weekly' ? 'week' : 'month'}`),
    ];

    const waLink = buildWhatsAppOrderLink({
      intro: "Hi Lakshmi Organic Farm! I'd like to subscribe:",
      lines,
      total: `${total} (${frequency})`,
      outro: 'Please share delivery slot options for my area.',
    });

    return { planPrice, addonList, total, waLink };
  }, [selectedPlan, frequency, activeAddons]);

  return (
    <>
      <section className={styles.head}>
        <div className="wrap">
          <span className="eyebrow">Subscription Plans</span>
          <h1 className={styles.title}>Pick a basket. We&apos;ll handle the rest.</h1>
          <p className={styles.sub}>
            Choose weekly or monthly billing, select a basket size, add any extras — then confirm on WhatsApp.
            Pause or cancel anytime, no questions asked.
          </p>

          <div className={styles.toggleRow}>
            <div className={styles.toggle}>
              <button
                className={frequency === 'weekly' ? styles.toggleActive : ''}
                onClick={() => setFrequency('weekly')}
              >
                Weekly
              </button>
              <button
                className={frequency === 'monthly' ? styles.toggleActive : ''}
                onClick={() => setFrequency('monthly')}
              >
                Monthly <span className={styles.saveBadge}>Save 8%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className="wrap">
          <div className={styles.planGrid}>
            {PLANS.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                price={priceFor(plan.weekly, frequency)}
                frequency={frequency}
                selected={selectedPlanId === plan.id}
                onSelect={setSelectedPlanId}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.addonsSection}>
        <div className="wrap">
          <div className={styles.addonsHead}>
            <span className="eyebrow">Optional add-ons</span>
            <h2 className={styles.h2}>Round out your basket</h2>
          </div>
          <div className={styles.addonGrid}>
            {ADDONS.map((addon) => (
              <div
                key={addon.id}
                className={`${styles.addon} ${activeAddons.has(addon.id) ? styles.addonActive : ''}`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className={styles.addonName}>{addon.name}</div>
                <div className={styles.addonPrice}>
                  +₹{priceFor(addon.weekly, frequency)}/{frequency === 'weekly' ? 'wk' : 'mo'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {summary && (
        <div className={styles.summaryBar}>
          <div className={`wrap ${styles.summaryInner}`}>
            <div>
              <div className={styles.summaryPlan}>{selectedPlan.name}</div>
              <div className={styles.summaryDetail}>
                {frequency === 'weekly' ? 'Billed weekly' : 'Billed monthly'}
                {summary.addonList.length > 0 &&
                  ` · +${summary.addonList.length} add-on${summary.addonList.length > 1 ? 's' : ''}`}
              </div>
            </div>
            <div className={styles.summaryRight}>
              <div className={styles.summaryTotal}>
                <span>Total </span>₹{summary.total}
              </div>
              <a className="btn btn-primary" href={summary.waLink} target="_blank" rel="noreferrer">
                Confirm on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
