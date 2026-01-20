import data from '@/../product/sections/daily-check-in/data.json'
import { DailyCheckInForm } from './components/DailyCheckInForm'
import type { ExerciseType, MealSlot } from '@/../product/sections/daily-check-in/types'

export default function DailyCheckInFormPreview() {
  return (
    <DailyCheckInForm
      dailyCheckIns={data.dailyCheckIns as any}
      exerciseTypes={data.exerciseTypes as ExerciseType[]}
      mealSlots={data.mealSlots as MealSlot[]}
      streak={data.streak}
      previousWeight={data.previousWeight}
      selectedDate="2026-01-20"
      onSelectDate={(date) => console.log('Select date:', date)}
      onUpdateWeight={(id, weight) => console.log('Update weight:', id, weight)}
      onToggleWorkout={(id, completed) => console.log('Toggle workout:', id, completed)}
      onAddExercise={(id, type) => console.log('Add exercise:', id, type)}
      onRemoveExercise={(id, exerciseId) => console.log('Remove exercise:', id, exerciseId)}
      onUpdateExercise={(id, exerciseId, updates) => console.log('Update exercise:', id, exerciseId, updates)}
      onUpdateMeal={(id, slot, kcal) => console.log('Update meal:', id, slot, kcal)}
      onSubmit={(id) => console.log('Submit check-in:', id)}
    />
  )
}
