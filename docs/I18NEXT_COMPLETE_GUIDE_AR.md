<div dir="rtl" align="right">

<h1>الدليل الشامل لاستخدام i18next وi18next-cli</h1>

<p><strong>اللغة:</strong> العربية · <a href="./I18NEXT_COMPLETE_GUIDE_EN.md">English</a> · <a href="../README.md">العودة إلى README</a></p>

<p>مرجع تعليمي مقدم من <strong>Vica Web Solutions</strong>.</p>

<blockquote>
هذا الدليل يشرح بنية الترجمة المستخدمة في المشروع، وطريقة إضافة النصوص واللغات، ودعم اتجاه RTL، واستخراج المفاتيح تلقائيًا، وأهم الأخطاء الشائعة.
</blockquote>

<p><strong>انتقال سريع:</strong></p>

<p>
<a href="#3-تهيئة-المكتبة">تهيئة المكتبة</a> ·
<a href="#7-اتجاه-الصفحة-rtl-وltr">دعم RTL</a> ·
<a href="#9-صيغ-الجمع">صيغ الجمع</a> ·
<a href="#11-أداة-جمع-المفاتيح-i18next-cli">أداة جمع المفاتيح</a> ·
<a href="#15-أخطاء-شائعة-وحلولها">حل المشكلات</a>
</p>

</div>

## 1. وظيفة الحزم

| الحزمة | وظيفتها |
|---|---|
| `i18next` | المحرك الأساسي لإدارة اللغات والمفاتيح والمتغيرات والجمع. |
| `react-i18next` | ربط i18next بمكوّنات React وتوفير `useTranslation`. |
| `i18next-http-backend` | تحميل ملفات JSON من مجلد `public/locales`. |
| `i18next-browser-languagedetector` | اكتشاف لغة المستخدم وحفظ اختياره. |
| `i18next-cli` | استخراج المفاتيح، فحص حالة الترجمات، ومزامنة ملفات اللغات. |

## 2. بنية الملفات

```text
src/
  main.jsx                     # يستورد إعداد i18n قبل عرض التطبيق
  i18n.js                      # إعداد المكتبة والكاش والـ backend
  App.jsx                      # أمثلة استخدام t()
public/locales/
  en/translation.json         # النصوص الإنجليزية
  ar/translation.json         # النصوص العربية
i18next.config.js              # إعداد أداة الاستخراج
```

المسار الموجود في `src/i18n.js`:

```js
backend: {
  loadPath: '/locales/{{lng}}/translation.json',
}
```

يعني أن `{{lng}}` ستتحول إلى `en` أو `ar` عند التشغيل.

## 3. تهيئة المكتبة

يتم تسجيل الإضافات ثم تشغيل `init`:

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

- `supportedLngs`: اللغات المتاحة فعلًا.
- `fallbackLng`: اللغة المستخدمة عندما لا تتوفر لغة المتصفح.
- `order`: ابحث أولًا عن اختيار محفوظ، ثم استخدم لغة المتصفح.
- `caches`: خزّن اللغة المختارة في `localStorage`.
- `escapeValue: false`: لأن React يحمي النصوص المعروضة تلقائيًا.

يجب استيراد ملف الإعداد مرة واحدة قبل عرض التطبيق:

```js
// src/main.jsx
import './i18n.js'
```

## 4. كتابة ملفات الترجمة

يفضّل تنظيم المفاتيح في مجموعات بدل قائمة مسطحة:

```json
{
  "hero": {
    "title": "One interface. Every language.",
    "action": "Explore the examples"
  }
}
```

ويجب أن يحتوي الملف العربي على البنية نفسها:

```json
{
  "hero": {
    "title": "واجهة واحدة، بكل اللغات.",
    "action": "استكشف الأمثلة"
  }
}
```

اسم المفتاح ثابت بين اللغات، والقيمة فقط هي التي تتغير.

## 5. استخدام الترجمة داخل React

```jsx
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()

  return <h1>{t('hero.title')}</h1>
}
```

الدالة `t()` تستقبل مسار المفتاح وتعيد القيمة الموافقة للغة الحالية. يتحدّث المكوّن تلقائيًا عند تغيير اللغة.

