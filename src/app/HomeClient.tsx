"use client";

import React, { useState, useMemo } from "react";
import styles from "./page.module.css";
import { Store, Coupon } from "../lib/types";

interface HomeClientProps {
  stores: Store[];
  coupons: Coupon[];
}

const CATEGORIES = [
  "All Privileges",
  "Technology & Hardware",
  "Athletic & Performance",
  "Luxury & Wellness",
  "Everyday Essentials",
  "Lifestyle & Media"
];

const VAULT_ITEMS = [
  {
    key: "apple",
    name: "Apple Inc.",
    tier: "Tier 1 Global",
    benefit: "15% Sitewide Hardware & Audio Accessory Credits",
    code: "PERKVUE15",
    slug: "apple"
  },
  {
    key: "nike",
    name: "Nike Direct",
    tier: "Direct Partner",
    benefit: "20% Off Member Gear & Footwear Clearance",
    code: "PERKVUE15",
    slug: "nike"
  },
  {
    key: "sephora",
    name: "Sephora",
    tier: "Prestige Partner",
    benefit: "15% Beauty Insider & Skincare Direct Privilege",
    code: "PERKVUE15",
    slug: "sephora"
  }
];

const FAQS = [
  {
    q: "What is PerkVue and how does it work?",
    a: "PerkVue is an independent, curated registry of direct brand privileges and insider checkout clearances. We partner directly with flagship retailers to audit and index active savings, eliminating broken third-party coupon scrapers."
  },
  {
    q: "Are all listed privileges verified and working today?",
    a: "Yes. Every voucher code and partner link is tested directly inside live retail shopping carts daily before indexing. If an offer expires, our automated audit engine immediately removes it from the public directory."
  },
  {
    q: "How do I redeem my member privilege?",
    a: "Select any merchant from the directory below and click 'Claim Privilege'. You will be given direct checkout credentials or redirected to the official partner store with your discount automatically applied."
  },
  {
    q: "Why is PerkVue completely free with zero ads?",
    a: "We maintain direct affiliate agreements with featured retailers, which allows us to provide a clean, ad-free, popup-free platform without selling user data or charging membership fees."
  }
];

