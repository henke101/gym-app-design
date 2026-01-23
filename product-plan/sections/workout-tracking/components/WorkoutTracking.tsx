import type { WorkoutTrackingProps } from '../types'
import { ExerciseProgressCard } from './ExerciseProgressCard'
import { DateRangePicker } from './DateRangePicker'

export function WorkoutTracking({
  exerciseProgress,
  dateRange,
  onDateRangeChange,
  onExerciseSelect
}: WorkoutTrackingProps) {
  // Calculate overall stats
  const totalSessions = exerciseProgress.reduce(
    (max, p) => Math.max(max, p.weightTrend.length),
    0
  )

  const exercisesWithProgress = exerciseProgress.filter(p => p.weightChange > 0).length

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Workouts
          </h1>
          <DateRangePicker dateRange={dateRange} onChange={onDateRangeChange} />
        </div>

        {/* Summary Banner */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-lime-50 to-amber-50 dark:from-lime-900/20 dark:to-amber-900/20 border border-lime-200/50 dark:border-lime-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {exercisesWithProgress} of {exerciseProgress.length} exercises improving
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Based on {totalSessions} training sessions
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            All Exercises
          </h2>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {exerciseProgress.length} tracked
          </span>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exerciseProgress.map((progress) => (
            <ExerciseProgressCard
              key={progress.type}
              progress={progress}
              onSelect={() => onExerciseSelect?.(progress.type)}
            />
          ))}
        </div>

        {/* Empty state for when no exercises */}
        {exerciseProgress.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              No workout data yet
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Log your first workout to start tracking progress
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
