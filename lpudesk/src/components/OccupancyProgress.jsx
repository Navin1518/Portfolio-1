import StatusBadge from "./StatusBadge.jsx";
import { barStyles } from "../utils/statusStyle.js";

/**
 * Progress bar for occupancy percentage.
 * The width is set with an inline style because the value is dynamic.
 */
export default function OccupancyProgress({ occupancy, showMessage = true }) {
  const { occupancyPercent, status, peopleInside, totalSeats } = occupancy;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Current Occupancy</p>
          <p className="text-xs text-slate-500">
            {peopleInside} of {totalSeats} seats estimated in use
          </p>
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barStyles[status.tone]}`}
          style={{ width: `${occupancyPercent}%` }}
          role="progressbar"
          aria-valuenow={occupancyPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Library occupancy percentage"
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>0%</span>
        <span className="font-semibold text-slate-700">{occupancyPercent}% full</span>
        <span>100%</span>
      </div>

      {showMessage && <p className="mt-4 text-sm text-slate-600">{status.message}</p>}
    </div>
  );
}
