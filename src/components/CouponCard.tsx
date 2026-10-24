"use client";

import React, { useState } from "react";
import styles from "./CouponCard.module.css";
import { Coupon, Store } from "../lib/types";

interface CouponCardProps {
  coupon: Coupon;
  store: Store;
  onSelect: (coupon: Coupon) => void;
}

export default function CouponCard({ coupon, store, onSelect }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const isDirectDeal = !coupon.code;
  const targetUrl = coupon.affiliate_url || store.affiliate_url || store.website;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Copy code if available
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    // 2. Tabunder Conversion Engine: Open store in new tab
    if (typeof window !== "undefined") {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }

    // 3. Open modal in current tab
    onSelect(coupon);
  };

  return (
    <div className={styles.cardContainer}>
      {/* Top Badge Strip */}
      <div className={styles.cardHeader}>
        <span className={styles.discountBadge}>{coupon.discount}</span>
        <span className={styles.verifiedBadge}>
          <span className={styles.greenDot}></span> Verified Active
        </span>
      </div>

      {/* Card Content */}
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{coupon.title}</h4>
        <p className={styles.cardDesc}>{coupon.description}</p>
      </div>

      {/* Card Footer / CTA */}
      <div className={styles.cardFooter}>
        <button
          type="button"
          className={`${styles.ctaButton} ${isDirectDeal ? styles.dealButton : styles.codeButton}`}
          onClick={handleClick}
        >
          {isDirectDeal ? (
            <>
              <span>Get Deal</span>
              <span className={styles.arrowIcon}>→</span>
            </>
          ) : (
            <>
              <span className={styles.buttonCodeMask}>
                {copied ? "COPIED!" : `CODE: ${coupon.code.slice(0, 4)}••••`}
              </span>
              <span className={styles.buttonActionLabel}>
                {copied ? "✓ Copied" : "Show Code"}
              </span>
            </>
          )}
        </button>
        <div className={styles.statsRow}>
          <span>👥 {coupon.uses_count || 120}+ used today</span>
          <span>⚡ 100% Success</span>
        </div>
      </div>
    </div>
  );
}
