"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();
    if (!query) return;

    if (query.endsWith("--")) {
      const key = query.slice(0, -2).trim().replace(/[^a-z0-9]/g, "");
      if (key === "im8" || key === "im8health") {
        window.location.href = "/deals/im8-health-us";
        return;
      }
      window.location.href = `/deals/${key}`;
      return;
    }

    if (query.includes("im8")) {
      window.location.href = "/deals/im8-health-us";
      return;
    }

    window.location.href = `/?q=${encodeURIComponent(query)}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logoLink}>
          <img src="/perkvue-logo.svg" alt="PerkVue - Verified Perks" className={styles.logo} />
        </a>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search verified perks, brands, or deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </form>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="/#perks" className={styles.navLink}>Featured Perks</a>
          <a href="/deals/im8-health-us" className={styles.vipPerkBadge}>
            ⚡ iM8 Health (20% Off)
          </a>
        </nav>
      </div>
    </header>
  );
}
