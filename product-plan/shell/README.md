# Application Shell

## Overview

MbareteGainz uses an adaptive navigation pattern: bottom tab bar on mobile for thumb-friendly access, sidebar navigation on desktop for a dashboard experience.

## Components

- `AppShell.tsx` — Main layout wrapper with adaptive navigation
- `MainNav.tsx` — Navigation component (bottom tabs on mobile, sidebar on desktop)
- `UserMenu.tsx` — User menu with avatar and dropdown

## Navigation Structure

| Nav Item | Icon | Route |
|----------|------|-------|
| Check-In | ClipboardCheck | `/check-in` |
| Progress | TrendingUp | `/progress` |
| Workouts | Dumbbell | `/workouts` |
| Insights | Lightbulb | `/insights` |

## Props

### AppShellProps

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: {
    name: string
    avatarUrl?: string
  }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}
```

## Usage

```tsx
import { AppShell } from './components'

const navigationItems = [
  { label: 'Check-In', href: '/check-in', icon: 'check-in', isActive: true },
  { label: 'Progress', href: '/progress', icon: 'progress' },
  { label: 'Workouts', href: '/workouts', icon: 'workouts' },
  { label: 'Insights', href: '/insights', icon: 'insights' },
]

function App() {
  return (
    <AppShell
      navigationItems={navigationItems}
      user={{ name: 'Demo User' }}
      onNavigate={(href) => router.push(href)}
      onLogout={() => auth.logout()}
    >
      <YourPageContent />
    </AppShell>
  )
}
```

## Responsive Behavior

- **Mobile (<768px):** Bottom tab bar, header with avatar
- **Desktop (>1024px):** Persistent sidebar on left

## Design Tokens Used

- **Primary (lime):** Active nav items, selected states
- **Secondary (amber):** Logout button highlight
- **Neutral (zinc):** Backgrounds, borders, inactive text
