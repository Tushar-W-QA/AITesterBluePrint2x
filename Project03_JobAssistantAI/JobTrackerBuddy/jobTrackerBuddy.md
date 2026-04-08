# 🎯 JobFlow — Personal Job Tracker (Complete Product Spec)

## Overview & Purpose

Build a **production-quality, local-first personal job tracker** as a single-page React application. The tool helps job seekers systematically track every stage of their job search — from discovering a role to receiving an offer or rejection — entirely in the browser with zero backend, zero login, and zero data leaving the device.

---

## Tech Stack (Non-negotiable)

- **React 18+** — functional components, hooks only (no class components)
- **Vite** — project scaffolding and dev server
- **Tailwind CSS** — utility-first styling; no component libraries like MUI or Chakra
- **`idb`** npm package — clean async IndexedDB wrapper (no raw IDB API)
- **`@dnd-kit/core` + `@dnd-kit/sortable`** — drag-and-drop between Kanban columns
- **No backend, no auth, no API calls** — 100% local, works offline

---

## Data Model

Each job card must store **all of the following fields**:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string (UUID) | auto | Generated on creation |
| `company` | string | ✅ | Company name |
| `role` | string | ✅ | Job title / position |
| `status` | enum | ✅ | Maps to Kanban column |
| `linkedinUrl` | URL string | optional | Opens in new tab |
| `jobPostingUrl` | URL string | optional | Direct company JD link (separate from LinkedIn) |
| `resume` | string | optional | Dropdown from saved resume names |
| `dateApplied` | ISO date string | auto | Auto-set on creation, user-editable |
| `followUpDate` | ISO date string | optional | User-set reminder date |
| `salary` | string | optional | e.g. "₹25–30 LPA", "$150–180K" |
| `location` | string | optional | City, remote, hybrid |
| `jobType` | enum | optional | Full-time / Part-time / Contract / Internship |
| `workMode` | enum | optional | Remote / Hybrid / On-site |
| `priority` | enum | optional | High / Medium / Low — shown as colored dot on card |
| `rating` | number 1–5 | optional | Personal interest rating (star display) |
| `contactName` | string | optional | Recruiter or hiring manager name |
| `contactEmail` | string | optional | Recruiter email |
| `contactLinkedIn` | URL string | optional | Recruiter LinkedIn profile |
| `referredBy` | string | optional | Name of referral contact |
| `interviewRounds` | number | optional | Total interview rounds scheduled/completed |
| `currentRound` | number | optional | Current round number |
| `offerDeadline` | ISO date string | optional | Deadline to accept/reject an offer |
| `offerAmount` | string | optional | Final offer CTC / package |
| `rejectionReason` | string | optional | Self-note on why rejected |
| `tags` | string[] | optional | Custom tags e.g. ["FAANG", "startup", "referral"] |
| `notes` | string | optional | Free-text notes |
| `activityLog` | Activity[] | auto | Auto-appended on every status change |
| `createdAt` | ISO datetime | auto | Creation timestamp |
| `updatedAt` | ISO datetime | auto | Last modified timestamp |

### Activity Log Entry Schema

```json
{
  "action": "string",
  "fromStatus": "string (optional)",
  "toStatus": "string (optional)",
  "timestamp": "ISO string",
  "note": "string (optional)"
}
```

---

## Kanban Columns & Status Enum

```
wishlist → applied → screening → interview → offer → accepted | rejected | withdrawn
```

| Column | Color Accent | Description |
|---|---|---|
| Wishlist | Indigo `#6366F1` | Jobs saved to apply later |
| Applied | Blue `#3B82F6` | Application submitted |
| Screening | Amber `#F59E0B` | Phone/HR screen scheduled or done |
| Interview | Purple `#8B5CF6` | Technical or panel rounds ongoing |
| Offer | Emerald `#10B981` | Offer received |
| Accepted | Green `#22C55E` | Offer accepted — you got the job! |
| Rejected | Red `#EF4444` | Application rejected |
| Withdrawn | Gray `#6B7280` | You withdrew the application |

---

## Core Features (All Required)

### Kanban Board

- Horizontal scroll on laptop; columns are fixed-width (min 280px, max 320px)
- Each column scrolls independently (`overflow-y: auto`)
- Column header shows: status label, card count badge, and a "+ Add" quick button
- Cards are draggable between columns using `@dnd-kit`
- Dropping a card on a new column auto-updates status and logs the move in `activityLog`
- Visual drop indicator (highlighted column + insertion line) during drag

### Job Card (Compact View)

Must display:

