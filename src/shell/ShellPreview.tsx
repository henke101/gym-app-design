import { AppShell } from './components'
import type { NavigationItem } from './components'

export default function ShellPreview() {
  const navigationItems: NavigationItem[] = [
    { label: 'Check-In', href: '/check-in', icon: 'check-in', isActive: true },
    { label: 'Progress', href: '/progress', icon: 'progress' },
    { label: 'Workouts', href: '/workouts', icon: 'workouts' },
    { label: 'Insights', href: '/insights', icon: 'insights' },
  ]

  const user = {
    name: 'Alex Morgan',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Daily Check-In
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          How's your day going? Let's log your progress.
        </p>

        {/* Sample content to show layout */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg">
                <svg className="w-5 h-5 text-lime-600 dark:text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Weight
              </h3>
            </div>
            <p className="font-mono text-3xl font-bold text-lime-600 dark:text-lime-400">
              185.2 <span className="text-base font-normal text-zinc-500">lbs</span>
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Streak
              </h3>
            </div>
            <p className="font-mono text-3xl font-bold text-amber-500">
              12 <span className="text-base font-normal text-zinc-500">days</span>
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-lime-100 dark:bg-lime-900/30 rounded-lg">
                <svg className="w-5 h-5 text-lime-600 dark:text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Today's Protein
              </h3>
            </div>
            <p className="font-mono text-3xl font-bold text-zinc-700 dark:text-zinc-300">
              142 <span className="text-base font-normal text-zinc-500">g</span>
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
