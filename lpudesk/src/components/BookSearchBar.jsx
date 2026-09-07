/**
 * Controlled search bar + filters for the Book Finder page.
 * All values are stored in the parent page, so this component stays simple.
 */
export default function BookSearchBar({
  filters,
  onFilterChange,
  onSubmit,
  onReset,
  categories,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={filters.query}
          onChange={(event) => onFilterChange("query", event.target.value)}
          placeholder="Search by book title, author, subject or ISBN…"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Search
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-semibold text-slate-600">
          Search In
          <select
            value={filters.searchBy}
            onChange={(event) => onFilterChange("searchBy", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-brand-500"
          >
            <option value="all">All Fields</option>
            <option value="title">Book Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject / Category</option>
            <option value="isbn">Book Code / ISBN</option>
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-600">
          Category
          <select
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-brand-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-600">
          Availability
          <select
            value={filters.availability}
            onChange={(event) => onFilterChange("availability", event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-brand-500"
          >
            <option value="all">All Books</option>
            <option value="available">Available Now</option>
            <option value="issued">Currently Issued</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-xs font-semibold text-slate-500 hover:text-brand-700"
      >
        Clear search and filters
      </button>
    </form>
  );
}
