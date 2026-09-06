import { useLibrary } from "../context/LibraryContext.jsx";
import OccupancyProgress from "./OccupancyProgress.jsx";

/**
 * Admin controls for the demo: change seat capacity and gate entry count.
 * All changes update the shared context, so student pages react immediately.
 */
export default function AdminControls() {
  const { totalSeats, setTotalSeats, peopleInside, setPeopleInside, occupancy, resetDemoData } =
    useLibrary();

  /** Adds (or removes) entries, never letting the count go below zero. */
  function adjustEntryCount(amount) {
    setPeopleInside(Math.max(peopleInside + amount, 0));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Seat capacity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">Total Library Seats</h3>
        <p className="mt-1 text-xs text-slate-500">
          Fixed seating capacity used in every calculation.
        </p>

        <input
          type="number"
          min="1"
          value={totalSeats}
          onChange={(event) => setTotalSeats(Math.max(Number(event.target.value) || 0, 1))}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />

        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={totalSeats}
          onChange={(event) => setTotalSeats(Number(event.target.value))}
          className="mt-4 w-full accent-brand-700"
          aria-label="Total seats slider"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>100</span>
          <span>1000</span>
        </div>
      </div>

      {/* Entry count */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">Current Entry Count</h3>
        <p className="mt-1 text-xs text-slate-500">
          Number of students currently inside, as reported by the gate system.
        </p>

        <input
          type="number"
          min="0"
          value={peopleInside}
          onChange={(event) => setPeopleInside(Math.max(Number(event.target.value) || 0, 0))}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {[-50, -10, +10, +50].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => adjustEntryCount(amount)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {amount > 0 ? `+${amount}` : amount} entries
            </button>
          ))}
          <button
            type="button"
            onClick={resetDemoData}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-900"
          >
            Reset demo data
          </button>
        </div>
      </div>

      {/* Live preview of what students will see */}
      <div className="lg:col-span-2">
        <OccupancyProgress occupancy={occupancy} />
      </div>
    </div>
  );
}
