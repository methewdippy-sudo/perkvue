import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <img src="/perkvue-logo.svg" alt="PerkVue Logo" className={styles.footerLogo} />
          <p className={styles.brandDesc}>
            PerkVue is the trusted US portal for verified wellness discounts, premium supplement savings, and daily longevity perks.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h5 className={styles.colTitle}>Popular Categories</h5>
          <ul className={styles.linkList}>
            <li><a href="/deals/im8-health-us">Daily Longevity Drinks</a></li>
            <li><a href="/#perks">Performance Nutrition</a></li>
            <li><a href="/#perks">Cellular Recovery</a></li>
            <li><a href="/#perks">Fitness Wearables</a></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h5 className={styles.colTitle}>Verification Standards</h5>
          <ul className={styles.linkList}>
            <li>100% Tested Daily</li>
            <li>Official Brand Partner Codes</li>
            <li>No Expired Traps</li>
            <li>Direct Merchant Redirection</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {new Date().getFullYear()} PerkVue.com. All rights reserved. Third-party trademarks belong to their respective owners.</p>
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
