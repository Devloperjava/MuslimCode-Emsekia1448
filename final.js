const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🎨 التلميع النهائي...\n");

// ============================================================
// 1) index.html — حذف "الطريقة المصرية" + إضافة خط عربي فخم
// ============================================================
let html = read(path.join(WEB, "index.html"));

// حذف "الطريقة المصرية"
html = html.replace(/\s*<p>الإسكندرية — الطريقة المصرية<\/p>/, "");
html = html.replace(/\s*<p>القاهرة — الطريقة المصرية<\/p>/, "");
html = html.replace(/<p>.*الطريقة المصرية.*<\/p>/, "");

// إضافة خط Amiri من Google Fonts (يعمل offline بعد أول تحميل)
if (!html.includes("fonts.googleapis.com")) {
  html = html.replace(
    "</head>",
    `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
</head>`
  );
}

write(path.join(WEB, "index.html"), html);
console.log("✓ index.html: حُذفت الطريقة المصرية + أُضيف الخط الفخم");

// ============================================================
// 2) style.css — الخط الفخم + الأنيميشن + إزالة أنيميشن البطاقات
// ============================================================
let css = read(path.join(WEB, "style.css"));

// إزالة أنيميشن بطاقات القمر (نبض مستمر)
css = css.replace(
  /\.date-moon\s*\{[\s\S]*?\}/,
  `.date-moon{
  flex:0 0 44px;
  height:44px;
  display:grid;
  place-items:center;
  filter: drop-shadow(0 0 6px rgba(255,220,120,.6));
  transition: transform .3s ease, filter .3s ease;
}`
);

// إزالة تأخيرات البطاقات
css = css.replace(/\.day-card:nth-child\(\d+\)\s*\.date-moon\{[^}]*\}/g, "");
css = css.replace(/\.day-card:nth-child\(n\+\d+\)\s*\.date-moon\{[^}]*\}/g, "");

// إزالة cardMoonEnter و cardMoonPulse
css = css.replace(/@keyframes cardMoonEnter\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes cardMoonPulse\s*\{[\s\S]*?\n\}/g, "");

// إزالة نبض بطاقة اليوم
css = css.replace(
  /\.day-card\.is-today\s*\.date-moon\{[\s\S]*?\}/,
  `.day-card.is-today .date-moon{
  filter: drop-shadow(0 0 12px rgba(255,230,150,.9))
          drop-shadow(0 0 24px rgba(255,210,90,.5));
}`
);

// إزالة hover على الهلال في البطاقة (يبقى ثابت)
css = css.replace(
  /\.day-card:hover\s*\.date-moon\{[\s\S]*?\}/,
  `.day-card:hover .date-moon{
  transform: scale(1.08);
  filter: drop-shadow(0 0 10px rgba(255,230,150,.9));
}`
);

// ============================================================
// الخط العربي الفخم + الأنيميشن للعنوان
// ============================================================
if (!css.includes("PREMIUM-TITLE")) {
  css += `

/* ============================================================
   PREMIUM-TITLE — خط عربي فخم + أنيميشن عالمي
   ============================================================ */

/* خط أميري الفخم للعنوان */
.title-overlay h1{
  font-family: "Aref Ruqaa", "Amiri", "Traditional Arabic", serif !important;
  font-size: clamp(34px, 7vw, 62px) !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
  line-height: 1.3 !important;
  background: linear-gradient(
    110deg,
    #fff4c8 0%,
    #f5d76e 25%,
    #ffffff 40%,
    #c9a227 50%,
    #ffffff 60%,
    #f5d76e 75%,
    #fff4c8 100%
  ) !important;
  background-size: 300% 100% !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,.85))
          drop-shadow(0 0 40px rgba(201,162,39,.55));
  animation: titleShimmer 8s ease-in-out infinite,
             titleFloat 6s ease-in-out infinite,
             titleEnter 1.6s cubic-bezier(.2,.8,.2,1) both;
  transform-origin: center;
  will-change: background-position, transform, filter;
}

/* لمعان ذهبي يجري على النص */
@keyframes titleShimmer{
  0%, 55%, 100%{background-position: 200% 0}
  75%          {background-position: -50% 0}
}

/* طفو ناعم للعنوان */
@keyframes titleFloat{
  0%, 100%{transform: translateY(0) scale(1)}
  50%     {transform: translateY(-6px) scale(1.012)}
}

/* دخول درامي */
@keyframes titleEnter{
  0%{
    opacity:0;
    transform: translateY(-40px) scale(.85);
    filter: blur(14px) drop-shadow(0 0 0 transparent);
  }
  60%{
    opacity:1;
    filter: blur(2px) drop-shadow(0 0 30px rgba(201,162,39,.5));
  }
  100%{
    opacity:1;
    transform: translateY(0) scale(1);
    filter: blur(0) drop-shadow(0 4px 20px rgba(0,0,0,.85))
                    drop-shadow(0 0 40px rgba(201,162,39,.55));
  }
}

/* رفع العنوان أكثر فوق المسجد */
.title-overlay{
  top: 42% !important;
}

/* خط عربي فخم لكل النصوص */
body, .app, .countdown, .calendar-section, .day-card{
  font-family: "Amiri", "Traditional Arabic", "Segoe UI", Tahoma, sans-serif;
}

.countdown-title,
.today-info h2,
.calendar-section h2,
.date-label{
  font-family: "Aref Ruqaa", "Amiri", "Traditional Arabic", serif;
}

/* تأثير احترافي على بطاقات الأيام — دخول فقط */
@media(prefers-reduced-motion:reduce){
  .title-overlay h1,
  .date-moon,
  .day-card{animation:none!important}
}
`;
  write(path.join(WEB, "style.css"), css);
  console.log("✓ style.css: خط فخم + أنيميشن العنوان + إزالة أنيميشن الهلال في البطاقات");
} else {
  console.log("⚠ PREMIUM-TITLE موجود مسبقاً");
}

// ============================================================
// 3) moon.js — إزالة الأنيميشن + إكمال القمر في اليوم 30
// ============================================================
let moon = read(path.join(WEB, "moon.js"));

// إعادة حساب المراحل: اليوم 30 = بدر كامل (100%)
// النموذج: 1 → 30 (نمو خطي بسيط)
const newCompute = `  function computePhase(day) {
    // نمو خطي: اليوم 1 = هلال رفيع (0.05)، اليوم 30 = بدر كامل (1.0)
    const illumination = 0.05 + ((day - 1) / 29) * 0.95;
    const waxing = true;
    return { illumination: illumination, phase: (day - 1) / 29, waxing: waxing };
  }`;

moon = moon.replace(/function computePhase\(day\)\s*\{[\s\S]*?\n  \}/, newCompute);

write(path.join(WEB, "moon.js"), moon);
console.log("✓ moon.js: اليوم 30 = بدر كامل (100%)");

// ============================================================
// 4) app.js — لا تغيير (يعمل)
// ============================================================

console.log("\n✅ كل التعديلات تمت!");
console.log("\n📋 ما تم:");
console.log("  • حُذفت كلمة 'الطريقة المصرية'");
console.log("  • أُضيف خط Amiri + Aref Ruqaa الفخم");
console.log("  • أنيميشن عالمي للعنوان (لمعان + طفو + دخول)");
console.log("  • أُزيل أنيميشن نبض الهلال في البطاقات");
console.log("  • اليوم 30 = بدر كامل (100% إضاءة)");
console.log("  • هلال البطاقات ثابت ومستقر");