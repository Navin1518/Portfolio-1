/**
 * Floor-wise layout of the library, used by the Library Guide page.
 * Structured data keeps the map section easy to update later.
 */
export const libraryFloors = [
  {
    floor: 0,
    title: "Ground Floor",
    tagline: "Entry, issue/return and light reading",
    sections: [
      { name: "Competitive Exams & GK Section", shelves: "GK-01 to GK-12" },
      { name: "Language & Communication Section", shelves: "LC-01 to LC-08" },
      { name: "General Reading & Fiction Section", shelves: "GR-01 to GR-10" },
    ],
    zones: ["Newspaper & Magazine Lounge", "Group Discussion Tables"],
    facilities: ["Main Entry Gate & Counter", "Book Issue / Return Desk", "Help Desk", "Bag Lockers"],
  },
  {
    floor: 1,
    title: "First Floor",
    tagline: "Basic sciences and mathematics",
    sections: [
      { name: "Mathematics & Basic Sciences Section", shelves: "M-01 to M-15" },
      { name: "Physics Section", shelves: "P-01 to P-10" },
      { name: "Chemistry Section", shelves: "CH-01 to CH-09" },
    ],
    zones: ["Silent Reading Hall 1", "Individual Study Carrels"],
    facilities: ["Photocopy & Print Point", "Drinking Water Station"],
  },
  {
    floor: 2,
    title: "Second Floor",
    tagline: "Computer science and IT (most visited floor)",
    sections: [
      { name: "Computer Science Section", shelves: "C-01 to C-28" },
      { name: "Programming Lab Reference Section", shelves: "C-01 to C-06" },
      { name: "Journals & Conference Papers (CSE)", shelves: "J-01 to J-06" },
    ],
    zones: ["Digital Library / E-Resource Lab", "Silent Reading Hall 2"],
    facilities: ["Computer Terminals", "Wi-Fi Zone", "Staff Assistance Point"],
  },
  {
    floor: 3,
    title: "Third Floor",
    tagline: "Core engineering branches",
    sections: [
      { name: "Mechanical Engineering Section", shelves: "ME-01 to ME-18" },
      { name: "Civil Engineering Section", shelves: "CE-01 to CE-12" },
      { name: "Electronics & Electrical Section", shelves: "EC-01 to EC-14" },
    ],
    zones: ["Project & Drafting Tables", "Silent Reading Hall 3"],
    facilities: ["Standards & Handbooks Rack", "Staff Assistance Point"],
  },
  {
    floor: 4,
    title: "Fourth Floor",
    tagline: "Management, law, agriculture and research",
    sections: [
      { name: "Management & Commerce Section", shelves: "MG-01 to MG-14" },
      { name: "Law & Legal Studies Section", shelves: "LW-01 to LW-08" },
      { name: "Agriculture Science Section", shelves: "AG-01 to AG-07" },
    ],
    zones: ["Research Scholars Zone", "Thesis & Archive Room"],
    facilities: ["Seminar Room", "Librarian Office"],
  },
];

/** Simple colour-code legend used in the map section. */
export const mapLegend = [
  { label: "Book Shelf Area", tone: "brand" },
  { label: "Reading / Silent Zone", tone: "green" },
  { label: "Help & Service Point", tone: "amber" },
];
