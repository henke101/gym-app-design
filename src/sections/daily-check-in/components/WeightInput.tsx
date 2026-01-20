import { Scale } from 'lucide-react'

interface WeightInputProps {
  weight: number | null
  previousWeight: number | null
  onUpdateWeight?: (weight: number | null) => void
}

export function WeightInput({ weight, previousWeight, onUpdateWeight }: WeightInputProps) {
  const displayValue = weight ?? ''
  const placeholder = previousWeight ? `${previousWeight}` : '---'

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg">
          <Scale className="w-5 h-5 text-lime-600 dark:text-lime-400" />
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Weight</h3>
      </div>

      <div className="flex items-baseline gap-2">
        <input
          type="number"
          step="0.1"
          value={displayValue}
          onChange={(e) => {
            const val = e.target.value
            onUpdateWeight?.(val ? parseFloat(val) : null)
          }}
          placeholder={placeholder}
          className="w-32 text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 focus:border-lime-500 dark:focus:border-lime-400 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 transition-colors"
        />
        <span className="text-lg text-zinc-500 dark:text-zinc-400">lbs</span>
      </div>

      {previousWeight && !weight && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Previous: <span className="font-mono">{previousWeight}</span> lbs
        </p>
      )}
    </div>
  )
}
