export type ItemCategory =
  | 'reminder'
  | 'bill'
  | 'subscription'
  | 'document'
  | 'event'

export interface LifeItem {
  id: string
  title: string
  category: ItemCategory
  /** Local calendar date, YYYY-MM-DD. */
  dueDate: string
  done: boolean
  detail?: string
}

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  reminder: 'Reminder',
  bill: 'Bill',
  subscription: 'Subscription',
  document: 'Document',
  event: 'Event',
}

export type CategoryTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'neutral'

export const CATEGORY_TONES: Record<ItemCategory, CategoryTone> = {
  reminder: 'primary',
  bill: 'warning',
  subscription: 'secondary',
  document: 'neutral',
  event: 'success',
}