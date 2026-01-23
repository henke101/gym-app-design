# Milestone 2: Daily Check-In

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Daily Check-In feature — the core daily prompt experience for quick logging of weight, workouts, and meals.

## Overview

A single-form daily logging experience where users can quickly record their weight, workouts, and meals. Nothing is mandatory — users fill in only what they know, and the app carries forward previous values (like weight) when unchanged.

**Key Functionality:**
- View today's form with current/previous values displayed
- Optionally update weight (previous value shown if unchanged)
- Mark workout done and select exercise types from a list
- Add exercise details (sets/reps/weight for strength, time/distance for cardio)
- Log calories for each meal slot (Breakfast, Lunch, Dinner, Snacks)
- Submit partial check-ins (anything filled counts)

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/daily-check-in/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/daily-check-in/components/`:

- `DailyCheckInForm.tsx` — Main form component
- `WeightInput.tsx` — Weight entry with previous value
- `WorkoutSection.tsx` — Workout toggle and exercise picker
- `ExerciseCard.tsx` — Individual exercise with detail fields
- `MealsSection.tsx` — Meal slots with kcal inputs
- `DateSelector.tsx` — Date navigation

### Data Layer

The components expect these data shapes (see `types.ts`):

- `DailyCheckIn` — The main form state
- `Exercise` — Strength or cardio exercise with details
- `Meal` — Meal slot with kcal value

You'll need to:
- Create API endpoints for saving/loading check-ins
- Store weight entries for trend tracking
- Store workout data for exercise history

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onSubmit` | Called when user submits the check-in |
| `onDateChange` | Called when user navigates to different date |
| `onAddExercise` | Called when user adds an exercise |
| `onRemoveExercise` | Called when user removes an exercise |
| `onExerciseChange` | Called when exercise details change |
| `onMealChange` | Called when meal kcal changes |
| `onWeightChange` | Called when weight input changes |

### Empty States

Implement empty state handling for:

- **First-time user:** No previous weight to carry forward — show placeholder
- **No exercises selected:** Show exercise picker prompt
- **No meals logged:** Keep meal slots visible but empty

## Files to Reference

- `product-plan/sections/daily-check-in/README.md` — Feature overview
- `product-plan/sections/daily-check-in/tests.md` — Test-writing instructions
- `product-plan/sections/daily-check-in/components/` — React components
- `product-plan/sections/daily-check-in/types.ts` — TypeScript interfaces
- `product-plan/sections/daily-check-in/sample-data.json` — Test data
- `product-plan/sections/daily-check-in/*.png` — Visual reference

## Expected User Flows

### Flow 1: Quick Weight Update

1. User opens Daily Check-In
2. User sees previous weight displayed
3. User updates weight value
4. User clicks "Save Check-In"
5. **Outcome:** Weight is saved, check-in recorded for today

### Flow 2: Log a Workout

1. User toggles "Workout" section open
2. User taps exercise types (e.g., Chest, Arms)
3. User optionally fills in sets/reps/weight for each
4. User clicks "Save Check-In"
5. **Outcome:** Workout with exercises saved to today's check-in

### Flow 3: Log Meals

1. User scrolls to Meals section
2. User enters kcal for Breakfast, Lunch, etc.
3. User clicks "Save Check-In"
4. **Outcome:** Meal data saved for calorie tracking

### Flow 4: Navigate to Past Date

1. User taps date selector
2. User selects a past date
3. User sees that date's existing data (if any)
4. User can edit and re-save
5. **Outcome:** Historical check-in updated

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Form renders with today's date selected
- [ ] Weight input shows previous value as default
- [ ] Exercise picker works with all 9 types
- [ ] Contextual fields show (sets/reps/weight vs time/distance)
- [ ] Meal slots accept kcal input
- [ ] Partial submissions work (not all fields required)
- [ ] Date navigation works
- [ ] Data persists to backend
- [ ] Responsive on mobile
