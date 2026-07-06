"use client";

import { useState } from "react";
import { STYLIST_KEEP_RATE, formatMoney } from "@/lib/data";

export default function EarningsCalculator() {
  const [price, setPrice] = useState(180);
  const [sessions, setSessions] = useState(10);

  const monthly = Math.round(price * sessions * STYLIST_KEEP_RATE);
  const yearly = monthly * 12;

  return (
    <div className="border border-ink bg-white p-8">
      <p className="label">Earnings calculator</p>
      <h3 className="mt-3 font-display text-3xl font-light text-ink">What could you make?</h3>

      <div className="mt-9">
        <div className="flex items-baseline justify-between">
          <label htmlFor="price" className="meta">Average session price</label>
          <span className="font-display text-2xl font-light text-ink">{formatMoney(price)}</span>
        </div>
        <input
          id="price"
          type="range"
          min={70}
          max={500}
          step={10}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-4 w-full accent-ink"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-mute">
          <span>$70</span>
          <span>$500</span>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-baseline justify-between">
          <label htmlFor="sessions" className="meta">Sessions per month</label>
          <span className="font-display text-2xl font-light text-ink">{sessions}</span>
        </div>
        <input
          id="sessions"
          type="range"
          min={2}
          max={40}
          value={sessions}
          onChange={(e) => setSessions(Number(e.target.value))}
          className="mt-4 w-full accent-ink"
        />
        <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-mute">
          <span>2</span>
          <span>40</span>
        </div>
      </div>

      <div className="mt-9 bg-ink p-7 text-bone">
        <p className="label !text-bone/50">Your estimated take home</p>
        <p className="mt-3 font-display text-6xl font-light">{formatMoney(monthly)}</p>
        <p className="meta mt-2 !text-bone/60">per month · {formatMoney(yearly)} per year</p>
        <p className="mt-5 border-t border-bone/15 pt-4 text-xs leading-relaxed text-bone/50">
          Based on you keeping {Math.round(STYLIST_KEEP_RATE * 100)}% of every booking. NewFit&apos;s
          15% covers client acquisition, payments, insurance and support.
        </p>
      </div>

      <a href="#apply" className="btn-dark mt-6 w-full">Start my application</a>
    </div>
  );
}
