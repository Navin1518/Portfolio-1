import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import { libraryInfo } from "../data/libraryStats.js";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-base font-bold text-brand-800">LPUdesk</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              A student project that shows approximate library desk availability and helps
              locate books inside {libraryInfo.name}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/desk-availability" className="hover:text-brand-700">Desk Availability</Link></li>
              <li><Link to="/book-finder" className="hover:text-brand-700">Book Finder</Link></li>
              <li><Link to="/library-guide" className="hover:text-brand-700">Library Guide</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-700">Student Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">Help Desk</p>
            <p className="mt-3 text-sm text-slate-600">{libraryInfo.block}</p>
            <p className="mt-1 text-sm text-slate-600">{libraryInfo.helpDeskContact}</p>
          </div>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-500">
          Academic project demo. All seat counts, timings and book records shown here are
          sample data and are not official university information.
        </p>
      </Container>
    </footer>
  );
}
