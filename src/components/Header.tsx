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
      window.location.href = `/deals/${key}`;
      return;
    }

    window.location.href = `/#directory`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logoLink}>
          <img src="/perkvue-logo.svg" alt="PerkVue" className={styles.logo} />
        </a>

        {/* Minimalist Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search verified partner privileges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </form>

        {/* Minimalist Navigation */}
        <nav className={styles.nav}>
          <a href="/#directory" className={styles.navLink}>Partner Registry</a>
          <a href="/#standards" className={styles.navLink}>Audit Standards</a>
          <a href="/#standards" className={styles.navLink}>FAQ</a>
        </nav>
      </div>
    </header>
  );
}
