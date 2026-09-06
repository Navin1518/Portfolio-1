import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import OccupancyProgress from "../components/OccupancyProgress.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";
import { libraryTimings, popularSections } from "../data/libraryStats.js";
import { getFloorLabel } from "../utils/occupancy.js";

export default function StudentDashboard() {
  const { occupancy, books, recentSearches, addRecentSearch, clearRecentSearches } = useLibrary();
  const [quickQuery, setQuickQuery] = useState("");
  const navigate = useNavigate();

  const availableBookCount = books.filter((book) => book.copiesAvailable > 0).length;

  /** Quick search sends the student to Book Finder with the term in the URL. */
  function handleQuickSearch(event) {
    event.preventDefault();
    const term = quickQuery.trim();
    if (term === "") return;

    addRecentSearch(term);
    navigate(`/book-finder?q=${encodeURIComponent(term)}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="Student Dashboard"
        title="Your library at a glance"
        description="Occupancy, quick book search, your recent searches and the most visited sections — all on one screen."
      />

      <Container className="space-y-8 py-10">
        {/* Summary cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Occupancy"
            value={occupancy.occupancyPercent}
            unit="%"
            hint={occupancy.status.label}
            icon="chart"
          />
          <StatCard
            label="Vacant Desks"
            value={occupancy.vacantSeats}
            hint={`Out of ${occupancy.totalSeats} total seats`}
            icon="seat"
          />
          <StatCard
            label="Titles in Catalogue"
            value={books.length}
            hint={`${availableBookCount} available on shelf now`}
            icon="book"
          />
          <StatCard
            label="Open Today"
            value="08:00 AM"
            hint="Closes at 12:00 AM"
            icon="clock"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            <OccupancyProgress occupancy={occupancy} />

            {/* Quick book search */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">Quick Book Search</h2>
              <p className="mt-1 text-xs text-slate-500">
                Type a title, author or subject and jump straight to the results.
              </p>

              <form onSubmit={handleQuickSearch} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(event) => setQuickQuery(event.target.value)}
                  placeholder="e.g. Operating System Concepts"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Popular sections */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-800">Popular Sections</h2>
                <p className="text-xs text-slate-500">Most visited sections this week.</p>
              </div>
              <div className="divide-y divide-slate-100">
                {popularSections.map((section) => (
                  <div
                    key={section.name}
                    className="flex flex-wrap items-center justify-between gap-2 px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{section.name}</p>
                      <p className="text-xs text-slate-500">{getFloorLabel(section.floor)}</p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {section.visits.toLocaleString()} visits
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Recently searched books */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-800">Recently Searched</h2>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs font-semibold text-slate-500 hover:text-brand-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {recentSearches.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No searches yet. Your last five book searches will appear here.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {recentSearches.map((term) => (
                    <li key={term}>
                      <Link
                        to={`/book-finder?q=${encodeURIComponent(term)}`}
                        className="block rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {term}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Library timings */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">Library Timings</h2>
              <div className="mt-4 divide-y divide-slate-100">
                {libraryTimings.map((timing) => (
                  <div key={timing.day} className="py-3">
                    <p className="text-sm font-medium text-slate-800">{timing.day}</p>
                    <p className="text-xs text-slate-500">{timing.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
