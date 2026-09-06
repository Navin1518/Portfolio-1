import StatusBadge from "./StatusBadge.jsx";
import { getFloorLabel } from "../utils/occupancy.js";
import { getLocationHint, isBookAvailable } from "../utils/bookSearch.js";

/** Compact table view of the same search results (toggled from the Book Finder page). */
export default function BookResultTable({ books }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Book Title</th>
              <th className="px-5 py-3 font-semibold">Author</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Floor</th>
              <th className="px-5 py-3 font-semibold">Section</th>
              <th className="px-5 py-3 font-semibold">Shelf</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((book) => (
              <tr key={book.id} className="align-top hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">{book.title}</td>
                <td className="px-5 py-4 text-slate-600">{book.author}</td>
                <td className="px-5 py-4 text-slate-600">{book.category}</td>
                <td className="px-5 py-4 text-slate-600">{getFloorLabel(book.floor)}</td>
                <td className="px-5 py-4 text-slate-600">{book.section}</td>
                <td className="px-5 py-4 font-semibold text-slate-800">{book.shelf}</td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={isBookAvailable(book) ? "Available" : "Issued"}
                    tone={isBookAvailable(book) ? "green" : "red"}
                  />
                </td>
                <td className="px-5 py-4 text-xs text-brand-700">{getLocationHint(book)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
