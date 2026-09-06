import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import AvailabilityCards from "../components/AvailabilityCards.jsx";
import OccupancyProgress from "../components/OccupancyProgress.jsx";
import FloorOccupancyTable from "../components/FloorOccupancyTable.jsx";
import HourlyCrowdChart from "../components/HourlyCrowdChart.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function DeskAvailability() {
  const { occupancy, lastUpdated } = useLibrary();

  return (
    <>
      <PageHeader
        eyebrow="Desk Availability"
        title="How crowded is the library right now?"
        description="An approximate live view of seating in the LPU Central Library, calculated from the gate entry count and the fixed seating capacity."
      >
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <StatusBadge label={occupancy.status.label} tone={occupancy.status.tone} />
          <p className="mt-2 text-xs text-slate-500">Last updated: {lastUpdated}</p>
        </div>
      </PageHeader>

      <Container className="space-y-8 py-10">
        <AvailabilityCards occupancy={occupancy} />
        <OccupancyProgress occupancy={occupancy} />

        <div className="grid gap-8 lg:grid-cols-2">
          <FloorOccupancyTable occupancy={occupancy} />
          <HourlyCrowdChart />
        </div>

        {/* Explanation box – helpful during the project viva */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Why this number is an estimate
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            LPUdesk does not track individual desks. It assumes that every student who enters
            the library occupies roughly one seat, so the number of free desks is the seating
            capacity minus the current entry count. Students standing near shelves, using the
            digital library or sitting in groups can make the real figure slightly different.
            Status labels are used instead of exact seat numbers so students get a realistic
            expectation: <strong>Low Crowd</strong> below 40%, <strong>Moderate Crowd</strong>{" "}
            between 40% and 74%, <strong>Almost Full</strong> between 75% and 94%, and{" "}
            <strong>Full</strong> at 95% or above.
          </p>
        </div>
      </Container>
    </>
  );
}
