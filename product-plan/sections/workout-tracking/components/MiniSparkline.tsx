interface SparklinePoint {
  date: string
  value: number
}

interface MiniSparklineProps {
  data: SparklinePoint[]
  color: 'lime' | 'amber'
  height?: number
}

export function MiniSparkline({ data, color, height = 32 }: MiniSparklineProps) {
  if (data.length < 2) return null

  const values = data.map(d => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const width = 100
  const padding = 2

  // Generate path points
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (d.value - min) / range) * (height - padding * 2)
    return { x, y }
  })

  // Create smooth path
  const pathD = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const cpx = (prev.x + point.x) / 2
    return `${path} Q ${cpx} ${prev.y}, ${cpx} ${(prev.y + point.y) / 2} T ${point.x} ${point.y}`
  }, '')

  // Area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

  const colorClasses = {
    lime: {
      stroke: 'stroke-lime-500',
      fill: 'fill-lime-500/20'
    },
    amber: {
      stroke: 'stroke-amber-500',
      fill: 'fill-amber-500/20'
    }
  }

  const colors = colorClasses[color]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <path d={areaD} className={colors.fill} />
      <path d={pathD} className={colors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
