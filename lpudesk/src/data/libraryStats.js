/**
 * Sample library statistics for LPUdesk.
 * In a real system these numbers would come from the library gate counter + database.
 */
export const libraryInfo = {
  name: "LPU Central Library",
  block: "Block 34, Lovely Professional University, Phagwara",
  helpDeskContact: "library.helpdesk@lpu.demo",
};

export const libraryStats = {
  totalSeats: 500, // fixed seating capacity used for the demo
  peopleInside: 318, // current entry count from the gate system (dummy value)
  lastUpdated: "Today, 02:45 PM",
};

/** Library opening hours (sample data for the project demo). */
export const libraryTimings = [
  { day: "Monday – Friday", hours: "08:00 AM – 12:00 AM" },
  { day: "Saturday", hours: "08:00 AM – 10:00 PM" },
  { day: "Sunday", hours: "09:00 AM – 09:00 PM" },
  { day: "Exam Days (Extended)", hours: "24 Hours – Reading Hall Only" },
];

/**
 * How the total seats are spread across floors.
 * "share" is the fraction of total seats on that floor (all shares add up to 1).
 * We use shares instead of fixed numbers so the table still works
 * when an admin changes the total seat count.
 */
export const floorSeatShares = [
  { floor: 0, name: "Circulation & Newspaper Lounge", share: 0.16 },
  { floor: 1, name: "Basic Sciences & Mathematics Hall", share: 0.24 },
  { floor: 2, name: "Computer Science & IT Reading Zone", share: 0.26 },
  { floor: 3, name: "Core Engineering Reading Zone", share: 0.2 },
  { floor: 4, name: "Management, Law & Research Zone", share: 0.14 },
];

/** Average number of students inside the library per hour (dummy trend data). */
export const hourlyCrowdTrend = [
  { hour: "8 AM", people: 60 },
  { hour: "10 AM", people: 185 },
  { hour: "12 PM", people: 295 },
  { hour: "2 PM", people: 318 },
  { hour: "4 PM", people: 410 },
  { hour: "6 PM", people: 465 },
  { hour: "8 PM", people: 380 },
  { hour: "10 PM", people: 210 },
];

/** Most visited sections this week (dummy analytics data). */
export const popularSections = [
  { name: "Computer Science & IT", floor: 2, visits: 1240 },
  { name: "Competitive Exams & GK", floor: 0, visits: 980 },
  { name: "Mathematics & Basic Sciences", floor: 1, visits: 860 },
  { name: "Management & Commerce", floor: 4, visits: 640 },
  { name: "Mechanical Engineering", floor: 3, visits: 520 },
];
