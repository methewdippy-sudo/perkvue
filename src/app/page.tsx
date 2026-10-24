import React from "react";
import HomeClient from "./HomeClient";
import { SAFE_PERK_STORES, SAFE_PERK_COUPONS } from "../lib/storesData";

export const revalidate = 86400; // 24h ISR

export default function HomePage() {
  return <HomeClient stores={SAFE_PERK_STORES} coupons={SAFE_PERK_COUPONS} />;
}
