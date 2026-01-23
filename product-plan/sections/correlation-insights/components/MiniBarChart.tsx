import type { ChartDataPoint } from '../types'

interface MiniChartProps {
  data: ChartDataPoint[]
  color?: 'lime' | 'amber'
  height?: number
}

export function MiniBarChart({ data, color = 'lime', height = 48 }: MiniChartProps) {
  if (data.length === 0) return null

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || maxValue

  const colorClasses = {
    lime: {
      dot: 'bg-lime-500 dark:bg-lime-400',
      line: 'bg-lime-300 dark:bg-lime-600',
      glow: 'shadow-lime-500/50'
    },
    amber: {
      dot: 'bg-amber-500 dark:bg-amber-400',
      line: 'bg-amber-300 dark:bg-amber-600',
      glow: 'shadow-amber-500/50'
    }
  }

  // Calculate Y positions (inverted: 0% = top, 100% = bottom)
  // X positions are evenly distributed (centered in each segment)
  const points = data.map((point, i) => {
    const normalized = range === 0 ? 50 : ((point.value - minValue) / range) * 100
    const y = 90 - (normalized * 0.8) // Invert and add padding
    const x = (i + 0.5) / data.length * 100 // Center of each segment
    return { x, y }
  })

  const chartHeight = height - 16 // Reserve space for labels

  return (
    <div style={{ height }}>
      {/* Chart area */}
      <div className="relative" style={{ height: chartHeight }}>
        {/* Connecting lines - using viewBox for proper SVG coordinates */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={color === 'lime' ? 'text-lime-400 dark:text-lime-500' : 'text-amber-400 dark:text-amber-500'}
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
          />
        </svg>

        {/* Dots */}
        {points.map((p, i) => (
          <div
            key={i}
            className={`absolute w-2.5 h-2.5 rounded-full ${colorClasses[color].dot} shadow-md ${colorClasses[color].glow} -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`
            }}
          />
        ))}
      </div>

      {/* Labels - evenly distributed */}
      <div className="flex mt-1">
        {data.map((point, i) => (
          <span
            key={i}
            className="flex-1 text-[8px] text-zinc-400 dark:text-zinc-500 text-center truncate"
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  )
}
