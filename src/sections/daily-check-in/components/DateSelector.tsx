import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import type { Streak } from '@/../product/sections/daily-check-in/types'

interface DateSelectorProps {
  selectedDate: string
  streak: Streak
  onSelectDate?: (date: string) => void
}

export function DateSelector({ selectedDate, streak, onSelectDate }: DateSelectorProps) {
  const date = new Date(selectedDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isToday = date.toDateString() === today.toDateString()

  const formatDate = (d: Date) => {
    if (d.toDateString() === today.toDateString()) return 'Today'
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const goToPreviousDay = () => {
    const prev = new Date(date)
    prev.setDate(prev.getDate() - 1)
    onSelectDate?.(prev.toISOString().split('T')[0])
  }

  const goToNextDay = () => {
    const next = new Date(date)
    next.setDate(next.getDate() + 1)
    if (next <= today) {
      onSelectDate?.(next.toISOString().split('T')[0])
    }
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </button>

        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 min-w-[140px] text-center">
          {formatDate(date)}
        </span>

        <button
          onClick={goToNextDay}
          disabled={isToday}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>

      {/* Streak Badge */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
        <Flame className="w-4 h-4 text-amber-500" />
        <span className="font-mono text-sm font-semibold text-amber-700 dark:text-amber-400">
          {streak.currentStreak}
        </span>
        <span className="text-xs text-amber-600 dark:text-amber-500">day streak</span>
      </div>
    </div>
  )
}
