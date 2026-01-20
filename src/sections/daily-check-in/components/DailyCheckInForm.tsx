import { useState } from 'react'
import { Scale, Dumbbell, Utensils, Flame, ChevronLeft, ChevronRight, Plus, X, Check } from 'lucide-react'
import type { DailyCheckInProps, Exercise, ExerciseType, MealSlot } from '@/../product/sections/daily-check-in/types'

// Helper to check if exercise is cardio type
const isCardioType = (type: ExerciseType): boolean => type === 'Cardio' || type === 'Walking'

// Format date for display
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

// Get day name
const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export function DailyCheckInForm({
  dailyCheckIns,
  exerciseTypes,
  mealSlots,
  streak,
  previousWeight,
  selectedDate,
  onSelectDate,
  onUpdateWeight,
  onToggleWorkout,
  onAddExercise,
  onRemoveExercise,
  onUpdateExercise,
  onUpdateMeal,
  onSubmit,
}: DailyCheckInProps) {
  const [showExercisePicker, setShowExercisePicker] = useState(false)

  // Find current check-in based on selected date
  const currentCheckIn = dailyCheckIns.find(c => c.date === selectedDate) || dailyCheckIns[0]
  const currentIndex = dailyCheckIns.findIndex(c => c.id === currentCheckIn?.id)

  if (!currentCheckIn) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-zinc-500 dark:text-zinc-400">
        No check-in data available
      </div>
    )
  }

  const canGoNewer = currentIndex > 0
  const canGoOlder = currentIndex < dailyCheckIns.length - 1

  const handleDateNav = (direction: 'newer' | 'older') => {
    const newIndex = direction === 'newer' ? currentIndex - 1 : currentIndex + 1
    if (newIndex >= 0 && newIndex < dailyCheckIns.length) {
      onSelectDate?.(dailyCheckIns[newIndex].date)
    }
  }

  // Calculate total calories
  const totalCalories = Object.values(currentCheckIn.meals).reduce((sum: number, val) => sum + (val || 0), 0)

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pb-8">
      {/* Header with streak and date navigation */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 px-4 pt-6 pb-8">
        {/* Streak Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full border border-amber-500/30">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="font-['JetBrains_Mono'] font-bold text-amber-400">{streak.currentStreak}</span>
            <span className="text-amber-400/80 text-sm">day streak</span>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleDateNav('older')}
            disabled={!canGoOlder}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center min-w-[160px]">
            <h1 className="font-['DM_Serif_Display'] text-3xl text-white">
              {formatDate(currentCheckIn.date)}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {getDayName(currentCheckIn.date)}
            </p>
          </div>

          <button
            onClick={() => handleDateNav('newer')}
            disabled={!canGoNewer}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 max-w-lg mx-auto">
        {/* Weight Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-lime-500/20 rounded-xl">
              <Scale className="w-5 h-5 text-lime-500" />
            </div>
            <h2 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100">Weight</h2>
          </div>

          <div className="flex items-baseline gap-2">
            <input
              type="number"
              step="0.1"
              value={currentCheckIn.weight ?? ''}
              onChange={(e) => onUpdateWeight?.(currentCheckIn.id, e.target.value ? parseFloat(e.target.value) : null)}
              placeholder={previousWeight?.toString() ?? '—'}
              className="w-32 font-['JetBrains_Mono'] text-4xl font-bold text-zinc-900 dark:text-zinc-100 bg-transparent border-none outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
            <span className="text-zinc-500 text-lg">kg</span>
          </div>

          {previousWeight && !currentCheckIn.weight && (
            <p className="text-sm text-zinc-400 mt-2">
              Previous: {previousWeight} kg
            </p>
          )}
        </div>

        {/* Workout Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-colors ${currentCheckIn.workout.completed ? 'bg-lime-500/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                <Dumbbell className={`w-5 h-5 ${currentCheckIn.workout.completed ? 'text-lime-500' : 'text-zinc-400'}`} />
              </div>
              <h2 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100">Workout</h2>
            </div>

            <button
              onClick={() => onToggleWorkout?.(currentCheckIn.id, !currentCheckIn.workout.completed)}
              className={`px-4 py-2 rounded-xl font-['Inter'] font-medium text-sm transition-all ${
                currentCheckIn.workout.completed
                  ? 'bg-lime-500 text-zinc-900 hover:bg-lime-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {currentCheckIn.workout.completed ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Done
                </span>
              ) : (
                'Mark Done'
              )}
            </button>
          </div>

          {/* Exercises */}
          {currentCheckIn.workout.completed && (
            <div className="space-y-3 mt-4">
              {currentCheckIn.workout.exercises.map((exercise) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  onUpdate={(updates) => onUpdateExercise?.(currentCheckIn.id, exercise.id, updates)}
                  onRemove={() => onRemoveExercise?.(currentCheckIn.id, exercise.id)}
                />
              ))}

              {/* Add Exercise Button */}
              <button
                onClick={() => setShowExercisePicker(true)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-lime-500/50 hover:text-lime-500 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="font-['Inter'] text-sm">Add Exercise</span>
              </button>
            </div>
          )}
        </div>

        {/* Meals Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 rounded-xl">
                <Utensils className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100">Meals</h2>
            </div>

            {totalCalories > 0 && (
              <div className="text-right">
                <span className="font-['JetBrains_Mono'] font-bold text-lg text-zinc-900 dark:text-zinc-100">{totalCalories}</span>
                <span className="text-zinc-500 text-sm ml-1">kcal</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {mealSlots.map((slot) => {
              const mealKey = slot.toLowerCase() as keyof typeof currentCheckIn.meals
              const value = currentCheckIn.meals[mealKey]

              return (
                <div key={slot} className="relative">
                  <label className="block text-xs font-['Inter'] text-zinc-500 mb-1.5">{slot}</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={value ?? ''}
                      onChange={(e) => onUpdateMeal?.(currentCheckIn.id, slot as MealSlot, e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="—"
                      className="w-full pl-3 pr-12 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl font-['JetBrains_Mono'] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kcal</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => onSubmit?.(currentCheckIn.id)}
          className="w-full py-4 bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-zinc-900 font-['Inter'] font-semibold rounded-2xl shadow-lg shadow-lime-500/25 transition-all active:scale-[0.98]"
        >
          Save Check-In
        </button>
      </div>

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <ExercisePicker
          exerciseTypes={exerciseTypes}
          onSelect={(type) => {
            onAddExercise?.(currentCheckIn.id, type)
            setShowExercisePicker(false)
          }}
          onClose={() => setShowExercisePicker(false)}
        />
      )}
    </div>
  )
}

// Sub-component: Exercise Item
interface ExerciseItemProps {
  exercise: Exercise
  onUpdate: (updates: Partial<Exercise>) => void
  onRemove: () => void
}

function ExerciseItem({ exercise, onUpdate, onRemove }: ExerciseItemProps) {
  const isCardio = isCardioType(exercise.type)

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-['Inter'] font-medium text-zinc-900 dark:text-zinc-100">{exercise.type}</span>
        <button
          onClick={onRemove}
          className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isCardio ? (
        // Cardio fields
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-['Inter'] text-zinc-500 mb-1">Time</label>
            <div className="relative">
              <input
                type="number"
                value={'time' in exercise ? exercise.time ?? '' : ''}
                onChange={(e) => onUpdate({ time: e.target.value ? parseInt(e.target.value) : null } as Partial<Exercise>)}
                placeholder="—"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg font-['JetBrains_Mono'] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">min</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-['Inter'] text-zinc-500 mb-1">Distance</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={'distance' in exercise ? exercise.distance ?? '' : ''}
                onChange={(e) => onUpdate({ distance: e.target.value ? parseFloat(e.target.value) : null } as Partial<Exercise>)}
                placeholder="—"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg font-['JetBrains_Mono'] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">km</span>
            </div>
          </div>
        </div>
      ) : (
        // Strength fields
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-['Inter'] text-zinc-500 mb-1">Sets</label>
            <input
              type="number"
              value={'sets' in exercise ? exercise.sets ?? '' : ''}
              onChange={(e) => onUpdate({ sets: e.target.value ? parseInt(e.target.value) : null } as Partial<Exercise>)}
              placeholder="—"
              className="w-full px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg font-['JetBrains_Mono'] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 outline-none text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-['Inter'] text-zinc-500 mb-1">Reps</label>
            <input
              type="number"
              value={'reps' in exercise ? exercise.reps ?? '' : ''}
              onChange={(e) => onUpdate({ reps: e.target.value ? parseInt(e.target.value) : null } as Partial<Exercise>)}
              placeholder="—"
              className="w-full px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg font-['JetBrains_Mono'] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 outline-none text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-['Inter'] text-zinc-500 mb-1">Weight</label>
            <div className="relative">
              <input
                type="number"
                value={'weight' in exercise ? exercise.weight ?? '' : ''}
                onChange={(e) => onUpdate({ weight: e.target.value ? parseFloat(e.target.value) : null } as Partial<Exercise>)}
                placeholder="—"
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg font-['JetBrains_Mono'] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 outline-none pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Sub-component: Exercise Picker Modal
interface ExercisePickerProps {
  exerciseTypes: ExerciseType[]
  onSelect: (type: ExerciseType) => void
  onClose: () => void
}

function ExercisePicker({ exerciseTypes, onSelect, onClose }: ExercisePickerProps) {
  // Group exercises by category
  const strengthTypes = exerciseTypes.filter(t => !isCardioType(t))
  const cardioTypes = exerciseTypes.filter(t => isCardioType(t))

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl p-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-['DM_Serif_Display'] text-xl text-zinc-900 dark:text-zinc-100">Add Exercise</h3>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strength Exercises */}
        <div className="mb-6">
          <h4 className="text-xs font-['Inter'] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Strength</h4>
          <div className="grid grid-cols-3 gap-2">
            {strengthTypes.map((type) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-lime-500/20 hover:text-lime-600 dark:hover:text-lime-400 text-zinc-700 dark:text-zinc-300 rounded-xl font-['Inter'] text-sm font-medium transition-all"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Cardio Exercises */}
        <div>
          <h4 className="text-xs font-['Inter'] font-semibold text-zinc-500 uppercase tracking-wider mb-3">Cardio</h4>
          <div className="grid grid-cols-2 gap-2">
            {cardioTypes.map((type) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-600 dark:hover:text-amber-400 text-zinc-700 dark:text-zinc-300 rounded-xl font-['Inter'] text-sm font-medium transition-all"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
