import { useRef, useState, type KeyboardEvent } from 'react'
import { Icon, type IconName } from './Icon'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { ThemeChoice } from '../hooks/useTheme'
import type { PageId } from '../types'

interface NavItem {
  id: PageId
  label: string
  icon: IconName
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'reminders', label: 'Reminders', icon: 'reminders' },
  { id: 'bills', label: 'Bills', icon: 'bills' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'subscriptions' },
  { id: 'documents', label: 'Documents', icon: 'documents' },
  { id: 'warranties', label: 'Warranties', icon: 'documents' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
]

interface SidebarProps {
  theme: ThemeChoice
  onThemeChange: (theme: ThemeChoice) => void
  currentPage: PageId
  onPageChange: (page: PageId) => void
}

export function Sidebar({
  theme,
  onThemeChange,
  currentPage,
  onPageChange,
}: SidebarProps) {
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
                <li key={item.id}>
                <button
                    type="button"
                    className="nav-item"
                    aria-current={currentPage === item.id ? 'page' : undefined}
                    onClick={() => {
                    onPageChange(item.id)
                    setOpen(false)
                    }}
                >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                </button>
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