## 6. تبديل اللغة

```jsx
const { i18n } = useTranslation()

<button onClick={() => i18n.changeLanguage('ar')}>AR</button>
<button onClick={() => i18n.changeLanguage('en')}>EN</button>
```

استخدم `i18n.resolvedLanguage` لمعرفة اللغة الفعلية بعد تطبيق الاكتشاف واللغة الاحتياطية:

```js
const currentLanguage = i18n.resolvedLanguage || 'en'
```

## 7. اتجاه الصفحة RTL وLTR

عند كل تغيير للغة حدّث `lang` و`dir`:

```jsx
useEffect(() => {
  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr'
}, [currentLanguage])
```

هذا يفيد التصميم وقارئات الشاشة ومحركات البحث. في Tailwind يمكن استخدام متغيرات الاتجاه:

```jsx
<div className="text-left rtl:text-right">...</div>
```

واستخدم خصائص الاتجاه المنطقية مثل `ms-4` و`me-4` و`ps-4` و`pe-4` كلما أمكن.

## 8. المتغيرات داخل الترجمة

ملف اللغة:

```json
{
  "welcome": "Hello, {{name}}!"
}
```

المكوّن:

```jsx
<p>{t('welcome', { name: 'Lina' })}</p>
```

لا تجمع الجملة يدويًا مثل `t('hello') + name` لأن ترتيب الكلمات يختلف بين اللغات.

## 9. صيغ الجمع

الإنجليزية تحتاج غالبًا إلى مفرد وجمع:

```json
{
  "lesson_one": "{{count}} lesson",
  "lesson_other": "{{count}} lessons"
}
```

العربية تملك صيغًا أكثر:

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

الاستخدام واحد في الحالتين:

```jsx
<p>{t('lesson', { count: lessonCount })}</p>
```

وجود الخاصية باسم `count` مهم؛ تستخدمها المكتبة لاختيار الصيغة الصحيحة وفق قواعد اللغة.

## 10. النص الذي يحتوي عناصر React

استخدم `Trans` عندما تحتاج إلى رابط أو عنصر منسّق داخل الجملة:

```jsx
import { Trans } from 'react-i18next'

<Trans i18nKey="terms.message" components={{ link: <a href="/terms" /> }} />
```

وفي ملف JSON:

```json
{
  "terms": {
    "message": "Read our <link>terms</link>."
  }
}
```

للنصوص العادية استخدم `t()`؛ لا تحتاج إلى `Trans` إلا عند وجود عناصر React داخل الجملة.

## 11. أداة جمع المفاتيح i18next-cli

الأداة لا تترجم النصوص تلقائيًا. وظيفتها الأساسية قراءة ملفات المصدر والعثور على مفاتيح مثل:

```js
t('hero.title')
t('profile.greeting', { name })
t('cart.items', { count })
```

ثم تضيف المفاتيح الناقصة إلى ملفات JSON وتحافظ على تنظيم اللغات.

إعداد المشروع موجود في `i18next.config.js`:

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

### استخراج المفاتيح مرة واحدة

```bash
npm run i18n:extract
```

نفّذ الأمر بعد إضافة استدعاءات `t()` جديدة، ثم افتح ملفات JSON واكتب الترجمة الصحيحة للقيم الجديدة.

### المراقبة أثناء التطوير

```bash
npm run i18n:watch
```

يبقى الأمر فعالًا ويعيد الاستخراج عند تعديل ملفات المصدر.

### فحص حالة الترجمات

```bash
npm run i18n:status
```

يعرض المفاتيح الموجودة والناقصة ونسبة اكتمال كل لغة. يفيد قبل رفع المشروع أو بناء نسخة الإنتاج.

### الاستخدام في CI

يمكن إضافة فحص لا يغيّر الملفات وإنما يفشل عند اكتشاف اختلاف:

```bash
npx i18next-cli extract --ci --dry-run
```

### قيد مهم: المفاتيح الديناميكية

أداة التحليل تستطيع اكتشاف النصوص الثابتة:

```js
t('menu.home')
```

لكنها لا تستطيع دائمًا معرفة جميع قيم مفتاح مبني وقت التشغيل:

```js
t(`menu.${item.name}`)
```

