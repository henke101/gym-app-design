import { X, Dumbbell, Utensils, Scale } from 'lucide-react'
import type { DayDetail } from '@/../product/sections/progress-dashboard/types'

interface DayDetailSheetProps {
  detail: DayDetail
  onClose?: () => void
}

export function DayDetailSheet({ detail, onClose }: DayDetailSheetProps) {
  const formattedDate = new Date(detail.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-sm bg-white dark:bg-zinc-900 rounded-t-2xl sm:rounded-xl shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-2 sm:hidden">
          <div className="w-8 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {formattedDate}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {/* Weight */}
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
              <Scale className="w-4 h-4 text-lime-600 dark:text-lime-400 mb-1" />
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-mono">
                {detail.weight}
              </span>
              <span className="text-[10px] text-zinc-400">kg</span>
            </div>

            {/* Calories */}
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
              <Utensils className="w-4 h-4 text-lime-600 dark:text-lime-400 mb-1" />
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-mono">
                {detail.calories}
              </span>
              <span className="text-[10px] text-zinc-400">kcal</span>
            </div>

            {/* Workout */}
            <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
              <Dumbbell className={`w-4 h-4 mb-1 ${
                detail.workout
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-zinc-300 dark:text-zinc-600'
              }`} />
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {detail.workout ? '✓' : '—'}
              </span>
              <span className="text-[10px] text-zinc-400">
                {detail.workout ? detail.workout.name : 'Rest'}
              </span>
            </div>
          </div>

          {/* Meal breakdown */}
          {detail.meals.length > 0 && (
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Meals
              </p>
              <div className="space-y-1">
                {detail.meals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">{meal.name}</span>
                    <span className="font-mono text-zinc-900 dark:text-zinc-100">
                      {meal.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer padding for mobile */}
        <div className="h-4 sm:hidden" />
      </div>
    </div>
  )
}
