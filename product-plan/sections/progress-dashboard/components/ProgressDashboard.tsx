import { MetricCard } from './MetricCard'
import { ChartSection } from './ChartSection'
import { DayDetailSheet } from './DayDetailSheet'
import type { ProgressDashboardProps } from '../types'

export function ProgressDashboard({
  dailyMetrics,
  weekSummary,
  monthSummary,
  selectedTimeRange,
  selectedDayDetail,
  onTimeRangeChange,
  onDaySelect,
  onDayDetailClose
}: ProgressDashboardProps) {
  const summary = selectedTimeRange === 'week' ? weekSummary : monthSummary

  // Filter metrics based on selected time range (by actual date, not count)
  // Week = 7 days (today + 6 previous), Month = 30 days (today + 29 previous)
  const now = new Date(dailyMetrics[0]?.date || Date.now())
  const cutoffDate = new Date(now)
  cutoffDate.setDate(cutoffDate.getDate() - (selectedTimeRange === 'week' ? 6 : 29))

  const displayMetrics = dailyMetrics.filter(m => new Date(m.date) >= cutoffDate)

  // Prepare chart data
  // For weight chart: include previous value if first day of range has no data
  const weightDataBase = displayMetrics.map(m => ({
    date: m.date,
    value: m.weight
  })).reverse()

  // Calculate the first day of the display range
  const firstDayOfRange = new Date(cutoffDate)
  const firstDayStr = `${firstDayOfRange.getFullYear()}-${String(firstDayOfRange.getMonth() + 1).padStart(2, '0')}-${String(firstDayOfRange.getDate()).padStart(2, '0')}`

  // Check if first day has data
  const firstDayHasData = weightDataBase.some(d => d.date === firstDayStr)

  let weightData = weightDataBase
  if (!firstDayHasData && selectedTimeRange === 'week') {
    // Find most recent weight before the cutoff
    const previousMetric = dailyMetrics
      .filter(m => new Date(m.date) < cutoffDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

    if (previousMetric) {
      // Add synthetic entry for first day using previous weight
      weightData = [{ date: firstDayStr, value: previousMetric.weight }, ...weightDataBase]
    }
  }

  const caloriesData = displayMetrics.map(m => ({
    date: m.date,
    value: m.calories
  })).reverse()

  const workoutData = displayMetrics.map(m => ({
    date: m.date,
    value: m.workedOut ? 1 : 0
  })).reverse()

  const workoutsThisPeriod = displayMetrics.filter(m => m.workedOut).length
  const totalDays = displayMetrics.length

  // Calculate average calories excluding days with no meals (calories = 0)
  const daysWithMeals = displayMetrics.filter(m => m.calories > 0)
  const avgCalories = daysWithMeals.length > 0
    ? Math.round(daysWithMeals.reduce((sum, m) => sum + m.calories, 0) / daysWithMeals.length)
    : 0

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Progress
          </h1>

          {/* Time Range Toggle */}
          <div className="flex bg-zinc-200 dark:bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => onTimeRangeChange?.('week')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                selectedTimeRange === 'week'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onTimeRangeChange?.('month')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                selectedTimeRange === 'month'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Progress Message - Moved to top */}
        <div className="mb-3 p-2.5 rounded-lg bg-lime-50 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-800">
          <p className="text-xs text-lime-800 dark:text-lime-200">
            <span className="font-semibold">
              {summary.weight.change < 0 ? 'Great progress!' : summary.weight.change > 0 ? 'Keep going!' : 'Staying steady!'}
            </span>
            {' '}
            {summary.weight.change < 0
              ? `Down ${Math.abs(summary.weight.change).toFixed(1)} kg vs last ${selectedTimeRange}.`
              : summary.weight.change > 0
                ? `Up ${summary.weight.change.toFixed(1)} kg vs last ${selectedTimeRange}.`
                : `Weight stable vs last ${selectedTimeRange}.`
            }
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <MetricCard
            title="Weight"
            value={summary.weight.current?.toFixed(1) ?? summary.weight.average.toFixed(1)}
            unit="kg"
            change={summary.weight.change}
            changeLabel={`vs last`}
            accentColor="lime"
          />
          <MetricCard
            title="Avg Cal"
            value={avgCalories.toString()}
            unit="kcal"
            change={summary.calories.change}
            changeLabel={`vs last`}
            accentColor="lime"
          />
          <MetricCard
            title="Workouts"
            value={`${workoutsThisPeriod}/${totalDays}`}
            unit="days"
            change={summary.workouts.change}
            changeLabel={`vs last`}
            accentColor="amber"
          />
        </div>

        {/* Charts */}
        <div className="space-y-2">
          <ChartSection
            title="Weight Trend"
            subtitle="Body weight in kg over time • Tap for details"
            data={weightData}
            chartType="line"
            color="lime"
            unit=" kg"
            yAxisLabel="kg"
            yAxisPadding={2}
            selectedDate={selectedDayDetail?.date}
            onPointClick={onDaySelect}
            timeRange={selectedTimeRange}
          />

          <ChartSection
            title="Daily Calories"
            subtitle="Total kcal logged per day • Taller bars = more calories"
            data={caloriesData}
            chartType="bar"
            color="lime"
            unit=" kcal"
            yAxisPadding={100}
            selectedDate={selectedDayDetail?.date}
            onPointClick={onDaySelect}
            timeRange={selectedTimeRange}
          />

          <ChartSection
            title="Training Days"
            subtitle="Did you work out? • Filled = yes, empty = rest day"
            data={workoutData}
            chartType="dots"
            color="amber"
            selectedDate={selectedDayDetail?.date}
            onPointClick={onDaySelect}
            timeRange={selectedTimeRange}
          />
        </div>
      </div>

      {/* Day Detail Sheet */}
      {selectedDayDetail && (
        <DayDetailSheet
          detail={selectedDayDetail}
          onClose={onDayDetailClose}
        />
      )}
    </div>
  )
}
