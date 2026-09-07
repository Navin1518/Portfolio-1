import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LibraryMapSection from "../components/LibraryMapSection.jsx";
import { libraryInfo } from "../data/libraryStats.js";

const guideTips = [
  "Note the shelf code from Book Finder before you go, for example C-14.",
  "The first letters of a shelf code tell you the section: C = Computer Science, ME = Mechanical, MG = Management.",
  "Silent reading halls are on floors 1, 2 and 3; group discussion tables are on the ground floor.",
  "If a book is not on its shelf, ask at the staff assistance point on that floor.",
];

export default function LibraryGuide() {
  return (
    <>
      <PageHeader
        eyebrow="Library Guide"
        title="Floors, sections and reading zones"
        description={`A structured guide to ${libraryInfo.name}. Use it with Book Finder to reach the right shelf without walking around every floor.`}
      />

      <Container className="space-y-8 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-sm font-semibold text-slate-800">How to read the guide</h2>
            <ul className="mt-4 space-y-3">
              {guideTips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-800 p-6 text-white">
            <h2 className="text-sm font-semibold">Central Help Desk</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-100">
              Located next to the main entry gate on the ground floor. Staff can help with book
              issue and return, missing books, fines and locker access.
            </p>
            <p className="mt-4 text-sm font-semibold">{libraryInfo.helpDeskContact}</p>
            <p className="mt-1 text-xs text-brand-200">{libraryInfo.block}</p>
          </div>
        </div>

        <LibraryMapSection />
      </Container>
    </>
  );
}
