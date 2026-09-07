import StatusBadge from "./StatusBadge.jsx";
import { getFloorLabel } from "../utils/occupancy.js";
import { getLocationHint, isBookAvailable } from "../utils/bookSearch.js";

/** Detailed result card for one book, including its physical location. */
export default function BookResultCard({ book }) {
  const available = isBookAvailable(book);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{book.title}</h3>
          <p className="mt-1 text-sm text-slate-600">by {book.author}</p>
        </div>
        <StatusBadge
          label={available ? `Available (${book.copiesAvailable})` : "Currently Issued"}
          tone={available ? "green" : "red"}
        />
      </div>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-xs text-slate-500">Category</dt>
          <dd className="font-medium text-slate-800">{book.category}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Subject</dt>
          <dd className="font-medium text-slate-800">{book.subject}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Book Code / ISBN</dt>
          <dd className="font-medium text-slate-800">{book.isbn}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Copies</dt>
          <dd className="font-medium text-slate-800">
            {book.copiesAvailable} of {book.copiesTotal} on shelf
          </dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm ring-1 ring-slate-200 sm:grid-cols-3">
        <div>
          <p className="text-xs text-slate-500">Floor</p>
          <p className="font-semibold text-slate-800">{getFloorLabel(book.floor)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Section</p>
          <p className="font-semibold text-slate-800">{book.section}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Shelf Number</p>
          <p className="font-semibold text-slate-800">{book.shelf}</p>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-brand-700">
        How to find it: {getLocationHint(book)}
      </p>
    </article>
  );
}
