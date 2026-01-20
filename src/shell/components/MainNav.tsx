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
      <nav className="flex items-center justify-around bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 h-16 px-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                item.isActive
                  ? 'text-lime-600 dark:text-lime-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={item.isActive ? 2.5 : 2}
              />
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
    <nav className="flex-1 px-3 py-2">
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <li key={item.href}>
              <button
                onClick={() => onNavigate?.(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-['Inter'] ${
                  item.isActive
                    ? 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={item.isActive ? 2.5 : 2}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
