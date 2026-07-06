"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking } from "@/lib/types";
import { cancelBooking, getBookings } from "@/lib/bookings";
import { getStylist, formatMoney } from "@/lib/data";
import Avatar from "@/components/Avatar";

const STATUS_STYLES: Record<Booking["status"], string> = {
  confirmed: "border-ink text-ink",
  completed: "border-line text-mute",
  cancelled: "border-rust text-rust",
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBookings(getBookings());
    setLoaded(true);
  }, []);

  const active = bookings.filter((b) => b.status === "confirmed");
  const spentTotal = bookings.filter((b) => b.status !== "cancelled").reduce((a, b) => a + b.total, 0);

  return (
    <div className="container-site py-14">
      <p className="label">My NewFit</p>
      <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-ink sm:text-6xl">
        Your style ledger
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
        {[
          ["Upcoming sessions", loaded ? String(active.length) : "–"],
          ["Total sessions", loaded ? String(bookings.length) : "–"],
          ["Invested in you", loaded ? formatMoney(spentTotal) : "–"],
        ].map(([label, value]) => (
          <div key={label} className="bg-white px-6 py-7">
            <p className="meta">{label}</p>
            <p className="mt-3 font-display text-4xl font-light text-ink">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 border-b border-line pb-4 font-display text-3xl font-light text-ink">
        Bookings
      </h2>

      {loaded && bookings.length === 0 && (
        <div className="border-b border-line px-4 py-20 text-center">
          <h3 className="font-display text-3xl font-light text-ink">No sessions yet</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm text-mute">
            Your next favorite outfit is one booking away. Browsing to booking takes under a
            minute.
          </p>
          <Link href="/stylists" className="btn-dark mt-8">Find a stylist</Link>
        </div>
      )}

      <div>
        {bookings.map((b) => {
          const stylist = getStylist(b.stylistId);
          return (
            <div key={b.id} className="flex flex-col gap-4 border-b border-line py-6 sm:flex-row sm:items-center sm:gap-6">
              {stylist && <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-normal text-ink">{b.serviceName}</h3>
                  <span className={`border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${STATUS_STYLES[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-mute">
                  with{" "}
                  <Link href={`/stylists/${b.stylistId}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rust">
                    {b.stylistName}
                  </Link>{" "}
                  · {b.date} at {b.time} · {b.mode}
                </p>
                <p className="meta mt-1.5">{b.id}</p>
              </div>
              <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
                <p className="font-display text-xl font-light text-ink">{formatMoney(b.total)}</p>
                {b.status === "confirmed" && (
                  <button
                    onClick={() => setBookings(cancelBooking(b.id))}
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rust underline-offset-4 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
