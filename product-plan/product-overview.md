# MbareteGainz — Product Overview

## Summary

A lightweight fitness tracking app that uses daily prompts and correlation insights to help users understand how their habits affect their progress. MbareteGainz focuses on simplicity and actionable data rather than overwhelming users with complex metrics.

## Planned Sections

1. **Daily Check-In** — The core daily prompt experience for quick logging of weight, workouts, and meals.
2. **Progress Dashboard** — Visual charts showing weight trends, strength progress, and streak tracking.
3. **Workout Tracking** — Detailed exercise logging with sets, reps, and weights history.
4. **Correlation Insights** — AI-powered analytics that surface patterns connecting habits to results.

## Data Model

**Core Entities:**
- **User** — The person using the app, tracking their fitness journey
- **DailyCheckIn** — A single day's quick log entry for the daily prompt experience
- **WeightEntry** — A bodyweight measurement recorded on a specific date
- **Workout** — A training session on a specific date
- **Exercise** — A specific movement performed within a workout
- **Meal** — A logged meal on a specific date
- **Streak** — Tracks consecutive days of logging
- **Insight** — An AI-generated correlation pattern

**Relationships:**
- User has many DailyCheckIns, WeightEntries, Workouts, Meals, and Insights
- User has one Streak
- Workout has many Exercises
- DailyCheckIn may reference that day's WeightEntry, Workout(s), and Meal(s)

## Design System

**Colors:**
- Primary: `lime` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `zinc` — Used for backgrounds, text, borders

**Typography:**
- Heading: DM Serif Display
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Daily Check-In** — Core daily logging form for weight, workouts, and meals
3. **Progress Dashboard** — Visual charts for weight, calories, and workout frequency
4. **Workout Tracking** — Strength exercise progress tracking with charts
5. **Correlation Insights** — AI-powered analytics dashboard

Each milestone has a dedicated instruction document in `product-plan/instructions/incremental/`.
