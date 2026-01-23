# Milestone 4: Workout Tracking

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1-3 complete

## Goal

Implement the Workout Tracking section — a progress tracking dashboard for strength exercises showing how weight lifted and training volume have improved over time.

## Overview

A progress tracking dashboard for strength exercises, showing how weight lifted and training volume have improved over time. Users see all their exercises at a glance and can filter by custom date ranges to analyze their progression.

**Key Functionality:**
- View overview dashboard showing all strength exercises with progress indicators
- Select custom date range to analyze a specific training period
- See weight lifted over time for each exercise
- See volume (sets × reps × weight) trends for each exercise
- Track progressive overload across workouts

## Recommended Approach: Test-Driven Development

See `product-plan/sections/workout-tracking/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/workout-tracking/components/`:

- `WorkoutTracking.tsx` — Main dashboard component
- `ExerciseProgressCard.tsx` — Individual exercise progress card
- `DateRangePicker.tsx` — Custom date range selector
- `MiniSparkline.tsx` — Small trend line chart

### Data Layer

The components expect these data shapes (see `types.ts`):

- `ExerciseProgress` — Progress data for one exercise type
- `DateRange` — Start and end date for filtering
- `TrendPoint` — Data point for sparkline charts

You'll need to:
- Aggregate exercise data from workouts
- Calculate weight and volume trends
- Filter data by date range

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onDateRangeChange` | Called when user selects new date range |
| `onExerciseSelect` | Called when user taps an exercise card |

### Empty States

Implement empty state handling for:

- **No workout data:** Show message encouraging first workout log
- **No data in range:** Show "No workouts in this period"
- **Exercise with no recent data:** Show card but indicate no recent sessions

## Files to Reference

- `product-plan/sections/workout-tracking/README.md` — Feature overview
- `product-plan/sections/workout-tracking/tests.md` — Test-writing instructions
- `product-plan/sections/workout-tracking/components/` — React components
- `product-plan/sections/workout-tracking/types.ts` — TypeScript interfaces
- `product-plan/sections/workout-tracking/sample-data.json` — Test data
- `product-plan/sections/workout-tracking/*.png` — Visual reference

## Expected User Flows

### Flow 1: View Exercise Progress

1. User navigates to Workout Tracking
2. User sees all 7 strength exercises in a grid
3. Each card shows latest weight, volume, and sparkline trend
4. User sees summary banner ("X of Y exercises improving")
5. **Outcome:** User understands strength progress at a glance

### Flow 2: Filter by Date Range

1. User taps the date range picker
2. User selects a custom range (e.g., last 30 days)
3. All exercise cards update to show data from that range
4. Summary stats recalculate
5. **Outcome:** User can analyze specific training periods

### Flow 3: Track Progressive Overload

1. User views an exercise card (e.g., Chest)
2. User sees weight increased from previous session (+X kg)
3. User sees volume trend in sparkline
4. **Outcome:** User confirms they're progressively overloading

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard renders with all 7 exercise types
- [ ] Each card shows weight, volume, and trends
- [ ] Date range picker works
- [ ] Sparkline charts render correctly
- [ ] Summary banner shows improvement count
- [ ] Empty states display properly
- [ ] Responsive on mobile
