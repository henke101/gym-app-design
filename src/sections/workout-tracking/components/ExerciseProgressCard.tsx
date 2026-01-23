import type { ExerciseProgress, ExerciseType } from '@/../product/sections/workout-tracking/types'
import { MiniSparkline } from './MiniSparkline'

interface ExerciseProgressCardProps {
  progress: ExerciseProgress
  onSelect?: () => void
}

// Icon components for each exercise type
const exerciseIcons: Record<ExerciseType, React.ReactNode> = {
  'Chest': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  'Legs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V17.25m11.25-3.375V6.375a1.125 1.125 0 00-1.125-1.125H4.125A1.125 1.125 0 003 6.375v7.5" />
    </svg>
  ),
  'Upper Back': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
    </svg>
  ),
  'Lower Back': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75l-7.5 7.5-7.5-7.5m15-6l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  'Shoulders': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  'Arms': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  'Core': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}

export function ExerciseProgressCard({ progress, onSelect }: ExerciseProgressCardProps) {
  const weightTrendData = progress.weightTrend.map(t => ({
    date: t.date,
    value: t.weight ?? 0
  }))

  const volumeTrendData = progress.volumeTrend.map(t => ({
    date: t.date,
    value: t.volume ?? 0
  }))

  const isPositiveWeightChange = progress.weightChange > 0
  const isPositiveVolumeChange = progress.volumeChange > 0

  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 transition-all hover:border-lime-300 dark:hover:border-lime-700 hover:shadow-sm active:scale-[0.98]"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
          {exerciseIcons[progress.type]}
        </div>
        <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          {progress.type}
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weight */}
        <div>
          <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
            Weight
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {progress.latestWeight}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">kg</span>
          </div>
          <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
            isPositiveWeightChange
              ? 'text-lime-600 dark:text-lime-400'
              : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            {isPositiveWeightChange && (
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4l4 4H9v4H7V8H4l4-4z" />
              </svg>
            )}
            <span>+{progress.weightChange} kg</span>
          </div>
          <div className="mt-1.5">
            <MiniSparkline data={weightTrendData} color="lime" height={24} />
          </div>
        </div>

        {/* Volume */}
        <div>
          <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
            Volume
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {(progress.latestVolume / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">kg</span>
          </div>
          <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
            isPositiveVolumeChange
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            {isPositiveVolumeChange && (
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4l4 4H9v4H7V8H4l4-4z" />
              </svg>
            )}
            <span>+{progress.volumeChange}</span>
          </div>
          <div className="mt-1.5">
            <MiniSparkline data={volumeTrendData} color="amber" height={24} />
          </div>
        </div>
      </div>

      {/* Sessions count */}
      <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          {progress.weightTrend.length} sessions logged
        </p>
      </div>
    </button>
  )
}
