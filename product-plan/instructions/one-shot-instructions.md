# MbareteGainz — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

## Product Overview

**MbareteGainz** is a lightweight fitness tracking app that uses daily prompts and correlation insights to help users understand how their habits affect their progress.

**Sections:**
1. Daily Check-In — Quick daily logging of weight, workouts, and meals
2. Progress Dashboard — Visual charts for trends and progress tracking
3. Workout Tracking — Strength exercise progress with progressive overload tracking
4. Correlation Insights — AI-powered pattern discovery

**Design System:**
- Primary: `lime` | Secondary: `amber` | Neutral: `zinc`
- Fonts: DM Serif Display (headings), Inter (body), JetBrains Mono (numbers)

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Color Palette:**
- Primary: `lime` — Active states, primary buttons, key accents
- Secondary: `amber` — Streak indicators, achievement highlights
- Neutral: `zinc` — Backgrounds, borders, inactive text

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:** User, DailyCheckIn, WeightEntry, Workout, Exercise, Meal, Streak, Insight

### 3. Routing Structure

Create placeholder routes:
- `/` or `/check-in` → Daily Check-In
- `/progress` → Progress Dashboard
- `/workouts` → Workout Tracking
- `/insights` → Correlation Insights

### 4. Application Shell

Copy shell components from `product-plan/shell/components/`:
- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation (bottom tabs mobile, sidebar desktop)
- `UserMenu.tsx` — User menu with avatar

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for all sections
- [ ] Shell renders with working navigation
- [ ] Responsive on mobile and desktop
- [ ] Dark mode works

---

# Milestone 2: Daily Check-In

## Goal

Implement the core daily prompt experience for quick logging of weight, workouts, and meals.

## Overview

A single-form daily logging experience where users can quickly record their weight, workouts, and meals. Nothing is mandatory — users fill in only what they know.

## Components

- `DailyCheckInForm.tsx` — Main form component
- `WeightInput.tsx` — Weight entry with previous value
- `WorkoutSection.tsx` — Workout toggle and exercise picker
- `ExerciseCard.tsx` — Individual exercise with detail fields
- `MealsSection.tsx` — Meal slots with kcal inputs
- `DateSelector.tsx` — Date navigation

## Key User Flows

1. **Quick Weight Update** — Open form, update weight, save
2. **Log a Workout** — Toggle workout, select exercises, add details, save
3. **Log Meals** — Enter kcal for each meal slot, save
4. **Navigate to Past Date** — Select date, view/edit historical data

## Done When

- [ ] Tests pass for key user flows
- [ ] Form renders with today's date
- [ ] Weight shows previous value as default
- [ ] Exercise picker works (all 9 types)
- [ ] Contextual fields show correctly
- [ ] Partial submissions work
- [ ] Data persists to backend

---

# Milestone 3: Progress Dashboard

## Goal

Implement visual charts showing weight trends, calorie intake, and workout frequency over time.

## Overview

A visual dashboard with three chart sections. Users can toggle between week and month views and tap data points for details.

## Components

- `ProgressDashboard.tsx` — Main dashboard layout
- `MetricCard.tsx` — Summary stat cards
- `MiniChart.tsx` — Interactive chart component
- `ChartSection.tsx` — Chart with header and controls
- `DayDetailSheet.tsx` — Day detail bottom sheet

## Key User Flows

1. **View Weekly Progress** — See all three charts with summary stats
2. **Switch to Month View** — Toggle time range, charts update
3. **View Day Details** — Tap data point, see that day's full details

## Done When

- [ ] Tests pass for key user flows
- [ ] Three chart sections render
- [ ] Week/Month toggle works
- [ ] Tapping data points shows day detail
- [ ] Period comparison works
- [ ] Empty states display properly

---

# Milestone 4: Workout Tracking

## Goal

Implement strength exercise progress tracking with charts for weight lifted and volume trends.

## Overview

A progress dashboard for strength exercises showing how weight lifted and training volume have improved over time.

## Components

- `WorkoutTracking.tsx` — Main dashboard component
- `ExerciseProgressCard.tsx` — Individual exercise progress card
- `DateRangePicker.tsx` — Custom date range selector
- `MiniSparkline.tsx` — Small trend line chart

## Key User Flows

1. **View Exercise Progress** — See all 7 exercises with sparkline trends
2. **Filter by Date Range** — Select custom range, data updates
3. **Track Progressive Overload** — View weight increases over time

## Done When

- [ ] Tests pass for key user flows
- [ ] Dashboard shows all 7 exercise types
- [ ] Each card shows weight, volume, trends
- [ ] Date range picker works
- [ ] Summary banner shows improvement count

---

# Milestone 5: Correlation Insights

## Goal

Implement AI-powered analytics dashboard that surfaces patterns connecting habits to results.

## Overview

A read-only analytics dashboard that surfaces patterns showing how workouts and meals affect weight and strength trends.

## Components

- `CorrelationInsights.tsx` — Main dashboard component
- `InsightCard.tsx` — Individual insight card
- `TimeRangeSelector.tsx` — Time range filter
- `MiniBarChart.tsx` — Small chart visualization

## Key User Flows

1. **View Insights** — See grid of insight cards grouped by confidence
2. **Filter by Time Range** — Select different range, insights recalculate
3. **Understand Confidence** — Strong patterns grouped first

## Done When

- [ ] Tests pass for key user flows
- [ ] Dashboard renders insight cards in grid
- [ ] Insights grouped by confidence level
- [ ] Time range selector works
- [ ] Mini charts render correctly
- [ ] Empty states display when no data

---

## Files Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Entity types and relationships
- `product-plan/shell/` — Application shell components
- `product-plan/sections/` — All section components, types, data, tests
