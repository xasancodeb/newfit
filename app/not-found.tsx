import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-28 text-center">
      <span className="text-6xl">🪞</span>
      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-ink">
        This look does not exist
      </h1>
      <p className="mt-3 max-w-md text-ink-mute">
        The page you are after has been donated, tailored or never made it past the fitting room.
        Let&apos;s get you back to something beautiful.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/stylists" className="btn-ghost">Browse stylists</Link>
      </div>
    </div>
  );
}
