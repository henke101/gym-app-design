import { Utensils } from 'lucide-react'
import type { Meals, MealSlot } from '@/../product/sections/daily-check-in/types'

interface MealsSectionProps {
  meals: Meals
  mealSlots: MealSlot[]
  onUpdateMeal?: (slot: MealSlot, kcal: number | null) => void
}

const mealIcons: Record<MealSlot, string> = {
  Breakfast: '🌅',
  Lunch: '☀️',
  Dinner: '🌙',
  Snacks: '🍿',
}

export function MealsSection({ meals, mealSlots, onUpdateMeal }: MealsSectionProps) {
  const getMealValue = (slot: MealSlot): number | null => {
    const key = slot.toLowerCase() as keyof Meals
    return meals[key]
  }

  const totalKcal = Object.values(meals).reduce((sum: number, val) => sum + (val ?? 0), 0)

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg">
            <Utensils className="w-5 h-5 text-lime-600 dark:text-lime-400" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Meals</h3>
        </div>

        {/* Total */}
        {totalKcal > 0 && (
          <div className="text-right">
            <span className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {totalKcal.toLocaleString()}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">kcal</span>
          </div>
        )}
      </div>

      {/* Meal slots */}
      <div className="grid grid-cols-2 gap-3">
        {mealSlots.map((slot) => {
          const value = getMealValue(slot)
          return (
            <div
              key={slot}
              className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{mealIcons[slot]}</span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {slot}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  value={value ?? ''}
                  onChange={(e) => {
                    const val = e.target.value
                    onUpdateMeal?.(slot, val ? parseInt(val) : null)
                  }}
                  placeholder="--"
                  className="w-20 text-xl font-mono font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:border-lime-500 outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
                />
                <span className="text-sm text-zinc-500">kcal</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
