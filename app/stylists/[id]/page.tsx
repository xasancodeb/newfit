import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STYLISTS, getStylist, formatMoney } from "@/lib/data";
import Avatar from "@/components/Avatar";
import Stars from "@/components/Stars";
import LookCard from "@/components/LookCard";

export function generateStaticParams() {
  return STYLISTS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const stylist = getStylist(id);
  if (!stylist) return { title: "Stylist not found" };
  return {
    title: `${stylist.name} · Personal stylist in ${stylist.city}`,
    description: `${stylist.tagline}. Book ${stylist.name} on NewFit from ${formatMoney(stylist.startingPrice)}.`,
  };
}

export default async function StylistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stylist = getStylist(id);
  if (!stylist) notFound();

  return (
    <>
      <div className="relative h-44 sm:h-56">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(115deg, ${stylist.gradient[0]}, ${stylist.gradient[1]})` }}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-3">
          {stylist.looks[0].palette.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="container-site relative flex h-full items-start pt-6">
          <Link
            href="/stylists"
            className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-card backdrop-blur transition-colors hover:bg-white"
          >
            ← All stylists
          </Link>
        </div>
      </div>

      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="-mt-12 flex flex-wrap items-end gap-5">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="xl" className="ring-4 ring-paper" />
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {stylist.name}
                  </h1>
                  {stylist.topRated && (
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
                      ★ Top Rated
                    </span>
                  )}
                  {stylist.risingStar && (
                    <span className="rounded-full bg-clay/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-clay">
                      ↑ Rising Star
                    </span>
                  )}
                </div>
                <p className="mt-1 text-ink-mute">
                  {stylist.tagline} · <span className="font-medium">{stylist.handle}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Stars rating={stylist.rating} />
              <span className="text-ink-mute">{stylist.reviewCount} reviews</span>
              <span className="text-ink-mute">📍 {stylist.neighborhood}, {stylist.city}</span>
              <span className="text-ink-mute">💬 Replies {stylist.responseTime}</span>
              <span className="text-ink-mute">🗓 {stylist.bookings.toLocaleString()} bookings</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {stylist.specialties.map((s) => (
                <Link key={s} href={`/stylists?category=${encodeURIComponent(s)}`} className="chip hover:border-gold">
                  {s}
                </Link>
              ))}
              {stylist.virtual && <span className="chip">💻 Virtual sessions</span>}
              <span className="chip">🌐 {stylist.languages.join(", ")}</span>
              <span className="chip">🎓 {stylist.yearsExperience} yrs experience</span>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-ink">About {stylist.name.split(" ")[0]}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{stylist.bio}</p>
              <div className="card mt-5 border-l-4 border-l-gold p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">My approach</p>
                <p className="mt-2 font-display text-lg italic leading-relaxed text-ink">
                  “{stylist.approach}”
                </p>
              </div>
              <p className="mt-4 text-sm text-ink-mute">
                <span className="font-semibold text-ink">Favorite racks:</span> {stylist.brands.join(" · ")}
              </p>
            </section>

            <section className="mt-12" id="looks">
              <div className="flex items-end justify-between">
                <div>
                  <p className="eyebrow">The portfolio</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                    Signature looks and color stories
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {stylist.looks.map((look) => (
                  <LookCard key={look.id} look={look} />
                ))}
              </div>
            </section>

            <section className="mt-12" id="services">
              <p className="eyebrow">Services and pricing</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Book a session</h2>
              <div className="mt-6 space-y-4">
                {stylist.services.map((svc) => (
                  <div key={svc.id} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">{svc.name}</h3>
                        <span className="chip !py-0.5">{svc.category}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{svc.description}</p>
                      <p className="mt-2 text-xs font-medium text-ink-mute">
                        ⏱ {svc.duration} · {svc.mode}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <p className="font-display text-2xl font-semibold text-ink">{formatMoney(svc.price)}</p>
                      <Link href={`/book/${stylist.id}?service=${svc.id}`} className="btn-primary !px-5 !py-2.5">
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 pb-4" id="reviews">
              <p className="eyebrow">Client love</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                {stylist.reviewCount} verified reviews
              </h2>
              <div className="mt-6 space-y-4">
                {stylist.reviews.map((r) => (
                  <figure key={r.id} className="card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.author} gradient={stylist.gradient} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-ink">{r.author}</p>
                          <p className="text-xs text-ink-mute">{r.service} · {r.date}</p>
                        </div>
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                    <blockquote className="mt-4 leading-relaxed text-ink-soft">{r.text}</blockquote>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:pt-8">
            <div className="card sticky top-24 p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm text-ink-mute">Sessions from</p>
                <p className="font-display text-3xl font-semibold text-ink">
                  {formatMoney(stylist.startingPrice)}
                </p>
              </div>
              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-mute">Next availability</span>
                  <span className="font-semibold text-ink">{stylist.nextAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-mute">Response time</span>
                  <span className="font-semibold text-ink">{stylist.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-mute">Session modes</span>
                  <span className="font-semibold text-ink">
                    {stylist.virtual ? "In person + virtual" : "In person"}
                  </span>
                </div>
              </div>
              <Link href={`/book/${stylist.id}`} className="btn-gold mt-6 w-full text-base">
                {stylist.instantBook ? "⚡ Instant book" : "Request to book"}
              </Link>
              <p className="mt-3 text-center text-xs text-ink-mute">
                Free cancellation up to 24 hours before your session
              </p>
              <div className="mt-5 rounded-2xl bg-paper-warm p-4 text-xs leading-relaxed text-ink-mute">
                <span className="font-semibold text-ink">💛 NewFit Guarantee.</span> Not thrilled
                after your first session? Free rebooking with another stylist or a full refund.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
