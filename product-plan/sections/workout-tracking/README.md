# Workout Tracking Section

## Overview

A progress tracking dashboard for strength exercises, showing how weight lifted and training volume have improved over time. Users see all their exercises at a glance and can filter by custom date ranges to analyze their progression.

## Components

| Component | Description |
|-----------|-------------|
| `WorkoutTracking` | Main dashboard component |
| `ExerciseProgressCard` | Card showing exercise progress |
| `DateRangePicker` | Custom date range selector |
| `MiniSparkline` | Compact trend line chart |

## Props

The main component accepts the following props:

```typescript
interface WorkoutTrackingProps {
  workouts: Workout[]                 // Historical workout data
  exerciseProgress: ExerciseProgress[] // Aggregated progress per exercise
  dateRange: DateRange               // Current filter range

  // Callbacks
  onDateRangeChange?: (range: DateRange) => void
  onExerciseSelect?: (type: ExerciseType) => void
  onWorkoutSelect?: (id: string) => void
}
```

## Usage

```tsx
import { WorkoutTracking } from './components'
import type { Workout, ExerciseProgress, DateRange } from './types'

function WorkoutsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '2025-01-01',
    endDate: '2025-01-23'
  })

  return (
    <WorkoutTracking
      workouts={workouts}
      exerciseProgress={exerciseProgress}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      onExerciseSelect={(type) => console.log('Selected:', type)}
    />
  )
}
```

## Data Types

### ExerciseType

```typescript
type ExerciseType =
  | 'Chest' | 'Lower Back' | 'Upper Back'
  | 'Shoulders' | 'Arms' | 'Legs' | 'Core'
```

Note: Cardio and Walking are excluded from workout tracking.

### ExerciseProgress

```typescript
interface ExerciseProgress {
  type: ExerciseType
  weightTrend: TrendPoint[]  // Weight over time
  volumeTrend: TrendPoint[]  // Volume over time
  latestWeight: number       // Most recent weight
  weightChange: number       // Change in period
  latestVolume: number       // Most recent volume
  volumeChange: number       // Change in period
}

interface TrendPoint {
  date: string
  weight?: number
  volume?: number
}
```

### DateRange

```typescript
interface DateRange {
  startDate: string  // YYYY-MM-DD
  endDate: string    // YYYY-MM-DD
}
```

## UI Features

- **Summary Banner**: Shows X of Y exercises improving
- **Date Range Picker**: Presets + custom range display
- **Exercise Cards**: Grid of all tracked exercises
- **Weight Sparkline**: Mini chart showing weight trend
- **Volume Sparkline**: Mini chart showing volume trend
- **Session Count**: Number of logged sessions

## Date Range Picker

Presets available:
- Last 7 days
- Last 14 days
- Last 30 days
- Last 90 days

Displays current range in `MMM D — MMM D` format.

## Exercise Card Layout

Each card shows:
1. Exercise icon and name
2. Current weight + change indicator
3. Weight sparkline
4. Current volume + change indicator
5. Volume sparkline
6. Session count

## Design Tokens

- Primary: `lime-500` for weight progress, improving state
- Secondary: `amber-500` for volume progress
- Neutral: `zinc` for backgrounds and inactive states
