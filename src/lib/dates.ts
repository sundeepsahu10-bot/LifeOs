const MS_PER_DAY = 86_400_000

/** Formats a Date as a local YYYY-MM-DD string. */
export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(base: Date, days: number): Date {
  const result = new Date(base)
  result.setDate(result.getDate() + days)
  return result
}

/** Parses YYYY-MM-DD as a local date (no timezone shift). */
export function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00`)
}

export function getGreeting(now: Date): string {
  const hour = now.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDueLabel(dueISO: string, todayISO: string): string {
  const due = parseISODate(dueISO)
  const diff = Math.round(
    (due.getTime() - parseISODate(todayISO).getTime()) / MS_PER_DAY,
  )

  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff > 1 && diff < 7) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(due)
  }
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(due)
}