import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

const features = [
  {
    icon: "seat",
    title: "Find Available Library Desks",
    description:
      "See an estimate of how many desks are free before leaving your hostel or class.",
    linkLabel: "Open availability dashboard",
    linkPath: "/desk-availability",
  },
  {
    icon: "users",
    title: "Check Approximate Crowd Level",
    description:
      "Occupancy percentage and clear status labels: Low Crowd, Moderate Crowd or Almost Full.",
    linkLabel: "View crowd status",
    linkPath: "/desk-availability",
  },
  {
    icon: "book",
    title: "Search Books & Locate Them",
    description:
      "Search by title, author, subject or ISBN and get the exact floor, section and shelf number.",
    linkLabel: "Search the catalogue",
    linkPath: "/book-finder",
  },
  {
    icon: "map",
    title: "Floor-wise Library Guide",
    description:
      "A structured layout of every floor with shelf ranges, reading zones and help desks.",
    linkLabel: "Explore library guide",
    linkPath: "/library-guide",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Icon name={feature.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
            {feature.description}
          </p>
          <Link
            to={feature.linkPath}
            className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {feature.linkLabel} &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
}
