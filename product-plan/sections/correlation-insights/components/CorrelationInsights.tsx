import type { CorrelationInsightsProps } from '../types'
import { InsightCard } from './InsightCard'
import { TimeRangeSelector } from './TimeRangeSelector'

export function CorrelationInsights({
  timeRanges,
  selectedTimeRange,
  insights,
  onTimeRangeChange
}: CorrelationInsightsProps) {
  const strongInsights = insights.filter(i => i.confidence === 'strong')
  const possibleInsights = insights.filter(i => i.confidence === 'possible')

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Insights
          </h1>
          <TimeRangeSelector
            timeRanges={timeRanges}
            selectedValue={selectedTimeRange}
            onChange={onTimeRangeChange}
          />
        </div>

        {/* Summary Banner */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-lime-50 via-amber-50 to-lime-50 dark:from-lime-900/20 dark:via-amber-900/20 dark:to-lime-900/20 border border-lime-200/50 dark:border-lime-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-amber-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {strongInsights.length} strong patterns found
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Analyzing your workouts, meals, and weight data
              </p>
            </div>
          </div>
        </div>

        {/* Strong Patterns Section */}
        {strongInsights.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Strong Patterns
              </h2>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {strongInsights.length} insights
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {strongInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Possible Patterns Section */}
        {possibleInsights.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Possible Patterns
              </h2>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {possibleInsights.length} insights
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {possibleInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {insights.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Not enough data for insights
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              Keep logging your workouts, meals, and weight to discover patterns in your fitness journey
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
