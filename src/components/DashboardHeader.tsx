import { Icon } from './Icon'
import { formatLongDate, getGreeting } from '../lib/dates'

interface DashboardHeaderProps {
  now: Date
  query: string
  onQueryChange: (query: string) => void
}

export function DashboardHeader({
  now,
  query,
  onQueryChange,
}: DashboardHeaderProps) {
  return (
    <header className="dash-header">
      <div className="dash-greeting">
        <p className="text-overline">{formatLongDate(now)}</p>
        <h1>{getGreeting(now)}</h1>
        <p className="text-muted">Here is what matters today.</p>
      </div>

      <div className="dash-tools">
        <div className="search" role="search">
          <span className="search-icon">
            <Icon name="search" />
          </span>
          <label htmlFor="dash-search" className="visually-hidden">
            Search your items
          </label>
          <input
            id="dash-search"
            className="search-input"
            type="search"
            placeholder="Search your items"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="icon-btn"
          disabled
          aria-label="Notifications (coming soon)"
          title="Notifications are coming soon"
        >
          <Icon name="bell" />
        </button>
      </div>
    </header>
  )
}