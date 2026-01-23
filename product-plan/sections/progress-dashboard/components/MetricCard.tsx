import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  unit: string
  change: number
  changeLabel: string
  accentColor?: 'lime' | 'amber'
}

export function MetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  accentColor = 'lime'
}: MetricCardProps) {
  const isPositive = change > 0
  const isNegative = change < 0

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
          {title}
        </span>
        <TrendIcon
          className={`w-3 h-3 ${
            isPositive
              ? 'text-lime-600 dark:text-lime-400'
              : isNegative
                ? 'text-red-500 dark:text-red-400'
                : 'text-zinc-400'
          }`}
        />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-mono tracking-tight">
          {value}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {unit}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-1">
        <span className={`text-[10px] font-medium ${
          isPositive
            ? 'text-lime-600 dark:text-lime-400'
            : isNegative
              ? 'text-red-500 dark:text-red-400'
              : 'text-zinc-400'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(1)}
        </span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
          {changeLabel}
        </span>
      </div>
    </div>
  )
}
