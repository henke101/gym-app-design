import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'

export interface NavigationItem {
  label: string
  href: string
  icon: 'check-in' | 'progress' | 'workouts' | 'insights'
  isActive?: boolean
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: {
    name: string
    avatarUrl?: string
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Mobile Header - lime accent bar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="h-1 bg-gradient-to-r from-lime-400 via-lime-500 to-amber-400" />
        <div className="flex items-center justify-between px-4 h-14 bg-zinc-900 dark:bg-zinc-900">
          <h1 className="font-['DM_Serif_Display'] text-xl text-lime-400">
            MbareteGainz
          </h1>
          {user && (
            <UserMenu
              user={user}
              onLogout={onLogout}
              variant="compact"
            />
          )}
        </div>
      </header>

      {/* Desktop Sidebar - dark with lime accents */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 flex-col bg-zinc-900 dark:bg-zinc-900">
        {/* Logo area with accent */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center">
              <span className="text-zinc-900 font-bold text-lg">M</span>
            </div>
            <h1 className="font-['DM_Serif_Display'] text-2xl text-zinc-100">
              MbareteGainz
            </h1>
          </div>
        </div>

        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          variant="sidebar"
        />

        {user && (
          <div className="mt-auto p-4 border-t border-zinc-800">
            <UserMenu
              user={user}
              onLogout={onLogout}
              variant="expanded"
            />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pt-0 md:pb-0 md:pl-64">
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - dark with lime active states */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          variant="bottom"
        />
      </div>
    </div>
  )
}
