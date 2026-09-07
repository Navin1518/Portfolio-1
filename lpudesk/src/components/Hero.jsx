import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

/** First screen of the site: branding + main actions + a live occupancy preview. */
export default function Hero() {
  const { occupancy, lastUpdated } = useLibrary();

  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
            Built for Lovely Professional University students
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
            LPUdesk
          </h1>
          <p className="mt-2 text-xl font-semibold text-slate-700">
            Find a free desk. Find your book. Skip the guesswork.
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            LPUdesk shows the approximate crowd and seat availability inside the LPU Central
            Library, and tells you exactly which floor, section and shelf your book is kept on
            &mdash; before you walk in.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/desk-availability"
              className="rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Check Desk Availability
            </Link>
            <Link
              to="/book-finder"
              className="rounded-lg border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Find a Book
            </Link>
            <Link
              to="/library-guide"
              className="rounded-lg px-5 py-3 text-sm font-semibold text-slate-600 hover:text-brand-700"
            >
              View Library Guide
            </Link>
          </div>
        </div>

        {/* Live snapshot card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Library Right Now</p>
              <p className="text-xs text-slate-500">Updated: {lastUpdated}</p>
            </div>
            <StatusBadge label={occupancy.status.label} tone={occupancy.status.tone} />
          </div>

          <p className="mt-6 text-5xl font-bold text-brand-800">
            {occupancy.occupancyPercent}
            <span className="text-2xl font-semibold text-slate-500">%</span>
          </p>
          <p className="text-sm text-slate-600">seating capacity occupied</p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <p className="text-lg font-bold text-slate-800">{occupancy.totalSeats}</p>
              <p className="text-[11px] text-slate-500">Total Seats</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <p className="text-lg font-bold text-slate-800">{occupancy.peopleInside}</p>
              <p className="text-[11px] text-slate-500">Inside Now</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <p className="text-lg font-bold text-emerald-600">{occupancy.vacantSeats}</p>
              <p className="text-[11px] text-slate-500">Vacant Desks</p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Estimated from the library gate entry count. Actual free seats may vary slightly.
          </p>
        </div>
      </Container>
    </section>
  );
}
