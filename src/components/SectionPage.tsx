
import type { PageId } from '../types'

interface SectionPageProps {
  page: PageId
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

export function SectionPage({ page }: SectionPageProps) {
  if (page === 'dashboard') return null

  const content = PAGE_CONTENT[page]

  return (
    <section className="section-page" aria-labelledby="section-page-title">
      <p className="text-overline">LifeOS / {content.title}</p>
      <h1 id="section-page-title">{content.title}</h1>
      <p>{content.description}</p>
      <div className="card section-placeholder">
        <h2>Coming next</h2>
        <p>
          This section is ready for its features. We will build it using
          LifeOS components and data.
        </p>
      </div>
    </section>
  )
}

