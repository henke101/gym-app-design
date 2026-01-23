// =============================================================================
// Data Types
// =============================================================================

export type TimeRangeValue = '7d' | '30d' | '90d' | 'all'

export interface TimeRange {
  value: TimeRangeValue
  label: string
}

export type InsightConfidence = 'strong' | 'possible'

export type InsightCategory = 'weight' | 'strength'

export interface ChartDataPoint {
  label: string
  value: number
}

export interface InsightMetric {
  label: string
  value: string
  comparison: string
}

export interface Insight {
  id: string
  title: string
  description: string
  confidence: InsightConfidence
  category: InsightCategory
  metric: InsightMetric
  chartData: ChartDataPoint[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface CorrelationInsightsProps {
  /** Available time range filter options */
  timeRanges: TimeRange[]
  /** Currently selected time range */
  selectedTimeRange: TimeRangeValue
  /** The list of insights to display */
  insights: Insight[]
  /** Called when user selects a different time range */
  onTimeRangeChange?: (value: TimeRangeValue) => void
}
