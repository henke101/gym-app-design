import type { TimeRange, TimeRangeValue } from '@/../product/sections/correlation-insights/types'

interface TimeRangeSelectorProps {
  timeRanges: TimeRange[]
  selectedValue: TimeRangeValue
  onChange?: (value: TimeRangeValue) => void
}

export function TimeRangeSelector({ timeRanges, selectedValue, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800">
      {timeRanges.map((range) => {
        const isSelected = range.value === selectedValue

        return (
          <button
            key={range.value}
            onClick={() => onChange?.(range.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              isSelected
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {range.label}
          </button>
        )
      })}
    </div>
  )
}
