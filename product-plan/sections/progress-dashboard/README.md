# Progress Dashboard Section

## Overview

A visual dashboard showing weight trends, calorie intake, and workout frequency over time. Users can toggle between week and month views, tap data points for details, and compare periods to track their progress.

## Components

| Component | Description |
|-----------|-------------|
| `ProgressDashboard` | Main dashboard component with all charts |
| `MetricCard` | Summary stat card for key metrics |
| `ChartSection` | Wrapper for chart with title/subtitle |
| `MiniChart` | Interactive chart (line, bar, or dots) |
| `DayDetailSheet` | Bottom sheet showing day details |

## Props

The main component accepts the following props:

```typescript
interface ProgressDashboardProps {
  dailyMetrics: DailyMetrics[]        // Daily data for charts
  weekSummary: PeriodSummary          // Summary for week view
  monthSummary: PeriodSummary         // Summary for month view
  selectedTimeRange: 'week' | 'month' // Current view
  selectedDayDetail?: DayDetail       // Day detail to show (if any)

  // Callbacks
  onTimeRangeChange?: (range: 'week' | 'month') => void
  onDaySelect?: (date: string) => void
  onDayDetailClose?: () => void
}
```

## Usage

```tsx
import { ProgressDashboard } from './components'
import type { DailyMetrics, PeriodSummary, DayDetail } from './types'

function ProgressPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')
  const [selectedDay, setSelectedDay] = useState<DayDetail | undefined>()

  return (
    <ProgressDashboard
      dailyMetrics={metrics}
      weekSummary={weekStats}
      monthSummary={monthStats}
      selectedTimeRange={timeRange}
      selectedDayDetail={selectedDay}
      onTimeRangeChange={setTimeRange}
      onDaySelect={(date) => setSelectedDay(getDayDetail(date))}
      onDayDetailClose={() => setSelectedDay(undefined)}
    />
  )
}
```

## Data Types

### DailyMetrics

```typescript
interface DailyMetrics {
  date: string      // YYYY-MM-DD
  weight: number    // kg
  calories: number  // kcal
  workedOut: boolean
}
```

### PeriodSummary

```typescript
interface PeriodSummary {
  timeRange: 'week' | 'month'
  startDate: string
  endDate: string
  weight: MetricStat
  calories: MetricStat
  workouts: WorkoutStat
}

interface MetricStat {
  current?: number
  average: number
  change: number   // vs previous period
}

interface WorkoutStat {
  count: number
  total: number
  change: number
}
```

### DayDetail

```typescript
interface DayDetail {
  date: string
  weight: number
  calories: number
  workout: WorkoutDetail | null
  meals: MealDetail[]
}
```

## UI Features

- **Week/Month Toggle**: Switch between time ranges
- **Progress Message**: Contextual message about weight change
- **Summary Cards**: Weight, Avg Calories, Workout count
- **Weight Chart**: Line chart with smooth curves
- **Calorie Chart**: Bar chart showing daily intake
- **Training Days**: Dot indicators for workout days
- **Day Detail Sheet**: Tap data point for details

## Charts

### Line Chart (Weight)
- Smooth Bezier curves
- Y-axis labels with padding
- Interactive data points
- Area fill under line

### Bar Chart (Calories)
- Date-based positioning
- Hover states
- Click to select day

### Dot Chart (Workouts)
- Checkmark for workout days
- Small dot for rest days
- Baseline connecting all days

## Design Tokens

- Primary: `lime-500` for weight/calorie accents
- Secondary: `amber-500` for workout indicators
- Neutral: `zinc` for backgrounds and text
