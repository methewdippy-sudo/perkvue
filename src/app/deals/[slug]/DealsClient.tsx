"use client";

import React, { useState } from "react";
import styles from "./DealsClient.module.css";
import CouponCard from "../../../components/CouponCard";
import CopyModal from "../../../components/CopyModal";
import { Store, Coupon } from "../../../lib/types";

interface DealsClientProps {
  store: Store;
  coupons: Coupon[];
}

export default function DealsClient({ store, coupons }: DealsClientProps) {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const handleSelectCoupon = (coupon: Coupon) => {
    setActiveCoupon(coupon);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Compact Store Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroInner}>
          <div className={styles.brandRow}>
            {store.logo ? (
              <img src={store.logo} alt={`${store.name} Logo`} className={styles.storeLogo} />
            ) : (
              <div className={styles.fallbackLogo}>{store.name.charAt(0)}</div>
            )}
            <div className={styles.brandMeta}>
              <div className={styles.titleRow}>
                <h1 className={styles.storeTitle}>{store.name} Promo Codes & Perks</h1>
                <span className={styles.verifiedBadge}>⚡ 100% Verified Working</span>
              </div>
              <p className={styles.storeSubtitle}>
                {store.description || `Verified promo codes, subscriber discounts, and free shipping perks for ${store.name}.`}
              </p>
            </div>
          </div>

          {/* Inline Trust Proof Bar */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>{coupons.length}</span>
              <span className={styles.trustLabel}>Available Perks</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>20%</span>
              <span className={styles.trustLabel}>Max Discount</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>100%</span>
              <span className={styles.trustLabel}>Success Rate</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>Today</span>
              <span className={styles.trustLabel}>Last Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Above-the-fold 2-Column Deals Grid */}
      <section className={styles.dealsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured {store.name} Verified Offers</h2>
          <span className={styles.offersCount}>Showing {coupons.length} Active Offers</span>
        </div>

        <div className={styles.cardsGrid}>
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              store={store}
              onSelect={handleSelectCoupon}
            />
          ))}
        </div>
      </section>

      {/* Verification FAQ / Trust Guide */}
      <section className={styles.infoSection}>
        <h3 className={styles.infoHeading}>How to Redeem {store.name} Discounts</h3>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>1</span>
            <h4 className={styles.stepTitle}>Select & Copy Perk</h4>
            <p className={styles.stepDesc}>Click &quot;Show Code&quot; or &quot;Get Deal&quot; to automatically copy the verified discount code.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>2</span>
            <h4 className={styles.stepTitle}>Official Store Opens</h4>
            <p className={styles.stepDesc}>We direct you straight to the official {store.name} checkout portal with partner privileges.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>3</span>
            <h4 className={styles.stepTitle}>Enjoy Instant Savings</h4>
            <p className={styles.stepDesc}>Paste the promo code into the voucher box at checkout to see your price drop instantly.</p>
          </div>
        </div>
      </section>

      {/* Copy Modal */}
      {activeCoupon && (
        <CopyModal
          coupon={activeCoupon}
          store={store}
          onClose={() => setActiveCoupon(null)}
        />
      )}
    </div>
  );
}
