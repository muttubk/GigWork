# GigWork — On-Demand Skilled Workers Platform

A React + Tailwind CSS web application for connecting clients with freelance workers across all industries — hourly or daily.

## Tech Stack
- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- **Vite** — build tool & dev server
- **Lucide React** — icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout wrapper
│   ├── ui/            # Reusable atoms: Button, Badge, Avatar, WorkerCard, etc.
│   └── sections/      # Landing page sections: Hero, Categories, HowItWorks, etc.
├── pages/             # Route-level page components
├── hooks/             # Custom React hooks (auth, fetch, etc.)
├── context/           # React context providers (AuthContext, etc.)
├── utils/             # Helper functions
├── constants.js       # All static data (categories, workers, stats)
├── router.jsx         # Route definitions
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

## Pages (Planned)
| Route              | Page                | Status      |
|--------------------|---------------------|-------------|
| `/`                | Landing Page        | ✅ Complete  |
| `/browse`          | Browse Workers      | 🔜 Next      |
| `/worker/:id`      | Worker Profile      | 🔜 Planned   |
| `/post-job`        | Post a Job          | 🔜 Planned   |
| `/dashboard`       | Dashboard           | 🔜 Planned   |
| `/login`           | Login / Register    | 🔜 Planned   |

## Brand Colors
- **Brand green**: `#1B4332` (brand-600)
- **Gold accent**: `#C9892A` (gold-400)
- **Font**: Fraunces (serif, headings) + DM Sans (body)