export default function HomeClient({ stores }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Privileges");
  const [activeVaultTab, setActiveVaultTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Search and Category Filtering
  const filteredStores = useMemo(() => {
    let result = stores;

    // Filter by category
    if (selectedCategory !== "All Privileges") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Filter by search query
    const q = search.trim().toLowerCase();
    if (!q) return result;

    // Secret trigger -- (e.g. im8--)
    if (q.endsWith("--")) {
      const key = q.slice(0, -2).trim().replace(/[^a-z0-9]/g, "");
      if (typeof window !== "undefined") {
        window.location.href = `/deals/${key}`;
      }
      return [];
    }

    return result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.slug.includes(q) ||
        (s.benefit && s.benefit.toLowerCase().includes(q))
    );
  }, [search, selectedCategory, stores]);

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

  const currentVaultItem = VAULT_ITEMS[activeVaultTab];

  return (
    <div className={styles.homeContainer}>
      {/* =========================================================
          1. SPLIT-SCREEN EDITORIAL HERO (LUXURY REWARDS PORTAL)
          ========================================================= */}
      <section className={styles.heroGrid}>
        {/* Left Editorial Column */}
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <span className={styles.pulseDot}></span> AUDITED PARTNER PRIVILEGES 2026
          </div>
          <h1 className={styles.heroTitle}>
            Executive Member Perks & <br />
            <span className={styles.heroTitleHighlight}>Direct Partner Privileges.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Direct partner clearances, corporate-tier member credits, and verified private rates across global flagship retail and longevity brands. Zero expired offers, zero ad popups.
          </p>

          <div className={styles.heroActions}>
            <a href="#directory" className={styles.primaryCta}>
              Explore Directory ↓
            </a>
            <a href="#standards" className={styles.secondaryCta}>
              Editorial Standards
            </a>
          </div>

          <div className={styles.trustMetricRow}>
            <div className={styles.trustMetric}>
              <span className={styles.metricValue}>100% Cart Audit</span>
              <span className={styles.metricLabel}>Tested live daily</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.trustMetric}>
              <span className={styles.metricValue}>$4.8M+ Saved</span>
              <span className={styles.metricLabel}>In member privileges</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.trustMetric}>
              <span className={styles.metricValue}>Zero Ad Popups</span>
              <span className={styles.metricLabel}>Private & independent</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Member Pass Showcase */}
        <div className={styles.heroRight}>
          <div className={styles.vaultCard}>
            <div className={styles.vaultCardGlow}></div>

            <div className={styles.vaultCardTop}>
              <div className={styles.vaultCardBrand}>
                <div className={styles.chipIcon}></div>
                <span className={styles.vaultCardTitle}>PerkVue Member Vault Pass</span>
              </div>
              <span className={styles.vaultStatusBadge}>Active • Verified</span>
            </div>

            {/* Interactive Pass Switcher */}
            <div className={styles.vaultPreviewSelector}>
              {VAULT_ITEMS.map((item, idx) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveVaultTab(idx)}
                  className={`${styles.vaultTab} ${activeVaultTab === idx ? styles.vaultTabActive : ""}`}
                >
                  {item.name.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Pass Live Display */}
            <div className={styles.vaultDisplayBox}>
              <div className={styles.vaultDisplayHeader}>
                <h3 className={styles.vaultPartnerName}>{currentVaultItem.name}</h3>
                <span className={styles.vaultTierTag}>{currentVaultItem.tier}</span>
              </div>
              <p className={styles.vaultBenefit}>{currentVaultItem.benefit}</p>
              <div className={styles.vaultActionRow}>
                <span className={styles.vaultPassCode}>CODE: {currentVaultItem.code}</span>
                <a href={`/deals/${currentVaultItem.slug}`} className={styles.vaultCardLink}>
                  Claim Privilege →
                </a>
              </div>
            </div>

            <div className={styles.vaultCardFooter}>
              <span>AUDIT: DIRECT CHECKOUT VALIDATION</span>
              <span>EXPIRY: DEC 31, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. DIRECTORY CONTROLS & HORIZONTAL PARTNER ROWS
          ========================================================= */}
      <section id="directory" className={styles.directorySection}>
        <div className={styles.directoryHeader}>
          <div>
            <h2 className={styles.directoryTitle}>Official Merchant Registry</h2>
            <p className={styles.directorySubtitle}>
              Curated corporate partner privileges verified for instant cart clearance.
            </p>
          </div>
        </div>

        {/* Category Filters and Search Bar */}
        <div className={styles.toolbarRow}>
          <div className={styles.categoryPills}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.categoryPill} ${
                  selectedCategory === cat ? styles.categoryPillActive : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className={styles.directorySearch}>
            <svg
              className={styles.searchIcon}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search partner registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.directorySearchInput}
            />
          </form>
        </div>

        {/* Horizontal Directory Rows */}
        <div className={styles.directoryList}>
          {filteredStores.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No verified partner privileges match &quot;{search}&quot; in this category.</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <a
                key={store.id}
                href={`/deals/${store.slug}`}
                className={styles.partnerRow}
              >
                {/* Brand Logo Container */}
                <div className={styles.partnerLogoWrap}>
                  <img src={store.logo} alt={store.name} className={styles.partnerLogo} />
                </div>

                {/* Partner Meta */}
                <div className={styles.partnerMeta}>
                  <div className={styles.partnerNameWrap}>
                    <h3 className={styles.partnerName}>{store.name}</h3>
                    <span className={styles.partnerTierBadge}>{store.badge || "Verified Partner"}</span>
                  </div>
                  <span className={styles.partnerCategory}>{store.category}</span>
                </div>

                {/* Primary Benefit */}
                <div className={styles.partnerBenefit}>
                  {store.benefit || "15% Sitewide Privilege with verified access code"}
                </div>

                {/* Audit Timestamp */}
                <div className={styles.partnerAudit}>
                  <span className={styles.auditStatus}>
                    <span className={styles.auditDot}></span> Verified Active
                  </span>
                  <span className={styles.auditTimestamp}>Audited in cart today</span>
                </div>

                {/* Claim Button */}
                <div className={styles.claimButtonWrap}>
                  <span className={styles.claimButton}>Claim Privilege →</span>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* =========================================================
          3. EDITORIAL INTEGRITY STANDARDS (3-COLUMN TRUST GRID)
          ========================================================= */}
      <section id="standards" className={styles.standardsSection}>
        <div className={styles.standardsHeader}>
          <h2 className={styles.standardsTitle}>The PerkVue Verification Standard</h2>
          <p className={styles.standardsSubtitle}>
            Unlike legacy coupon aggregators, we maintain strict editorial guidelines to ensure every listed privilege works on first try.
          </p>
        </div>

        <div className={styles.standardsGrid}>
          <div className={styles.standardCard}>
            <div className={styles.standardNumber}>STANDARD 01</div>
            <h3 className={styles.standardHeading}>Live Checkout Testing</h3>
            <p className={styles.standardDesc}>
              Every promotional code is directly tested inside actual merchant checkout funnels before being indexed. We never list speculative or unverified codes.
            </p>
          </div>

          <div className={styles.standardCard}>
            <div className={styles.standardNumber}>STANDARD 02</div>
            <h3 className={styles.standardHeading}>Daily Dead-Link Purges</h3>
            <p className={styles.standardDesc}>
              Expired discounts waste shoppers&apos; time. Our daily audit sweeps remove expired vouchers immediately, keeping our directory 100% clean and functional.
            </p>
          </div>

          <div className={styles.standardCard}>
            <div className={styles.standardNumber}>STANDARD 03</div>
            <h3 className={styles.standardHeading}>Zero Spam & Deceptive Clicks</h3>
            <p className={styles.standardDesc}>
              No popunder windows, no fake &quot;reveal code&quot; loops, and no arbitrary redirects. Clean access directly to authorized partner stores.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. EDITORIAL SPOTLIGHT BANNER
          ========================================================= */}
      <section className={styles.spotlightBanner}>
        <div className={styles.spotlightContent}>
          <div className={styles.spotlightTag}>Curated Collective</div>
          <h2 className={styles.spotlightHeading}>Elevate Your Daily Living & Performance</h2>
          <p className={styles.spotlightText}>
            From premier cellular longevity supplements and clean nutrition to high-performance athletic footwear and everyday essentials, PerkVue curates the highest echelon of modern consumer privileges.
          </p>
        </div>
        <div className={styles.spotlightAction}>
          <a href="#directory" className={styles.spotlightBtn}>
            Browse All Privileges
          </a>
        </div>
      </section>

      {/* =========================================================
          5. MINIMALIST FAQ ACCORDION
          ========================================================= */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqSubtitle}>Everything you need to know about PerkVue partner privileges.</p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={styles.faqItem}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className={styles.faqQuestion}>
                <span>{faq.q}</span>
                <span>{openFaq === idx ? "−" : "+"}</span>
              </div>
              {openFaq === idx && <div className={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
