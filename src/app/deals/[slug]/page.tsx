import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DealsClient from "./DealsClient";
import { getStoreBySlug, IM8_STORE } from "../../../lib/storesData";

export const revalidate = 86400; // Edge cached for 24h

export async function generateStaticParams() {
  return [
    { slug: "im8-health-us" },
    { slug: "im8" },
    { slug: "im8health" },
    { slug: "ag1" },
    { slug: "whoop" },
    { slug: "oura-ring" },
    { slug: "huel" },
    { slug: "on-running" }
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
    title: `${store.name} Promo Codes & Verified Discount Perks | PerkVue`,
    description: `Save 20% today at ${store.name} with verified promo codes, active discount offers, and free shipping deals.`,
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
