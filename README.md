<div align="center">

<img src="./src/assets/Vica%20Web%20Solutions2.png" alt="Vica Web Solutions" width="240" />

# Vica i18n

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![i18next](https://img.shields.io/badge/i18next-23-26A69A?logo=i18next&logoColor=white)](https://www.i18next.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

[Live Demo](https://i18n-learn.vercel.app/) · [Repository](https://github.com/vica-web/i18n) · [English](#english) · [العربية](#العربية)

</div>

---

## English

This project is a practical bilingual learning experience for React localization using `i18next`, `react-i18next`, and `i18next-cli`. It includes a polished landing page, interactive examples, and full documentation in both English and Arabic.

### Highlights

- English + Arabic interface support
- RTL and LTR switching
- Browser language detection and saved preference
- Dynamic interpolation and plural rules
- Tailwind-based responsive design
- Real-world i18n workflow setup

### Stack

- React 18
- Vite 5
- i18next + react-i18next
- i18next HTTP Backend
- Browser Language Detector
- Tailwind CSS 4

### Run locally

```bash
git clone https://github.com/vica-web/i18n.git
cd i18n
npm install
npm run dev
```

Then open the local Vite URL and switch between `EN` and `AR`.

## العربية

هذا المشروع عبارة عن تجربة تعليمية عملية لتعلم الترجمة في React باستخدام `i18next` و`react-i18next` و`i18next-cli`. ويحتوي على صفحة هبوط أنيقة، أمثلة تفاعلية، ووثائق كاملة باللغتين الإنجليزية والعربية.

### المزايا

- دعم واجهة باللغتين الإنجليزية والعربية
- تبديل بين RTL وLTR
- اكتشاف لغة المتصفح وحفظ التفضيل
- interpolations وقواعد الجمع
- تصميم متجاوب باستخدام Tailwind
- سير عمل عملي لإعداد i18n

### التقنيات المستخدمة

- React 18
- Vite 5
- i18next + react-i18next
- i18next HTTP Backend
- Browser Language Detector
- Tailwind CSS 4

### التشغيل محليًا

```bash
git clone https://github.com/vica-web/i18n.git
cd i18n
npm install
npm run dev
```

ثم افتح رابط Vite المحلي وقم بالتبديل بين `EN` و`AR`.

---

## Project structure

```text
.
├── public/
│   └── locales/
│       ├── en/translation.json
│       └── ar/translation.json
├── src/
│   ├── App.jsx
│   ├── i18n.js
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Useful commands

```bash
npm run dev
npm run build
npm run i18n:status
npm run i18n:extract
```

## Live demo

https://i18n-learn.vercel.app/

## Notes

Designed for learning, experimentation, and practical bilingual UI development with real localization flows.

## Translation tooling / شرح أداة جمع الترجمات

This project uses the official `i18next-cli` to scan JavaScript and JSX files, discover translation keys used with `t()`, and keep locale files synchronized.

<p dir="rtl" align="right">
يستخدم المشروع أداة <code>i18next-cli</code> الرسمية. تقرأ الأداة ملفات JavaScript وJSX، وتبحث عن المفاتيح المستخدمة داخل <code>t()</code>، ثم تضيف المفاتيح الناقصة إلى ملفات اللغات وتعرض حالة اكتمال الترجمة.
</p>

> The tool collects and checks keys; it does not write the final human translation for you.

<p dir="rtl" align="right">
<strong>مهم:</strong> تجمع الأداة المفاتيح وتفحصها، لكنها لا تكتب الترجمة البشرية النهائية. بعد الاستخراج يجب مراجعة القيم الجديدة وترجمتها داخل ملفات JSON.
</p>

### 1. Install the tool / تثبيت الأداة

Install it as a development dependency because it is only needed while developing the project:

```bash
npm install --save-dev i18next-cli
```

### 2. Configure extraction / إعداد جمع المفاتيح

Create `i18next.config.js` in the project root:

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

<ul dir="rtl" align="right">
  <li><code>locales</code>: اللغات التي تريد إدارتها.</li>
  <li><code>input</code>: الملفات التي ستبحث الأداة داخلها عن مفاتيح الترجمة.</li>
  <li><code>output</code>: مكان حفظ ملفات كل لغة وnamespace.</li>
</ul>

### 3. Add npm scripts / إضافة الأوامر

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "i18n:extract": "i18next-cli extract",
    "i18n:watch": "i18next-cli extract --watch",
    "i18n:status": "i18next-cli status"
  }
}
```

| Command                | What it does                                     | الوظيفة                                      |
| ---------------------- | ------------------------------------------------ | -------------------------------------------- |
| `npm run i18n:extract` | Extracts keys once and updates locale files.     | يجمع المفاتيح مرة واحدة ويحدّث ملفات اللغات. |
| `npm run i18n:watch`   | Watches source files and extracts after changes. | يراقب الملفات ويعيد الجمع بعد التعديلات.     |
| `npm run i18n:status`  | Reports missing keys and completion percentages. | يعرض المفاتيح الناقصة ونسبة اكتمال كل لغة.   |

### 4. How extraction works / كيف تعمل الأداة؟

When you add translation calls to a component:

```jsx
<h1>{t('home.title')}</h1>
<p>{t('home.greeting', { name: 'Lina' })}</p>
<span>{t('cart.items', { count: itemCount })}</span>
```

Run:

```bash
npm run i18n:extract
```

The tool discovers `home.title`, `home.greeting`, and the plural forms for `cart.items`, then updates the configured locale files. Open those files afterward and add the correct translations.

<p dir="rtl" align="right">
في المثال السابق تكتشف الأداة مفاتيح العنوان والترحيب والعناصر، ثم تحدّث ملفات العربية والإنجليزية. افتح ملفات JSON بعد تنفيذ الأمر واكتب الترجمة الصحيحة لكل قيمة جديدة.
</p>

### 5. Recommended workflow / دورة العمل المقترحة

```text
Add t('new.key') in React
          ↓
Run npm run i18n:extract
          ↓
Translate the new value in every locale file
          ↓
Run npm run i18n:status
          ↓
Run npm run build
```

<ol dir="rtl" align="right">
  <li>أضف المفتاح الجديد باستخدام <code>t()</code>.</li>
  <li>شغّل أمر استخراج المفاتيح.</li>
  <li>اكتب ترجمة المفتاح في جميع ملفات اللغات.</li>
  <li>افحص حالة الترجمات.</li>
  <li>شغّل بناء المشروع للتأكد من سلامته.</li>
</ol>

### 6. Static and dynamic keys / المفاتيح الثابتة والديناميكية

The CLI reliably discovers static keys:

```js
t('menu.home')
```

It cannot always determine the possible values of a key created at runtime:

```js
t(`menu.${item.name}`)
```

Prefer an explicit map when values are dynamic:

```js
const menuKeys = {
  home: 'menu.home',
  settings: 'menu.settings',
}

t(menuKeys[item.name])
```

<p dir="rtl" align="right">
تتعرف الأداة بسهولة على المفتاح المكتوب كنص ثابت، لكنها لا تستطيع دائمًا توقّع قيم المفتاح المركّب وقت التشغيل. استخدم خريطة تحتوي المفاتيح الصريحة، أو راجع <a href="./docs/I18NEXT_COMPLETE_GUIDE_AR.md#11-أداة-جمع-المفاتيح-i18next-cli">شرح الأداة الكامل بالعربية</a> للحالات المتقدمة.
</p>

## Project structure

```text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── I18NEXT_COMPLETE_GUIDE_AR.md
│   ├── I18NEXT_COMPLETE_GUIDE_EN.md
│   ├── USING_CSS_ONLY_AR.md
│   └── USING_CSS_ONLY_EN.md
├── public/locales/
│   ├── ar/translation.json
│   └── en/translation.json
├── src/
│   ├── assets/Vica Web Solutions.png
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── main.jsx
├── i18next.config.js
└── vite.config.js
```

## Documentation / ملفات الشرح

| Language | Complete i18next guide                                                | CSS-only alternative                                               |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| English  | [Complete i18next and CLI guide](./docs/I18NEXT_COMPLETE_GUIDE_EN.md) | [Using plain CSS instead of Tailwind](./docs/USING_CSS_ONLY_EN.md) |
| العربية  | [الدليل الشامل للمكتبة والأداة](./docs/I18NEXT_COMPLETE_GUIDE_AR.md)  | [استخدام CSS التقليدي بدل Tailwind](./docs/USING_CSS_ONLY_AR.md)   |

## Quality checks

```bash
npm run lint
npm run i18n:status
npm run build
```

GitHub Actions runs the same checks automatically for pushes and pull requests targeting `main`.

## About Vica Web Solutions / عن الشركة

**Vica Web Solutions** created this repository as an educational reference for developers building multilingual React interfaces. The project focuses on practical understanding, Arabic-first RTL quality, clean examples, and a workflow that can grow from a small demo into a production application.

<p dir="rtl" align="right">
أنشأت شركة <strong>Vica Web Solutions</strong> هذا المستودع ليكون مرجعًا تعليميًا للمطورين الذين يبنون واجهات React متعددة اللغات. يركز المشروع على الفهم العملي، وجودة تجربة العربية واتجاه RTL، ووضوح الأمثلة، وتقديم دورة عمل قابلة للانتقال من مشروع تعليمي صغير إلى تطبيق فعلي.
</p>

### Educational goals / الأهداف التعليمية

| Goal                                             | الهدف                                          |
| ------------------------------------------------ | ---------------------------------------------- |
| Explain localization through working code        | شرح الترجمة من خلال كود يعمل فعليًا            |
| Treat Arabic and RTL as first-class requirements | التعامل مع العربية وRTL كمتطلبات أساسية        |
| Document both the library and its official CLI   | توثيق المكتبة وأداة CLI الرسمية                |
| Keep the repository approachable and reusable    | إبقاء المستودع واضحًا وقابلًا لإعادة الاستخدام |

---

<div align="center">

Designed and maintained as an educational initiative by **Vica Web Solutions**. 
</div>
