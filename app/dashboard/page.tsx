"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Booking } from "@/lib/types";
import { cancelBooking, getBookings } from "@/lib/bookings";
import { getStylist, formatMoney } from "@/lib/data";
import Avatar from "@/components/Avatar";

const STATUS_STYLES: Record<Booking["status"], string> = {
  confirmed: "bg-sage-soft text-sage",
  completed: "bg-paper-deep text-ink-mute",
  cancelled: "bg-clay-soft text-clay",
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
    <div className="container-site py-12">
      <p className="eyebrow">My NewFit</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Your style journey
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Upcoming sessions</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">{loaded ? active.length : "–"}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Total sessions</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">{loaded ? bookings.length : "–"}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">Invested in you</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">
            {loaded ? formatMoney(spentTotal) : "–"}
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">Bookings</h2>

      {loaded && bookings.length === 0 && (
        <div className="card mt-6 flex flex-col items-center gap-3 p-16 text-center">
          <span className="text-4xl">🗓️</span>
          <h3 className="font-display text-2xl font-semibold text-ink">No sessions yet</h3>
          <p className="max-w-sm text-sm text-ink-mute">
            Your next favorite outfit is one booking away. Browse stylists and lock in your first
            session, it takes under a minute.
          </p>
          <Link href="/stylists" className="btn-gold mt-2">Find a stylist</Link>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {bookings.map((b) => {
          const stylist = getStylist(b.stylistId);
          return (
            <div key={b.id} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              {stylist && <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">{b.serviceName}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-mute">
                  with{" "}
                  <Link href={`/stylists/${b.stylistId}`} className="font-semibold text-gold-dark hover:underline">
                    {b.stylistName}
                  </Link>{" "}
                  · {b.date} at {b.time} · {b.mode}
                </p>
                <p className="mt-1 text-xs font-mono text-ink-mute">{b.id}</p>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <p className="font-display text-xl font-semibold text-ink">{formatMoney(b.total)}</p>
                {b.status === "confirmed" && (
                  <button
                    onClick={() => setBookings(cancelBooking(b.id))}
                    className="text-xs font-semibold text-clay hover:underline"
                  >
                    Cancel booking
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
