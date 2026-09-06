import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import BookSearchBar from "../components/BookSearchBar.jsx";
import BookResultCard from "../components/BookResultCard.jsx";
import BookResultTable from "../components/BookResultTable.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";
import { getCategories, searchBooks } from "../utils/bookSearch.js";

const emptyFilters = {
  query: "",
  searchBy: "all",
  category: "all",
  availability: "all",
};

export default function BookFinder() {
  const { books, addRecentSearch } = useLibrary();

  // The dashboard links here with ?q=term, so we read that as the starting query.
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...emptyFilters,
    query: searchParams.get("q") || "",
  });
  const [viewMode, setViewMode] = useState("cards");

  const categories = useMemo(() => getCategories(books), [books]);

  // Results update while typing; useMemo avoids recalculating on every render.
  const results = useMemo(() => searchBooks(books, filters), [books, filters]);

  function handleFilterChange(fieldName, value) {
    setFilters((previous) => ({ ...previous, [fieldName]: value }));
  }

  /** Saves the search term for the dashboard's "recent searches" list. */
  function handleSubmit() {
    addRecentSearch(filters.query);
  }

  return (
    <>
      <PageHeader
        eyebrow="Book Finder"
        title="Search a book and find where it is kept"
        description="Search the catalogue by title, author, subject or ISBN. Every result shows the floor, section and shelf number so you can walk directly to the book."
      />

      <Container className="space-y-6 py-10">
        <BookSearchBar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onSubmit={handleSubmit}
          onReset={() => setFilters(emptyFilters)}
        />

        {/* Result count + view switch */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{results.length}</span> book
            {results.length === 1 ? "" : "s"} found
            {filters.query && <> for &ldquo;{filters.query}&rdquo;</>}
          </p>

          <div className="inline-flex overflow-hidden rounded-lg border border-slate-300">
            {["cards", "table"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 text-xs font-semibold capitalize ${
                  viewMode === mode
                    ? "bg-brand-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {mode} view
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-slate-800">No matching books</p>
            <p className="mt-2 text-sm text-slate-600">
              Try a shorter keyword, check the spelling, or reset the filters.
            </p>
          </div>
        ) : viewMode === "cards" ? (
          <div className="grid gap-6">
            {results.map((book) => (
              <BookResultCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <BookResultTable books={results} />
        )}
      </Container>
    </>
  );
}
