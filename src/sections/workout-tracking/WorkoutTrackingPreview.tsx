import { useState } from 'react'
import data from '@/../product/sections/workout-tracking/data.json'
import { WorkoutTracking } from './components/WorkoutTracking'
import type { ExerciseProgress, DateRange, ExerciseType } from '@/../product/sections/workout-tracking/types'

export default function WorkoutTrackingPreview() {
  const [dateRange, setDateRange] = useState<DateRange>(data.dateRange)

  return (
    <WorkoutTracking
      workouts={data.workouts}
      exerciseProgress={data.exerciseProgress as ExerciseProgress[]}
      dateRange={dateRange}
      onDateRangeChange={(range) => {
        setDateRange(range)
        console.log('Date range changed:', range)
      }}
      onExerciseSelect={(type: ExerciseType) => {
        console.log('Exercise selected:', type)
      }}
      onWorkoutSelect={(id) => {
        console.log('Workout selected:', id)
      }}
    />
  )
}