- Company name (bold) + role (subtitle)
- Priority dot (colored) + personal rating (stars, muted)
- Location + work mode badge (e.g. "Remote", "Bangalore · Hybrid")
- Resume used — shown as a monospace tag/chip
- Days since applied (e.g. "3d ago", "2w ago") — color-coded: green < 7d, amber 7–30d, red > 30d
- Follow-up date indicator — shows 🔔 if follow-up date is today or overdue
- LinkedIn icon (clickable, opens new tab) + company website icon if URL provided
- Tags (up to 3 visible, rest collapsed with "+N more")
- Hover state: subtle elevation + reveal Edit / Delete action buttons
- Click anywhere on card (except action buttons) to open the detail/edit modal

### Add / Edit Job Modal

- Triggered by "+ Add Job" button (header) or column-level "+ Add" button (pre-fills status)
- Slide-over panel from the right — full-height, 480px wide on desktop
- Tabbed layout inside: **Overview | Contact | Interview | Notes**
- All fields from the data model organized across tabs
- Resume field: combo input — shows dropdown of previously used resume names + allows typing new one
- Saves new resume names to a separate `resumes` IndexedDB store for future autocomplete
- Tags field: multi-input with Enter-to-add and × to remove
- Validation: company and role required; show inline red error messages
- Save button disabled until required fields are filled
- "Save & Add Another" button for rapid data entry
- Keyboard shortcut: `Escape` closes the panel, `Cmd/Ctrl + Enter` saves

### Search & Filter Bar (Sticky, Below Header)

- Live text search across: company, role, tags, location, contact name, notes
- Filter dropdowns: Status | Priority | Work Mode | Job Type | Resume Used | Date Range
- Active filter count badge on the filter button
- "Clear all filters" one-click reset
- Results count shown: "Showing 12 of 47 jobs"

### Card Detail View (Expanded)

- Click a card to open a read/edit view — same slide-over panel
- Shows full activity log timeline at the bottom
- Inline editing: click any field to edit it in place
- "Add Note" button appends timestamped notes to the log

---

## Nice-to-Have Features (All Should Be Implemented)

### Dashboard / Stats Page

