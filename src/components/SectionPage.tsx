
import { formatDueLabel } from '../lib/dates'
import {
  CATEGORY_LABELS,
  CATEGORY_TONES,
  type ItemCategory,
  type LifeItem,
  type PageId,
} from '../types'

interface SectionPageProps {
  page: PageId
  items: LifeItem[]
  today: string
  isFiltered: boolean
  onToggle: (id: string) => void
}

const PAGE_CONTENT: Record<
  Exclude<PageId, 'dashboard'>,
  { title: string; description: string }
> = {
  reminders: {
    title: 'Reminders',
    description: 'Keep track of tasks and things you need to remember.',
  },
  bills: {
    title: 'Bills',
    description: 'Organize upcoming payments and due dates.',
  },
  subscriptions: {
    title: 'Subscriptions',
    description: 'Keep track of recurring services and renewals.',
  },
  documents: {
    title: 'Documents',
    description: 'Keep important documents organized in one place.',
  },
  warranties: {
    title: 'Warranties',
    description: 'Track product warranties and their expiry dates.',
  },
  calendar: {
    title: 'Calendar',
    description: 'See important dates and upcoming events.',
  },
}

const PAGE_CATEGORIES: Partial<
  Record<Exclude<PageId, 'dashboard'>, ItemCategory>
> = {
  reminders: 'reminder',
  bills: 'bill',
  subscriptions: 'subscription',
  documents: 'document',
}

function CategoryBadge({ category }: { category: ItemCategory }) {
  const tone = CATEGORY_TONES[category]

  return (
    <span className={tone === 'neutral' ? 'badge' : `badge badge-${tone}`}>
      {CATEGORY_LABELS[category]}
    </span>
  )
}

export function SectionPage({
  page,
  items,
  today,
  isFiltered,
  onToggle,
}: SectionPageProps) {
  if (page === 'dashboard') return null

  const content = PAGE_CONTENT[page]
  const category = PAGE_CATEGORIES[page]

  const categoryItems = category
    ? items
        .filter((item) => item.category === category)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    : []

  return (
    <section className="section-page" aria-labelledby="section-page-title">
      <p className="text-overline">LifeSync / {content.title}</p>
      <h1 id="section-page-title">{content.title}</h1>
      <p>{content.description}</p>

      {category ? (
        <section className="card panel" aria-label={`${content.title} items`}>
          <div className="panel-head">
            <h2>Your {content.title.toLowerCase()}</h2>
            <p className="text-muted text-small">
              {categoryItems.filter((item) => !item.done).length} remaining
            </p>
          </div>

          {categoryItems.length === 0 ? (
            <p className="empty">
              {isFiltered
                ? `No ${content.title.toLowerCase()} match your search.`
                : `No ${content.title.toLowerCase()} yet. Use Quick add on the Dashboard to create one.`}
            </p>
          ) : (
            <ul className="item-list">
              {categoryItems.map((item) => {
                const inputId = `section-item-${item.id}`

                return (
                  <li
                    className="item"
                    key={item.id}
                    data-done={item.done}
                  >
                    <input
                      id={inputId}
                      className="item-check"
                      type="checkbox"
                      checked={item.done}
                      onChange={() => onToggle(item.id)}
                    />

                    <div className="item-body">
                      <label htmlFor={inputId} className="item-title">
                        {item.title}
                      </label>

                      <span className="item-meta">
                        <time dateTime={item.dueDate}>
                          {formatDueLabel(item.dueDate, today)}
                        </time>
                        {item.detail ? ` · ${item.detail}` : ''}
                      </span>
                    </div>

                    <CategoryBadge category={item.category} />
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      ) : (
        <div className="card section-placeholder">
          <h2>Coming next</h2>
          <p>
            This section is ready for its features. We will build it using
            LifeSync components and data.
          </p>
        </div>
      )}
    </section>
  )
}
