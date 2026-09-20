<div dir="rtl" align="right">

<h1>ملاحظات استخدام CSS فقط بدل Tailwind</h1>

<p><strong>اللغة:</strong> العربية · <a href="./USING_CSS_ONLY_EN.md">English</a> · <a href="../README.md">العودة إلى README</a></p>

<p>جزء من مشروع Vica Web Solutions التعليمي لتعلّم الترجمة.</p>

<p>المشروع الحالي يستخدم Tailwind CSS 4. هذا الملف مرجع للعودة إلى CSS التقليدي في مشروع آخر أو في نسخة منفصلة من هذا المشروع.</p>

</div>

> لا تنفّذ خطوات الحذف التالية إلا عندما تقرر فعلًا إزالة Tailwind؛ الواجهة الحالية تعتمد عليه بالكامل.

## 1. إزالة Tailwind

احذف الحزم:

```bash
npm uninstall tailwindcss @tailwindcss/vite
```

ثم عدّل `vite.config.js` واحذف استيراد Tailwind:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## 2. تجهيز ملفات CSS

استخدم ملفًا عامًا للقواعد الأساسية:

```css
/* src/index.css */
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

واستخدم ملفًا خاصًا بالمكوّن:

```css
/* src/App.css */
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

## 3. استيراد الملف واستخدام الأصناف

داخل `App.jsx`:

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

استبدل كل مجموعة من أصناف Tailwind باسم دلالي واحد، ثم انقل قيم التنسيق إلى `App.css`.

## 4. دعم RTL في CSS

المشروع يغيّر الخاصية `dir` على عنصر `html` تلقائيًا، لذلك يمكن كتابة قواعد خاصة بالعربية:

```css
[dir='rtl'] .card {
  text-align: right;
}

[dir='ltr'] .card {
  text-align: left;
}
```

فضّل الخصائص المنطقية مثل الآتية حتى يعمل التنسيق في الاتجاهين دون تكرار:

```css
.element {
  margin-inline-start: 1rem;
  padding-inline: 1.5rem;
  border-inline-start: 3px solid #f1663d;
}
```

استخدم `margin-inline` و`padding-inline` و`inset-inline-start` بدل ربط التنسيق دائمًا بـ `left` أو `right`.

## 5. ما الذي لا يتغير؟

إزالة Tailwind لا تؤثر في i18next. تبقى الملفات التالية كما هي:

- `src/i18n.js`
- `i18next.config.js`
- `public/locales/en/translation.json`
- `public/locales/ar/translation.json`
- أوامر `npm run i18n:*`

الترجمة مستقلة عن طريقة التنسيق؛ الفرق الوحيد هو مكان كتابة قواعد التصميم.
