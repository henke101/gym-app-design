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
  | 'Cardio'
  | 'Walking'

export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'

/** Strength exercise with sets, reps, and weight */
export interface StrengthExercise {
  id: string
  type: Exclude<ExerciseType, 'Cardio' | 'Walking'>
  sets: number | null
  reps: number | null
  weight: number | null
}

/** Cardio/walking exercise with time and distance */
export interface CardioExercise {
  id: string
  type: 'Cardio' | 'Walking'
  time: number | null
  distance: number | null
}

export type Exercise = StrengthExercise | CardioExercise

export interface Workout {
  completed: boolean
  exercises: Exercise[]
}

export interface Meals {
  breakfast: number | null
  lunch: number | null
  dinner: number | null
  snacks: number | null
}

export interface DailyCheckIn {
  id: string
  date: string
  weight: number | null
  workout: Workout
  meals: Meals
}

export interface Streak {
  currentStreak: number
  longestStreak: number
  lastLoggedDate: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface DailyCheckInProps {
  /** List of all daily check-ins (past entries) */
  dailyCheckIns: DailyCheckIn[]
  /** Available exercise types to choose from */
  exerciseTypes: ExerciseType[]
  /** Available meal slots */
  mealSlots: MealSlot[]
  /** Current streak information */
  streak: Streak
  /** Previous weight value to use as placeholder/default */
  previousWeight: number | null
  /** Currently selected date (defaults to today) */
  selectedDate?: string

  // --- Callbacks ---

  /** Called when user selects a different date to view/edit */
  onSelectDate?: (date: string) => void
  /** Called when user updates the weight for a check-in */
  onUpdateWeight?: (checkInId: string, weight: number | null) => void
  /** Called when user marks workout as completed/not completed */
  onToggleWorkout?: (checkInId: string, completed: boolean) => void
  /** Called when user adds an exercise to a workout */
  onAddExercise?: (checkInId: string, exerciseType: ExerciseType) => void
  /** Called when user removes an exercise from a workout */
  onRemoveExercise?: (checkInId: string, exerciseId: string) => void
  /** Called when user updates exercise details */
  onUpdateExercise?: (checkInId: string, exerciseId: string, updates: Partial<Exercise>) => void
  /** Called when user updates a meal's kcal */
  onUpdateMeal?: (checkInId: string, slot: MealSlot, kcal: number | null) => void
  /** Called when user submits/saves the check-in */
  onSubmit?: (checkInId: string) => void
}
