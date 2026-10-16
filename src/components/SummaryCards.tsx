import { Icon } from './Icon'
import { formatDueLabel } from '../lib/dates'
import type { LifeItem } from '../types'

interface SummaryCardsProps {
  items: LifeItem[]
  today: string
}

export function SummaryCards({ items, today }: SummaryCardsProps) {
  const dueToday = items.filter((item) => item.dueDate === today)
  const doneToday = dueToday.filter((item) => item.done).length
  const remaining = dueToday.length - doneToday

  const upcoming = items
    .filter((item) => item.dueDate > today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const next: LifeItem | undefined = upcoming[0]

  let todayHint = `${doneToday} of ${dueToday.length} done`
  if (dueToday.length === 0) todayHint = 'Nothing due today.'
  else if (remaining === 0) todayHint = 'Everything is done. Nice work.'

  return (
    <section className="summary-grid" aria-label="Summary">
      <div className="card stat">
        <div className="stat-head">
          <p className="stat-label">Due today</p>
          <span className="stat-icon stat-icon-primary">
            <Icon name="clock" size={18} />
          </span>
        </div>
        <p className="stat-value">{remaining}</p>
        <p className="stat-hint">{todayHint}</p>
      </div>

      <div className="card stat">
        <div className="stat-head">
          <p className="stat-label">Upcoming</p>
          <span className="stat-icon stat-icon-secondary">
            <Icon name="calendar" size={18} />
          </span>
        </div>
        <p className="stat-value">{upcoming.length}</p>
        <p className="stat-hint">
          {next
            ? `Next: ${next.title} · ${formatDueLabel(next.dueDate, today)}`
            : 'Nothing scheduled yet.'}
        </p>
      </div>
    </section>
  )
}