import React from "react";
import HomeClient from "./HomeClient";
import { SAFE_PERK_STORES, SAFE_PERK_COUPONS } from "../lib/storesData";

// Pure static generation - 0% Vercel ISR Serverless invocations
export const dynamic = "force-static";

export default function HomePage() {
  return <HomeClient stores={SAFE_PERK_STORES} coupons={SAFE_PERK_COUPONS} />;
}
