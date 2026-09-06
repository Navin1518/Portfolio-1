import Icon from "./Icon.jsx";

/** One statistic card: label, big value and a short hint line. */
export default function StatCard({ label, value, unit, hint, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {icon && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <Icon name={icon} className="h-4.5 w-4.5" />
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold text-brand-800">
        {value}
        {unit && <span className="ml-1 text-lg font-semibold text-slate-500">{unit}</span>}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
