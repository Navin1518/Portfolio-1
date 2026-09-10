import { libraryFloors, mapLegend } from "../data/libraryMap.js";
import { badgeStyles } from "../utils/statusStyle.js";

/**
 * Floor-wise visual guide of the library.
 * It is not an interactive map – it is a clean structured layout built from data.
 */
export default function LibraryMapSection() {
  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Legend
        </span>
        {mapLegend.map((item) => (
          <span
            key={item.label}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[item.tone]}`}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* One card per floor */}
      {libraryFloors.map((floorData) => (
        <div
          key={floorData.floor}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-brand-50 px-6 py-4">
            <div>
              <h3 className="text-base font-bold text-brand-800">{floorData.title}</h3>
              <p className="text-xs text-brand-700">{floorData.tagline}</p>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
              Level {floorData.floor}
            </span>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-3">
            {/* Shelf areas */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Book Shelf Areas
              </p>
              <ul className="mt-3 space-y-2">
                {floorData.sections.map((section) => (
                  <li
                    key={section.name}
                    className="rounded-lg border border-brand-100 bg-brand-50/60 px-3 py-2"
                  >
                    <p className="text-sm font-medium text-slate-800">{section.name}</p>
                    <p className="text-xs text-slate-500">Shelves {section.shelves}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reading zones */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Reading Zones
              </p>
              <ul className="mt-3 space-y-2">
                {floorData.zones.map((zone) => (
                  <li
                    key={zone}
                    className="rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-sm text-slate-800"
                  >
                    {zone}
                  </li>
                ))}
              </ul>
            </div>

            {/* Facilities / help points */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Facilities & Help Points
              </p>
              <ul className="mt-3 space-y-2">
                {floorData.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2 text-sm text-slate-800"
                  >
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
