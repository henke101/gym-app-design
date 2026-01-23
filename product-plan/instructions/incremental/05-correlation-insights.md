# Milestone 5: Correlation Insights

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1-4 complete

## Goal

Implement the Correlation Insights section — an AI-powered analytics dashboard that surfaces patterns connecting habits to results.

## Overview

A read-only analytics dashboard that surfaces patterns showing how workouts and meals affect weight and strength trends. Insights are displayed in a grid layout with mini charts and use plain language to communicate pattern strength.

**Key Functionality:**
- View dashboard grid of insight cards on page load
- Select time range (7d, 30d, 90d, all time) to filter analysis
- Read insight text with supporting mini chart visualization
- See pattern confidence in plain language ("Strong pattern" vs "Possible pattern")

## Recommended Approach: Test-Driven Development

See `product-plan/sections/correlation-insights/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/correlation-insights/components/`:

- `CorrelationInsights.tsx` — Main dashboard component
- `InsightCard.tsx` — Individual insight card
- `TimeRangeSelector.tsx` — Time range filter
- `MiniBarChart.tsx` — Small chart visualization

### Data Layer

The components expect these data shapes (see `types.ts`):

- `Insight` — Individual insight with title, description, confidence, chart data
- `TimeRange` — Filter options (7d, 30d, 90d, all)
- `ChartDataPoint` — Data for mini charts

You'll need to:
- Generate insights from user data (this is where AI/ML comes in)
- Calculate correlations between habits and outcomes
- Determine confidence levels for patterns

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onTimeRangeChange` | Called when user selects different time range |

### Empty States

Implement empty state handling for:

- **Not enough data:** Show message explaining more logging needed
- **No patterns found:** Show encouraging message to keep logging
- **No insights in time range:** Show "No patterns detected in this period"

## Files to Reference

- `product-plan/sections/correlation-insights/README.md` — Feature overview
- `product-plan/sections/correlation-insights/tests.md` — Test-writing instructions
- `product-plan/sections/correlation-insights/components/` — React components
- `product-plan/sections/correlation-insights/types.ts` — TypeScript interfaces
- `product-plan/sections/correlation-insights/sample-data.json` — Test data
- `product-plan/sections/correlation-insights/*.png` — Visual reference

## Expected User Flows

### Flow 1: View Insights

1. User navigates to Correlation Insights
2. User sees grid of insight cards grouped by confidence
3. Each card shows pattern title, description, metric, and chart
4. **Outcome:** User discovers patterns in their data

### Flow 2: Filter by Time Range

1. User taps time range selector (default: 30 days)
2. User selects different range (e.g., 90 days)
3. Insights recalculate based on new range
4. **Outcome:** User can analyze patterns over different periods

### Flow 3: Understand Pattern Confidence

1. User sees "Strong pattern" and "Possible pattern" labels
2. Strong patterns are grouped first
3. User understands which insights are most reliable
4. **Outcome:** User can prioritize which insights to act on

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard renders with insight cards in grid
- [ ] Insights grouped by confidence level
- [ ] Time range selector works
- [ ] Mini charts render correctly
- [ ] Confidence labels display properly
- [ ] Empty states display when no data
- [ ] Responsive on mobile
