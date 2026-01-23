// =============================================================================
// Data Types
// =============================================================================

export type ExerciseType =
  | 'Chest'
  | 'Lower Back'
  | 'Upper Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Core'

export interface Exercise {
  id: string
  type: ExerciseType
  sets: number
  reps: number
  weight: number
}

export interface Workout {
  id: string
  date: string
  name: string
  exercises: Exercise[]
}

export interface TrendPoint {
  date: string
  weight?: number
  volume?: number
}

export interface ExerciseProgress {
  type: ExerciseType
  weightTrend: TrendPoint[]
  volumeTrend: TrendPoint[]
  latestWeight: number
  weightChange: number
  latestVolume: number
  volumeChange: number
}

export interface DateRange {
  startDate: string
  endDate: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface WorkoutTrackingProps {
  /** Historical workout data */
  workouts: Workout[]
  /** Aggregated progress data for each exercise type */
  exerciseProgress: ExerciseProgress[]
  /** Currently selected date range for filtering */
  dateRange: DateRange
  /** Called when user changes the date range filter */
  onDateRangeChange?: (range: DateRange) => void
  /** Called when user selects an exercise to view details */
  onExerciseSelect?: (type: ExerciseType) => void
  /** Called when user selects a workout to view details */
  onWorkoutSelect?: (id: string) => void
}
