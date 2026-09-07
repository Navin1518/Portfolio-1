/**
 * Occupancy maths for the approximate desk-availability model.
 *
 * Model used in this project:
 *   available seats     = total seats - people currently inside
 *   occupancy percent   = (people inside / total seats) * 100
 *
 * "People inside" comes from the library gate entry count, so the result is
 * an approximation, not exact seat-level tracking.
 */

/** Returns a crowd status label + colour tone based on occupancy percentage. */
export function getCrowdStatus(occupancyPercent) {
  if (occupancyPercent < 40) {
    return {
      label: "Low Crowd",
      tone: "green",
      message: "Plenty of desks are free. A good time to visit.",
    };
  }
  if (occupancyPercent < 75) {
    return {
      label: "Moderate Crowd",
      tone: "amber",
      message: "Seats are filling up, but you should still find a desk.",
    };
  }
  if (occupancyPercent < 95) {
    return {
      label: "Almost Full",
      tone: "orange",
      message: "Very few desks left. Try the upper floors or come back later.",
    };
  }
  return {
    label: "Full",
    tone: "red",
    message: "Library is at full capacity. Please wait or check back soon.",
  };
}

/**
 * Calculates all the numbers shown on the availability dashboard.
 * Values are cleaned up (no negatives, no percentage above 100) so the
 * progress bar and cards never break.
 */
export function calculateOccupancy(totalSeats, peopleInside) {
  const safeTotalSeats = Math.max(Number(totalSeats) || 0, 1);
  const safePeopleInside = Math.max(Number(peopleInside) || 0, 0);

  // If more people entered than there are seats, vacant desks become 0.
  const vacantSeats = Math.max(safeTotalSeats - safePeopleInside, 0);
  const occupancyPercent = Math.min(
    Math.round((safePeopleInside / safeTotalSeats) * 100),
    100
  );

  return {
    totalSeats: safeTotalSeats,
    peopleInside: safePeopleInside,
    vacantSeats,
    occupancyPercent,
    status: getCrowdStatus(occupancyPercent),
  };
}

/** Turns a floor number into a readable label: 0 -> "Ground Floor", 2 -> "2nd Floor". */
export function getFloorLabel(floor) {
  if (floor === 0) return "Ground Floor";
  const suffixes = { 1: "st", 2: "nd", 3: "rd" };
  return `${floor}${suffixes[floor] || "th"} Floor`;
}