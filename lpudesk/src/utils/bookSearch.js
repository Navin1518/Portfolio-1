import { getFloorLabel } from "./occupancy.js";

/** A book is "Available" when at least one copy is on the shelf. */
export function isBookAvailable(book) {
  return book.copiesAvailable > 0;
}

/** Short location instruction, e.g. "2nd Floor, Computer Science Section, Shelf C-14". */
export function getLocationHint(book) {
  return `${getFloorLabel(book.floor)}, ${book.section}, Shelf ${book.shelf}`;
}

/** Unique category list for the filter dropdown (built from the data itself). */
export function getCategories(books) {
  const categories = books.map((book) => book.category);
  return [...new Set(categories)].sort();
}

/**
 * Filters the book list.
 *
 * @param books      full book array
 * @param query      what the student typed
 * @param searchBy   "all" | "title" | "author" | "subject" | "isbn"
 * @param category   "all" or a category name
 * @param availability "all" | "available" | "issued"
 */
export function searchBooks(books, { query, searchBy, category, availability }) {
  const text = query.trim().toLowerCase();

  return books.filter((book) => {
    // 1) Text match on the chosen field
    const fields = {
      title: book.title,
      author: book.author,
      subject: `${book.subject} ${book.category}`,
      isbn: book.isbn,
    };

    const haystack =
      searchBy === "all"
        ? Object.values(fields).join(" ")
        : fields[searchBy] || "";

    const matchesText = text === "" || haystack.toLowerCase().includes(text);

    // 2) Category filter
    const matchesCategory = category === "all" || book.category === category;

    // 3) Availability filter
    const available = isBookAvailable(book);
    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && available) ||
      (availability === "issued" && !available);

    return matchesText && matchesCategory && matchesAvailability;
  });
}
