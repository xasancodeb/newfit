import Link from "next/link";
import Motif from "@/components/Motif";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-32 text-center">
      <Motif name="mirror" className="h-20 w-20 text-mute" />
      <h1 className="mt-8 font-display text-5xl font-light tracking-tight text-ink">
        This look does not exist
      </h1>
      <p className="mt-4 max-w-md text-sm text-mute">
        The page you are after has been donated, tailored or never made it past the fitting room.
      </p>
      <div className="mt-10 flex gap-4">
        <Link href="/" className="btn-dark">Back home</Link>
        <Link href="/stylists" className="btn-outline">The directory</Link>
      </div>
    </div>
  );
}
