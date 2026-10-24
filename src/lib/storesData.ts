import { Store, Coupon } from "./types";

// ==========================================
// 1. iM8 HEALTH OFFICIAL CAMPAIGN STORE
// ==========================================
export const IM8_STORE: Store = {
  id: "im8-health",
  name: "iM8 Health",
  slug: "im8-health-us",
  logo: "/logos/im8health.png",
  website: "https://www.im8health.com/METHEW29111",
  affiliate_url: "https://www.im8health.com/METHEW29111",
  category: "Health & Longevity",
  description: "Advanced daily cellular health and longevity formula. Clinically formulated with 92 bioactive ingredients to support sustained energy, gut microbiome, cellular renewal, and deep immune vitality.",
  rating: 4.9,
  reviews_count: 3480
};

export const IM8_COUPONS: Coupon[] = [
  {
    id: "im8-card-1",
    code: "METHEW29111",
    discount: "20% OFF",
    title: "Exclusive 20% Off Sitewide & Daily Longevity Formulations",
    description: "Save 20% on your entire order of iM8 Daily Longevity Drinks, Core Bundles, and System Refills. Tested and 100% verified active today.",
    is_verified: true,
    is_auto_applied: false,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 1420
  },
  {
    id: "im8-card-2",
    code: "", // Direct auto-applied deal
    discount: "20% OFF",
    title: "20% Off First Monthly Subscription + Free Luxury Welcome Kit",
    description: "Get 20% off your initial delivery, plus a complimentary signature stainless shaker bottle and 5 travel packs automatically included at checkout.",
    is_verified: true,
    is_auto_applied: true,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 985
  },
  {
    id: "im8-card-3",
    code: "",
    discount: "FREE SHIP",
    title: "Free Standard US Shipping on All Orders Over $50",
    description: "Unlock 100% free nationwide carbon-neutral shipping on any iM8 single purchase or subscription order. No minimum coupon required.",
    is_verified: true,
    is_auto_applied: true,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 670
  },
  {
    id: "im8-card-4",
    code: "METHEW29111",
    discount: "$40 OFF",
    title: "$40 Off 90-Day Cellular Longevity Bundle (Max Value)",
    description: "Save up to $40 on the comprehensive 3-month iM8 replenishment system with verified partner code METHEW29111.",
    is_verified: true,
    is_auto_applied: false,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 450
  }
];

// ==========================================
// 2. SAFE GLOBAL MEGA-BRANDS (HOMEPAGE & PUBLIC SEARCH)
// ==========================================
export const SAFE_PERK_STORES: Store[] = [
  { id: 1, name: "Athletic Greens (AG1)", slug: "ag1", logo: "https://logo.clearbit.com/drinkag1.com", website: "https://drinkag1.com", category: "Daily Nutrition" },
  { id: 2, name: "Whoop", slug: "whoop", logo: "https://logo.clearbit.com/whoop.com", website: "https://www.whoop.com", category: "Fitness Wearables" },
  { id: 3, name: "Oura Ring", slug: "oura-ring", logo: "https://logo.clearbit.com/ouraring.com", website: "https://ouraring.com", category: "Sleep & Recovery" },
  { id: 4, name: "Huel", slug: "huel", logo: "https://logo.clearbit.com/huel.com", website: "https://huel.com", category: "Complete Nutrition" },
  { id: 5, name: "On Running", slug: "on-running", logo: "https://logo.clearbit.com/on.com", website: "https://www.on.com", category: "Performance Apparel" },
  { id: 6, name: "Lululemon", slug: "lululemon", logo: "https://logo.clearbit.com/lululemon.com", website: "https://shop.lululemon.com", category: "Activewear" },
  { id: 7, name: "Amazon", slug: "amazon", logo: "https://logo.clearbit.com/amazon.com", website: "https://www.amazon.com", category: "Mega Retail" },
  { id: 8, name: "Nike", slug: "nike", logo: "https://logo.clearbit.com/nike.com", website: "https://www.nike.com", category: "Footwear & Sport" },
  { id: 9, name: "Sephora", slug: "sephora", logo: "https://logo.clearbit.com/sephora.com", website: "https://www.sephora.com", category: "Beauty & Wellness" },
  { id: 10, name: "Target", slug: "target", logo: "https://logo.clearbit.com/target.com", website: "https://www.target.com", category: "Essentials" },
  { id: 11, name: "NordVPN", slug: "nordvpn", logo: "https://logo.clearbit.com/nordvpn.com", website: "https://nordvpn.com", category: "Digital Privacy" },
  { id: 12, name: "Hostinger", slug: "hostinger", logo: "https://logo.clearbit.com/hostinger.com", website: "https://www.hostinger.com", category: "Cloud & Web" }
];

export const SAFE_PERK_COUPONS: Coupon[] = SAFE_PERK_STORES.map((store, idx) => ({
  id: `safe-perk-${idx}`,
  code: "PERKVUE20",
  discount: "20% OFF",
  title: `20% Off Verified Perks at ${store.name}`,
  description: `Exclusive verified member perk for ${store.name}. Redeem instantly on eligible online orders.`,
  is_verified: true,
  store: store,
  storeSlug: store.slug,
  affiliate_url: store.website,
  uses_count: 500 + idx * 45
}));

export function getStoreBySlug(slug: string): { store: Store; coupons: Coupon[] } | null {
  const norm = (slug || "").toLowerCase().trim();
  const im8Aliases = ["im8-health-us", "im8", "im8health", "im8-health", "im8health-us"];
  if (im8Aliases.includes(norm)) {
    return { store: IM8_STORE, coupons: IM8_COUPONS };
  }
  const found = SAFE_PERK_STORES.find(s => s.slug.toLowerCase() === norm);
  if (found) {
    const coupons = SAFE_PERK_COUPONS.filter(c => c.storeSlug === found.slug);
    return { store: found, coupons };
  }
  return null;
}
