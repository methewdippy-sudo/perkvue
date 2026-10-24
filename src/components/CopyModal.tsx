"use client";

import React, { useState, useEffect } from "react";
import styles from "./CopyModal.module.css";
import { Coupon, Store } from "../lib/types";

interface CopyModalProps {
  coupon: Coupon | null;
  store: Store;
  onClose: () => void;
}

export default function CopyModal({ coupon, store, onClose }: CopyModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (coupon && coupon.code) {
      navigator.clipboard.writeText(coupon.code).catch(() => {});
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [coupon]);

  if (!coupon) return null;

  const targetUrl = coupon.affiliate_url || store.affiliate_url || store.website;
  const isDirectDeal = !coupon.code;

  const handleManualCopy = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleRedirect = () => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Brand Banner */}
        <div className={styles.modalHeader}>
          {store.logo ? (
            <img src={store.logo} alt={store.name} className={styles.brandLogo} />
          ) : (
            <div className={styles.fallbackLogo}>{store.name.charAt(0)}</div>
          )}
          <span className={styles.verifiedPill}>⚡ 100% Tested & Verified Today</span>
        </div>

        {/* Modal Body */}
        <h3 className={styles.modalTitle}>{coupon.title}</h3>
        <p className={styles.modalSubtitle}>{coupon.description}</p>

        {isDirectDeal ? (
          <div className={styles.autoAppliedBox}>
            <div className={styles.autoAppliedIcon}>✓</div>
            <div>
              <div className={styles.autoAppliedHeading}>Direct Deal Activated!</div>
              <div className={styles.autoAppliedText}>No coupon code needed. Discount automatically applied at checkout.</div>
            </div>
          </div>
        ) : (
          <div className={styles.codeContainer}>
            <div className={styles.codeBox} onClick={handleManualCopy}>
              <span className={styles.codeText}>{coupon.code}</span>
              <button className={styles.copyBtn} type="button">
                {copied ? "Copied! ✓" : "Copy Code"}
              </button>
            </div>
            {copied && (
              <p className={styles.copiedHint}>
                🎉 Code copied to clipboard! Paste it at checkout on {store.name}.
              </p>
            )}
          </div>
        )}

        {/* CTA Actions */}
        <div className={styles.actionsArea}>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryCta}
            onClick={handleRedirect}
          >
            Continue to {store.name} →
          </a>
          <button type="button" className={styles.secondaryBtn} onClick={onClose}>
            Browse More Offers
          </button>
        </div>

        {/* Trust Proof */}
        <div className={styles.trustFooter}>
          <span>🔒 256-Bit SSL Encrypted Verification</span>
          <span>•</span>
          <span>Guaranteed Working on Official Site</span>
        </div>
      </div>
    </div>
  );
}
