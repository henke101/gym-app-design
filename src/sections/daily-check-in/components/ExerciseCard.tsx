import { X } from 'lucide-react'
import type { Exercise, ExerciseType } from '@/../product/sections/daily-check-in/types'

interface ExerciseCardProps {
  exercise: Exercise
  onUpdate?: (updates: Partial<Exercise>) => void
  onRemove?: () => void
}

function isCardioExercise(exercise: Exercise): exercise is Extract<Exercise, { type: 'Cardio' | 'Walking' }> {
  return exercise.type === 'Cardio' || exercise.type === 'Walking'
}

export function ExerciseCard({ exercise, onUpdate, onRemove }: ExerciseCardProps) {
  const isCardio = isCardioExercise(exercise)

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 relative group">
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
        aria-label="Remove exercise"
      >
        <X className="w-4 h-4 text-zinc-500" />
      </button>

      {/* Exercise type badge */}
      <div className="inline-flex px-3 py-1 bg-lime-100 dark:bg-lime-900/40 rounded-full mb-3">
        <span className="text-sm font-semibold text-lime-700 dark:text-lime-400">
          {exercise.type}
        </span>
      </div>

      {/* Detail fields based on exercise type */}
      {isCardio ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Time
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                type="number"
                value={exercise.time ?? ''}
                onChange={(e) => onUpdate?.({ time: e.target.value ? parseInt(e.target.value) : null })}
                placeholder="--"
                className="w-16 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
              <span className="text-sm text-zinc-500">min</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Distance
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                type="number"
                step="0.1"
                value={exercise.distance ?? ''}
                onChange={(e) => onUpdate?.({ distance: e.target.value ? parseFloat(e.target.value) : null })}
                placeholder="--"
                className="w-16 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
              <span className="text-sm text-zinc-500">mi</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Sets
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                type="number"
                value={(exercise as any).sets ?? ''}
                onChange={(e) => onUpdate?.({ sets: e.target.value ? parseInt(e.target.value) : null } as any)}
                placeholder="--"
                className="w-12 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Reps
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                type="number"
                value={(exercise as any).reps ?? ''}
                onChange={(e) => onUpdate?.({ reps: e.target.value ? parseInt(e.target.value) : null } as any)}
                placeholder="--"
                className="w-12 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Weight
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                type="number"
                value={(exercise as any).weight ?? ''}
                onChange={(e) => onUpdate?.({ weight: e.target.value ? parseInt(e.target.value) : null } as any)}
                placeholder="--"
                className="w-16 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
              <span className="text-sm text-zinc-500">lbs</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
