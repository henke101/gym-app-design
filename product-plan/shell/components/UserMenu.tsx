import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'

interface UserMenuProps {
  user: {
    name: string
    avatarUrl?: string
  }
  onLogout?: () => void
  variant: 'compact' | 'expanded'
}

export function UserMenu({ user, onLogout, variant }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (variant === 'compact') {
    return (
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-lime-500/20 text-lime-400 hover:bg-lime-500/30 transition-colors ring-2 ring-lime-500/30"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium font-['Inter']">{initials}</span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 py-1 z-50">
            <div className="px-4 py-2 border-b border-zinc-700">
              <p className="font-medium text-zinc-100 font-['Inter']">
                {user.name}
              </p>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-lime-400 transition-colors font-['Inter']">
              <User size={16} />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-lime-400 transition-colors font-['Inter']">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <div className="border-t border-zinc-700 mt-1 pt-1">
              <button
                onClick={() => {
                  setIsOpen(false)
                  onLogout?.()
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-amber-400 hover:bg-amber-500/20 transition-colors font-['Inter']"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Expanded variant for sidebar
  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500/20 text-lime-400 ring-2 ring-lime-500/30">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium font-['Inter']">{initials}</span>
          )}
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-zinc-100 font-['Inter'] truncate">
            {user.name}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 bottom-full mb-2 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 py-1 z-50">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-lime-400 transition-colors font-['Inter']">
            <User size={16} />
            <span>Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-lime-400 transition-colors font-['Inter']">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <div className="border-t border-zinc-700 mt-1 pt-1">
            <button
              onClick={() => {
                setIsOpen(false)
                onLogout?.()
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-amber-400 hover:bg-amber-500/20 transition-colors font-['Inter']"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
