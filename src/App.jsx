import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import vicaLogo from './assets/Vica Web Solutions2.png'

const languages = [
  { code: 'en', labelKey: 'languages.english', shortLabel: 'EN' },
  { code: 'ar', labelKey: 'languages.arabic', shortLabel: 'AR' },
]

const snippets = {
  install:
    'npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector',
  resources: `public/locales/
├── en/translation.json
└── ar/translation.json`,
  translationFiles: `// en/translation.json
{
  "welcome": "Welcome, {{name}}!",
  "lesson_one": "{{count}} lesson",
  "lesson_other": "{{count}} lessons"
}

// ar/translation.json
{
  "welcome": "مرحبًا {{name}}!",
  "lesson_one": "درس واحد",
  "lesson_two": "درسان",
  "lesson_few": "{{count}} دروس"
}`,
  configure: `i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })`,
  translate: `const { t, i18n } = useTranslation()

return (
  <>
    <h1>{t('hero.title')}</h1>
    <button onClick={() => i18n.changeLanguage('ar')}>
      العربية
    </button>
  </>
)`,
  initialize: `// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,
  direction: `useEffect(() => {
  const language = i18n.resolvedLanguage || 'en'

  document.documentElement.lang = language
  document.documentElement.dir =
    language === 'ar' ? 'rtl' : 'ltr'
}, [i18n.resolvedLanguage])`,
  cliInstall: 'npm install --save-dev i18next-cli',
  cliConfig: `export default defineConfig({
  locales: ['en', 'ar'],
  extract: {
    input: ['src/**/*.{js,jsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
  },
})`,
}

function App() {
  // `t` translates a key, while `i18n` exposes the active language and helpers.
  const { t, i18n } = useTranslation()
  const [itemCount, setItemCount] = useState(2)
  const [copiedSnippet, setCopiedSnippet] = useState('')
  const currentLanguage = i18n.resolvedLanguage || 'en'
  const isArabic = currentLanguage === 'ar'
  const setupNavigation = [
    t('setup.step1.shortTitle'),
    t('setup.step2.shortTitle'),
    t('setup.step3.shortTitle'),
    t('setup.step4.shortTitle'),
    t('setup.step5.shortTitle'),
    t('setup.step6.shortTitle'),
    t('setup.step7.shortTitle'),
  ]
  const setupPoints = {
    step1: [
      t('setup.step1.point1'),
      t('setup.step1.point2'),
      t('setup.step1.point3'),
    ],
    step2: [
      t('setup.step2.point1'),
      t('setup.step2.point2'),
      t('setup.step2.point3'),
    ],
    step3: [
      t('setup.step3.point1'),
      t('setup.step3.point2'),
      t('setup.step3.point3'),
    ],
    step4: [
      t('setup.step4.point1'),
      t('setup.step4.point2'),
      t('setup.step4.point3'),
    ],
    step5: [
      t('setup.step5.point1'),
      t('setup.step5.point2'),
      t('setup.step5.point3'),
    ],
    step6: [
      t('setup.step6.point1'),
      t('setup.step6.point2'),
      t('setup.step6.point3'),
    ],
    step7: [
      t('setup.step7.point1'),
      t('setup.step7.point2'),
      t('setup.step7.point3'),
    ],
  }
  const workflowSteps = [
    t('toolkit.workflow.step1'),
    t('toolkit.workflow.step2'),
    t('toolkit.workflow.step3'),
    t('toolkit.workflow.step4'),
  ]
  const practiceItems = [
    {
      title: t('practices.item1.title'),
      description: t('practices.item1.description'),
    },
    {
      title: t('practices.item2.title'),
      description: t('practices.item2.description'),
    },
    {
      title: t('practices.item3.title'),
      description: t('practices.item3.description'),
    },
    {
      title: t('practices.item4.title'),
      description: t('practices.item4.description'),
    },
    {
      title: t('practices.item5.title'),
      description: t('practices.item5.description'),
    },
    {
      title: t('practices.item6.title'),
      description: t('practices.item6.description'),
    },
  ]
  const advancedItems = [
    {
      tag: 'Namespaces',
      title: t('advanced.namespaces.title'),
      description: t('advanced.namespaces.description'),
      code: "const { t } = useTranslation('checkout')",
    },
    {
      tag: 'Fallback',
      title: t('advanced.fallback.title'),
      description: t('advanced.fallback.description'),
      code: "fallbackLng: 'en'",
    },
    {
      tag: '<Trans />',
      title: t('advanced.trans.title'),
      description: t('advanced.trans.description'),
      code: '<Trans i18nKey="terms.message" />',
    },
    {
      tag: 'Detector',
      title: t('advanced.detection.title'),
      description: t('advanced.detection.description'),
      code: "order: ['localStorage', 'navigator']",
    },
  ]
  const faqItems = [
    { question: t('faq.item1.question'), answer: t('faq.item1.answer') },
    { question: t('faq.item2.question'), answer: t('faq.item2.answer') },
    { question: t('faq.item3.question'), answer: t('faq.item3.answer') },
    { question: t('faq.item4.question'), answer: t('faq.item4.answer') },
  ]

  useEffect(() => {
    // Keep document metadata synchronized for accessibility and correct RTL layout.
    document.documentElement.lang = currentLanguage
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [currentLanguage, isArabic])

  const changeLanguage = (languageCode) => {
    // The language detector persists the choice in localStorage.
    i18n.changeLanguage(languageCode)
  }

  const copySnippet = async (snippetName) => {
    try {
      await navigator.clipboard.writeText(snippets[snippetName])
      setCopiedSnippet(snippetName)
      window.setTimeout(() => setCopiedSnippet(''), 1600)
    } catch {
      setCopiedSnippet('')
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#070b12] font-['Manrope',sans-serif] text-[#e7edf5] antialiased selection:bg-[#22d3ee] selection:text-[#071017] rtl:font-['IBM_Plex_Sans_Arabic',sans-serif]">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070b12]/88 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-18 w-[min(1200px,calc(100%-48px))] items-center justify-between gap-4 max-[640px]:h-16 max-[640px]:w-[calc(100%-32px)]"
          aria-label={t('nav.label')}
        >
          <a
            className="flex items-center gap-3 text-[#f2f7fb] no-underline"
            href="#top"
            aria-label={t('brand.logoAlt')}
          >
            <span className="flex items-center rounded-2xl border border-white/10 bg-white/95 p-2 shadow-[0_0_25px_rgba(70,183,211,0.12)]">
              <img
                className="h-10 w-auto object-contain max-[420px]:h-8"
                src={vicaLogo}
                alt=""
              />
            </span>
            <span className="max-[520px]:hidden">
              <strong className="block text-sm leading-none">
                {t('brand.academy')}
              </strong>
              <small className="mt-1 block text-[0.63rem] font-bold uppercase tracking-[0.13em] text-[#718096]">
                {t('brand.initiative')}
              </small>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-7 max-[420px]:gap-2">
            <div className="flex items-center gap-6 text-xs font-bold text-[#8996a8] max-[760px]:hidden">
              <a className="transition hover:text-[#22d3ee]" href="#learn">
                {t('nav.learn')}
              </a>
              <a className="transition hover:text-[#22d3ee]" href="#examples">
                {t('nav.examples')}
              </a>
              <a className="transition hover:text-[#22d3ee]" href="#advanced">
                {t('nav.advanced')}
              </a>
              <a className="transition hover:text-[#22d3ee]" href="#toolkit">
                {t('nav.toolkit')}
              </a>
            </div>

            <div
              className="flex gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              aria-label={t('languageSwitcher.label')}
            >
              {languages.map((language) => {
                const isActive = currentLanguage === language.code

                return (
                  <button
                    className={`min-w-11 cursor-pointer rounded-full border-0 px-3 py-1.5 text-[0.68rem] font-extrabold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee80] max-[420px]:min-w-9 max-[420px]:px-2 ${
                      isActive
                        ? 'bg-[#22d3ee] text-[#071017] shadow-[0_0_18px_rgba(34,211,238,0.18)]'
                        : 'bg-transparent text-[#78879a] hover:text-white'
                    }`}
                    type="button"
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    aria-pressed={isActive}
                    aria-label={t(language.labelKey)}
                  >
                    {language.shortLabel}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
      </header>

      <div id="top" className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.028)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="pointer-events-none absolute -start-56 -top-40 size-[580px] rounded-full bg-[#22d3ee]/[0.075] blur-3xl" />
        <div className="pointer-events-none absolute end-[-180px] top-[-80px] size-[520px] rounded-full bg-[#08769c]/[0.1] blur-3xl" />

        <section className="relative mx-auto grid min-h-[100vh] w-[min(1200px,calc(100%-48px))] grid-cols-[1.08fr_0.92fr] items-center gap-[clamp(48px,7vw,100px)] py-22 max-[900px]:grid-cols-1 max-[900px]:py-16 max-[640px]:min-h-[100vh] max-[640px]:w-[calc(100%-32px)] max-[640px]:gap-14 max-[640px]:py-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/[0.07] px-3 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#67e8f9] shadow-[0_0_30px_rgba(34,211,238,0.06)] backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#34d399] shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
              {t('hero.eyebrow')}
            </div>
            <h1 className="m-0 max-w-[560px] whitespace-pre-line text-[clamp(3.1rem,6.2vw,6.8rem)] leading-[0.82] font-extrabold tracking-[-0.07em] text-balance rtl:leading-[1.08] rtl:tracking-[-0.04em] max-[640px]:text-[clamp(2.7rem,15vw,4.7rem)]">
              {t('hero.title')}
            </h1>
            <p className="my-8 max-w-[650px] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.9] text-[#94a3b8]">
              {t('hero.description')}
            </p>
            <div className="mb-7 flex items-center gap-3 text-xs font-bold text-[#87a8b8]">
              <span className="h-px w-8 bg-[#46b7d3]/50" />
              {t('hero.byCompany')}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-3 rounded-xl bg-[#22d3ee] px-5 py-3.5 text-sm font-extrabold text-[#071017] shadow-[0_0_30px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:bg-[#67e8f9] hover:shadow-[0_0_38px_rgba(34,211,238,0.26)]"
                href="#learn"
              >
                {t('hero.action')}
                <ArrowIcon isArabic={isArabic} />
              </a>
              <a
                className="rounded-xl border border-white/10 bg-white/[0.045] px-5 py-3.5 text-sm font-extrabold text-[#cbd5e1] transition hover:border-[#38bdf8]/40 hover:bg-[#08769c]/15 hover:text-white"
                href="#toolkit"
              >
                {t('hero.secondaryAction')}
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {['React 18', 'i18next', 'RTL / LTR', 'Tailwind CSS'].map(
                (item) => (
                  <span
                    className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 font-['DM_Mono',monospace] text-[0.65rem] text-[#77869a]"
                    key={item}
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative max-[900px]:max-w-[680px]">
            <div className="absolute -inset-5 -z-10 rounded-[30px] bg-gradient-to-br from-[#46b7d3]/10 to-[#08769c]/15 blur-2xl" />
            <CodePanel
              filename="App.jsx"
              code={snippets.translate}
              snippetName="translate"
              copied={copiedSnippet === 'translate'}
              onCopy={copySnippet}
              copyLabel={t('common.copy')}
              copiedLabel={t('common.copied')}
              large
            />
            <div className="absolute -bottom-7 -start-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111923] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.42)] max-[500px]:static max-[500px]:mt-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#34d399]/10 text-lg text-[#34d399]">
                ✓
              </span>
              <div>
                <strong className="block text-sm">
                  {t('hero.demoCard.title')}
                </strong>
                <span className="mt-0.5 block text-xs text-[#8290a2]">
                  {t('hero.demoCard.description')}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-y border-white/[0.07] bg-white/[0.025]">
        <div className="mx-auto grid w-[min(1200px,calc(100%-48px))] grid-cols-4 divide-x divide-white/[0.07] rtl:divide-x-reverse max-[760px]:grid-cols-2 max-[760px]:divide-y max-[640px]:w-[calc(100%-32px)]">
          <Metric value="02" label={t('metrics.languages')} />
          <Metric value="29" label={t('metrics.keys')} />
          <Metric value="RTL" label={t('metrics.direction')} />
          <Metric value="100%" label={t('metrics.coverage')} />
        </div>
      </section>

      <section
        id="learn"
        className="mx-auto w-[min(1200px,calc(100%-48px))] scroll-mt-24 py-28 max-[640px]:w-[calc(100%-32px)] max-[640px]:py-20"
      >
        <SectionHeading
          eyebrow={t('setup.eyebrow')}
          title={t('setup.title')}
          description={t('setup.description')}
        />

        <div className="mt-15 grid grid-cols-[280px_1fr] gap-14 max-[900px]:grid-cols-1">
          <aside className="self-start rounded-2xl border border-white/[0.08] bg-[#0d141f] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] min-[901px]:sticky min-[901px]:top-24">
            <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#22d3ee]">
              {t('setup.mapLabel')}
            </span>
            <ol className="mt-5 space-y-1">
              {setupNavigation.map((label, index) => (
                <li key={label}>
                  <a
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#8b98aa] transition hover:bg-white/[0.045] hover:text-[#67e8f9]"
                    href={`#step-${index + 1}`}
                  >
                    <span className="grid size-7 place-items-center rounded-full border border-[#22d3ee]/15 bg-[#22d3ee]/[0.07] font-['DM_Mono',monospace] text-[0.65rem] text-[#67e8f9]">
                      0{index + 1}
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl border border-[#38bdf8]/15 bg-[#08769c]/10 p-4 text-xs leading-6 text-[#aeb8ca]">
              <strong className="mb-1 block text-[#7dd3fc]">
                {t('setup.tip.title')}
              </strong>
              {t('setup.tip.description')}
            </div>
          </aside>

          <div className="space-y-5">
            <TutorialStep
              id="step-1"
              number="01"
              title={t('setup.step1.title')}
              description={t('setup.step1.description')}
              points={setupPoints.step1}
            >
              <CodePanel
                filename="Terminal"
                code={snippets.install}
                snippetName="install"
                copied={copiedSnippet === 'install'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-2"
              number="02"
              title={t('setup.step2.title')}
              description={t('setup.step2.description')}
              points={setupPoints.step2}
            >
              <CodePanel
                filename="Project structure"
                code={snippets.resources}
                snippetName="resources"
                copied={copiedSnippet === 'resources'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-3"
              number="03"
              title={t('setup.step3.title')}
              description={t('setup.step3.description')}
              points={setupPoints.step3}
            >
              <CodePanel
                filename="translation.json"
                code={snippets.translationFiles}
                snippetName="translationFiles"
                copied={copiedSnippet === 'translationFiles'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-4"
              number="04"
              title={t('setup.step4.title')}
              description={t('setup.step4.description')}
              points={setupPoints.step4}
            >
              <CodePanel
                filename="src/i18n.js"
                code={snippets.configure}
                snippetName="configure"
                copied={copiedSnippet === 'configure'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-5"
              number="05"
              title={t('setup.step5.title')}
              description={t('setup.step5.description')}
              points={setupPoints.step5}
            >
              <CodePanel
                filename="src/main.jsx"
                code={snippets.initialize}
                snippetName="initialize"
                copied={copiedSnippet === 'initialize'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-6"
              number="06"
              title={t('setup.step6.title')}
              description={t('setup.step6.description')}
              points={setupPoints.step6}
            >
              <CodePanel
                filename="Component.jsx"
                code={snippets.translate}
                snippetName="translate"
                copied={copiedSnippet === 'translate'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>

            <TutorialStep
              id="step-7"
              number="07"
              title={t('setup.step7.title')}
              description={t('setup.step7.description')}
              points={setupPoints.step7}
            >
              <CodePanel
                filename="App.jsx"
                code={snippets.direction}
                snippetName="direction"
                copied={copiedSnippet === 'direction'}
                onCopy={copySnippet}
                copyLabel={t('common.copy')}
                copiedLabel={t('common.copied')}
              />
            </TutorialStep>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0a0f18] py-28 max-[640px]:py-20">
        <div className="mx-auto w-[min(1200px,calc(100%-48px))] max-[640px]:w-[calc(100%-32px)]">
          <SectionHeading
            eyebrow={t('architecture.eyebrow')}
            title={t('architecture.title')}
            description={t('architecture.description')}
          />

          <div className="mt-14 grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            <ArchitectureCard
              number="01"
              label="React"
              title={t('architecture.react.title')}
              description={t('architecture.react.description')}
            />
            <ArchitectureCard
              number="02"
              label="i18next"
              title={t('architecture.engine.title')}
              description={t('architecture.engine.description')}
            />
            <ArchitectureCard
              number="03"
              label="Backend"
              title={t('architecture.backend.title')}
              description={t('architecture.backend.description')}
            />
            <ArchitectureCard
              number="04"
              label="JSON"
              title={t('architecture.resources.title')}
              description={t('architecture.resources.description')}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-[#22d3ee]/15 bg-gradient-to-r from-[#102535] to-[#151b35] px-6 py-4 text-center text-sm font-bold text-[#dbeafe] shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
            <span className="text-[#34d399]">●</span>
            {t('architecture.note')}
          </div>
        </div>
      </section>

      <section
        id="examples"
        className="mx-auto w-[min(1200px,calc(100%-48px))] scroll-mt-24 py-28 max-[640px]:w-[calc(100%-32px)] max-[640px]:py-20"
      >
        <SectionHeading
          eyebrow={t('examples.eyebrow')}
          title={t('examples.title')}
          description={t('examples.description')}
        />

        <div className="mt-14 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          <ExampleCard
            number="01"
            title={t('examples.basic.title')}
            description={t('examples.basic.description')}
          >
            <ResultBox>{t('examples.basic.result')}</ResultBox>
            <CodeHint>t(&apos;examples.basic.result&apos;)</CodeHint>
          </ExampleCard>

          <ExampleCard
            number="02"
            title={t('examples.interpolation.title')}
            description={t('examples.interpolation.description')}
          >
            <ResultBox>
              {t('examples.interpolation.result', { name: 'Lina' })}
            </ResultBox>
            <CodeHint>t(&apos;key&apos;, {"{ name: 'Lina' }"})</CodeHint>
          </ExampleCard>

          <ExampleCard
            number="03"
            title={t('examples.plural.title')}
            description={t('examples.plural.description')}
          >
            <ResultBox counter>
              <CounterButton
                label={t('counter.decrease')}
                onClick={() => setItemCount((count) => Math.max(0, count - 1))}
              >
                &minus;
              </CounterButton>
              <strong>
                {t('examples.plural.result', { count: itemCount })}
              </strong>
              <CounterButton
                label={t('counter.increase')}
                onClick={() => setItemCount((count) => count + 1)}
              >
                +
              </CounterButton>
            </ResultBox>
            <CodeHint>t(&apos;key&apos;, {'{ count }'})</CodeHint>
          </ExampleCard>
        </div>
      </section>

      <section
        id="advanced"
        className="scroll-mt-20 border-y border-white/[0.07] bg-white/[0.018] py-28 max-[640px]:py-20"
      >
        <div className="mx-auto w-[min(1200px,calc(100%-48px))] max-[640px]:w-[calc(100%-32px)]">
          <SectionHeading
            eyebrow={t('advanced.eyebrow')}
            title={t('advanced.title')}
            description={t('advanced.description')}
          />
          <div className="mt-14 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
            {advancedItems.map((item, index) => (
              <ConceptCard key={item.tag} number={`0${index + 1}`} {...item} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-[auto_1fr] items-start gap-4 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.055] p-6 max-[520px]:grid-cols-1">
            <span className="grid size-10 place-items-center rounded-xl bg-[#f59e0b] text-lg font-bold text-[#100b02] shadow-[0_0_22px_rgba(245,158,11,0.16)]">
              !
            </span>
            <div>
              <h3 className="font-extrabold text-[#fcd34d]">
                {t('advanced.dynamic.title')}
              </h3>
              <p className="mt-1.5 text-sm leading-7 text-[#b8a986]">
                {t('advanced.dynamic.description')}
              </p>
              <code
                className="mt-3 block overflow-x-auto rounded-lg border border-[#f59e0b]/15 bg-black/20 px-3 py-2 text-left font-['DM_Mono',monospace] text-[0.68rem] text-[#fbbf24]"
                dir="ltr"
              >
                {'Static: menu.home  ·  Dynamic: menu.${name}'}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section
        id="toolkit"
        className="relative scroll-mt-20 overflow-hidden border-y border-white/[0.07] bg-[#090e16] py-28 text-white max-[640px]:py-20"
      >
        <div className="pointer-events-none absolute end-[-15%] top-[-30%] size-[600px] rounded-full bg-[#08769c]/[0.11] blur-3xl" />
        <div className="mx-auto w-[min(1200px,calc(100%-48px))] max-[640px]:w-[calc(100%-32px)]">
          <div className="grid grid-cols-[0.8fr_1.2fr] items-start gap-20 max-[900px]:grid-cols-1 max-[900px]:gap-12">
            <div className="min-[901px]:sticky min-[901px]:top-25">
              <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#46b7d3]">
                {t('toolkit.eyebrow')}
              </span>
              <h2 className="m-0 text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.02] font-extrabold tracking-[-0.055em] text-balance rtl:leading-[1.2] rtl:tracking-[-0.03em]">
                {t('toolkit.title')}
              </h2>
              <p className="mt-6 max-w-[560px] text-base leading-8 text-[#94a3b8]">
                {t('toolkit.description')}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#46b7d3]/20 bg-[#08769c]/15 px-3 py-2 text-xs font-bold text-[#7dd3fc]">
                <span>★</span>
                {t('toolkit.official')}
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <ToolkitCard
                  number="01"
                  title={t('toolkit.install.title')}
                  description={t('toolkit.install.description')}
                >
                  <CodePanel
                    filename="Terminal"
                    code={snippets.cliInstall}
                    snippetName="cliInstall"
                    copied={copiedSnippet === 'cliInstall'}
                    onCopy={copySnippet}
                    copyLabel={t('common.copy')}
                    copiedLabel={t('common.copied')}
                    compact
                  />
                </ToolkitCard>
                <ToolkitCard
                  number="02"
                  title={t('toolkit.config.title')}
                  description={t('toolkit.config.description')}
                >
                  <CodePanel
                    filename="i18next.config.js"
                    code={snippets.cliConfig}
                    snippetName="cliConfig"
                    copied={copiedSnippet === 'cliConfig'}
                    onCopy={copySnippet}
                    copyLabel={t('common.copy')}
                    copiedLabel={t('common.copied')}
                  />
                </ToolkitCard>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-[620px]:grid-cols-1">
                <CommandCard
                  command="npm run i18n:extract"
                  title={t('toolkit.commands.extract.title')}
                  description={t('toolkit.commands.extract.description')}
                />
                <CommandCard
                  command="npm run i18n:watch"
                  title={t('toolkit.commands.watch.title')}
                  description={t('toolkit.commands.watch.description')}
                />
                <CommandCard
                  command="npm run i18n:status"
                  title={t('toolkit.commands.status.title')}
                  description={t('toolkit.commands.status.description')}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#46b7d3]">
                  {t('toolkit.workflow.title')}
                </span>
                <div className="mt-5 flex items-center justify-between gap-3 max-[640px]:flex-col max-[640px]:items-stretch">
                  {workflowSteps.map((step, index) => (
                    <div className="contents" key={step}>
                      <div className="flex-1 rounded-xl border border-white/10 bg-black/10 p-3 text-center text-xs font-bold leading-5 text-[#d9e6de]">
                        <span className="mb-1 block font-['DM_Mono',monospace] text-[0.6rem] text-[#67e8f9]">
                          0{index + 1}
                        </span>
                        {step}
                      </div>
                      {index < 3 && (
                        <span className="text-[#475569] max-[640px]:rotate-90">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-48px))] py-28 max-[640px]:w-[calc(100%-32px)] max-[640px]:py-20">
        <SectionHeading
          eyebrow={t('practices.eyebrow')}
          title={t('practices.title')}
          description={t('practices.description')}
        />
        <div className="mt-14 grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
          {practiceItems.map((item, index) => (
            <PracticeCard
              key={item.title}
              number={`0${index + 1}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#0a0f18] py-24 max-[640px]:py-18">
        <div className="mx-auto grid w-[min(1200px,calc(100%-48px))] grid-cols-[0.72fr_1.28fr] gap-20 max-[850px]:grid-cols-1 max-[850px]:gap-10 max-[640px]:w-[calc(100%-32px)]">
          <div>
            <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#22d3ee]">
              {t('faq.eyebrow')}
            </span>
            <h2 className="text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.05] font-extrabold tracking-[-0.05em] rtl:leading-[1.2] rtl:tracking-[-0.025em]">
              {t('faq.title')}
            </h2>
            <p className="mt-5 max-w-[480px] text-sm leading-7 text-[#94a3b8]">
              {t('faq.description')}
            </p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <FaqItem key={item.question} number={`0${index + 1}`} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.07] py-24 max-[640px]:py-18">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#08769c]/10 via-transparent to-[#46b7d3]/5" />
        <div className="pointer-events-none absolute -bottom-48 end-[-80px] size-[420px] rounded-full border border-[#46b7d3]/10 shadow-[0_0_0_70px_rgba(70,183,211,0.025),0_0_0_140px_rgba(70,183,211,0.018)]" />
        <div className="relative mx-auto grid w-[min(1200px,calc(100%-48px))] grid-cols-[0.85fr_1.15fr] items-center gap-20 max-[850px]:grid-cols-1 max-[850px]:gap-12 max-[640px]:w-[calc(100%-32px)]">
          <div>
            <div className="inline-flex rounded-[28px] border border-white/10 bg-white p-6 shadow-[0_22px_65px_rgba(0,0,0,0.3)] ring-1 ring-[#22d3ee]/15 max-[500px]:p-4">
              <img
                className="w-full max-w-[330px] rounded-[20px] object-contain"
                src={vicaLogo}
                alt={t('brand.logoAlt')}
              />
            </div>
          </div>
          <div>
            <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#46b7d3]">
              {t('company.eyebrow')}
            </span>
            <h2 className="text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.03] font-extrabold tracking-[-0.055em] rtl:leading-[1.2] rtl:tracking-[-0.03em]">
              {t('company.title')}
            </h2>
            <p className="mt-6 max-w-[650px] text-base leading-8 text-[#94a3b8]">
              {t('company.description')}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-[560px]:grid-cols-1">
              <CompanyValue
                number="01"
                title={t('company.values.practical.title')}
                description={t('company.values.practical.description')}
              />
              <CompanyValue
                number="02"
                title={t('company.values.bilingual.title')}
                description={t('company.values.bilingual.description')}
              />
              <CompanyValue
                number="03"
                title={t('company.values.open.title')}
                description={t('company.values.open.description')}
              />
            </div>

            <a
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[#46b7d3]/25 bg-[#08769c]/15 px-5 py-3.5 text-sm font-extrabold text-[#7dd3fc] transition hover:-translate-y-0.5 hover:border-[#46b7d3]/45 hover:bg-[#08769c]/25"
              href="https://github.com/mabozed/i18"
              target="_blank"
              rel="noreferrer"
            >
              {t('company.repository')}
              <ArrowIcon isArabic={isArabic} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#060910]">
        <div className="mx-auto flex w-[min(1200px,calc(100%-48px))] items-center justify-between gap-8 py-9 max-[640px]:w-[calc(100%-32px)] max-[640px]:flex-col max-[640px]:items-start">
          <div className="flex items-center gap-4">
            <span className="rounded-xl border border-white/10 bg-white/95 p-1.5 shadow-[0_0_15px_rgba(70,183,211,0.08)]">
              <img
                className="h-8 w-auto object-contain"
                src={vicaLogo}
                alt=""
              />
            </span>
            <div>
              <strong className="text-sm">{t('brand.academy')}</strong>
              <p className="mt-1 text-xs text-[#718096]">{t('footer.note')}</p>
            </div>
          </div>
          <a
            className="text-xs font-extrabold text-[#46b7d3] transition hover:text-[#7dd3fc]"
            href="#top"
          >
            {t('footer.backToTop')} ↑
          </a>
        </div>
      </footer>
    </main>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] items-end gap-16 max-[760px]:grid-cols-1 max-[760px]:gap-5">
      <div>
        <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#22d3ee]">
          {eyebrow}
        </span>
        <h2 className="m-0 max-w-[760px] text-[clamp(2rem,5vw,4.8rem)] leading-[1.03] font-extrabold tracking-[-0.055em] text-balance rtl:leading-[1.2] rtl:tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      <p className="m-0 max-w-[560px] leading-8 text-[#94a3b8]">
        {description}
      </p>
    </div>
  )
}

function CodePanel({
  filename,
  code,
  snippetName,
  copied,
  onCopy,
  copyLabel,
  copiedLabel,
  large = false,
  compact = false,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#263244] bg-[#0a0f18] text-[#dce7f3] shadow-[0_24px_65px_rgba(0,0,0,0.38)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/10 px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#fb7185]" />
            <span className="size-2 rounded-full bg-[#e8b94a]" />
            <span className="size-2 rounded-full bg-[#34d399]" />
          </div>
          <span className="font-['DM_Mono',monospace] text-[0.65rem] text-[#7f8da1]">
            {filename}
          </span>
        </div>
        <button
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#22d3ee]/15 bg-[#22d3ee]/[0.055] px-2.5 py-1.5 text-[0.62rem] font-bold text-[#8fddea] transition hover:bg-[#22d3ee]/10 hover:text-white"
          type="button"
          onClick={() => onCopy(snippetName)}
        >
          <CopyIcon />
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre
        className={`m-0 overflow-x-auto text-left font-['DM_Mono',monospace] text-[0.76rem] leading-7 text-[#c9d5e3] max-[480px]:px-4 max-[480px]:text-[0.68rem] max-[480px]:leading-6 ${large ? 'min-h-[345px] px-7 py-10 max-[500px]:min-h-0' : compact ? 'px-5 py-5' : 'px-5 py-7'}`}
        dir="ltr"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

function TutorialStep({ id, number, title, description, points, children }) {
  return (
    <article
      id={id}
      className="scroll-mt-25 rounded-2xl border border-white/[0.08] bg-[#0d141f] p-7 shadow-[0_16px_45px_rgba(0,0,0,0.18)] transition hover:border-[#22d3ee]/20 max-[520px]:p-5"
    >
      <div className="mb-6 flex gap-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#22d3ee]/15 bg-[#22d3ee]/[0.07] font-['DM_Mono',monospace] text-xs font-bold text-[#67e8f9]">
          {number}
        </span>
        <div>
          <h3 className="text-xl font-extrabold">{title}</h3>
          <p className="mt-2 max-w-[720px] text-sm leading-7 text-[#94a3b8]">
            {description}
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-[#a4b0c0] sm:grid-cols-3">
            {points.map((point) => (
              <li
                className="flex items-start gap-2 rounded-lg border border-white/[0.055] bg-white/[0.025] px-3 py-2.5 leading-6"
                key={point}
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#46b7d3]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </article>
  )
}

function ArchitectureCard({ number, label, title, description }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d141f] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
      <div className="mb-10 flex items-center justify-between">
        <span className="font-['DM_Mono',monospace] text-[0.65rem] text-[#22d3ee]">
          {number}
        </span>
        <span className="rounded-md border border-[#46b7d3]/15 bg-[#08769c]/10 px-2 py-1 font-['DM_Mono',monospace] text-[0.6rem] font-bold text-[#7dd3fc]">
          {label}
        </span>
      </div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#94a3b8]">{description}</p>
      <span className="absolute -bottom-4 -end-2 text-7xl font-black text-white/[0.018] transition group-hover:text-[#22d3ee]/[0.035]">
        {number}
      </span>
    </article>
  )
}

function Metric({ value, label }) {
  return (
    <div className="px-8 py-7 text-center max-[520px]:px-3">
      <strong className="block text-2xl font-extrabold tracking-[-0.04em] text-[#67e8f9]">
        {value}
      </strong>
      <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#718096]">
        {label}
      </span>
    </div>
  )
}

function ExampleCard({ number, title, description, children }) {
  return (
    <article className="flex min-h-[410px] flex-col rounded-2xl border border-white/[0.08] bg-[#0d141f] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)] max-[900px]:min-h-0">
      <span className="mb-10 font-['DM_Mono',monospace] text-xs font-medium text-[#22d3ee]">
        {number}
      </span>
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mb-6 mt-2 min-h-13.5 text-sm leading-7 text-[#94a3b8]">
        {description}
      </p>
      {children}
    </article>
  )
}

function ResultBox({ children, counter = false }) {
  return (
    <div
      className={`mt-auto flex min-h-20 items-center rounded-xl border border-white/[0.07] bg-black/20 p-4.5 font-bold text-[#dce7f3] ${counter ? 'justify-between gap-3 text-center' : ''}`}
    >
      {children}
    </div>
  )
}

function CodeHint({ children }) {
  return (
    <code
      className="mt-4 block text-left font-['DM_Mono',monospace] text-[0.68rem] text-[#64748b]"
      dir="ltr"
    >
      {children}
    </code>
  )
}

function CounterButton({ label, onClick, children }) {
  return (
    <button
      className="size-8 shrink-0 cursor-pointer rounded-lg border border-white/10 bg-white/[0.045] p-0 text-base text-[#cbd5e1] transition hover:border-[#22d3ee]/50 hover:text-[#67e8f9] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee80]"
      type="button"
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  )
}

function ToolkitCard({ number, title, description, children }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
      <div className="mb-5 flex gap-4">
        <span className="font-['DM_Mono',monospace] text-xs text-[#46b7d3]">
          {number}
        </span>
        <div>
          <h3 className="font-extrabold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#94a3b8]">{description}</p>
        </div>
      </div>
      {children}
    </article>
  )
}

function CommandCard({ command, title, description }) {
  return (
    <article className="rounded-xl border border-white/10 bg-black/10 p-4">
      <code
        className="block overflow-x-auto text-left font-['DM_Mono',monospace] text-[0.61rem] text-[#67e8f9]"
        dir="ltr"
      >
        {command}
      </code>
      <h4 className="mt-4 text-sm font-extrabold">{title}</h4>
      <p className="mt-1.5 text-xs leading-5 text-[#8694a7]">{description}</p>
    </article>
  )
}

function PracticeCard({ number, title, description }) {
  return (
    <article className="flex gap-5 rounded-2xl border border-white/[0.08] bg-[#0d141f] p-6 transition hover:border-[#46b7d3]/25 hover:shadow-[0_14px_35px_rgba(0,0,0,0.2)]">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#46b7d3]/15 bg-[#08769c]/10 font-['DM_Mono',monospace] text-[0.65rem] font-bold text-[#7dd3fc]">
        {number}
      </span>
      <div>
        <h3 className="text-base font-extrabold">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-[#94a3b8]">{description}</p>
      </div>
    </article>
  )
}

function CompanyValue({ number, title, description }) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
      <span className="font-['DM_Mono',monospace] text-[0.58rem] font-bold text-[#46b7d3]">
        {number}
      </span>
      <h3 className="mt-3 text-sm font-extrabold">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-[#8290a3]">{description}</p>
    </article>
  )
}

function ConceptCard({ number, tag, title, description, code }) {
  return (
    <article className="group rounded-2xl border border-white/[0.08] bg-[#0d141f] p-7 transition hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:bg-[#101925] hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)] max-[520px]:p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-['DM_Mono',monospace] text-[0.65rem] font-bold text-[#22d3ee]">
          {number}
        </span>
        <span className="rounded-full border border-[#46b7d3]/15 bg-[#08769c]/10 px-2.5 py-1 font-['DM_Mono',monospace] text-[0.6rem] font-bold text-[#7dd3fc]">
          {tag}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#94a3b8]">{description}</p>
      <code
        className="mt-6 block overflow-x-auto rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-left font-['DM_Mono',monospace] text-[0.68rem] text-[#67e8f9] shadow-sm"
        dir="ltr"
      >
        {code}
      </code>
    </article>
  )
}

function FaqItem({ number, question, answer }) {
  return (
    <details className="group rounded-2xl border border-white/[0.08] bg-[#0d141f] open:border-[#22d3ee]/20 open:shadow-[0_14px_38px_rgba(0,0,0,0.2)]">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span className="font-['DM_Mono',monospace] text-[0.62rem] font-bold text-[#22d3ee]">
          {number}
        </span>
        <strong className="flex-1 text-sm leading-6">{question}</strong>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#08769c]/20 text-lg text-[#7dd3fc] transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="px-5 pb-5 ps-14 text-sm leading-7 text-[#94a3b8] max-[480px]:ps-5">
        {answer}
      </p>
    </details>
  )
}

function ArrowIcon({ isArabic }) {
  return (
    <span className="text-lg" aria-hidden="true">
      {isArabic ? '\u2190' : '\u2192'}
    </span>
  )
}

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

SectionHeading.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

CodePanel.propTypes = {
  filename: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  snippetName: PropTypes.string.isRequired,
  copied: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired,
  copyLabel: PropTypes.string.isRequired,
  copiedLabel: PropTypes.string.isRequired,
  large: PropTypes.bool,
  compact: PropTypes.bool,
}

TutorialStep.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
}

ArchitectureCard.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Metric.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

ExampleCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

ResultBox.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.bool,
}

CodeHint.propTypes = {
  children: PropTypes.node.isRequired,
}

CounterButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

ToolkitCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

CommandCard.propTypes = {
  command: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

PracticeCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

CompanyValue.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

ConceptCard.propTypes = {
  number: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}

FaqItem.propTypes = {
  number: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
}

ArrowIcon.propTypes = {
  isArabic: PropTypes.bool.isRequired,
}

export default App
