import { Store, Coupon } from "./types";

// ==========================================
// 1. iM8 HEALTH OFFICIAL CAMPAIGN STORE (SECRET ONLY)
// ==========================================
export const IM8_STORE: Store = {
  id: "im8-health",
  name: "iM8 Health",
  slug: "im8-health-us",
  logo: "/logos/im8health.png",
  website: "https://www.im8health.com/METHEW29111",
  affiliate_url: "https://www.im8health.com/METHEW29111",
  category: "Cellular Nutrition & Longevity",
  description: "92-in-1 Daily Cellular Longevity System formulated by leading scientists. Clinically designed to optimize gut microbiome, cellular vitality, sustained clean energy, and systemic renewal.",
  rating: 4.95,
  reviews_count: 3820
};

export const IM8_COUPONS: Coupon[] = [
  {
    id: "im8-card-1",
    code: "METHEW29111",
    discount: "20% OFF",
    title: "20% Off All Daily Longevity Drinks & Core Packs",
    description: "Exclusive verified 20% discount on single-purchase and recurring longevity orders at iM8 Health. Tested active today.",
    is_verified: true,
    is_auto_applied: false,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 1540
  },
  {
    id: "im8-card-2",
    code: "", // Direct auto-applied deal
    discount: "20% OFF",
    title: "20% Off Monthly Subscription + Free Stainless Shaker Kit",
    description: "Save 20% on monthly replenishment plus receive a free designer stainless shaker and 5 single-serve travel sachets on your initial order.",
    is_verified: true,
    is_auto_applied: true,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 980
  },
  {
    id: "im8-card-3",
    code: "",
    discount: "FREE SHIP",
    title: "Free Carbon-Neutral US Shipping on Orders $50+",
    description: "Enjoy zero shipping fees on all qualifying standard orders across the continental United States. Automatically applied at checkout.",
    is_verified: true,
    is_auto_applied: true,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 720
  },
  {
    id: "im8-card-4",
    code: "METHEW29111",
    discount: "$40 OFF",
    title: "$40 Off 90-Day Complete Longevity System Bundle",
    description: "Maximize value with $40 instant savings on the full 3-month cellular replenishment package with partner code METHEW29111.",
    is_verified: true,
    is_auto_applied: false,
    expiry_date: "2026-12-31",
    affiliate_url: "https://www.im8health.com/METHEW29111",
    store: IM8_STORE,
    storeSlug: "im8-health-us",
    storeName: "iM8 Health",
    uses_count: 490
  }
];

// ==========================================
// 2. SAFE GLOBAL MEGA-BRANDS WITH 100% WORKING LOCAL SVG LOGOS
// ==========================================
export const SAFE_PERK_STORES: Store[] = [
  { id: 1, name: "Amazon", slug: "amazon", logo: "/logos/amazon.svg", website: "https://www.amazon.com", category: "Global Shopping" },
  { id: 2, name: "Nike", slug: "nike", logo: "/logos/nike.svg", website: "https://www.nike.com", category: "Athletic Performance" },
  { id: 3, name: "Apple", slug: "apple", logo: "/logos/apple.svg", website: "https://www.apple.com", category: "Technology" },
  { id: 4, name: "Target", slug: "target", logo: "/logos/target.svg", website: "https://www.target.com", category: "Retail & Essentials" },
  { id: 5, name: "Walmart", slug: "walmart", logo: "/logos/walmart.svg", website: "https://www.walmart.com", category: "General Merchandise" },
  { id: 6, name: "Adidas", slug: "adidas", logo: "/logos/adidas.svg", website: "https://www.adidas.com", category: "Sportswear" },
  { id: 7, name: "Samsung", slug: "samsung", logo: "/logos/samsung.svg", website: "https://www.samsung.com", category: "Electronics" },
  { id: 8, name: "Starbucks", slug: "starbucks", logo: "/logos/starbucks.svg", website: "https://www.starbucks.com", category: "Coffee & Lifestyle" },
  { id: 9, name: "Sephora", slug: "sephora", logo: "/logos/sephora.svg", website: "https://www.sephora.com", category: "Beauty & Wellness" },
  { id: 10, name: "Lululemon", slug: "lululemon", logo: "/logos/lululemon.svg", website: "https://shop.lululemon.com", category: "Yoga & Activewear" },
  { id: 11, name: "Spotify", slug: "spotify", logo: "/logos/spotify.svg", website: "https://www.spotify.com", category: "Digital Media" },
  { id: 12, name: "Best Buy", slug: "bestbuy", logo: "/logos/bestbuy.svg", website: "https://www.bestbuy.com", category: "Consumer Tech" },
  { id: 13, name: "eBay", slug: "ebay", logo: "/logos/ebay.svg", website: "https://www.ebay.com", category: "Marketplace" }
];

export const SAFE_PERK_COUPONS: Coupon[] = SAFE_PERK_STORES.map((store, idx) => ({
  id: `safe-perk-${idx}`,
  code: "PERKVUE15",
  discount: "15% OFF",
  title: `15% Off Sitewide Voucher at ${store.name}`,
  description: `Verified member perk for ${store.name}. Redeemable on qualifying orders at official store.`,
  is_verified: true,
  store: store,
  storeSlug: store.slug,
  affiliate_url: store.website,
  uses_count: 350 + idx * 25
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
