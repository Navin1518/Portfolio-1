import { hourlyCrowdTrend } from "../data/libraryStats.js";

/**
 * Simple bar chart built with plain divs (no chart library needed).
 * Each bar height is a percentage of the busiest hour.
 */
export default function HourlyCrowdChart() {
  const busiestCount = Math.max(...hourlyCrowdTrend.map((point) => point.people));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-800">Typical Crowd Through the Day</p>
      <p className="text-xs text-slate-500">
        Average students inside per hour (sample data) &mdash; useful for planning your visit.
      </p>

      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-4">
        {hourlyCrowdTrend.map((point) => {
          const heightPercent = Math.round((point.people / busiestCount) * 100);
          return (
            <div key={point.hour} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-500">{point.people}</span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-brand-500"
                  style={{ height: `${heightPercent}%` }}
                  title={`${point.hour}: ${point.people} students`}
                />
              </div>
              <span className="text-[10px] text-slate-500">{point.hour}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
