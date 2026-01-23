import { useState } from 'react'
import type { DateRange } from '../types'

interface DateRangePickerProps {
  dateRange: DateRange
  onChange?: (range: DateRange) => void
}

export function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDateFull = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Preset ranges
  const presets = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 14 days', days: 14 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 }
  ]

  const handlePreset = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    const toDateStr = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

    onChange?.({
      startDate: toDateStr(start),
      endDate: toDateStr(end)
    })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
        </svg>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {formatDate(dateRange.startDate)} — {formatDate(dateRange.endDate)}
        </span>
        <svg className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg z-20 overflow-hidden">
            {/* Presets */}
            <div className="p-2">
              <p className="px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 font-medium">
                Quick select
              </p>
              {presets.map((preset) => (
                <button
                  key={preset.days}
                  onClick={() => handlePreset(preset.days)}
                  className="w-full px-2 py-1.5 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100 dark:border-zinc-800" />

            {/* Current selection */}
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 font-medium mb-2">
                Current range
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs">
                  {formatDateFull(dateRange.startDate)}
                </span>
                <span className="text-zinc-400">→</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-xs">
                  {formatDateFull(dateRange.endDate)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
