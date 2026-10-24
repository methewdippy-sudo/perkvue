import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DealsClient from "./DealsClient";
import { getStoreBySlug, IM8_STORE } from "../../../lib/storesData";

// Pure static generation - 0% Vercel ISR Serverless invocations
export const dynamic = "force-static";

export async function generateStaticParams() {
  return [
    { slug: "im8-health-us" },
    { slug: "im8" },
    { slug: "im8health" },
    { slug: "amazon" },
    { slug: "nike" },
    { slug: "apple" },
    { slug: "target" },
    { slug: "walmart" },
    { slug: "adidas" },
    { slug: "samsung" },
    { slug: "starbucks" },
    { slug: "sephora" },
    { slug: "lululemon" },
    { slug: "spotify" },
    { slug: "bestbuy" },
    { slug: "ebay" }
  ];
}

interface DealsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DealsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getStoreBySlug(slug);
  const store = data ? data.store : IM8_STORE;

  return {
    title: `${store.name} Promo Codes & Verified Vouchers | PerkVue`,
    description: `Save 20% today at ${store.name} with verified promotional vouchers, subscriber discounts, and free shipping perks.`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function DealsPage({ params }: DealsPageProps) {
  const { slug } = await params;
  const data = getStoreBySlug(slug);

  if (!data) {
    notFound();
  }

  return <DealsClient store={data.store} coupons={data.coupons} />;
}
