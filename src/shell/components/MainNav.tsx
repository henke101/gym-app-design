import { ClipboardCheck, TrendingUp, Dumbbell, Lightbulb } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
  variant: 'sidebar' | 'bottom'
}

const iconMap = {
  'check-in': ClipboardCheck,
  'progress': TrendingUp,
  'workouts': Dumbbell,
  'insights': Lightbulb,
}

export function MainNav({ items, onNavigate, variant }: MainNavProps) {
  if (variant === 'bottom') {
    return (
      <nav className="flex items-center justify-around bg-zinc-900 border-t border-zinc-800 h-16 px-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                item.isActive
                  ? 'text-lime-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${
                item.isActive ? 'bg-lime-500/20' : ''
              }`}>
                <Icon
                  size={22}
                  strokeWidth={item.isActive ? 2.5 : 2}
                />
              </div>
              <span className="text-xs font-medium font-['Inter']">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    )
  }

  // Sidebar variant
  return (
    <nav className="flex-1 px-3 py-4">
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <li key={item.href}>
              <button
                onClick={() => onNavigate?.(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-['Inter'] ${
                  item.isActive
                    ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  item.isActive
                    ? 'bg-lime-500/30'
                    : 'bg-zinc-800'
                }`}>
                  <Icon
                    size={18}
                    strokeWidth={item.isActive ? 2.5 : 2}
                  />
                </div>
                <span className="font-medium">{item.label}</span>
                {item.isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-lime-400" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