- Toggle between **Board view** and **Dashboard view** from the header
- Stats cards: Total Applications, Active Pipeline, Interview Rate %, Offer Rate %, Avg. days to response
- Bar chart: applications per week/month (canvas or SVG — no chart library needed)
- Funnel visualization: Wishlist → Applied → Interview → Offer → Accepted
- Most-used resume names ranked by usage count
- Top companies by application count
- Calendar heatmap of application activity (like GitHub's contribution graph)

### Reminder & Follow-up System

- Cards with `followUpDate` set show a bell icon
- Header notification badge shows count of overdue follow-ups
- Clicking the badge opens a filtered view of all due/overdue follow-ups
- Option to mark a follow-up as done (clears the date, logs the action)

### Resume Manager

- Dedicated section (accessible from header) to manage resume names
- Add / rename / delete resume names
- Shows how many jobs used each resume
- Allows attaching a URL (Google Drive / Dropbox link) to each resume name

### Goal Tracker

- User sets a weekly application goal (e.g. "5 applications/week")
- Progress bar in the header showing current week's progress
- Streak counter for consecutive weeks meeting the goal

### Export / Import / Backup

- Export: downloads `jobflow-backup-YYYY-MM-DD.json` with all jobs, resumes, settings
- Import: JSON file picker — merges by ID (no duplicates), shows import summary
- Export as **CSV** (flattened) for spreadsheet use
- One-click "Copy all data" to clipboard as JSON

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `N` | Open Add Job form |
| `Escape` | Close any open modal/panel |
| `Cmd/Ctrl + F` | Focus search bar |
| `/` | Focus search bar (alternative) |
| `Cmd/Ctrl + Enter` | Save current form |
| `D` | Toggle dark mode |

### Dark Mode

- System preference detected on first load (`prefers-color-scheme`)
- Manual toggle in header (sun/moon icon)
- Preference persisted in IndexedDB `settings` store
- Smooth transition on toggle (150ms)

### Sorting & Grouping

- Per-column sort: Date Applied (newest/oldest), Priority (high first), Company (A–Z), Rating
- Global sort applies to all columns simultaneously
- Group by: Work Mode, Job Type, Priority — stacks cards with group labels

---

## UI / UX Design Spec

### Visual Identity

- **Font**: Geist (display) + Geist Mono (code/tags) — load from Bunny Fonts
- **Aesthetic**: Refined utilitarian — like Linear meets Notion. Precise, calm, zero-noise.
- **Background**: Off-white `#F8F7F4` light / Near-black `#111110` dark
- **Surface**: Pure white cards with `1px rgba(0,0,0,0.07)` borders, `border-radius: 10px`
- **Accent**: Deep blue `#1D4ED8` as primary action color
- **No decorative gradients** — flat colors only. Depth through shadow and spacing.

### Column Color System

Each column has a unique left-border accent and a tinted header background (5% opacity tint):

| Column | Hex |
|---|---|
| Wishlist | `#6366F1` (indigo) |
| Applied | `#3B82F6` (blue) |
| Screening | `#F59E0B` (amber) |
| Interview | `#8B5CF6` (purple) |
| Offer | `#10B981` (emerald) |
| Accepted | `#22C55E` (green) |
| Rejected | `#EF4444` (red) |
| Withdrawn | `#6B7280` (gray) |

### Layout Structure

- **Header** (56px): Logo left | Search center | Actions right (Dashboard toggle, Add Job, Theme, Export)
- **Filter bar** (40px): Sticky below header, full-width, horizontal scroll on overflow
- **Board**: Full remaining viewport height, horizontal scroll, columns side by side
- **Slide-over panel**: 480px wide, slides in from right, overlay backdrop with blur
- **Responsive**: Tablet (768px+) shows 3 columns at a time with horizontal scroll

### Micro-interactions

- Card lift on hover (`translateY(-2px)` + deeper shadow)
- Smooth column drop highlight (background tint + border glow)
- Form fields: focus ring in accent color
- Status change: card briefly flashes the target column's accent color after drop
- Delete: card slides out to the right with fade before removal
- Add card: new card slides in from the top of the column

### Empty States

- **Empty column**: Dashed border box with column icon and "No jobs here yet — drag one here or click + Add"
- **Empty search**: Illustration + "No jobs match your search" + "Clear filters" button
- **Fresh app (zero jobs)**: Full onboarding empty state with a sample card overlay and "Add your first job" CTA

### Accessibility

- All interactive elements keyboard-focusable with visible focus rings
- ARIA labels on icon-only buttons
- Screen reader announcements on drag-and-drop completion
- Color is never the sole indicator of status (always paired with text/icon)
- Minimum touch target 44×44px on tablet

---

## IndexedDB Schema

### Object Store: `jobs`

- `keyPath: 'id'`
- Indexes: `status`, `dateApplied`, `priority`, `followUpDate`, `createdAt`

### Object Store: `resumes`

- `keyPath: 'name'`
- Fields: `name`, `url` (optional), `usageCount`, `createdAt`

### Object Store: `settings`

- `keyPath: 'key'`
- Entries: `theme`, `weeklyGoal`, `sortPreference`, `columnOrder`, `onboardingComplete`

### Object Store: `activityLog`

- `keyPath: 'id'` (UUID)
- Fields: `jobId`, `action`, `fromStatus`, `toStatus`, `note`, `timestamp`
- Indexes: `jobId`, `timestamp`

---

## Recommended File Structure

```
jobflow/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── db.js           # All IndexedDB operations via idb
    │   ├── constants.js    # COLUMNS, STATUS_COLORS, ENUMS
    │   └── utils.js        # uid(), daysSince(), formatDate(), etc.
    ├── hooks/
    │   ├── useJobs.js      # All CRUD + real-time state sync
    │   ├── useTheme.js     # Dark mode logic
    │   ├── useSearch.js    # Search + filter logic
    │   └── useSettings.js  # User preferences
    └── components/
        ├── Board/
        │   ├── Board.jsx
        │   ├── Column.jsx
        │   └── DragOverlay.jsx
        ├── Card/
        │   ├── JobCard.jsx
        │   └── CardSkeleton.jsx
        ├── Forms/
        │   ├── JobSlideOver.jsx
        │   ├── JobForm.jsx
        │   └── TagInput.jsx
        ├── Dashboard/
        │   ├── Dashboard.jsx
        │   ├── StatsGrid.jsx
        │   ├── FunnelChart.jsx
        │   └── ActivityCalendar.jsx
        ├── Header/
        │   ├── Header.jsx
        │   └── SearchBar.jsx
        ├── Filters/
        │   └── FilterBar.jsx
        └── UI/
            ├── Button.jsx
            ├── Badge.jsx
            ├── Modal.jsx
            ├── ConfirmDialog.jsx
            ├── Tooltip.jsx
            └── EmptyState.jsx
```

---

## Quality Requirements

- No `console.error` or React key warnings in production
- All async operations wrapped in `try/catch` with user-facing error toasts
- Optimistic UI updates — state updates instantly, DB writes happen in background
- No memory leaks — all event listeners and subscriptions cleaned up
- Works in Chrome, Firefox, Safari, Edge (latest 2 versions each)
- Lighthouse score targets: Performance ≥ 90, Accessibility ≥ 95