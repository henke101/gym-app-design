# Progress Dashboard Specification

## Overview
A visual dashboard showing weight trends, calorie intake, and workout frequency over time. Users can toggle between week and month views, tap data points for details, and compare periods to track their progress.

## User Flows
- View weight, calorie, and workout frequency charts on a single page
- Toggle between week and month time ranges
- Tap a data point to see that day's details
- Compare current period to previous period
- View summary stats (averages, totals, change indicators) alongside charts

## UI Requirements
- Three chart sections displayed on one page (stacked or grid layout)
- Week/Month toggle for time range selection
- Summary stat cards showing key numbers for each metric
- Interactive charts with tap-to-view details
- Period comparison indicators (e.g., "+2kg from last month")

## Out of Scope
- Goal setting (handled elsewhere)
- Data entry (handled in Daily Check-In)
- Detailed breakdowns (per-exercise or per-meal details live in other sections)

## Configuration
- shell: true
