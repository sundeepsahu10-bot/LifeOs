import { useRef, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'
import { DashboardHeader } from './components/DashboardHeader'
import { PrioritiesSection, UpcomingSection } from './components/ItemSections'
import { QuickAdd } from './components/QuickAdd'
import { Sidebar } from './components/Sidebar'
import { SummaryCards } from './components/SummaryCards'
import { createSampleItems } from './data/sampleItems'
import { useTheme } from './hooks/useTheme'
import { toISODate } from './lib/dates'
import { CATEGORY_LABELS, type LifeItem, type PageId } from './types'
import { SectionPage } from './components/SectionPage'

function App() {
  const { theme, setTheme } = useTheme()
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard')

  // Captured once per page load; fine until real data exists.
  const [now] = useState(() => new Date())
  const today = toISODate(now)

  const [items, setItems] = useLocalStorage<LifeItem[]>(
    'lifeos-items',
    createSampleItems(now),
  )
  const [query, setQuery] = useState('')
  const nextId = useRef(0)

  const normalizedQuery = query.trim().toLowerCase()
  const isFiltered = normalizedQuery.length > 0

  // Search never changes `items`; it only filters what the lists display.
  const matchesQuery = (item: LifeItem) =>
    !isFiltered ||
    [item.title, item.detail ?? '', CATEGORY_LABELS[item.category]].some(
      (text) => text.toLowerCase().includes(normalizedQuery),
    )

  const todayItems = items.filter((item) => item.dueDate === today)
  const remainingToday = todayItems.filter((item) => !item.done).length

  const upcomingItems = items
    .filter((item) => item.dueDate > today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  function handleToggle(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function handleAdd(title: string, dueDate: string) {
    nextId.current += 1
    const newItem: LifeItem = {
      id: `user-${nextId.current}`,
      title,
      category: 'reminder',
      dueDate,
      done: false,
    }
    setItems((current) => [...current, newItem])
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Sidebar
        theme={theme}
        onThemeChange={setTheme}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="app-main">
        <div className="app-content">
          <DashboardHeader now={now} query={query} onQueryChange={setQuery} />

          
      <main id="main-content" className="dashboard">
        {currentPage === 'dashboard' ? (
          <>
            <SummaryCards items={items} today={today} />

            <div className="dashboard-grid">
              <div className="dashboard-col">
                <PrioritiesSection
                  items={todayItems.filter(matchesQuery)}
                  remaining={remainingToday}
                  isFiltered={isFiltered}
                  onToggle={handleToggle}
                />
                <UpcomingSection
                  items={upcomingItems.filter(matchesQuery)}
                  today={today}
                  isFiltered={isFiltered}
                />
              </div>
              <QuickAdd today={today} onAdd={handleAdd} />
            </div>
          </>
        ) : (
          <SectionPage page={currentPage} />
        )}
      </main>

        </div>
      </div>
    </div>
  )
}

export default App