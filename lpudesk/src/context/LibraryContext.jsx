import { createContext, useContext, useEffect, useState } from "react";
import { sampleBooks } from "../books.js";
import { libraryStats } from "../data/libraryStats.js";
import { calculateOccupancy } from "../utils/occupancy.js";

/**
 * LibraryContext stores the data that more than one page needs:
 * seat count, entry count, the book list and recent searches.
 *
 * Because it is shared, a change made on the Admin Demo page is
 * instantly visible on the Home, Availability and Dashboard pages.
 */
const LibraryContext = createContext(null);

const RECENT_SEARCH_KEY = "lpudesk-recent-searches";

export function LibraryProvider({ children }) {
  const [totalSeats, setTotalSeats] = useState(libraryStats.totalSeats);
  const [peopleInside, setPeopleInside] = useState(libraryStats.peopleInside);
  const [books, setBooks] = useState(sampleBooks);

  // Recent searches are remembered in the browser so the dashboard looks real.
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem(RECENT_SEARCH_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Derived numbers – recalculated automatically whenever seats/entries change.
  const occupancy = calculateOccupancy(totalSeats, peopleInside);

  /** Saves a search term at the top of the recent list (max 5, no duplicates). */
  function addRecentSearch(term) {
    const cleanTerm = term.trim();
    if (cleanTerm === "") return;

    setRecentSearches((previous) => {
      const withoutDuplicate = previous.filter(
        (item) => item.toLowerCase() !== cleanTerm.toLowerCase()
      );
      return [cleanTerm, ...withoutDuplicate].slice(0, 5);
    });
  }

  function clearRecentSearches() {
    setRecentSearches([]);
  }

  /** Admin action: mark all copies of a book as available or fully issued. */
  function setBookAvailability(bookId, makeAvailable) {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === bookId
          ? { ...book, copiesAvailable: makeAvailable ? book.copiesTotal : 0 }
          : book
      )
    );
  }

  /** Admin action: set an exact number of available copies. */
  function updateAvailableCopies(bookId, copies) {
    setBooks((previousBooks) =>
      previousBooks.map((book) => {
        if (book.id !== bookId) return book;
        const safeCopies = Math.min(Math.max(Number(copies) || 0, 0), book.copiesTotal);
        return { ...book, copiesAvailable: safeCopies };
      })
    );
  }

  /** Puts the demo back to its original values. */
  function resetDemoData() {
    setTotalSeats(libraryStats.totalSeats);
    setPeopleInside(libraryStats.peopleInside);
    setBooks(sampleBooks);
  }

  const value = {
    totalSeats,
    setTotalSeats,
    peopleInside,
    setPeopleInside,
    occupancy,
    books,
    setBookAvailability,
    updateAvailableCopies,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    resetDemoData,
    lastUpdated: libraryStats.lastUpdated,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

/** Small helper hook so pages can simply call useLibrary(). */
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary() must be used inside <LibraryProvider>");
  }
  return context;
}
