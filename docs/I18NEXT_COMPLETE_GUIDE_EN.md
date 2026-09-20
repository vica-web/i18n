# Complete Guide to i18next and i18next-cli

> **Language:** English · [العربية](./I18NEXT_COMPLETE_GUIDE_AR.md) · [Back to README](../README.md)

> An educational reference by **Vica Web Solutions**.

This guide explains the project's internationalization architecture, daily translation workflow, official extraction tool, RTL support, and common troubleshooting steps.

## Table of contents

1. [Packages](#1-packages)
2. [Project structure](#2-project-structure)
3. [Initialize i18next](#3-initialize-i18next)
4. [Translation resources](#4-translation-resources)
5. [Translate React components](#5-translate-react-components)
6. [Switch languages](#6-switch-languages)
7. [LTR and RTL](#7-ltr-and-rtl)
8. [Interpolation](#8-interpolation)
9. [Pluralization](#9-pluralization)
10. [Rich content with Trans](#10-rich-content-with-trans)
11. [Extract keys with i18next-cli](#11-extract-keys-with-i18next-cli)
12. [Add another language](#12-add-another-language)
13. [Daily workflow](#13-daily-workflow)
14. [Best practices](#14-best-practices)
15. [Troubleshooting](#15-troubleshooting)
16. [Command reference](#16-command-reference)

## 1. Packages

| Package | Purpose |
|---|---|
| `i18next` | Core engine for languages, keys, interpolation, and pluralization. |
| `react-i18next` | React bindings, including `useTranslation` and `Trans`. |
| `i18next-http-backend` | Loads translation resources from the public directory. |
| `i18next-browser-languagedetector` | Detects and remembers the user's language. |
| `i18next-cli` | Official tool for extraction, locale status, syncing, linting, and types. |

The first four packages run in the application. `i18next-cli` is a development dependency and never ships to the browser.

## 2. Project structure

```text
src/
  main.jsx                     # Imports i18n before React renders
  i18n.js                      # Runtime configuration
  App.jsx                      # Translation examples
public/locales/
  en/translation.json         # English resources
  ar/translation.json         # Arabic resources
i18next.config.js              # CLI extraction configuration
```

The runtime path in `src/i18n.js` is:

```js
backend: {
  loadPath: '/locales/{{lng}}/translation.json',
}
```

At runtime, `{{lng}}` becomes `en` or `ar`.

## 3. Initialize i18next

Register plugins before calling `init`:

```js
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
```

- `supportedLngs` limits the app to languages with available resources.
- `fallbackLng` is used when the detected language is unavailable.
- `order` checks a saved choice before the browser preference.
- `caches` persists an explicit selection in `localStorage`.
- `escapeValue: false` avoids double escaping because React already escapes rendered values.

Import the setup exactly once before rendering translated components:

```js
// src/main.jsx
import './i18n.js'
```

## 4. Translation resources

Organize keys by feature rather than keeping a long flat list:

```json
{
  "hero": {
    "title": "One interface. Every language.",
    "action": "Explore the examples"
  }
}
```

The Arabic file uses the same key structure and different values:

```json
{
  "hero": {
    "title": "واجهة واحدة، بكل اللغات.",
    "action": "استكشف الأمثلة"
  }
}
```

Stable keys allow code and tooling to work independently from translated wording.

## 5. Translate React components

```jsx
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()

  return <h1>{t('hero.title')}</h1>
}
```

The `t()` function resolves the requested key for the active language. Components using the hook rerender when that language changes.

## 6. Switch languages

```jsx
const { i18n } = useTranslation()

<button onClick={() => i18n.changeLanguage('ar')}>AR</button>
<button onClick={() => i18n.changeLanguage('en')}>EN</button>
```

Use `resolvedLanguage` to read the effective language after detection and fallback resolution:

```js
const currentLanguage = i18n.resolvedLanguage || 'en'
```

Because the configured detector caches selections, a manually selected language remains active after a refresh.

## 7. LTR and RTL

Changing the i18next language does not automatically update the HTML direction. Synchronize both document attributes:

```jsx
useEffect(() => {
  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr'
}, [currentLanguage])
```

This helps layout, accessibility tools, browser behavior, and search engines. Tailwind provides direction variants and logical spacing utilities:

```jsx
<div className="text-left rtl:text-right ms-4">...</div>
```

Prefer `ms`, `me`, `ps`, and `pe` over fixed left/right spacing when the layout should mirror.

## 8. Interpolation

Define a placeholder in the resource:

```json
{
  "welcome": "Hello, {{name}}!"
}
```

Pass its value to `t`:

```jsx
<p>{t('welcome', { name: 'Lina' })}</p>
```

Do not concatenate translated fragments. Word order and punctuation can differ between languages.

## 9. Pluralization

English commonly uses two forms:

```json
{
  "lesson_one": "{{count}} lesson",
  "lesson_other": "{{count}} lessons"
}
```

Arabic uses additional CLDR categories:

```json
{
  "lesson_zero": "لا توجد دروس",
  "lesson_one": "درس واحد",
  "lesson_two": "درسان",
  "lesson_few": "{{count}} دروس",
  "lesson_many": "{{count}} درسًا",
  "lesson_other": "{{count}} درس"
}
```

The component call is identical for both languages:

```jsx
<p>{t('lesson', { count: lessonCount })}</p>
```

The property must be named `count`; i18next uses it to select the language-specific plural category.

## 10. Rich content with Trans

Use `Trans` when a sentence must contain React elements such as links or formatted text:

```jsx
import { Trans } from 'react-i18next'

<Trans
  i18nKey="terms.message"
  components={{ link: <a href="/terms" /> }}
/>
```

```json
{
  "terms": {
    "message": "Read our <link>terms</link>."
  }
}
```

For ordinary text without embedded React elements, prefer `t()`.

## 11. Extract keys with i18next-cli

The official CLI statically analyzes source files and finds calls such as:

```js
t('hero.title')
t('profile.greeting', { name })
t('cart.items', { count })
```

It manages resource keys; it does not produce trustworthy human translations automatically. Review and translate newly created values.

The project configuration is stored in `i18next.config.js`:

```js
import { defineConfig } from 'i18next-cli'

export default defineConfig({
  locales: ['en', 'ar'],
  extract: {
    input: ['src/**/*.{js,jsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
  },
})
```

### Extract once

```bash
npm run i18n:extract
```

Run this after adding or changing `t()` calls. Then review both locale files.

### Watch source files

```bash
npm run i18n:watch
```

Watch mode re-extracts whenever relevant source files change.

### Inspect translation status

```bash
npm run i18n:status
```

The report shows discovered keys, namespaces, locales, and completion percentages.

### Check extraction in CI

```bash
npx i18next-cli extract --ci --dry-run
```

This exits unsuccessfully if extraction would change files, without modifying the CI checkout.

### Dynamic key limitation

Static analysis reliably finds literal keys:

```js
t('menu.home')
```

It cannot always infer every runtime value of a dynamic expression:

```js
t(`menu.${item.name}`)
```

Prefer an explicit map:

```js
const menuKeys = {
  home: 'menu.home',
  settings: 'menu.settings',
}

t(menuKeys[item.name])
```

For exceptional cases, extraction comments can preserve explicit keys:

```js
// t('menu.home')
// t('menu.settings')
```

## 12. Add another language

To add French:

1. Add `fr` to `supportedLngs` in `src/i18n.js`.
2. Add `fr` to `locales` in `i18next.config.js`.
3. Create `public/locales/fr/translation.json`, or run extraction.
4. Add French to the `languages` list in `App.jsx`.
5. Translate every value and check the locale status.

```bash
npm run i18n:extract
npm run i18n:status
```

## 13. Daily workflow

For a new Save button:

1. Add a clear key to the component:

```jsx
<button>{t('actions.save')}</button>
```

2. Extract keys:

```bash
npm run i18n:extract
```

3. Fill the correct English and Arabic values.
4. Validate and build:

```bash
npm run lint
npm run i18n:status
npm run build
```

## 14. Best practices

- Use meaning-based keys such as `checkout.payment.failed`.
- Avoid using the English sentence itself as a key in larger projects.
- Do not leave translatable interface text hardcoded in JSX.
- Keep complete sentences together instead of translating fragments.
- Pass names, numbers, and dates as values.
- Always use the `count` property for plural selection.
- Keep the same key structure across locales.
- Synchronize the document's `lang` and `dir` attributes.
- Prefer static keys so extraction tools can discover them.
- Run the status and build checks before publishing.

## 15. Troubleshooting

### A key is rendered instead of its value

Check spelling and letter case, resource-file validity, the backend `loadPath`, and whether the key exists in the active namespace.

### The language resets after refresh

Confirm that the detector checks and caches `localStorage`:

```js
detection: {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
}
```

### Arabic text changes but the page remains LTR

`changeLanguage` does not set the HTML direction. Update `document.documentElement.dir` as shown in section 7.

### Pluralization does not work

Confirm the JSON suffixes, pass a numeric `count`, and ensure the base key in `t()` matches the pluralized resource keys.

### The CLI misses a key

Make sure the file is under `src`, its extension is included in `extract.input`, and the key is statically discoverable. Review the dynamic-key limitation above.

## 16. Command reference

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build. |
| `npm run lint` | Check JavaScript and React code. |
| `npm run i18n:extract` | Extract keys and update locale resources. |
| `npm run i18n:watch` | Extract again when source files change. |
| `npm run i18n:status` | Report missing keys and locale completion. |

The normal cycle is: write a key, extract it, translate its values, check status, and build.
