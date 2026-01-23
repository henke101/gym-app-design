# Daily Check-In Section

## Overview

A single-form daily logging experience where users can quickly record their weight, workouts, and meals. Nothing is mandatory — users fill in only what they know, and the app carries forward previous values (like weight) when unchanged.

## Components

| Component | Description |
|-----------|-------------|
| `DailyCheckInForm` | Main form component with all check-in functionality |

## Props

The main component accepts the following props:

```typescript
interface DailyCheckInProps {
  dailyCheckIns: DailyCheckIn[]      // List of all daily check-ins
  exerciseTypes: ExerciseType[]       // Available exercise types
  mealSlots: MealSlot[]              // Available meal slots
  streak: Streak                      // Current streak information
  previousWeight: number | null       // Previous weight for placeholder
  selectedDate?: string              // Currently selected date

  // Callbacks
  onSelectDate?: (date: string) => void
  onUpdateWeight?: (checkInId: string, weight: number | null) => void
  onToggleWorkout?: (checkInId: string, completed: boolean) => void
  onAddExercise?: (checkInId: string, exerciseType: ExerciseType) => void
  onRemoveExercise?: (checkInId: string, exerciseId: string) => void
  onUpdateExercise?: (checkInId: string, exerciseId: string, updates: Partial<Exercise>) => void
  onUpdateMeal?: (checkInId: string, slot: MealSlot, kcal: number | null) => void
  onSubmit?: (checkInId: string) => void
}
```

## Usage

```tsx
import { DailyCheckInForm } from './components'
import type { DailyCheckIn, ExerciseType, MealSlot, Streak } from './types'

function CheckInPage() {
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([])
  const [selectedDate, setSelectedDate] = useState<string>()

  return (
    <DailyCheckInForm
      dailyCheckIns={checkIns}
      exerciseTypes={['Chest', 'Legs', 'Arms', 'Cardio', 'Walking']}
      mealSlots={['Breakfast', 'Lunch', 'Dinner', 'Snacks']}
      streak={{ currentStreak: 7, longestStreak: 14, lastLoggedDate: '2025-01-22' }}
      previousWeight={85.5}
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      onUpdateWeight={(id, weight) => { /* Update check-in weight */ }}
      onToggleWorkout={(id, completed) => { /* Toggle workout status */ }}
      onAddExercise={(id, type) => { /* Add exercise */ }}
      onRemoveExercise={(id, exerciseId) => { /* Remove exercise */ }}
      onUpdateExercise={(id, exerciseId, updates) => { /* Update exercise */ }}
      onUpdateMeal={(id, slot, kcal) => { /* Update meal */ }}
      onSubmit={(id) => { /* Save check-in */ }}
    />
  )
}
```

## Data Types

### ExerciseType

```typescript
type ExerciseType =
  | 'Chest' | 'Lower Back' | 'Upper Back' | 'Shoulders'
  | 'Arms' | 'Legs' | 'Core' | 'Cardio' | 'Walking'
```

### MealSlot

```typescript
type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
```

### Exercise

```typescript
// Strength exercise
interface StrengthExercise {
  id: string
  type: Exclude<ExerciseType, 'Cardio' | 'Walking'>
  sets: number | null
  reps: number | null
  weight: number | null  // kg
}

// Cardio exercise
interface CardioExercise {
  id: string
  type: 'Cardio' | 'Walking'
  time: number | null     // minutes
  distance: number | null // km
}

type Exercise = StrengthExercise | CardioExercise
```

## UI Features

- **Date Navigation**: Navigate between past check-ins
- **Streak Display**: Shows current streak with fire icon
- **Weight Input**: Numeric input with previous value placeholder
- **Workout Toggle**: Mark workout as done to reveal exercise fields
- **Exercise Picker**: Modal for selecting exercise type
- **Exercise Details**: Contextual fields (strength vs cardio)
- **Meal Inputs**: Four fixed slots with kcal inputs
- **Submit Button**: Save check-in with visual feedback

## Design Tokens

- Primary: `lime-500` for active states, submit button
- Secondary: `amber-500` for streak badge, meals section
- Neutral: `zinc` for backgrounds and borders
