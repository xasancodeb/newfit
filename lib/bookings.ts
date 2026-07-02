"use client";

import { Booking } from "./types";

const KEY = "newfit_bookings_v1";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const all = getBookings();
  all.unshift(booking);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function cancelBooking(id: string): Booking[] {
  const all = getBookings().map((b) =>
    b.id === id ? { ...b, status: "cancelled" as const } : b
  );
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

export function makeBookingId(): string {
  return `NF-${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase()}`;
}
