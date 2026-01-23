# Correlation Insights Specification

## Overview
A read-only analytics dashboard that surfaces patterns showing how workouts and meals affect weight and strength trends. Insights are displayed in a grid layout with mini charts and use plain language to communicate pattern strength.

## User Flows
- View dashboard grid of insight cards on page load
- Select time range (7d, 30d, 90d, all time) to filter analysis
- Read insight text with supporting mini chart visualization
- See pattern confidence in plain language ("Strong pattern" vs "Possible pattern")

## UI Requirements
- Dashboard grid layout of insight cards
- Time range selector (7d, 30d, 90d, all time)
- Each insight card includes:
  - Pattern description in plain text
  - Mini chart/visualization showing the correlation
  - Confidence indicator using simple language
- Read-only — no actions or tap-through details

## Out of Scope
- No personalized recommendations ("you should do X")

## Configuration
- shell: true
