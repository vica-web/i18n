# Using Plain CSS Instead of Tailwind

> **Language:** English · [العربية](./USING_CSS_ONLY_AR.md) · [Back to README](../README.md)

> Part of the **Vica Web Solutions** educational i18n project.

The current project uses Tailwind CSS 4. This document explains how to switch a separate copy of the project to traditional CSS.

> Do not remove Tailwind from the current project unless you intend to rewrite its utility classes. The interface currently depends on them.

## 1. Remove Tailwind

```bash
npm uninstall tailwindcss @tailwindcss/vite
```

Remove the Tailwind plugin from `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## 2. Create regular stylesheets

Keep global rules in `src/index.css`:

```css
:root {
  font-family: Manrope, 'Noto Sans Arabic', sans-serif;
  color: #17221c;
  background: #f4f7f2;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

[dir='rtl'] body {
  font-family: 'Noto Sans Arabic', Manrope, sans-serif;
}
```

Place component styles in `src/App.css`:

```css
.page {
  min-height: 100vh;
  background: #f4f7f2;
}

.language-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1180px;
  margin-inline: auto;
  padding: 28px 24px;
}

.language-button {
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}

.language-button.active {
  color: white;
  background: #154c36;
}

@media (max-width: 620px) {
  .language-switcher {
    padding-inline: 16px;
  }
}
```

## 3. Import and use the CSS classes

```jsx
import './App.css'

function App() {
  return (
    <main className="page">
      <nav className="language-switcher">
        <button className="language-button active">AR</button>
      </nav>
    </main>
  )
}
```

Replace each group of Tailwind utilities with one semantic class, then place its declarations in `App.css`.

## 4. Support RTL in CSS

The application already updates the `dir` attribute on the `html` element. Use that attribute when a component needs direction-specific behavior:

```css
[dir='rtl'] .card {
  text-align: right;
}

[dir='ltr'] .card {
  text-align: left;
}
```

Prefer logical CSS properties so most rules work in both directions:

```css
.element {
  margin-inline-start: 1rem;
  padding-inline: 1.5rem;
  border-inline-start: 3px solid #f1663d;
}
```

Use `margin-inline`, `padding-inline`, and `inset-inline-start` instead of permanently tying layout to `left` or `right`.

## 5. What remains unchanged?

Changing the styling approach does not affect internationalization. Keep these files and features unchanged:

- `src/i18n.js`
- `i18next.config.js`
- `public/locales/en/translation.json`
- `public/locales/ar/translation.json`
- All `npm run i18n:*` commands

i18next is independent from Tailwind and ordinary CSS; only the location and syntax of visual styles changes.
