/**
 * A few small inline SVG icons.
 * Using one component avoids installing an extra icon library.
 */
const paths = {
  seat: "M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M4 18h16M6 18v2M18 18v2",
  book: "M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2V5Zm13 14v2H6",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  users: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11 12v-1a4 4 0 0 0-3-3.87M16.5 7.13a3 3 0 0 1 0 5.74",
  clock: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  chart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 1-.1 1.3l2 1.6-2 3.4-2.3-1a8 8 0 0 1-2.3 1.3L14.7 22h-3.9l-.4-2.4a8 8 0 0 1-2.3-1.3l-2.3 1-2-3.4 2-1.6A8 8 0 0 1 4 12l-2-1.6 2-3.4 2.3 1a8 8 0 0 1 2.3-1.3L9.3 2h3.9l.4 2.4a8 8 0 0 1 2.3 1.3l2.3-1 2 3.4-2 1.6c.06.43.1.86.1 1.3Z",
};

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.book} />
    </svg>
  );
}
