import { Save } from 'lucide-react'
import type { DailyCheckInProps, DailyCheckIn, MealSlot, Exercise, ExerciseType } from '@/../product/sections/daily-check-in/types'
import { DateSelector } from './DateSelector'
import { WeightInput } from './WeightInput'
import { WorkoutSection } from './WorkoutSection'
import { MealsSection } from './MealsSection'

export function DailyCheckInForm({
  dailyCheckIns,
  exerciseTypes,
  mealSlots,
  streak,
  previousWeight,
  selectedDate,
  onSelectDate,
  onUpdateWeight,
  onToggleWorkout,
  onAddExercise,
  onRemoveExercise,
  onUpdateExercise,
  onUpdateMeal,
  onSubmit,
}: DailyCheckInProps) {
  // Get today's date as default
  const today = new Date().toISOString().split('T')[0]
  const currentDate = selectedDate ?? today

  // Find the check-in for the selected date
  const currentCheckIn = dailyCheckIns.find((c) => c.date === currentDate)

  // If no check-in exists for this date, create a placeholder
  const checkIn: DailyCheckIn = currentCheckIn ?? {
    id: `checkin-${currentDate}`,
    date: currentDate,
    weight: null,
    workout: { completed: false, exercises: [] },
    meals: { breakfast: null, lunch: null, dinner: null, snacks: null },
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Date selector with streak */}
      <DateSelector
        selectedDate={currentDate}
        streak={streak}
        onSelectDate={onSelectDate}
      />

      {/* Form sections */}
      <div className="space-y-4">
        {/* Weight - most prominent */}
        <WeightInput
          weight={checkIn.weight}
          previousWeight={previousWeight}
          onUpdateWeight={(weight) => onUpdateWeight?.(checkIn.id, weight)}
        />

        {/* Workout with progressive disclosure */}
        <WorkoutSection
          workout={checkIn.workout}
          exerciseTypes={exerciseTypes}
          onToggleWorkout={(completed) => onToggleWorkout?.(checkIn.id, completed)}
          onAddExercise={(type) => onAddExercise?.(checkIn.id, type)}
          onRemoveExercise={(exerciseId) => onRemoveExercise?.(checkIn.id, exerciseId)}
          onUpdateExercise={(exerciseId, updates) => onUpdateExercise?.(checkIn.id, exerciseId, updates)}
        />

        {/* Meals */}
        <MealsSection
          meals={checkIn.meals}
          mealSlots={mealSlots}
          onUpdateMeal={(slot, kcal) => onUpdateMeal?.(checkIn.id, slot, kcal)}
        />

        {/* Save button */}
        <button
          onClick={() => onSubmit?.(checkIn.id)}
          className="w-full flex items-center justify-center gap-2 py-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-2xl transition-colors shadow-lg shadow-lime-500/20"
        >
          <Save className="w-5 h-5" />
          Save Check-In
        </button>
      </div>
    </div>
  )
}