يفضّل استخدام خريطة بمفاتيح صريحة:

```js
const menuKeys = {
  home: 'menu.home',
  settings: 'menu.settings',
}

t(menuKeys[item.name])
```

وعند الضرورة يمكن وضع مفاتيح صريحة في تعليقات الاستخراج:

```js
// t('menu.home')
// t('menu.settings')
```

## 12. إضافة لغة جديدة

لإضافة الفرنسية مثلًا:

1. أضف `fr` إلى `supportedLngs` في `src/i18n.js`.
2. أضف `fr` إلى `locales` في `i18next.config.js`.
3. أنشئ `public/locales/fr/translation.json` أو شغّل الاستخراج.
4. أضف اللغة إلى قائمة `languages` في `App.jsx`.
5. ترجم جميع القيم ثم شغّل فحص الحالة.

```bash
npm run i18n:extract
npm run i18n:status
```

## 13. إضافة نص جديد بالطريقة الصحيحة

افترض أنك تريد زر حفظ:

1. استخدم مفتاحًا واضحًا في المكوّن:

```jsx
<button>{t('actions.save')}</button>
```

2. شغّل أداة الاستخراج:

```bash
npm run i18n:extract
```

3. اكتب القيمة الإنجليزية في الملف الإنجليزي والقيمة العربية في الملف العربي.
4. شغّل فحص الحالة والبناء:

```bash
npm run i18n:status
npm run build
```

## 14. أفضل الممارسات

- استخدم مفاتيح تصف المعنى مثل `checkout.payment.failed`.
- لا تستخدم النص الإنجليزي نفسه كمفتاح في المشاريع الكبيرة.
- لا تضع نصوص الواجهة مباشرة داخل JSX إذا كانت تحتاج إلى ترجمة.
- لا تقسّم الجملة المترجمة إلى أجزاء متعددة.
- مرّر الأرقام والأسماء كمتغيرات.
- استخدم `count` لصيغ الجمع.
- حافظ على نفس بنية المفاتيح في كل اللغات.
- حدّث `lang` و`dir` عند تغيير اللغة.
- شغّل `i18n:status` قبل إصدار نسخة جديدة.
- اجعل مفاتيح `t()` ثابتة قدر الإمكان لتتعرف عليها أداة الاستخراج.

## 15. أخطاء شائعة وحلولها

### يظهر المفتاح بدل الترجمة

تحقق من:

- صحة اسم المفتاح وحالة الأحرف.
- وجود المفتاح في `translation.json`.
- صحة مسار `loadPath`.
- عدم وجود خطأ في صيغة JSON.

### اللغة تعود إلى لغة المتصفح بعد التحديث

تأكد من وجود:

```js
detection: {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
}
```

### العربية تعمل لكن الاتجاه لا يتغير

`changeLanguage` لا يضبط اتجاه HTML تلقائيًا. يجب تحديث `document.documentElement.dir` كما في القسم السابع.

### الجمع لا يعمل

تأكد من:

- استخدام لاحقات JSON الصحيحة مثل `_one` و`_other`.
- تمرير `{ count: value }` وليس اسمًا آخر للعدد.
- كون `count` رقمًا وليس نصًا عند الإمكان.

### الأداة لم تكتشف مفتاحًا

تأكد من أن الملف داخل `src` وامتداده `js` أو `jsx`، وأن المفتاح مكتوب بصورة ثابتة يمكن تحليلها. راجع قسم المفاتيح الديناميكية.

## 16. أوامر المشروع المختصرة

| الأمر | الاستخدام |
|---|---|
| `npm run dev` | تشغيل بيئة التطوير. |
| `npm run build` | إنشاء نسخة الإنتاج. |
| `npm run lint` | فحص كود React وJavaScript. |
| `npm run i18n:extract` | جمع مفاتيح الترجمة وتحديث ملفات اللغات. |
| `npm run i18n:watch` | مراقبة الملفات وإعادة الاستخراج. |
| `npm run i18n:status` | فحص اكتمال الترجمات. |

بهذا تصبح دورة العمل اليومية: اكتب المفتاح في React، استخرجه، ترجم قيمته، افحص الحالة، ثم ابنِ المشروع.
