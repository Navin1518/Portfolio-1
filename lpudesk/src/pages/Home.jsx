import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Hero from "../components/Hero.jsx";
import FeatureCards from "../components/FeatureCards.jsx";
import { libraryTimings } from "../data/libraryStats.js";

const howItWorksSteps = [
  {
    step: "01",
    title: "Gate entry count",
    text: "The library entry gate gives the number of students currently inside.",
  },
  {
    step: "02",
    title: "Seats minus people",
    text: "LPUdesk subtracts that count from the total seating capacity to estimate vacant desks.",
  },
  {
    step: "03",
    title: "Crowd status",
    text: "The occupancy percentage is converted into a simple label: Low, Moderate or Almost Full.",
  },
  {
    step: "04",
    title: "Book location",
    text: "Searching the catalogue returns the floor, section and shelf number of each book.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Feature overview */}
      <Container className="py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-900">What LPUdesk does</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Four simple tools that save time on every library visit.
          </p>
        </div>
        <div className="mt-8">
          <FeatureCards />
        </div>
      </Container>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white">
        <Container className="py-14">
          <h2 className="text-2xl font-bold text-brand-900">How the estimate works</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Tracking every individual seat needs hardware on each desk. LPUdesk instead uses a
            simple and practical approximation model.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <span className="text-xs font-bold text-brand-500">{item.step}</span>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-brand-800">Formula used</p>
            <p className="mt-2 font-mono text-sm text-brand-900">
              vacant desks = total seats − people inside
            </p>
            <p className="mt-1 font-mono text-sm text-brand-900">
              occupancy % = (people inside ÷ total seats) × 100
            </p>
          </div>
        </Container>
      </section>

      {/* Timings + CTA */}
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-brand-900">Library Timings</h2>
            <p className="mt-1 text-xs text-slate-500">Sample schedule used for this project.</p>
            <div className="mt-5 divide-y divide-slate-100">
              {libraryTimings.map((timing) => (
                <div key={timing.day} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="font-medium text-slate-800">{timing.day}</span>
                  <span className="text-slate-600">{timing.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-brand-800 p-8 text-white">
            <h2 className="text-lg font-bold">Built for LPU students</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-100">
              Plan your study session, walk straight to the right shelf and stop wandering
              between floors looking for a free desk.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-brand-800 hover:bg-brand-50"
            >
              Open Student Dashboard
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
