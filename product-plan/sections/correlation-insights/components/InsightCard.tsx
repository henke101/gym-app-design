import type { Insight } from '../types'
import { MiniBarChart } from './MiniBarChart'

interface InsightCardProps {
  insight: Insight
}

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
  weight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  ),
  strength: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

export function InsightCard({ insight }: InsightCardProps) {
  const isStrong = insight.confidence === 'strong'
  const isWeight = insight.category === 'weight'
  const chartColor = isWeight ? 'amber' : 'lime'

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            isWeight
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
              : 'bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400'
          }`}>
            {categoryIcons[insight.category]}
          </div>
          <span className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded ${
            isStrong
              ? 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
          }`}>
            {isStrong ? 'Strong pattern' : 'Possible pattern'}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
        {insight.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 flex-grow">
        {insight.description}
      </p>

      {/* Metric Highlight */}
      <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
        <div className={`text-lg font-bold font-mono ${
          isWeight
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-lime-600 dark:text-lime-400'
        }`}>
          {insight.metric.value}
        </div>
        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
          <div className="font-medium">{insight.metric.label}</div>
          <div>{insight.metric.comparison}</div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <MiniBarChart data={insight.chartData} color={chartColor} height={56} />
      </div>
    </div>
  )
}
