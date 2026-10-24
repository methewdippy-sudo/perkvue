"use client";

import React, { useState, useMemo } from "react";
import styles from "./page.module.css";
import CouponCard from "../components/CouponCard";
import CopyModal from "../components/CopyModal";
import { Store, Coupon } from "../lib/types";

interface HomeClientProps {
  stores: Store[];
  coupons: Coupon[];
}

export default function HomeClient({ stores, coupons }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // Search filtering
  const filteredStores = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stores;

    // Secret trigger --
    if (q.endsWith("--")) {
      const key = q.slice(0, -2).trim().replace(/[^a-z0-9]/g, "");
      if (typeof window !== "undefined") {
        window.location.href = `/deals/${key}`;
      }
      return [];
    }

    return stores.filter((s) => s.name.toLowerCase().includes(q) || s.slug.includes(q));
  }, [search, stores]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (q.endsWith("--")) {
      const key = q.slice(0, -2).trim().replace(/[^a-z0-9]/g, "");
      window.location.href = `/deals/${key}`;
      return;
    }
    if (filteredStores.length > 0) {
      window.location.href = `/deals/${filteredStores[0].slug}`;
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Modern Editorial Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroTag}>
          <span className={styles.dot}></span> VERIFIED RETAIL & WELLNESS PERKS
        </div>
        <h1 className={styles.heroTitle}>
          Curated Brand Vouchers. <br />
          <span className={styles.editorialText}>Tested Daily for Direct Checkout.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Access verified merchant codes and subscriber savings across leading global retailers and lifestyle brands.
        </p>

        {/* Floating Minimalist Search Input */}
        <form onSubmit={handleSearchSubmit} className={styles.heroSearchForm}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search stores (Amazon, Nike, Apple, Sephora...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.heroInput}
          />
          <button type="submit" className={styles.heroBtn}>Search</button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className={styles.pillsRow}>
          <span className={styles.pillsLabel}>Popular:</span>
          {["Nike", "Apple", "Amazon", "Sephora", "Lululemon"].map((name) => (
            <button key={name} type="button" onClick={() => setSearch(name.toLowerCase())} className={styles.pillBtn}>
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Brands Grid with Verified SVG Logos */}
      <section id="brands" className={styles.brandsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionHeading}>Official Merchant Directory</h2>
            <p className={styles.sectionSub}>All promotional offers validated directly with merchant checkout carts.</p>
          </div>
          <span className={styles.brandCountBadge}>{filteredStores.length} Verified Stores</span>
        </div>

        <div className={styles.brandsGrid}>
          {filteredStores.map((store) => (
            <a key={store.id} href={`/deals/${store.slug}`} className={styles.brandCard}>
              <div className={styles.brandLogoWrap}>
                <img src={store.logo} alt={store.name} className={styles.brandLogo} />
              </div>
              <div className={styles.brandMeta}>
                <h4 className={styles.brandName}>{store.name}</h4>
                <span className={styles.brandCategory}>{store.category || "Retail Store"}</span>
              </div>
              <span className={styles.viewLink}>View Perks →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Trending Vouchers Grid */}
      <section id="perks" className={styles.couponsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionHeading}>Trending Verified Vouchers</h2>
            <p className={styles.sectionSub}>Top member-redeemed discounts this week.</p>
          </div>
        </div>
        <div className={styles.couponsGrid}>
          {coupons.slice(0, 6).map((c) => (
            <CouponCard
              key={c.id}
              coupon={c}
              store={c.store || stores[0]}
              onSelect={(cp) => setActiveCoupon(cp)}
            />
          ))}
        </div>
      </section>

      {/* Copy Modal */}
      {activeCoupon && (
        <CopyModal
          coupon={activeCoupon}
          store={activeCoupon.store || stores[0]}
          onClose={() => setActiveCoupon(null)}
        />
      )}
    </div>
  );
}
