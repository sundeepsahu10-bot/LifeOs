import { useRef, useState, type FormEvent } from 'react'
import { Icon } from './Icon'

interface QuickAddProps {
  today: string
  onAdd: (title: string, dueDate: string) => void
}

interface FormError {
  field: 'title' | 'date'
  message: string
}

export function QuickAdd({ today, onAdd }: QuickAddProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(today)
  const [error, setError] = useState<FormError | null>(null)
  const [confirmation, setConfirmation] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = title.trim()
    setConfirmation('')

    if (!trimmed) {
      setError({ field: 'title', message: 'Enter what you want to remember.' })
      titleRef.current?.focus()
      return
    }
    if (!dueDate || dueDate < today) {
      setError({ field: 'date', message: 'Choose today or a future date.' })
      dateRef.current?.focus()
      return
    }

    onAdd(trimmed, dueDate)
    setError(null)
    setTitle('')
    setConfirmation(`Added “${trimmed}”.`)
    titleRef.current?.focus()
  }

  return (
    <section className="card quick-add" aria-labelledby="quick-add-title">
      <div>
        <h2 id="quick-add-title">Quick add</h2>
        <p className="text-muted text-small">Create a reminder in a few seconds.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="qa-title">Reminder</label>
          <input
            ref={titleRef}
            id="qa-title"
            className="input"
            type="text"
            placeholder="e.g. Renew passport"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={error?.field === 'title'}
            aria-describedby={error?.field === 'title' ? 'qa-message' : undefined}
          />
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
            onChange={(event) => setDueDate(event.target.value)}
            aria-invalid={error?.field === 'date'}
            aria-describedby={error?.field === 'date' ? 'qa-message' : undefined}
          />
        </div>

        {error && (
          <p id="qa-message" className="form-message form-message-error" role="alert">
            {error.message}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          <Icon name="plus" size={18} />
          Add reminder
        </button>

        <p className="form-message form-message-success" role="status" hidden={!confirmation}>
          {confirmation}
        </p>
      </form>

      <p className="text-muted text-small">
        Reminders are kept in this browser tab only and reset when you refresh.
        Alerts aren&rsquo;t available yet.
      </p>
    </section>
  )
}