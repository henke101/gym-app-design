interface DataPoint {
  date: string
  value: number
  highlight?: boolean
}

interface MiniChartProps {
  data: DataPoint[]
  color: 'lime' | 'amber' | 'zinc'
  type: 'line' | 'bar' | 'dots'
  unit?: string
  yAxisLabel?: string
  yAxisPadding?: number
  selectedDate?: string
  onPointClick?: (date: string) => void
  showDateLabels?: boolean
  timeRange?: 'week' | 'month'
}

export function MiniChart({
  data,
  color,
  type,
  unit = '',
  yAxisLabel,
  yAxisPadding = 0,
  selectedDate,
  onPointClick,
  showDateLabels = true,
  timeRange = 'month'
}: MiniChartProps) {
  if (data.length === 0) return null

  const values = data.map(d => d.value)
  const dataMin = Math.min(...values)
  const dataMax = Math.max(...values)

  // Apply padding: round to nearest integer then add/subtract padding
  const min = yAxisPadding > 0 ? Math.round(dataMin) - yAxisPadding : dataMin
  const max = yAxisPadding > 0 ? Math.round(dataMax) + yAxisPadding : dataMax
  const range = max - min || 1

  const colorClasses = {
    lime: {
      fill: 'fill-lime-500',
      stroke: 'stroke-lime-500',
      bg: 'bg-lime-500',
      bgLight: 'bg-lime-100 dark:bg-lime-900/30',
      text: 'text-lime-600 dark:text-lime-400'
    },
    amber: {
      fill: 'fill-amber-500',
      stroke: 'stroke-amber-500',
      bg: 'bg-amber-500',
      bgLight: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400'
    },
    zinc: {
      fill: 'fill-zinc-400',
      stroke: 'stroke-zinc-400',
      bg: 'bg-zinc-400',
      bgLight: 'bg-zinc-100 dark:bg-zinc-800',
      text: 'text-zinc-600 dark:text-zinc-400'
    }
  }

  const colors = colorClasses[color]

  // Parse date string as local date to avoid timezone shifts
  const parseLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const formatDate = (dateStr: string) => {
    const date = parseLocalDate(dateStr)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  }

  const formatShortDate = (dateStr: string) => {
    const date = parseLocalDate(dateStr)
    return date.getDate().toString()
  }

  const formatDayOfWeek = (dateStr: string) => {
    const date = parseLocalDate(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2)
  }

  // Generate all 7 days of the week for week view
  const generateWeekDays = () => {
    if (data.length === 0) return []
    // Find the latest date in the data and generate 7 days ending with it
    const latestDate = parseLocalDate(data.reduce((latest, d) => d.date > latest ? d.date : latest, data[0].date))
    const days: { date: string; dateObj: Date }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(latestDate)
      d.setDate(d.getDate() - i)
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      days.push({ date: dateStr, dateObj: d })
    }
    return days
  }

  const weekDays = timeRange === 'week' ? generateWeekDays() : []

  if (type === 'line') {
    const width = 100
    const height = 50
    const leftPadding = 4
    const rightPadding = 4
    const topPadding = 4
    const bottomPadding = 8

    // For week view, create a map of date -> data point for quick lookup
    const dataByDateLine = timeRange === 'week' ? new Map(data.map(d => [d.date, d])) : null

    // Calculate x positions - evenly spaced for week view, date-based for month view
    const dates = data.map(d => parseLocalDate(d.date).getTime())
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)
    const dateRange = maxDate - minDate || 1

    const points = timeRange === 'week'
      ? weekDays.map((day, index) => {
          const dataPoint = dataByDateLine!.get(day.date)
          const xRatio = index / 6
          const x = leftPadding + xRatio * (width - leftPadding - rightPadding)
          const y = dataPoint
            ? topPadding + (1 - (dataPoint.value - min) / range) * (height - topPadding - bottomPadding)
            : null
          return { x, y, date: day.date, value: dataPoint?.value ?? null, xRatio, hasData: !!dataPoint }
        }).filter(p => p.hasData) as { x: number; y: number; date: string; value: number; xRatio: number; hasData: boolean }[]
      : data.map((d) => {
          const dateTime = parseLocalDate(d.date).getTime()
          const xRatio = (dateTime - minDate) / dateRange
          const x = leftPadding + xRatio * (width - leftPadding - rightPadding)
          const y = topPadding + (1 - (d.value - min) / range) * (height - topPadding - bottomPadding)
          return { x, y, date: d.date, value: d.value, xRatio, hasData: true }
        })

    // Generate smooth curve using cubic bezier
    const generateSmoothPath = () => {
      if (points.length < 2) return `M ${points[0].x} ${points[0].y}`

      let path = `M ${points[0].x} ${points[0].y}`

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)]
        const p1 = points[i]
        const p2 = points[i + 1]
        const p3 = points[Math.min(points.length - 1, i + 2)]

        // Tension factor (0.3-0.5 works well for smooth curves)
        const tension = 0.3

        const cp1x = p1.x + (p2.x - p0.x) * tension
        const cp1y = p1.y + (p2.y - p0.y) * tension
        const cp2x = p2.x - (p3.x - p1.x) * tension
        const cp2y = p2.y - (p3.y - p1.y) * tension

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
      }

      return path
    }

    const pathD = generateSmoothPath()

    return (
      <div className="relative">
        <div className="flex">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono pr-1 h-16">
            <span>{yAxisPadding > 0 ? max : max.toFixed(1)}</span>
            <span>{yAxisPadding > 0 ? min : min.toFixed(1)}</span>
          </div>

          {/* Chart */}
          <div className="flex-1">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1={leftPadding} y1={topPadding} x2={width - rightPadding} y2={topPadding}
                className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="0.3" />
              <line x1={leftPadding} y1={height - bottomPadding} x2={width - rightPadding} y2={height - bottomPadding}
                className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="0.3" />

              {/* Area fill */}
              <path
                d={`${pathD} L ${points[points.length - 1].x} ${height - bottomPadding} L ${points[0].x} ${height - bottomPadding} Z`}
                className={`${colors.fill} opacity-10`}
                fillRule="evenodd"
              />

              {/* Line */}
              <path d={pathD} className={colors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Interactive points */}
              {points.map((point) => (
                <g key={point.date}>
                  <circle cx={point.x} cy={point.y} r="6" fill="transparent" className="cursor-pointer"
                    onClick={() => onPointClick?.(point.date)} />
                  <circle cx={point.x} cy={point.y} r={selectedDate === point.date ? 4 : 2}
                    className={`${colors.fill} ${selectedDate === point.date ? 'opacity-100' : 'opacity-0 hover:opacity-100'} transition-opacity cursor-pointer`}
                    onClick={() => onPointClick?.(point.date)} />
                </g>
              ))}
            </svg>

            {/* X-axis labels - positioned to match data points */}
            {showDateLabels && (
              <div className="relative h-8 text-[8px] text-zinc-400 dark:text-zinc-500 font-mono">
                {timeRange === 'week' ? (
                  // Week view: show all 7 days evenly spaced
                  weekDays.map((day, index) => {
                    const leftPercent = 4
                    const rightPercent = 96
                    const labelLeft = leftPercent + (index / 6) * (rightPercent - leftPercent)
                    return (
                      <span
                        key={day.date}
                        className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                        style={{ left: `${labelLeft}%` }}
                      >
                        <span>{formatDayOfWeek(day.date)}</span>
                        <span>{formatShortDate(day.date)}/{day.dateObj.getMonth() + 1}</span>
                      </span>
                    )
                  })
                ) : (
                  // Month view: show labels only for data points
                  points.map((p) => {
                    const leftPercent = 4
                    const rightPercent = 96
                    const labelLeft = leftPercent + p.xRatio * (rightPercent - leftPercent)
                    return (
                      <span
                        key={p.date}
                        className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                        style={{ left: `${labelLeft}%` }}
                      >
                        <span>{formatDayOfWeek(p.date)}</span>
                        <span>{formatShortDate(p.date)}/{parseLocalDate(p.date).getMonth() + 1}</span>
                      </span>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Y-axis label */}
        {yAxisLabel && (
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {yAxisLabel}
          </div>
        )}
      </div>
    )
  }

  // Calculate positions for bar and dots charts
  const width = 100
  const height = 50
  const leftPadding = 4
  const rightPadding = 4
  const topPadding = 4
  const bottomPadding = 8

  // For week view, create a map of date -> data point for quick lookup
  const dataByDate = timeRange === 'week' ? new Map(data.map(d => [d.date, d])) : null

  // Calculate positions - evenly spaced for week view, date-based for month view
  const dates = data.map(d => parseLocalDate(d.date).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)
  const dateRange = maxDate - minDate || 1

  const dataPoints = timeRange === 'week'
    ? weekDays.map((day, index) => {
        const dataPoint = dataByDate!.get(day.date)
        return {
          date: day.date,
          value: dataPoint?.value ?? 0,
          xRatio: index / 6,
          hasData: !!dataPoint
        }
      })
    : data.map((d) => {
        const dateTime = parseLocalDate(d.date).getTime()
        const xRatio = (dateTime - minDate) / dateRange
        return { ...d, xRatio, hasData: true }
      })

  // Dots chart for training days - using HTML for proper sizing
  if (type === 'dots') {
    const leftPercent = 4
    const rightPercent = 96

    // For week view, create a map of date -> data point for quick lookup
    const dataByDate = new Map(data.map(d => [d.date, d]))

    // Generate display items: all 7 days for week view, or just data points for month view
    const displayItems = timeRange === 'week'
      ? weekDays.map((day, index) => {
          const dataPoint = dataByDate.get(day.date)
          return {
            date: day.date,
            value: dataPoint?.value ?? 0,
            hasData: !!dataPoint,
            xRatio: index / 6
          }
        })
      : dataPoints.map(d => ({ ...d, hasData: true }))

    return (
      <div className="relative">
        <div className="flex">
          {/* Spacer for Y-axis alignment */}
          <div className="w-8 pr-1" />

          {/* Chart area */}
          <div className="flex-1">
            {/* Indicators row */}
            <div className="relative h-10 flex items-center">
              {/* Baseline */}
              <div className="absolute left-[4%] right-[4%] h-px bg-zinc-200 dark:bg-zinc-700" />

              {/* Workout indicators */}
              {displayItems.map((d) => {
                const labelLeft = leftPercent + d.xRatio * (rightPercent - leftPercent)
                const isWorkout = d.value === 1
                const isSelected = selectedDate === d.date

                return (
                  <button
                    key={d.date}
                    onClick={() => onPointClick?.(d.date)}
                    className="absolute -translate-x-1/2 flex items-center justify-center"
                    style={{ left: `${labelLeft}%` }}
                    title={`${formatDate(d.date)}: ${isWorkout ? 'Workout' : 'Rest day'}`}
                  >
                    {isWorkout ? (
                      // Checkmark for workout days
                      <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-amber-400' : 'opacity-90 hover:opacity-100'}`}>
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      // Small grey dot for rest days and days with no data
                      <div className={`w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-amber-400' : ''}`} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* X-axis labels - day of week + date */}
            {showDateLabels && (
              <div className="relative h-8 text-[8px] text-zinc-400 dark:text-zinc-500 font-mono">
                {timeRange === 'week' ? (
                  // Week view: show all 7 days evenly spaced
                  weekDays.map((day, index) => {
                    const labelLeft = leftPercent + (index / 6) * (rightPercent - leftPercent)
                    return (
                      <span
                        key={day.date}
                        className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                        style={{ left: `${labelLeft}%` }}
                      >
                        <span>{formatDayOfWeek(day.date)}</span>
                        <span>{formatShortDate(day.date)}/{day.dateObj.getMonth() + 1}</span>
                      </span>
                    )
                  })
                ) : (
                  // Month view: show labels only for data points
                  dataPoints.map((p) => {
                    const labelLeft = leftPercent + p.xRatio * (rightPercent - leftPercent)
                    return (
                      <span
                        key={p.date}
                        className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                        style={{ left: `${labelLeft}%` }}
                      >
                        <span>{formatDayOfWeek(p.date)}</span>
                        <span>{formatShortDate(p.date)}/{parseLocalDate(p.date).getMonth() + 1}</span>
                      </span>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Bar chart with date-based positioning
  return (
    <div className="relative">
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono pr-1 h-16">
          <span>{Math.round(max)}{unit ? ` ${unit.trim()}` : ''}</span>
          <span>{Math.round(min)}{unit ? ` ${unit.trim()}` : ''}</span>
        </div>

        {/* Chart */}
        <div className="flex-1">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1={leftPadding} y1={topPadding} x2={width - rightPadding} y2={topPadding}
              className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="0.3" />
            <line x1={leftPadding} y1={height - bottomPadding} x2={width - rightPadding} y2={height - bottomPadding}
              className="stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="0.3" />

            {/* Bars */}
            {dataPoints.filter(d => d.hasData).map((d) => {
              const x = leftPadding + d.xRatio * (width - leftPadding - rightPadding)
              const barWidth = Math.max(1.5, (width - leftPadding - rightPadding) / data.length * 0.7)
              const barHeight = ((d.value - min) / range) * (height - topPadding - bottomPadding)
              const y = height - bottomPadding - barHeight
              const isSelected = selectedDate === d.date

              return (
                <g key={d.date} className="cursor-pointer" onClick={() => onPointClick?.(d.date)}>
                  {/* Larger hit area */}
                  <rect x={x - barWidth} y={topPadding} width={barWidth * 2} height={height - topPadding - bottomPadding} fill="transparent" />

                  <rect
                    x={x - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="0.5"
                    className={`${isSelected ? colors.fill : colors.fill} ${isSelected ? 'opacity-100' : 'opacity-60'} transition-all hover:opacity-80`}
                  />
                </g>
              )
            })}
          </svg>

          {/* X-axis labels */}
          {showDateLabels && (
            <div className="relative h-8 text-[8px] text-zinc-400 dark:text-zinc-500 font-mono">
              {timeRange === 'week' ? (
                // Week view: show all 7 days evenly spaced
                weekDays.map((day, index) => {
                  const leftPercent = 4
                  const rightPercent = 96
                  const labelLeft = leftPercent + (index / 6) * (rightPercent - leftPercent)
                  return (
                    <span
                      key={day.date}
                      className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                      style={{ left: `${labelLeft}%` }}
                    >
                      <span>{formatDayOfWeek(day.date)}</span>
                      <span>{formatShortDate(day.date)}/{day.dateObj.getMonth() + 1}</span>
                    </span>
                  )
                })
              ) : (
                // Month view: show labels only for data points
                dataPoints.map((p) => {
                  const leftPercent = 4
                  const rightPercent = 96
                  const labelLeft = leftPercent + p.xRatio * (rightPercent - leftPercent)
                  return (
                    <span
                      key={p.date}
                      className="absolute -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                      style={{ left: `${labelLeft}%` }}
                    >
                      <span>{formatDayOfWeek(p.date)}</span>
                      <span>{formatShortDate(p.date)}/{parseLocalDate(p.date).getMonth() + 1}</span>
                    </span>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
