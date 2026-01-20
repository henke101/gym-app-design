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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden">
        <h1 className="font-['DM_Serif_Display'] text-xl text-zinc-900 dark:text-zinc-100">
          MbareteGainz
        </h1>
        {user && (
          <UserMenu
            user={user}
            onLogout={onLogout}
            variant="compact"
          />
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
        <div className="p-6">
          <h1 className="font-['DM_Serif_Display'] text-2xl text-zinc-900 dark:text-zinc-100">
            MbareteGainz
          </h1>
        </div>

        <MainNav
          items={navigationItems}
          onNavigate={onNavigate}
          variant="sidebar"
        />

        {user && (
          <div className="mt-auto p-4 border-t border-zinc-200 dark:border-zinc-800">
            <UserMenu
              user={user}
              onLogout={onLogout}
              variant="expanded"
            />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="pt-14 pb-20 md:pt-0 md:pb-0 md:pl-60">
        <div className="min-h-screen">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
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
