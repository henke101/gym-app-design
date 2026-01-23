import { useState } from 'react'
import data from '@/../product/sections/progress-dashboard/data.json'
import { ProgressDashboard } from './components/ProgressDashboard'
import type { DayDetail, PeriodSummary } from '@/../product/sections/progress-dashboard/types'

export default function ProgressDashboardPreview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month'>('week')
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayDetail | undefined>(undefined)

  const handleDaySelect = (date: string) => {
    // Find the day in metrics and construct detail
    const dayMetrics = data.dailyMetrics.find(m => m.date === date)
    if (dayMetrics) {
      // For demo, use the sample detail or construct from metrics
      if (date === data.selectedDayDetail.date) {
        setSelectedDayDetail(data.selectedDayDetail as DayDetail)
      } else {
        // Construct a simulated detail for other days
        setSelectedDayDetail({
          date: dayMetrics.date,
          weight: dayMetrics.weight,
          calories: dayMetrics.calories,
          workout: dayMetrics.workedOut
            ? { name: 'Workout', exercises: 4 }
            : null,
          meals: [
            { name: 'Breakfast', calories: Math.round(dayMetrics.calories * 0.25) },
            { name: 'Lunch', calories: Math.round(dayMetrics.calories * 0.35) },
            { name: 'Dinner', calories: Math.round(dayMetrics.calories * 0.32) },
            { name: 'Snacks', calories: Math.round(dayMetrics.calories * 0.08) }
          ]
        })
      }
    }
    console.log('Day selected:', date)
  }

  return (
    <ProgressDashboard
      dailyMetrics={data.dailyMetrics}
      weekSummary={data.weekSummary as PeriodSummary}
      monthSummary={data.monthSummary as PeriodSummary}
      selectedTimeRange={selectedTimeRange}
      selectedDayDetail={selectedDayDetail}
      onTimeRangeChange={(range) => {
        setSelectedTimeRange(range)
        setSelectedDayDetail(undefined)
        console.log('Time range changed:', range)
      }}
      onDaySelect={handleDaySelect}
      onDayDetailClose={() => {
        setSelectedDayDetail(undefined)
        console.log('Day detail closed')
      }}
    />
  )
}
