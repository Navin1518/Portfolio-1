/**
 * Single place where a "tone" is mapped to Tailwind classes.
 * Keeping full class names here (not built with string joining) makes sure
 * Tailwind can detect and generate them.
 */
export const badgeStyles = {
  green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  red: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-200",
  slate: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

export const barStyles = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  red: "bg-rose-500",
  brand: "bg-brand-600",
  slate: "bg-slate-400",
};
