import { useEffect, useState } from 'react'
import './App.css'

type ThemeChoice = 'system' | 'light' | 'dark'

const THEME_OPTIONS: { value: ThemeChoice; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const SWATCHES = [
  { name: 'Background', token: '--color-bg' },
  { name: 'Surface', token: '--color-surface' },
  { name: 'Surface muted', token: '--color-surface-muted' },
  { name: 'Foreground', token: '--color-fg' },
  { name: 'Muted text', token: '--color-fg-muted' },
  { name: 'Border', token: '--color-border' },
  { name: 'Primary', token: '--color-primary' },
  { name: 'Secondary', token: '--color-secondary' },
  { name: 'Success', token: '--color-success' },
  { name: 'Warning', token: '--color-warning' },
  { name: 'Danger', token: '--color-danger' },
  { name: 'Focus', token: '--color-focus' },
]

const TYPE_SCALE = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']
const SPACING = [1, 2, 3, 4, 6, 8, 12, 16]
const RADII = ['sm', 'md', 'lg', 'xl', 'full']
const SHADOWS = ['sm', 'md', 'lg']

function App() {
  const [theme, setTheme] = useState<ThemeChoice>('system')

  // Preview-only: lets you test themes without changing your OS setting.
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <main className="container preview">
      <header className="preview-header">
        <div>
          <p className="text-overline">Phase 2.1 · Design system preview</p>
          <h1>LifeOS</h1>
          <p className="preview-lead">Never forget what matters.</p>
        </div>
        <div className="segmented" role="group" aria-label="Theme">
          {THEME_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={theme === value}
              onClick={() => setTheme(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <section className="preview-section" aria-labelledby="colors-title">
        <h2 id="colors-title">Colour tokens</h2>
        <div className="swatch-grid">
          {SWATCHES.map(({ name, token }) => (
            <div className="swatch" key={token}>
              <div
                className="swatch-chip"
                style={{ background: `var(${token})` }}
              />
              <div className="swatch-meta">
                <strong>{name}</strong>
                <code>{token}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="preview-section" aria-labelledby="actions-title">
        <h2 id="actions-title">Status, buttons and focus</h2>
        <div className="preview-grid">
          <div className="card">
            <h3>Status badges</h3>
            <div className="preview-row">
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-success">Success</span>
              <span className="badge badge-warning">Warning</span>
              <span className="badge badge-danger">Danger</span>
              <span className="badge">Neutral</span>
            </div>
          </div>

          <div className="card">
            <h3>Buttons</h3>
            <div className="preview-row">
              <button type="button" className="btn btn-primary">
                Primary
              </button>
              <button type="button" className="btn btn-secondary">
                Secondary
              </button>
              <button type="button" className="btn btn-ghost">
                Ghost
              </button>
              <button type="button" className="btn btn-primary" disabled>
                Disabled
              </button>
            </div>
          </div>

          <div className="card">
            <h3>Keyboard focus</h3>
            <p className="text-muted text-small">
              Press Tab to move through the controls on this page. Each one
              should show a clear ring.
            </p>
            <div className="field">
              <label htmlFor="preview-input">Example input</label>
              <input
                id="preview-input"
                className="input"
                type="text"
                placeholder="Type something…"
              />
            </div>
            <a href="#colors-title">Example link</a>
          </div>
        </div>
      </section>

      <section className="preview-section" aria-labelledby="type-title">
        <h2 id="type-title">Typography</h2>
        <div className="preview-grid">
          <div className="card">
            <h3>Heading level three</h3>
            <h4>Heading level four</h4>
            <p>
              Body text is set at a comfortable size and line height so longer
              notes stay easy to read.
            </p>
            <p className="text-muted">
              Muted text is for secondary details and hints.
            </p>
            <p className="text-small">
              Small text, with <a href="#type-title">a link</a> and{' '}
              <code>inline code</code>.
            </p>
          </div>

          <div className="card">
            <h3>Type scale</h3>
            {TYPE_SCALE.map((size) => (
              <div className="type-row" key={size}>
                <code>--text-{size}</code>
                <span style={{ fontSize: `var(--text-${size})` }}>Aa</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-section" aria-labelledby="layout-title">
        <h2 id="layout-title">Spacing, radius and shadow</h2>
        <div className="preview-grid">
          <div className="card">
            <h3>Spacing</h3>
            {SPACING.map((n) => (
              <div className="spacing-row" key={n}>
                <code>--space-{n}</code>
                <span
                  className="spacing-bar"
                  style={{ width: `var(--space-${n})` }}
                />
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Radius</h3>
            <div className="preview-row">
              {RADII.map((r) => (
                <div className="token-chip" key={r}>
                  <div
                    className="radius-box"
                    style={{ borderRadius: `var(--radius-${r})` }}
                  />
                  <code>--radius-{r}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Shadow</h3>
            <div className="preview-row">
              {SHADOWS.map((s) => (
                <div className="token-chip" key={s}>
                  <div
                    className="shadow-box"
                    style={{ boxShadow: `var(--shadow-${s})` }}
                  />
                  <code>--shadow-{s}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App