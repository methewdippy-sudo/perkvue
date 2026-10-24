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

  // Secret trigger & search filtering
  const filteredStores = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stores;

    // Secret trigger
    if (q.endsWith("--")) {
      const key = q.slice(0, -2).trim().replace(/[^a-z0-9]/g, "");
      if (key === "im8" || key === "im8health") {
        return [{
          id: "im8-health",
          name: "iM8 Health",
          slug: "im8-health-us",
          logo: "/logos/im8health.png",
          website: "https://www.im8health.com/METHEW29111",
          affiliate_url: "https://www.im8health.com/METHEW29111",
          category: "Cellular Longevity & Health"
        } as Store];
      }
    }

    if (q === "im8" || q.includes("im8")) {
      return [{
        id: "im8-health",
        name: "iM8 Health",
        slug: "im8-health-us",
        logo: "/logos/im8health.png",
        website: "https://www.im8health.com/METHEW29111",
        affiliate_url: "https://www.im8health.com/METHEW29111",
        category: "Cellular Longevity & Health"
      } as Store];
    }

    return stores.filter((s) => s.name.toLowerCase().includes(q) || s.slug.includes(q));
  }, [search, stores]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredStores.length > 0) {
      window.location.href = `/deals/${filteredStores[0].slug}`;
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Luxury Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBadge}>
          <span>✨</span> Official Verified Perks & Longevity Savings
        </div>
        <h1 className={styles.heroTitle}>
          Curated Wellness Perks. <br />
          <span className={styles.gradientText}>Always Verified Working.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Discover member-grade promo codes and verified discounts on premier daily longevity formulas, performance gear, and modern essentials.
        </p>

        {/* Hero Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.heroSearchForm}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search brands, health perks, promo codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.heroInput}
          />
          <button type="submit" className={styles.heroSearchBtn}>Search</button>
        </form>

        {/* Popular Tags */}
        <div className={styles.tagRow}>
          <span className={styles.tagLabel}>Trending:</span>
          <a href="/deals/im8-health-us" className={styles.highlightTag}>🔥 iM8 Health (20% Off)</a>
          <button type="button" onClick={() => setSearch("ag1")} className={styles.tagBtn}>AG1</button>
          <button type="button" onClick={() => setSearch("whoop")} className={styles.tagBtn}>Whoop</button>
          <button type="button" onClick={() => setSearch("oura")} className={styles.tagBtn}>Oura</button>
        </div>
      </section>

      {/* Featured Brands Grid */}
      <section id="perks" className={styles.brandsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionHeading}>Featured Partner Brands</h2>
            <p className={styles.sectionSub}>All discount codes tested and validated in the last 24 hours.</p>
          </div>
        </div>

        <div className={styles.brandsGrid}>
          {/* Highlight Card for iM8 */}
          <a href="/deals/im8-health-us" className={styles.vipBrandCard}>
            <div className={styles.vipBadge}>⚡ TOP RATED LONGEVITY</div>
            <img src="/logos/im8health.png" alt="iM8 Health" className={styles.vipLogo} />
            <h3 className={styles.vipTitle}>iM8 Health</h3>
            <p className={styles.vipDesc}>92-in-1 Daily Cellular Longevity Drink. Clinically backed formula for vitality, gut & renewal.</p>
            <div className={styles.vipPerkPill}>20% Off Sitewide with Code METHEW29111 →</div>
          </a>

          {/* Standard Safe Brands */}
          {filteredStores.map((store) => (
            <a key={store.id} href={`/deals/${store.slug}`} className={styles.brandCard}>
              <div className={styles.brandLogoWrap}>
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className={styles.brandLogo} />
                ) : (
                  <div className={styles.brandFallback}>{store.name.charAt(0)}</div>
                )}
              </div>
              <div className={styles.brandInfo}>
                <h4 className={styles.brandName}>{store.name}</h4>
                <span className={styles.brandCat}>{store.category || "Verified Deals"}</span>
              </div>
              <span className={styles.brandArrow}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Coupons Preview Grid */}
      <section className={styles.couponsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Trending Verified Perks</h2>
        </div>
        <div className={styles.couponsGrid}>
          {coupons.slice(0, 4).map((c) => (
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
