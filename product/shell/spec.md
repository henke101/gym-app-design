# Application Shell Specification

## Overview
MbareteGainz uses an adaptive navigation pattern: bottom tab bar on mobile for thumb-friendly access, sidebar navigation on desktop for a dashboard experience. The shell prioritizes quick access to daily logging while keeping progress and insights easily reachable.

## Navigation Structure
- **Check-In** (ClipboardCheck icon) → Daily Check-In section
- **Progress** (TrendingUp icon) → Progress Dashboard
- **Workouts** (Dumbbell icon) → Workout Tracking
- **Insights** (Lightbulb icon) → Correlation Insights

## Default View Logic
- If today's check-in is incomplete → Navigate to Daily Check-In
- If today's check-in is complete → Navigate to Progress Dashboard

## User Menu
- **Mobile:** Avatar icon in the top-right header, opens dropdown
- **Desktop:** Avatar + user name at bottom of sidebar, opens dropdown
- **Dropdown contents:** Profile, Settings, Logout

## Layout Pattern

### Mobile (Bottom Navigation)
- Fixed header with logo (left) and user avatar (right)
- Content area fills remaining space
- Fixed bottom tab bar with 4 navigation items (icon + label)
- Active item highlighted with primary color (lime)

### Desktop (Sidebar)
- Fixed sidebar on left (240px width)
- Logo at top of sidebar
- Navigation items in middle (icon + label, vertical stack)
- User menu at bottom of sidebar
- Content area fills remaining space to the right

## Responsive Behavior
- **Mobile (<768px):** Bottom tab bar, header with avatar
- **Tablet (768px-1024px):** Collapsible sidebar or bottom nav (user preference)
- **Desktop (>1024px):** Persistent sidebar on left

## Design Tokens
- **Primary (lime):** Active nav items, selected states
- **Secondary (amber):** Streak indicators, achievement highlights
- **Neutral (zinc):** Backgrounds, borders, inactive text
- **Heading font (DM Serif Display):** Logo
- **Body font (Inter):** Navigation labels, UI text
- **Mono font (JetBrains Mono):** Numbers, stats

## Design Notes
- Keep navigation minimal — only 4 items, no nested menus
- Active state should be clearly visible (lime accent)
- Smooth transitions between nav items (no jarring page reloads)
- Dark mode support required (zinc neutrals work well in both modes)
