import { defineConfig } from 'i18next-cli'

export default defineConfig({
  // The first locale is the source language used by the extraction workflow.
  locales: ['en', 'ar'],
  extract: {
    // Scan every JavaScript and JSX file where `t()` may be used.
    input: ['src/**/*.{js,jsx}'],
    // Keep the output aligned with the HTTP backend path in src/i18n.js.
    output: 'public/locales/{{language}}/{{namespace}}.json',
  },
})
