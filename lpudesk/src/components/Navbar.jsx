import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "Desk Availability", path: "/desk-availability" },
  { label: "Book Finder", path: "/book-finder" },
  { label: "Library Guide", path: "/library-guide" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Admin Demo", path: "/admin" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Same styling rule reused for desktop and mobile links.
  function linkClasses({ isActive }) {
    const base = "rounded-md px-3 py-2 text-sm font-medium";
    return isActive
      ? `${base} bg-brand-50 text-brand-700`
      : `${base} text-slate-600 hover:bg-slate-100 hover:text-brand-700`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            LD
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-brand-800">LPUdesk</span>
            <span className="block text-[11px] text-slate-500">Library Desk & Book Finder</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses} end={link.path === "/"}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-md border border-slate-300 p-2 text-slate-600 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClasses}
                end={link.path === "/"}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
