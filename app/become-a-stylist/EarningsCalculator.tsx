"use client";

import { useState } from "react";
import { STYLIST_KEEP_RATE, formatMoney } from "@/lib/data";

export default function EarningsCalculator() {
  const [price, setPrice] = useState(180);
  const [sessions, setSessions] = useState(10);

  const monthly = Math.round(price * sessions * STYLIST_KEEP_RATE);
  const yearly = monthly * 12;

  return (
    <div className="card p-8">
      <p className="eyebrow">Earnings calculator</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
        What could you make?
      </h3>

      <div className="mt-7">
        <div className="flex items-baseline justify-between">
          <label htmlFor="price" className="text-sm font-semibold text-ink">
            Average session price
          </label>
          <span className="font-display text-xl font-semibold text-ink">{formatMoney(price)}</span>
        </div>
        <input
          id="price"
          type="range"
          min={70}
          max={500}
          step={10}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-ink-mute">
          <span>$70</span>
          <span>$500</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <label htmlFor="sessions" className="text-sm font-semibold text-ink">
            Sessions per month
          </label>
          <span className="font-display text-xl font-semibold text-ink">{sessions}</span>
        </div>
        <input
          id="sessions"
          type="range"
          min={2}
          max={40}
          value={sessions}
          onChange={(e) => setSessions(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-ink-mute">
          <span>2</span>
          <span>40</span>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-ink to-ink-soft p-6 text-paper">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
          Your estimated take home
        </p>
        <p className="mt-2 font-display text-5xl font-semibold">{formatMoney(monthly)}</p>
        <p className="text-sm text-paper/60">per month · {formatMoney(yearly)} per year</p>
        <p className="mt-4 border-t border-paper/10 pt-3 text-xs leading-relaxed text-paper/50">
          Based on you keeping {Math.round(STYLIST_KEEP_RATE * 100)}% of every booking. NewFit&apos;s
          15% covers client acquisition, payments, insurance and support.
        </p>
      </div>

      <a href="#apply" className="btn-gold mt-6 w-full">Start my application</a>
    </div>
  );
}
