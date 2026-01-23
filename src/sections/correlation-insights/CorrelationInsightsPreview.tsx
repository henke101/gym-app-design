import data from '@/../product/sections/correlation-insights/data.json'
import type { TimeRangeValue } from '@/../product/sections/correlation-insights/types'
import { CorrelationInsights } from './components/CorrelationInsights'

export default function CorrelationInsightsPreview() {
  return (
    <CorrelationInsights
      timeRanges={data.timeRanges as { value: TimeRangeValue; label: string }[]}
      selectedTimeRange={data.selectedTimeRange as TimeRangeValue}
      insights={data.insights as typeof data.insights}
      onTimeRangeChange={(value) => console.log('Time range changed:', value)}
    />
  )
}
