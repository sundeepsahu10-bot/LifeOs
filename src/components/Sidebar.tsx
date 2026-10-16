import { useRef, useState, type KeyboardEvent } from 'react'
import { Icon, type IconName } from './Icon'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { ThemeChoice } from '../hooks/useTheme'

interface NavItem {
  label: string
  icon: IconName
  current?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', current: true },
  { label: 'Reminders', icon: 'reminders' },
  { label: 'Bills', icon: 'bills' },
  { label: 'Subscriptions', icon: 'subscriptions' },
  { label: 'Documents', icon: 'documents' },
  { label: 'Calendar', icon: 'calendar' },
]

interface SidebarProps {
  theme: ThemeChoice
  onThemeChange: (theme: ThemeChoice) => void
}

export function Sidebar({ theme, onThemeChange }: SidebarProps) {
  // Only used on small screens, where the sidebar becomes a top bar with a menu.
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      toggleRef.current?.focus()
    }
  }

  return (
    <aside className="sidebar" data-open={open} onKeyDown={handleKeyDown}>
      <div className="sidebar-top">
        <div className="brand">
          <span className="brand-mark">
            <Icon name="logo" size={18} />
          </span>
          <span>LifeOS</span>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="icon-btn sidebar-toggle"
          aria-label="Main menu"
          aria-expanded={open}
          aria-controls="sidebar-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      <div id="sidebar-panel" className="sidebar-panel">
        <nav aria-label="Primary">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.current ? (
                  <a
                    className="nav-item"
                    href="#main-content"
                    aria-current="page"
                    onClick={() => setOpen(false)}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button type="button" className="nav-item" disabled>
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                    <span className="nav-soon">Soon</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="text-overline">Appearance</p>
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
        </div>
      </div>
    </aside>
  )
}