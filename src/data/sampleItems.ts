import { addDays, toISODate } from '../lib/dates'
import type { LifeItem } from '../types'

/** Sample data for the Phase 2.2 UI only. Replaced by real storage later. */
export function createSampleItems(today: Date): LifeItem[] {
  const day = (offset: number) => toISODate(addDays(today, offset))

  return [
    {
      id: 'sample-1',
      title: 'Call the dentist to book a check-up',
      category: 'reminder',
      dueDate: day(0),
      done: false,
    },
    {
      id: 'sample-2',
      title: 'Pay the electricity bill',
      category: 'bill',
      dueDate: day(0),
      done: false,
      detail: 'Due by end of day',
    },
    {
      id: 'sample-3',
      title: 'Upload the signed rent agreement',
      category: 'document',
      dueDate: day(0),
      done: true,
    },
    {
      id: 'sample-4',
      title: 'Streaming plan renews',
      category: 'subscription',
      dueDate: day(1),
      done: false,
      detail: 'Decide whether to keep it',
    },
    {
      id: 'sample-5',
      title: 'Birthday dinner with family',
      category: 'event',
      dueDate: day(2),
      done: false,
    },
    {
      id: 'sample-6',
      title: 'Renew car insurance',
      category: 'bill',
      dueDate: day(4),
      done: false,
    },
    {
      id: 'sample-7',
      title: 'Review cloud storage plan',
      category: 'subscription',
      dueDate: day(6),
      done: false,
    },
    {
      id: 'sample-8',
      title: 'Vaccination appointment',
      category: 'event',
      dueDate: day(9),
      done: false,
    },
  ]
}