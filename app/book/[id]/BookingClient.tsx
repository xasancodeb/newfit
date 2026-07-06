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
      <div className="container-site flex justify-center py-20">
        <div className="w-full max-w-lg animate-fade-up">
          <p className="label text-center">Confirmation {confirmedId}</p>
          <h1 className="mt-5 text-center font-display text-5xl font-light tracking-tight text-ink">
            Consider it <em>booked.</em>
          </h1>
          <p className="mt-4 text-center text-mute">
            {stylist.name} has your session details and will reach out{" "}
            {stylist.responseTime.replace("about ", "within about ").replace("under", "within")}.
          </p>
          <div className="mt-10 border border-ink bg-white p-6">
            <div className="flex items-center gap-4 border-b border-line pb-5">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />
              <div>
                <p className="font-display text-lg text-ink">{stylist.name}</p>
                <p className="meta mt-0.5">{service?.name}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-mute">When</dt><dd className="font-semibold text-ink">{prettyDate} at {time}</dd></div>
              <div className="flex justify-between"><dt className="text-mute">Where</dt><dd className="font-semibold text-ink">{mode}</dd></div>
              <div className="flex justify-between border-t border-line pt-3"><dt className="text-mute">Total paid</dt><dd className="font-display text-lg text-ink">{formatMoney(total)}</dd></div>
            </dl>
          </div>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard" className="btn-dark">My bookings</Link>
            <Link href="/stylists" className="btn-outline">Keep browsing</Link>
          </div>
        </div>
      </div>
    );
  }

  const cell = (active: boolean) =>
    `border text-sm transition-colors ${
      active ? "border-ink bg-ink text-bone" : "border-line bg-white text-ink hover:border-ink"
    }`;

  return (
    <div className="container-site py-14">
      <Link href={`/stylists/${stylist.id}`} className="link-line">
        Back to {stylist.name}
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex border-y border-line" aria-label={`Step ${step} of 3`}>
            {["Service", "Schedule", "Review"].map((name, i) => {
              const n = i + 1;
              return (
                <div
                  key={name}
                  className={`flex flex-1 items-center gap-3 border-r border-line px-4 py-4 last:border-r-0 ${
                    step === n ? "bg-white" : ""
                  }`}
                >
                  <span className={`font-display text-sm ${step >= n ? "text-rust" : "text-mute"}`}>
                    {String(n).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:block ${
                      step >= n ? "text-ink" : "text-mute"
                    }`}
                  >
                    {step > n ? `${name} ✓` : name}
                  </span>
                </div>
              );
            })}
          </div>

          {step === 1 && (
            <section className="mt-10 animate-fade-up">
              <h1 className="font-display text-4xl font-light tracking-tight text-ink">
                Choose your session
              </h1>
              <div className="mt-8 border-t border-line">
                {stylist.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setServiceId(svc.id); setMode(""); setStep(2); }}
                    className="group flex w-full items-center gap-8 border-b border-line py-6 text-left transition-colors hover:bg-white"
                  >
                    <div className="flex-1 pl-2">
                      <h2 className="font-display text-xl font-normal text-ink group-hover:text-rust">
                        {svc.name}
                      </h2>
                      <p className="mt-1.5 max-w-xl text-sm text-mute">{svc.description}</p>
                      <p className="meta mt-2.5">{svc.duration} · {svc.mode}</p>
                    </div>
                    <p className="shrink-0 pr-2 font-display text-2xl font-light text-ink">
                      {formatMoney(svc.price)}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && service && (
            <section className="mt-10 animate-fade-up">
              <h1 className="font-display text-4xl font-light tracking-tight text-ink">Pick a time</h1>
              <p className="mt-3 text-sm text-mute">
                All times in {stylist.city} local time. Reschedule free up to 24 hours ahead.
              </p>

              <h2 className="label mt-9">Date</h2>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => setDate(d.iso)}
                    className={`flex w-16 shrink-0 flex-col items-center px-2 py-3 ${cell(date === d.iso)}`}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60">{d.dow}</span>
                    <span className="font-display text-xl">{d.day}</span>
                    <span className="text-[10px] uppercase opacity-60">{d.month}</span>
                  </button>
                ))}
              </div>

              <h2 className="label mt-8">Time</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIMES.map((t) => (
                  <button key={t} onClick={() => setTime(t)} className={`px-5 py-2.5 font-medium ${cell(time === t)}`}>
                    {t}
                  </button>
                ))}
              </div>

              <h2 className="label mt-8">Where</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(service.mode === "In person or virtual" ? ["In person", "Virtual"] : [service.mode]).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={`px-5 py-2.5 font-medium ${cell(mode === m)}`}>
                    {m}
                  </button>
                ))}
              </div>

              <h2 className="label mt-8">
                Tell {stylist.name.split(" ")[0]} about you <span className="text-mute/60">(optional)</span>
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Your goals, sizes, budget, the event, anything that helps..."
                className="field mt-3"
              />

              <div className="mt-10 flex gap-4">
                <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!date || !time || !mode}
                  className="btn-dark disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Continue to review
                </button>
              </div>
            </section>
          )}

          {step === 3 && service && (
            <section className="mt-10 animate-fade-up">
              <h1 className="font-display text-4xl font-light tracking-tight text-ink">Review and pay</h1>

              <div className="mt-8 border border-line bg-white p-6">
                <h2 className="label">Your session</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-mute">Service</dt><dd className="font-semibold text-ink">{service.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-mute">Stylist</dt><dd className="font-semibold text-ink">{stylist.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-mute">When</dt><dd className="font-semibold text-ink">{prettyDate} at {time}</dd></div>
                  <div className="flex justify-between"><dt className="text-mute">Where</dt><dd className="font-semibold text-ink">{mode}</dd></div>
                </dl>
              </div>

              <div className="mt-4 border border-line bg-white p-6">
                <h2 className="label">Payment</h2>
                <div className="mt-4 flex items-center justify-between border border-line px-4 py-3.5">
                  <p className="text-sm font-semibold text-ink">Card ending 4242</p>
                  <span className="meta">Demo · Stripe drops in at launch</span>
                </div>
                <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                  <div className="flex justify-between"><dt className="text-mute">{service.name}</dt><dd className="text-ink">{formatMoney(service.price)}</dd></div>
                  <div className="flex justify-between"><dt className="text-mute">NewFit booking fee (5%)</dt><dd className="text-ink">{formatMoney(fee)}</dd></div>
                  <div className="flex justify-between border-t border-line pt-3">
                    <dt className="font-semibold uppercase tracking-[0.14em] text-ink">Total</dt>
                    <dd className="font-display text-2xl font-light text-ink">{formatMoney(total)}</dd>
                  </div>
                </dl>
              </div>

              <p className="mt-5 max-w-lg text-xs leading-relaxed text-mute">
                By booking you agree to the NewFit terms. Your payment is held securely and only
                released to the stylist after your session. Covered by the NewFit Guarantee.
              </p>

              <div className="mt-8 flex gap-4">
                <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                <button onClick={confirm} className="btn-dark">
                  Confirm and pay {formatMoney(total)}
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="order-first lg:order-none lg:pt-16">
          <div className="sticky top-24 border border-line bg-white p-6">
            <div className="flex items-center gap-4">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="md" />
              <div>
                <p className="font-display text-lg text-ink">{stylist.name}</p>
                <div className="mt-0.5 flex items-center gap-3">
                  <Stars rating={stylist.rating} />
                  <span className="meta">{stylist.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex h-1.5">
              {stylist.looks[0].palette.map((c, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            {service ? (
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-mute">{service.name}</dt><dd className="text-ink">{formatMoney(service.price)}</dd></div>
                <div className="flex justify-between"><dt className="text-mute">Booking fee</dt><dd className="text-ink">{formatMoney(fee)}</dd></div>
                <div className="flex justify-between border-t border-line pt-3"><dt className="font-semibold text-ink">Total</dt><dd className="font-display text-lg text-ink">{formatMoney(total)}</dd></div>
              </dl>
            ) : (
              <p className="mt-5 text-sm text-mute">Select a service to see your total.</p>
            )}
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-mute">
              Free cancellation up to 24h before. Full refund or free rebooking if your first
              session is not a hit.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
