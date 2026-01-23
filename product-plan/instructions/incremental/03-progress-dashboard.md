# Milestone 3: Progress Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1-2 complete (Foundation, Daily Check-In)

## Goal

Implement the Progress Dashboard — visual charts showing weight trends, calorie intake, and workout frequency over time.

## Overview

A visual dashboard showing weight trends, calorie intake, and workout frequency over time. Users can toggle between week and month views, tap data points for details, and compare periods to track their progress.

**Key Functionality:**
- View weight, calorie, and workout frequency charts on a single page
- Toggle between week and month time ranges
- Tap a data point to see that day's details
- Compare current period to previous period
- View summary stats alongside charts

## Recommended Approach: Test-Driven Development

See `product-plan/sections/progress-dashboard/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/progress-dashboard/components/`:

- `ProgressDashboard.tsx` — Main dashboard layout
- `MetricCard.tsx` — Summary stat cards
- `MiniChart.tsx` — Interactive chart component
- `ChartSection.tsx` — Chart with header and controls
- `DayDetailSheet.tsx` — Day detail bottom sheet

### Data Layer

The components expect these data shapes (see `types.ts`):

- `DashboardData` — All data for the dashboard
- `ChartDataPoint` — Individual data points for charts
- `DayDetail` — Detailed info for a specific day

You'll need to:
- Aggregate check-in data into chart-friendly format
- Calculate period comparisons (this week vs last week)
- Provide day-level detail on tap

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onTimeRangeChange` | Called when user toggles week/month |
| `onDaySelect` | Called when user taps a data point |
| `onDayDetailClose` | Called when user closes day detail sheet |

### Empty States

Implement empty state handling for:

- **No data yet:** Show encouraging message to start logging
- **Partial data:** Show charts with available data, gaps visible
- **No data in selected range:** Show "No data for this period"

## Files to Reference

- `product-plan/sections/progress-dashboard/README.md` — Feature overview
- `product-plan/sections/progress-dashboard/tests.md` — Test-writing instructions
- `product-plan/sections/progress-dashboard/components/` — React components
- `product-plan/sections/progress-dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/progress-dashboard/sample-data.json` — Test data
- `product-plan/sections/progress-dashboard/*.png` — Visual reference

## Expected User Flows

### Flow 1: View Weekly Progress

1. User navigates to Progress Dashboard
2. User sees weight, calorie, and workout charts (week view default)
3. User sees summary stats with change indicators
4. **Outcome:** User understands their week at a glance

### Flow 2: Switch to Month View

1. User taps "Month" toggle
2. Charts update to show 30 days of data
3. Summary stats update with monthly comparisons
4. **Outcome:** User sees longer-term trends

### Flow 3: View Day Details

1. User taps a data point on any chart
2. Bottom sheet slides up with that day's full details
3. User sees weight, workout, and meal info for that day
4. User taps to close or swipes down
5. **Outcome:** User can drill into specific days

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard renders with three chart sections
- [ ] Week/Month toggle works
- [ ] Charts display data correctly
- [ ] Summary stats show with change indicators
- [ ] Tapping data points shows day detail
- [ ] Period comparison works (vs previous period)
- [ ] Empty states display properly
- [ ] Responsive on mobile
