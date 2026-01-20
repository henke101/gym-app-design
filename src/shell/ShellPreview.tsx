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
    <>
      {/* Google Fonts for product design tokens */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <AppShell
        navigationItems={navigationItems}
        user={user}
        onNavigate={(href) => console.log('Navigate to:', href)}
        onLogout={() => console.log('Logout')}
      >
        <div className="p-6 md:p-8">
          <h1 className="font-['DM_Serif_Display'] text-3xl text-zinc-900 dark:text-zinc-100 mb-2">
            Daily Check-In
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 font-['Inter'] mb-8">
            How's your day going? Let's log your progress.
          </p>

          {/* Sample content to show layout */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Weight
              </h3>
              <p className="font-['JetBrains_Mono'] text-2xl text-lime-600 dark:text-lime-400">
                185.2 <span className="text-sm text-zinc-500">lbs</span>
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Streak
              </h3>
              <p className="font-['JetBrains_Mono'] text-2xl text-amber-500">
                12 <span className="text-sm text-zinc-500">days</span>
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-['Inter'] font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Today's Protein
              </h3>
              <p className="font-['JetBrains_Mono'] text-2xl text-zinc-700 dark:text-zinc-300">
                142 <span className="text-sm text-zinc-500">g</span>
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  )
}
