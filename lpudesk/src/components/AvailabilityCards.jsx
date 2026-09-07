import StatCard from "./StatCard.jsx";

/** The four summary cards of the desk-availability dashboard. */
export default function AvailabilityCards({ occupancy }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Seats"
        value={occupancy.totalSeats}
        hint="Fixed seating capacity of the library"
        icon="seat"
      />
      <StatCard
        label="Current People Inside"
        value={occupancy.peopleInside}
        hint="From the library gate entry count"
        icon="users"
      />
      <StatCard
        label="Estimated Vacant Desks"
        value={occupancy.vacantSeats}
        hint="Total seats minus people inside"
        icon="book"
      />
      <StatCard
        label="Occupancy"
        value={occupancy.occupancyPercent}
        unit="%"
        hint={occupancy.status.label}
        icon="chart"
      />
    </div>
  );
}
