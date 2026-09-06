import { floorSeatShares } from "../data/libraryStats.js";
import { getFloorLabel, getCrowdStatus } from "../utils/occupancy.js";
import StatusBadge from "./StatusBadge.jsx";

/**
 * Splits the total seats and the people inside across floors using fixed shares.
 * This gives students a rough idea of which floor is emptier.
 */
export default function FloorOccupancyTable({ occupancy }) {
  const rows = floorSeatShares.map((floorData) => {
    const seats = Math.round(occupancy.totalSeats * floorData.share);
    const occupied = Math.min(Math.round(occupancy.peopleInside * floorData.share), seats);
    const vacant = seats - occupied;
    const percent = seats === 0 ? 0 : Math.round((occupied / seats) * 100);

    return { ...floorData, seats, occupied, vacant, percent, status: getCrowdStatus(percent) };
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-sm font-semibold text-slate-800">Floor-wise Estimated Availability</p>
        <p className="text-xs text-slate-500">
          Calculated by distributing the entry count across floors.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Floor</th>
              <th className="px-6 py-3 font-semibold">Reading Zone</th>
              <th className="px-6 py-3 font-semibold">Seats</th>
              <th className="px-6 py-3 font-semibold">Vacant</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.floor} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {getFloorLabel(row.floor)}
                </td>
                <td className="px-6 py-4 text-slate-600">{row.name}</td>
                <td className="px-6 py-4 text-slate-700">{row.seats}</td>
                <td className="px-6 py-4 font-semibold text-emerald-600">{row.vacant}</td>
                <td className="px-6 py-4">
                  <StatusBadge label={`${row.percent}% · ${row.status.label}`} tone={row.status.tone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
