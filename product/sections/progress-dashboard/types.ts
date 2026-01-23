// =============================================================================
// Data Types
// =============================================================================

export interface DailyMetrics {
  date: string
  weight: number
  calories: number
  workedOut: boolean
}

export interface MetricStat {
  current?: number
  average: number
  total?: number
  change: number
  unit?: string
}

export interface WorkoutStat {
  count: number
  total: number
  change: number
}

export interface PeriodSummary {
  timeRange: 'week' | 'month'
  startDate: string
  endDate: string
  weight: MetricStat
  calories: MetricStat
  workouts: WorkoutStat
}

export interface MealDetail {
  name: string
  calories: number
}

export interface WorkoutDetail {
  name: string
  exercises: number
}

export interface DayDetail {
  date: string
  weight: number
  calories: number
  workout: WorkoutDetail | null
  meals: MealDetail[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface ProgressDashboardProps {
  /** Daily metrics data for charting */
  dailyMetrics: DailyMetrics[]
  /** Summary stats for the current week */
  weekSummary: PeriodSummary
  /** Summary stats for the current month */
  monthSummary: PeriodSummary
  /** Currently selected time range */
  selectedTimeRange: 'week' | 'month'
  /** Details for a selected day (when user taps a data point) */
  selectedDayDetail?: DayDetail
  /** Called when user toggles between week and month view */
  onTimeRangeChange?: (range: 'week' | 'month') => void
  /** Called when user taps a data point to view that day's details */
  onDaySelect?: (date: string) => void
  /** Called when user dismisses the day detail view */
  onDayDetailClose?: () => void
}
