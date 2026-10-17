
import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)

      if (storedValue !== null) {
        return JSON.parse(storedValue) as T
      }
    } catch (error) {
      console.error(`Could not read localStorage key "${key}".`, error)
    }

    return initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save localStorage key "${key}".`, error)
    }
  }, [key, value])

  return [value, setValue] as const
}
