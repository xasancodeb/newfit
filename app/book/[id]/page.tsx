import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STYLISTS, getStylist } from "@/lib/data";
import BookingClient from "./BookingClient";

export function generateStaticParams() {
  return STYLISTS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const stylist = getStylist(id);
  return { title: stylist ? `Book ${stylist.name}` : "Book a session" };
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stylist = getStylist(id);
  if (!stylist) notFound();

  return (
    <Suspense>
      <BookingClient stylistId={id} />
    </Suspense>
  );
}
