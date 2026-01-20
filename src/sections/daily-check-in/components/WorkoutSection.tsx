import { Dumbbell, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import type { Workout, Exercise, ExerciseType } from '@/../product/sections/daily-check-in/types'
import { ExerciseCard } from './ExerciseCard'

interface WorkoutSectionProps {
  workout: Workout
  exerciseTypes: ExerciseType[]
  onToggleWorkout?: (completed: boolean) => void
  onAddExercise?: (exerciseType: ExerciseType) => void
  onRemoveExercise?: (exerciseId: string) => void
  onUpdateExercise?: (exerciseId: string, updates: Partial<Exercise>) => void
}

export function WorkoutSection({
  workout,
  exerciseTypes,
  onToggleWorkout,
  onAddExercise,
  onRemoveExercise,
  onUpdateExercise,
}: WorkoutSectionProps) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg">
            <Dumbbell className="w-5 h-5 text-lime-600 dark:text-lime-400" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Workout</h3>
        </div>

        {/* Workout toggle button */}
        <button
          onClick={() => onToggleWorkout?.(!workout.completed)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
            workout.completed
              ? 'bg-lime-500 text-white hover:bg-lime-600'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          {workout.completed && <Check className="w-4 h-4" />}
          {workout.completed ? 'Worked out' : 'Did you work out?'}
        </button>
      </div>

      {/* Workout details (progressive disclosure) */}
      {workout.completed && (
        <div className="space-y-4 pt-2">
          {/* Exercise list */}
          {workout.exercises.length > 0 && (
            <div className="space-y-3">
              {workout.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onUpdate={(updates) => onUpdateExercise?.(exercise.id, updates)}
                  onRemove={() => onRemoveExercise?.(exercise.id)}
                />
              ))}
            </div>
          )}

          {/* Add exercise button / picker */}
          {showPicker ? (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">Select exercise type:</p>
              <div className="flex flex-wrap gap-2">
                {exerciseTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onAddExercise?.(type)
                      setShowPicker(false)
                    }}
                    className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPicker(false)}
                className="mt-3 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-2 w-full justify-center py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 dark:text-zinc-400 hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add exercise
            </button>
          )}
        </div>
      )}
    </div>
  )
}
