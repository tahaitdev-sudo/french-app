# Parlons Français — تطبيق تعلّم الفرنسية

تطبيق ويب تفاعلي لتعلّم اللغة الفرنسية، مبني بـ **Next.js (App Router)** و **Tailwind CSS** و **Lucide React**.

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
```

للنشر: `npm run build && npm start`، أو ارفع المشروع إلى Vercel مباشرة.

## المميزات

- **لوحة التحكم**: المستوى الحالي (A1…C1)، شريط التقدم نحو المستوى التالي، الهدف اليومي، كلمة اليوم، والوحدات.
- **الدروس**: مفردات، قواعد، وتصريف الأفعال (Le Présent و Le Passé Composé) مع أمثلة وأزرار نطق.
- **الاختبارات**: اختيار من متعدد + إكمال الفراغ، تصحيح فوري، شرح، ومؤثرات صوتية (Web Audio).
- **الاستماع** (`/listening`): إملاء صوتي، يُنطق جملة فرنسية ويكتبها المتعلم، مع إبراز الكلمات الخاطئة والتنبيه لعلامات التشكيل.
- **مراجعة الأخطاء** (`/review`): تُحفظ الأسئلة الخاطئة تلقائياً وتُعاد حتى تُجاب بشكل صحيح.
- **النطق**: Web Speech API (SpeechSynthesis) مع سرعة عادية/بطيئة واختيار الصوت.
- **المكافآت**: نقاط XP وسلسلة أيام متتالية (Streak)، محفوظة في `localStorage`.
- **الوضع الليلي/النهاري** وتصميم متجاوب (هاتف، لوحي، حاسوب) مع واجهة RTL.

## هيكل المشروع

```
app/
  layout.jsx              الهيكل العام، الخط، الوضع الليلي
  page.jsx                لوحة التحكم
  lessons/page.jsx        قائمة الدروس مع التصنيف
  lessons/[id]/page.jsx   صفحة الدرس
  quiz/page.jsx           قائمة الاختبارات
  quiz/[id]/page.jsx      تشغيل اختبار
  pronunciation/page.jsx  النطق
  listening/page.jsx      تمرين الاستماع (إملاء)
  review/page.jsx         مراجعة الأخطاء
components/
  ProgressProvider.jsx    حالة التقدم (XP، المستوى، السلسلة) عبر Context
  SpeakButton.jsx         زر النطق
  ModuleCard.jsx, ProgressBar.jsx, ThemeToggle.jsx, Fr.jsx
  layout/                 Sidebar, MobileNav, TopBar, AppShell
  dashboard/              LevelHero, StatCard, DailyGoalCard, WordOfTheDay
  lesson/                 VocabList, RuleBlock, ConjugationTable
  quiz/                   QuizEngine, MCQQuestion, FillBlankQuestion, QuizResult
lib/
  data.js                 كل المحتوى التجريبي (دروس، اختبارات، نطق)
  levels.js               المستويات وقواعد النقاط
  speech.js, sounds.js    النطق والمؤثرات الصوتية
  categories.js           ألوان وأيقونات التصنيفات
```

## إضافة محتوى جديد

كل المحتوى في `lib/data.js`:

- **درس جديد**: أضف كائناً إلى `LESSONS` (`vocab` و/أو `rules` و/أو `conjugation`).
- **اختبار جديد**: أضف كائناً إلى `QUIZZES`. نوع `mcq` يحتاج `options` و `answer` (رقم الخيار الصحيح)، ونوع `fill` يحتاج `prompt` يحتوي `___` و `answer`.

## ملاحظات

- النطق يعتمد على أصوات المتصفح/النظام. إن لم يوجد صوت فرنسي ثبّته من إعدادات نظام التشغيل.
- التقدم محفوظ في المتصفح فقط (لا يوجد خادم أو حساب مستخدم).
