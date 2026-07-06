import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STYLISTS, getStylist, formatMoney } from "@/lib/data";
import Avatar from "@/components/Avatar";
import Stars from "@/components/Stars";
import LookCard from "@/components/LookCard";
import Motif from "@/components/Motif";
import Grain from "@/components/Grain";

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
      <div className="relative h-48 overflow-hidden sm:h-60" style={{ backgroundColor: stylist.gradient[1] }}>
        <Grain />
        <span className="absolute inset-0 text-bone/25" aria-hidden="true">
          <Motif
            name={stylist.looks[0].motif}
            className="absolute right-[8%] top-1/2 h-[85%] -translate-y-1/2"
            strokeWidth={0.8}
          />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex h-2">
          {stylist.looks[0].palette.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="container-site relative flex h-full items-start pt-6">
          <Link
            href="/stylists"
            className="border border-bone/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            The directory
          </Link>
        </div>
      </div>

      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex flex-wrap items-end gap-6">
              <Avatar name={stylist.name} gradient={stylist.gradient} size="xl" className="-mt-10 border border-bone" />
              <div className="pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
                    {stylist.name}
                  </h1>
                  {stylist.topRated && <span className="tag !border-ink !text-ink">Top rated</span>}
                  {stylist.risingStar && <span className="tag !border-rust !text-rust">Rising</span>}
                </div>
                <p className="mt-2 text-mute">
                  {stylist.tagline} · {stylist.handle}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-line py-4">
              <Stars rating={stylist.rating} />
              <span className="meta">{stylist.reviewCount} reviews</span>
              <span className="meta">{stylist.neighborhood}, {stylist.city}</span>
              <span className="meta">Replies {stylist.responseTime}</span>
              <span className="meta">{stylist.bookings.toLocaleString()} bookings</span>
              <span className="meta">{stylist.yearsExperience} yrs</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {stylist.specialties.map((s) => (
                <Link key={s} href={`/stylists?category=${encodeURIComponent(s)}`} className="tag transition-colors hover:border-ink hover:text-ink">
                  {s}
                </Link>
              ))}
              {stylist.virtual && <span className="tag">Virtual sessions</span>}
              <span className="tag">{stylist.languages.join(" / ")}</span>
            </div>

            <section className="mt-12">
              <p className="label">About</p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink">{stylist.bio}</p>
              <blockquote className="mt-8 border-l-2 border-rust pl-6">
                <p className="max-w-xl font-display text-2xl font-light italic leading-relaxed text-ink">
                  “{stylist.approach}”
                </p>
              </blockquote>
              <p className="meta mt-8">
                Favorite racks — {stylist.brands.join(" · ")}
              </p>
            </section>

            <section className="mt-14" id="looks">
              <div className="flex items-baseline justify-between border-t border-line pt-8">
                <div>
                  <p className="label">Portfolio</p>
                  <h2 className="mt-3 font-display text-3xl font-light text-ink">
                    Signature looks and color stories
                  </h2>
                </div>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {stylist.looks.map((look, i) => (
                  <LookCard key={look.id} look={look} index={i} />
                ))}
              </div>
            </section>

            <section className="mt-14" id="services">
              <div className="border-t border-line pt-8">
                <p className="label">Services</p>
                <h2 className="mt-3 font-display text-3xl font-light text-ink">Book a session</h2>
              </div>
              <div className="mt-8 border-t border-line">
                {stylist.services.map((svc) => (
                  <div
                    key={svc.id}
                    className="flex flex-col gap-4 border-b border-line py-6 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-display text-xl font-normal text-ink">{svc.name}</h3>
                        <span className="meta">{svc.category}</span>
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">{svc.description}</p>
                      <p className="meta mt-3">
                        {svc.duration} · {svc.mode}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
                      <p className="font-display text-2xl font-light text-ink">{formatMoney(svc.price)}</p>
                      <Link href={`/book/${stylist.id}?service=${svc.id}`} className="btn-outline !px-6 !py-3">
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14 pb-4" id="reviews">
              <div className="border-t border-line pt-8">
                <p className="label">Client notes</p>
                <h2 className="mt-3 font-display text-3xl font-light text-ink">
                  {stylist.reviewCount} verified reviews
                </h2>
              </div>
              <div className="mt-8 space-y-8">
                {stylist.reviews.map((r) => (
                  <figure key={r.id} className="border-b border-line pb-8">
                    <blockquote className="max-w-2xl font-display text-xl font-light leading-relaxed text-ink">
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-sm font-semibold text-ink">{r.author}</span>
                      <Stars rating={r.rating} />
                      <span className="meta">{r.service} · {r.date}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:pt-10">
            <div className="sticky top-24 border border-ink bg-white p-6">
              <div className="flex items-baseline justify-between">
                <p className="meta">Sessions from</p>
                <p className="font-display text-3xl font-light text-ink">
                  {formatMoney(stylist.startingPrice)}
                </p>
              </div>
              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-mute">Next availability</dt>
                  <dd className="font-semibold text-ink">{stylist.nextAvailable}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mute">Response time</dt>
                  <dd className="font-semibold text-ink">{stylist.responseTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mute">Session modes</dt>
                  <dd className="font-semibold text-ink">
                    {stylist.virtual ? "In person + virtual" : "In person"}
                  </dd>
                </div>
              </dl>
              <Link href={`/book/${stylist.id}`} className="btn-dark mt-6 w-full">
                {stylist.instantBook ? "Instant book" : "Request to book"}
              </Link>
              <p className="meta mt-4 text-center normal-case tracking-normal">
                Free cancellation up to 24 hours before your session
              </p>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-mute">
                <span className="font-semibold uppercase tracking-[0.14em] text-ink">Guarantee.</span>{" "}
                Not thrilled after your first session? Free rebooking with another stylist or a
                full refund.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
