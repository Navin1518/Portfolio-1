# LPUdesk – Library Desk Availability & Book Finder

A college project web application for Lovely Professional University library users.
LPUdesk helps students (1) check **approximate** desk/seat availability inside the library and
(2) find **where a book is physically kept** — floor, section and shelf number.

> All seat counts, timings and book records in this version are **sample data** created for the
> project demo. They are not official university data.

## Features

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Branding, main actions, feature overview, estimation model explained |
| Desk Availability | `/desk-availability` | Total seats, people inside, vacant desks, occupancy %, status labels, floor-wise table, hourly crowd chart |
| Book Finder | `/book-finder` | Search by title / author / subject / ISBN with category and availability filters; card and table views |
| Library Guide | `/library-guide` | Floor-wise sections, shelf ranges, reading zones, help desks |
| Student Dashboard | `/dashboard` | Occupancy summary, quick search, recent searches, popular sections, timings |
| Admin Demo | `/admin` | Update total seats, entry count and book availability (demo only) |

## Tech Stack

- **React 19** with **Vite** (fast dev server and build)
- **React Router** for page navigation
- **Tailwind CSS v4** for styling (calm academic navy palette)
- **JavaScript** + React Context API for shared state
- **Local dummy data** — no backend required

## Installation & Running

Requires Node.js 20.19+ or 22.12+.

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # create production build in /dist
npm run preview   # preview the production build
```

## Publish on GitHub Pages

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`. Push the project to the `main` branch, then set
**Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

The public site will be available at:
`https://navin1518.github.io/Portfolio-1/`

The app uses hash-based routes so all pages continue to work after a refresh on
GitHub Pages.
