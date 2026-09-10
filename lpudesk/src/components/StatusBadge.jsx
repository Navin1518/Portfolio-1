import { badgeStyles } from "../utils/statusStyle.js";

/** Small coloured pill used for crowd status and book availability. */
export default function StatusBadge({ label, tone = "slate" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        badgeStyles[tone] || badgeStyles.slate
      }`}
    >
      {label}
    </span>
  );
}
