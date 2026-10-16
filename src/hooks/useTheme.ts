import { useEffect, useState } from 'react'

export type ThemeChoice = 'system' | 'light' | 'dark'

/**
 * Same behaviour as Phase 2.1: "system" removes data-theme so the OS setting
 * applies; "light" / "dark" force a theme via the attribute on <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeChoice>('system')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return { theme, setTheme }
}