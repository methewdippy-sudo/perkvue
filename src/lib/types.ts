export interface Store {
  id: number | string;
  name: string;
  slug: string;
  logo?: string;
  website: string;
  affiliate_url: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews_count?: number;
}

export interface Coupon {
  id: number | string;
  code: string; // empty string for direct auto-applied deals
  discount: string;
  title: string;
  description: string;
  is_verified: boolean;
  is_auto_applied?: boolean;
  expiry_date?: string;
  affiliate_url?: string;
  store?: Store;
  storeSlug?: string;
  storeName?: string;
  uses_count?: number;
}
