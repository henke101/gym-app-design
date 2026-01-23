# Correlation Insights Section

## Overview

A read-only analytics dashboard that surfaces patterns showing how workouts and meals affect weight and strength trends. Insights are displayed in a grid layout with mini charts and use plain language to communicate pattern strength.

## Components

| Component | Description |
|-----------|-------------|
| `CorrelationInsights` | Main dashboard component |
| `InsightCard` | Card displaying a single insight |
| `TimeRangeSelector` | Segmented control for time range |
| `MiniBarChart` | Dot/line chart for insight visualization |

## Props

The main component accepts the following props:

```typescript
interface CorrelationInsightsProps {
  timeRanges: TimeRange[]              // Available filter options
  selectedTimeRange: TimeRangeValue    // Current selection
  insights: Insight[]                  // Insights to display

  // Callbacks
  onTimeRangeChange?: (value: TimeRangeValue) => void
}
```

## Usage

```tsx
import { CorrelationInsights } from './components'
import type { TimeRange, Insight, TimeRangeValue } from './types'

function InsightsPage() {
  const [timeRange, setTimeRange] = useState<TimeRangeValue>('30d')

  const timeRanges: TimeRange[] = [
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: 'all', label: 'All' }
  ]

  return (
    <CorrelationInsights
      timeRanges={timeRanges}
      selectedTimeRange={timeRange}
      insights={computedInsights}
      onTimeRangeChange={setTimeRange}
    />
  )
}
```

## Data Types

### TimeRange

```typescript
type TimeRangeValue = '7d' | '30d' | '90d' | 'all'

interface TimeRange {
  value: TimeRangeValue
  label: string
}
```

### Insight

```typescript
interface Insight {
  id: string
  title: string           // e.g., "Workouts boost weight loss"
  description: string     // Plain language explanation
  confidence: InsightConfidence
  category: InsightCategory
  metric: InsightMetric
  chartData: ChartDataPoint[]
}

type InsightConfidence = 'strong' | 'possible'
type InsightCategory = 'weight' | 'strength'

interface InsightMetric {
  label: string      // e.g., "avg weight loss"
  value: string      // e.g., "-0.3 kg"
  comparison: string // e.g., "after workout days"
}

interface ChartDataPoint {
  label: string
  value: number
}
```

## UI Features

- **Time Range Selector**: 7d, 30d, 90d, All time
- **Summary Banner**: Count of strong patterns found
- **Strong Patterns Section**: High-confidence insights
- **Possible Patterns Section**: Lower-confidence insights
- **Empty State**: Shown when no insights available

## Insight Card Layout

Each card shows:
1. Category icon (weight scale or lightning bolt)
2. Confidence badge ("Strong pattern" / "Possible pattern")
3. Insight title
4. Plain language description
5. Metric highlight box
6. Mini chart visualization

## MiniBarChart

- Dot/line chart showing trend
- Dots connected with polyline
- Labels evenly distributed below
- Color based on category (lime or amber)

## Confidence Levels

| Confidence | Badge Color | Description |
|------------|-------------|-------------|
| `strong` | Lime | High statistical confidence |
| `possible` | Gray | Suggestive but needs more data |

## Design Tokens

- Primary: `lime-500` for strength insights, strong confidence
- Secondary: `amber-500` for weight insights
- Neutral: `zinc` for backgrounds, possible confidence
