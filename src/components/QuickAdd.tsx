
import { useRef, useState, type FormEvent } from 'react'
import { CATEGORY_LABELS, type ItemCategory } from '../types'
import { Icon } from './Icon'

interface QuickAddProps {
  today: string
  defaultCategory?: ItemCategory
  onAdd: (title: string, dueDate: string, category: ItemCategory) => void
}

interface FormError {
  field: 'title' | 'date'
  message: string
}

const CATEGORIES: ItemCategory[] = [
  'reminder',
  'bill',
  'subscription',
  'document',
  'event',
]

export function QuickAdd({
  today,
  defaultCategory = 'reminder',
  onAdd,
}: QuickAddProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(today)
  const [category, setCategory] = useState<ItemCategory>(defaultCategory)
  const [error, setError] = useState<FormError | null>(null)
  const [confirmation, setConfirmation] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = title.trim()
    setConfirmation('')

    if (!trimmed) {
      setError({
        field: 'title',
        message: 'Enter what you want to remember.',
      })
      titleRef.current?.focus()
      return
    }

    if (!dueDate || dueDate < today) {
      setError({
        field: 'date',
        message: 'Choose today or a future date.',
      })
      dateRef.current?.focus()
      return
    }

    onAdd(trimmed, dueDate, category)

    setError(null)
    setTitle('')
    setDueDate(today)
    setCategory(defaultCategory)
    setConfirmation(
      `Added “${trimmed}” as a ${CATEGORY_LABELS[category].toLowerCase()}.`,
    )

    titleRef.current?.focus()
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    setConfirmation('')

    if (error?.field === 'title') {
      setError(null)
    }
  }

  function handleDateChange(value: string) {
    setDueDate(value)
    setConfirmation('')

    if (error?.field === 'date') {
      setError(null)
    }
  }

  return (
    <section className="card quick-add" aria-labelledby="quick-add-title">
      <div>
        <h2 id="quick-add-title">Quick add</h2>
        <p className="text-muted text-small">
          Add a reminder, bill, or other important item.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="qa-title">Title</label>
          <input
            ref={titleRef}
            id="qa-title"
            className="input"
            type="text"
            placeholder="e.g. Renew passport"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            aria-invalid={error?.field === 'title'}
            aria-describedby={
              error?.field === 'title' ? 'qa-message' : undefined
            }
          />
        </div>

        <div className="field">
          <label htmlFor="qa-category">Category</label>
          <select
            id="qa-category"
            className="input"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value as ItemCategory)
              setConfirmation('')
            }}
          >
            {CATEGORIES.map((itemCategory) => (
              <option key={itemCategory} value={itemCategory}>
                {CATEGORY_LABELS[itemCategory]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="qa-date">Due date</label>
          <input
            ref={dateRef}
            id="qa-date"
            className="input"
            type="date"
            min={today}
            value={dueDate}
            onChange={(event) => handleDateChange(event.target.value)}
            aria-invalid={error?.field === 'date'}
            aria-describedby={
              error?.field === 'date' ? 'qa-message' : undefined
            }
          />
        </div>

        {error && (
          <p
            id="qa-message"
            className="form-message form-message-error"
            role="alert"
          >
            {error.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          <Icon name="plus" size={18} />
          Add item
        </button>

        <p
          className="form-message form-message-success"
          role="status"
          hidden={!confirmation}
        >
          {confirmation}
        </p>
      </form>

      <p className="text-muted text-small">
        Items are saved in this browser. Alerts aren&rsquo;t available yet.
      </p>
    </section>
  )
}
