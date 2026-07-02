"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getStylist, formatMoney, CLIENT_FEE_RATE } from "@/lib/data";
import { makeBookingId, saveBooking } from "@/lib/bookings";
import Avatar from "@/components/Avatar";
import Stars from "@/components/Stars";

const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

function nextDays(count: number): { iso: string; dow: string; day: number; month: string }[] {
  const days = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return days;
}

export default function BookingClient({ stylistId }: { stylistId: string }) {
  const stylist = getStylist(stylistId)!;
  const searchParams = useSearchParams();
  const days = useMemo(() => nextDays(10), []);

  const preselected = stylist.services.find((s) => s.id === searchParams.get("service"));
  const [step, setStep] = useState(preselected ? 2 : 1);
  const [serviceId, setServiceId] = useState(preselected?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const service = stylist.services.find((s) => s.id === serviceId);
  const fee = service ? Math.round(service.price * CLIENT_FEE_RATE * 100) / 100 : 0;
  const total = service ? service.price + fee : 0;

  const prettyDate = useMemo(() => {
    if (!date) return "";
    const d = days.find((x) => x.iso === date);
    return d ? `${d.dow}, ${d.month} ${d.day}` : date;
  }, [date, days]);

  function confirm() {
    if (!service) return;
    const id = makeBookingId();
    saveBooking({
      id,
      stylistId: stylist.id,
      stylistName: stylist.name,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      bookingFee: fee,
      total,
      date: prettyDate,
      time,
      mode,
      notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
    setConfirmedId(id);
    setStep(4);
  }

  if (step === 4) {
    return (
      <div className="container-site flex justify-center py-16">
        <div className="w-full max-w-lg animate-fade-up text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-soft text-4xl">
            🎉
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
            You&apos;re booked!
          </h1>
          <p className="mt-3 text-ink-mute">
            {stylist.name} has your session details and will reach out{" "}
            {stylist.responseTime.replace("about ", "within about ").replace("under", "within")}.
          </p>
          <div className="card mt-8 p-6 text-left">
            <div className="flex items-center gap-3 border-b border-ink/5 pb-4">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />
              <div>
                <p className="font-semibold text-ink">{stylist.name}</p>
                <p className="text-sm text-ink-mute">{service?.name}</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-mute">Confirmation</dt><dd className="font-mono font-semibold text-ink">{confirmedId}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-mute">When</dt><dd className="font-semibold text-ink">{prettyDate} at {time}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-mute">Where</dt><dd className="font-semibold text-ink">{mode}</dd></div>
              <div className="flex justify-between border-t border-ink/5 pt-2"><dt className="text-ink-mute">Total paid</dt><dd className="font-semibold text-ink">{formatMoney(total)}</dd></div>
            </dl>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="btn-primary">View my bookings</Link>
            <Link href="/stylists" className="btn-ghost">Browse more stylists</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-site py-12">
      <Link href={`/stylists/${stylist.id}`} className="text-sm font-semibold text-gold-dark hover:underline">
        ← Back to {stylist.name}&apos;s profile
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-2" aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    step >= n ? "bg-ink text-paper" : "bg-paper-deep text-ink-mute"
                  }`}
                >
                  {step > n ? "✓" : n}
                </span>
                <span className={`hidden text-xs font-semibold sm:block ${step >= n ? "text-ink" : "text-ink-mute"}`}>
                  {n === 1 ? "Service" : n === 2 ? "Schedule" : "Review & pay"}
                </span>
                {n < 3 && <span className={`h-0.5 flex-1 rounded ${step > n ? "bg-ink" : "bg-paper-deep"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <section className="mt-8 animate-fade-up">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Choose your session
              </h1>
              <div className="mt-6 space-y-4">
                {stylist.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setServiceId(svc.id); setMode(""); setStep(2); }}
                    className={`card w-full p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-lift ${
                      serviceId === svc.id ? "ring-2 ring-gold" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-display text-lg font-semibold text-ink">{svc.name}</h2>
                        <p className="mt-1 text-sm text-ink-mute">{svc.description}</p>
                        <p className="mt-2 text-xs font-medium text-ink-mute">⏱ {svc.duration} · {svc.mode}</p>
                      </div>
                      <p className="shrink-0 font-display text-2xl font-semibold text-ink">
                        {formatMoney(svc.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && service && (
            <section className="mt-8 animate-fade-up">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Pick a time
              </h1>
              <p className="mt-2 text-sm text-ink-mute">
                All times shown in {stylist.city} local time. Sessions can be rescheduled free up
                to 24 hours ahead.
              </p>

              <h2 className="mt-7 text-sm font-semibold uppercase tracking-wider text-ink-mute">Date</h2>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => setDate(d.iso)}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border px-2 py-3 transition-colors ${
                      date === d.iso
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/10 bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    <span className="text-[11px] font-semibold uppercase opacity-70">{d.dow}</span>
                    <span className="font-display text-xl font-semibold">{d.day}</span>
                    <span className="text-[11px] opacity-70">{d.month}</span>
                  </button>
                ))}
              </div>

              <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-mute">Time</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      time === t
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/10 bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-mute">Where</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(service.mode === "In person or virtual"
                  ? ["In person", "Virtual"]
                  : [service.mode]
                ).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      mode === m
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/10 bg-white text-ink hover:border-ink/40"
                    }`}
                  >
                    {m === "Virtual" ? "💻 Virtual" : "📍 In person"}
                  </button>
                ))}
              </div>

              <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-mute">
                Tell {stylist.name.split(" ")[0]} about you <span className="normal-case text-ink-mute/70">(optional)</span>
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Your goals, sizes, budget, the event, anything that helps..."
                className="mt-3 w-full rounded-2xl border border-ink/10 bg-white p-4 text-sm outline-none transition-colors placeholder:text-ink-mute/60 focus:border-gold"
              />

              <div className="mt-8 flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!date || !time || !mode}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue to review
                </button>
              </div>
            </section>
          )}

          {step === 3 && service && (
            <section className="mt-8 animate-fade-up">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Review and pay
              </h1>
              <div className="card mt-6 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-mute">Your session</h2>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-mute">Service</dt><dd className="font-semibold text-ink">{service.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-mute">Stylist</dt><dd className="font-semibold text-ink">{stylist.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-mute">When</dt><dd className="font-semibold text-ink">{prettyDate} at {time}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink-mute">Where</dt><dd className="font-semibold text-ink">{mode}</dd></div>
                </dl>
              </div>

              <div className="card mt-4 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-mute">Payment</h2>
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper-warm p-4">
                  <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-ink text-xs font-bold text-paper">VISA</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">Card ending in 4242</p>
                    <p className="text-xs text-ink-mute">Demo checkout. Stripe drops in here for launch.</p>
                  </div>
                  <span className="text-xs font-semibold text-gold-dark">Change</span>
                </div>
                <dl className="mt-4 space-y-2 border-t border-ink/5 pt-4 text-sm">
                  <div className="flex justify-between"><dt className="text-ink-mute">{service.name}</dt><dd className="text-ink">{formatMoney(service.price)}</dd></div>
                  <div className="flex justify-between">
                    <dt className="text-ink-mute">NewFit booking fee (5%)</dt>
                    <dd className="text-ink">{formatMoney(fee)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink/5 pt-2 text-base">
                    <dt className="font-semibold text-ink">Total</dt>
                    <dd className="font-display text-xl font-semibold text-ink">{formatMoney(total)}</dd>
                  </div>
                </dl>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-mute">
                By booking you agree to the NewFit terms. Your payment is held securely and only
                released to the stylist after your session. Covered by the NewFit Guarantee.
              </p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost">Back</button>
                <button onClick={confirm} className="btn-gold flex-1 text-base sm:flex-none">
                  Confirm and pay {formatMoney(total)}
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="order-first lg:order-none lg:pt-14">
          <div className="card sticky top-24 p-6">
            <div className="flex items-center gap-3">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />
              <div>
                <p className="font-semibold text-ink">{stylist.name}</p>
                <div className="flex items-center gap-2 text-xs text-ink-mute">
                  <Stars rating={stylist.rating} /> · {stylist.reviewCount} reviews
                </div>
              </div>
            </div>
            <div className="mt-4 flex h-2 overflow-hidden rounded-full">
              {stylist.looks[0].palette.map((c, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            {service ? (
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink-mute">{service.name}</dt><dd className="text-ink">{formatMoney(service.price)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink-mute">Booking fee</dt><dd className="text-ink">{formatMoney(fee)}</dd></div>
                <div className="flex justify-between border-t border-ink/5 pt-2"><dt className="font-semibold text-ink">Total</dt><dd className="font-semibold text-ink">{formatMoney(total)}</dd></div>
              </dl>
            ) : (
              <p className="mt-4 text-sm text-ink-mute">Select a service to see your total.</p>
            )}
            <p className="mt-4 rounded-xl bg-paper-warm p-3 text-xs leading-relaxed text-ink-mute">
              💛 Free cancellation up to 24h before. Full refund or free rebooking if your first
              session is not a hit.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
