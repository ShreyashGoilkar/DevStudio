# DevStudio — Developer Portfolio & Project Workspace

A premium, interactive developer portfolio with built-in tools developers actually use. Built as a competition-ready project for hackathon/Webathon events.

## Features

### Portfolio & Showcase
- **Hero section** with animated gradient typography and feature highlights
- **Project Showcase** — searchable, filterable gallery of demo projects with detail modals
- **Technology Stack** — organized by category (Frontend, Backend, Database, DevOps) with descriptions
- **Learning Resources** — curated links to documentation and courses

### Developer Tools (all functional)
- **JSON Formatter & Validator** — validate, format, minify, and copy JSON with clear error messages
- **Color Palette Generator** — generate coordinated color schemes, copy individual HEX codes or the full palette
- **Code Snippet Manager** — create, edit, delete, search, and copy code snippets; persisted in localStorage
- **Developer Resource Directory** — 20 curated resources with category filters and search; external links open safely in new tabs

### Mini Project Manager
- Add, edit, and delete projects with name, description, and status
- Track statuses: Planned, In Progress, Completed
- Dashboard showing project counts by status
- Search and filter by status
- Sample projects included (clearly labeled, removable)
- All data persisted in localStorage

### Contact
- Validated form (name, email, subject, message) with field-level error messages
- No email backend connected — clearly disclosed with a notice
- "Send via Email" button opens the user's mail client via mailto with pre-filled content
- Copy email address to clipboard

### UX & Design
- Sticky responsive navbar with scroll-spy active link highlighting
- Working mobile menu
- Toast notifications for actions (copy, save, delete, etc.)
- Reduced-motion media query support for accessibility
- Keyboard-navigable controls and focus states
- Dark theme with green accent and cyan-to-blue gradient typography
- No horizontal overflow on mobile

## Technology Stack
- **React 18** — UI framework
- **TypeScript** — type safety
- **Vite** — build tooling and dev server
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Type-check
npm run typecheck
```

## Deployment

This is a static site with no backend requirement. Deploy to any static hosting service:

### GitHub Pages
1. Run `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch (or use a GitHub Actions workflow)
3. Enable GitHub Pages in repository settings

### Netlify
1. Run `npm run build`
2. Drag the `dist/` folder onto Netlify, or connect the repo with build command `npm run build` and publish directory `dist`

### Vercel
1. Import the repo
2. Vercel auto-detects Vite — build command and output directory are set automatically

## Data Persistence

All client-side data (code snippets, mini projects, contact form drafts) is stored in the browser's localStorage. No server or database is required. Data persists across page refreshes but is scoped to each browser.

## Important Notes

- The contact form does **not** send emails automatically. No email backend is connected. Use the "Send via Email" button to open your mail client.
- Project showcase items are demo projects. Source links point to GitHub but are placeholders to be replaced with real repository URLs.
- No fictional personal claims, invented metrics, or fake statistics are included.
