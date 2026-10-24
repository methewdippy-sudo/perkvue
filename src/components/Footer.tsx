import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <img src="/perkvue-logo.svg" alt="PerkVue Logo" className={styles.footerLogo} />
          <p className={styles.brandDesc}>
            PerkVue is an independent curation of verified retail perks, merchant discount codes, and member privileges.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h5 className={styles.colTitle}>Popular Categories</h5>
          <ul className={styles.linkList}>
            <li><a href="/#brands">Online Marketplaces</a></li>
            <li><a href="/#brands">Athletic & Sportswear</a></li>
            <li><a href="/#brands">Beauty & Cosmetics</a></li>
            <li><a href="/#brands">Electronics & Gadgets</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h5 className={styles.colTitle}>Verification Standards</h5>
          <ul className={styles.linkList}>
            <li>100% Tested Daily</li>
            <li>Direct Merchant Redirection</li>
            <li>No Expired Clutter</li>
            <li>Zero Account Required</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {new Date().getFullYear()} PerkVue.com. All rights reserved. Trademarks belong to respective owners.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <span>•</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
