# 🚀 Local-First Job Tracker (Production-Ready Prompt)

## 🎯 Goal
Build a **production-quality, local-first Job Tracker web app** as a **single-page React application** using **Vite**, designed for personal job tracking with a clean, professional UI similar to Linear/Trello.

The app must be:
- Fully functional and bug-free
- Optimized for performance
- Persist data locally using IndexedDB (via `idb`)
- No backend, no authentication (100% offline-first)

---

## 🧱 Tech Stack
- React 18+ (functional components + hooks)
- Vite (latest version)
- Tailwind CSS (modern UI styling)
- IndexedDB using `idb` package
- Drag-and-drop: `@dnd-kit/core`
- Icons: `lucide-react`
- State management: React Context API or Zustand

---

## 🗃️ Data Model (Job Entity)

### 🔹 Required Fields
- `id` (UUID)
- `companyName` (string, required)
- `jobTitle` (string, required)
- `status` (enum: wishlist | applied | follow-up | interview | offer | rejected)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### 🔹 Optional Fields
- `linkedinUrl` (URL, clickable)
- `resumeUsed` (string, dropdown with reusable values)
- `dateApplied` (date, default = today)
- `salaryRange` (string)
- `location` (string)
- `jobType` (Full-time / Contract / Internship)
- `notes` (textarea)
- `priority` (Low / Medium / High)
- `tags` (array)

---

## 📊 Kanban Board Structure

Columns:
1. Wishlist
2. Applied
3. Follow-up
4. Interview
5. Offer
6. Rejected

### Features:
- Drag-and-drop between columns
- Smooth animations
- Column-wise card count
- Independent scroll per column
- Optional column collapsing

---

## 🧩 Core Features

### ✅ Job Management
- Add Job (modal / slide-over form)
- Edit Job (prefilled form)
- Delete Job (confirmation dialog)
- Inline quick edit for status & notes

### ✅ Card UI Must Display
- Company Name
- Job Title
- Resume Tag
- Days since applied
- Priority indicator
- Clickable LinkedIn icon

---

## 🔍 Search & Filtering
- Global search (company + role)
- Filter by:
  - Status
  - Priority
  - Job type
- Tag-based filtering

---

## 💾 Persistence
- IndexedDB via `idb`
- Auto-save on every CRUD action
- Load data on app start
- No data loss on refresh

---

## 🌟 Advanced Features

### 📈 Dashboard
- Total applications
- Interviews count
- Offers count

### ⏰ Follow-Up Reminder
- Reminder date
- Highlight overdue follow-ups

### 📂 Resume Management
- Save reusable resume names
- Auto-suggest resumes

### 📤 Backup & Restore
- Export JSON
- Import JSON
- Validation on import

---

## 🎨 UI/UX Enhancements
- Light/Dark mode toggle
- Smooth transitions
- Toast notifications
- Skeleton loaders

---

## ⚙️ Sorting
- Sort by:
  - Newest
  - Oldest
  - Priority

---

## 🧠 Smart UX
- Auto-focus inputs
- Keyboard shortcuts:
  - `N` → New job
  - `/` → Search
- Duplicate entry warning

---

## 📱 Responsive Design
- Desktop: full Kanban
- Tablet: scrollable columns
- Mobile: stacked layout

---

## 🎨 Design Guidelines
- Minimal UI (Linear/Trello style)
- Rounded cards
- Soft shadows
- Status colors:
  - Wishlist → Gray
  - Applied → Blue
  - Interview → Yellow
  - Offer → Green
  - Rejected → Red

---

## 🧪 Validation & Error Handling
- Required field validation
- URL validation
- IndexedDB error handling
- Delete confirmation

---

## 📁 Project Structure

src/
 ├── components/
 ├── features/jobs/
 ├── hooks/
 ├── db/
 ├── utils/
 ├── context/ or store/
 ├── App.jsx

---

## 🚀 Final Output Requirements
- Fully working code
- Clean and modular structure
- No console errors
- Run with:
  npm install
  npm run dev

---

## 🔥 Bonus
- PWA support
- Local notifications
- CSV export