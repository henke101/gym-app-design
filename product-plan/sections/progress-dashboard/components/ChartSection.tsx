import { MiniChart } from './MiniChart'

interface DataPoint {
  date: string
  value: number
}

interface ChartSectionProps {
  title: string
  subtitle?: string
  data: DataPoint[]
  chartType: 'line' | 'bar' | 'dots'
  color: 'lime' | 'amber' | 'zinc'
  unit?: string
  yAxisLabel?: string
  yAxisPadding?: number
  selectedDate?: string
  onPointClick?: (date: string) => void
  timeRange?: 'week' | 'month'
}

export function ChartSection({
  title,
  subtitle,
  data,
  chartType,
  color,
  unit,
  yAxisLabel,
  yAxisPadding,
  selectedDate,
  onPointClick,
  timeRange
}: ChartSectionProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <MiniChart
        data={data}
        type={chartType}
        color={color}
        unit={unit}
        yAxisLabel={yAxisLabel}
        yAxisPadding={yAxisPadding}
        selectedDate={selectedDate}
        onPointClick={onPointClick}
        timeRange={timeRange}
      />
    </div>
  )
}
