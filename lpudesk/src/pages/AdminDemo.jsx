import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import AdminControls from "../components/AdminControls.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";
import { isBookAvailable } from "../utils/bookSearch.js";

export default function AdminDemo() {
  const { books, setBookAvailability, updateAvailableCopies } = useLibrary();

  return (
    <>
      <PageHeader
        eyebrow="Admin Demo"
        title="Library admin simulation"
        description="A demonstration panel for the college project. Changing values here instantly updates the student-facing pages, which shows how a real admin panel would work."
      >
        <StatusBadge label="Demo only · no login, no database" tone="amber" />
      </PageHeader>

      <Container className="space-y-8 py-10">
        <AdminControls />

        {/* Book availability management */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-800">Book Availability Status</h2>
            <p className="text-xs text-slate-500">
              Set how many copies are on the shelf, or mark a title as fully issued.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Book</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Copies Available</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((book) => {
                  const available = isBookAvailable(book);
                  return (
                    <tr key={book.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.author}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">
                        Floor {book.floor} · {book.shelf}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          max={book.copiesTotal}
                          value={book.copiesAvailable}
                          onChange={(event) =>
                            updateAvailableCopies(book.id, event.target.value)
                          }
                          className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
                          aria-label={`Available copies of ${book.title}`}
                        />
                        <span className="ml-2 text-xs text-slate-500">/ {book.copiesTotal}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          label={available ? "Available" : "Issued"}
                          tone={available ? "green" : "red"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setBookAvailability(book.id, !available)}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          {available ? "Mark all issued" : "Mark available"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-sm font-semibold text-amber-900">Note for evaluation</h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            This page has no authentication and stores changes only in React state, so a page
            refresh restores the sample data. In a production version these actions would be
            protected by an admin login and would write to a database through an API.
          </p>
        </div>
      </Container>
    </>
  );
}
