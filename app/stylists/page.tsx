import { Suspense } from "react";
import type { Metadata } from "next";
import BrowseClient from "./BrowseClient";

export const metadata: Metadata = {
  title: "Find a stylist",
  description:
    "Browse vetted personal stylists by city, specialty and budget. Read reviews, view portfolios and book instantly.",
};

export default function StylistsPage() {
  return (
    <Suspense>
      <BrowseClient />
    </Suspense>
  );
}
