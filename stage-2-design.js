const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 المرحلة 2: المسجد + الخط + النجوم + العنوان\n");

// ============================================================
// 1) index.html — إضافة خطوط فخمة
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// استبدل رابط الخطوط — أضف Cairo + Tajawal + Almarai
const oldFonts = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Amiri[^"]*"[^>]*>/;
const newFonts = '<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@600;700;800;900&family=Tajawal:wght@500;700;800;900&family=Almarai:wght@700;800&display=swap" rel="stylesheet">';

if (html.match(oldFonts)) {
  html = html.replace(oldFonts, newFonts);
} else if (!html.includes("Cairo")) {
  html = html.replace(
    "</head>",
    '  ' + newFonts + '\n</head>'
  );
}

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: خطوط Cairo + Tajawal + Almarai مضافة");

// ============================================================
// 2) style.css — كل تعديلات المرحلة 2
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المسجد القديمة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف تعريفات النجوم القديمة
css = css.replace(/\.star\s*\{[^}]*\}/g, "");
css = css.replace(/\.star-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+star[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريفات العنوان القديمة
css = css.replace(/\.title-overlay\s*\{[^}]*\}/g, "");
css = css.replace(/\.title-overlay\s+h1\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+title[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   STAGE-2-DESIGN — المسجد + الخط + النجوم + العنوان
   ============================================================ */

/* ===== 1) المسجد — أكبر عرضاً + أفقياً ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:70vh;
  min-height:460px;
  max-height:620px;
  z-index:5;
  pointer-events:none;
  overflow:visible;
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
  overflow:visible;
}

/* ===== 2) الخط العربي الفخم ===== */
body, .app, .countdown, .calendar-section{
  font-family:"Cairo","Tajawal","Amiri",sans-serif !important;
}

/* العنوان الرئيسي */
.title-overlay h1{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-weight:800 !important;
  letter-spacing:0 !important;
}

/* أسماء الصلوات */
.prayer strong{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:800 !important;
}

/* المواقيت — Tajawal (واضح جداً) */
.prayer span{
  font-family:"Tajawal","Cairo",sans-serif !important;
  font-weight:800 !important;
  font-variant-numeric:tabular-nums !important;
}

/* التواريخ */
.date-label{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-weight:800 !important;
}

.date-gregorian{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:750 !important;
}

/* العداد */
.rc-num{
  font-family:"Tajawal","Cairo",sans-serif !important;
  font-weight:900 !important;
}

.rc-unit{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:700 !important;
}

.rc-label{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-weight:800 !important;
}

/* عناوين الأقسام */
.calendar-section h2{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-weight:800 !important;
  font-size:clamp(20px, 5vw, 26px) !important;
}

/* ToolTip */
.tooltip-text{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:700 !important;
}

/* ===== 3) النجوم — ناعمة (بطيئة) ===== */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle, #ffffff, rgba(255,255,255,.4) 60%, transparent 70%);
  animation:starSoft 7s cubic-bezier(.45,0,.55,1) infinite;
  will-change:opacity, transform;
}

.star-sm{width:2px;height:2px}
.star-md{width:3px;height:3px;box-shadow:0 0 4px rgba(255,255,255,.6)}
.star-lg{width:4px;height:4px;box-shadow:0 0 8px rgba(255,255,255,.8), 0 0 14px rgba(255,255,255,.4)}

@keyframes starSoft{
  0%,100%{
    opacity:.2;
    transform:scale(.9);
  }
  50%{
    opacity:.85;
    transform:scale(1.15);
  }
}

/* ===== 4) العنوان يتحرك بنعومة فائقة ===== */
.title-overlay{
  position:absolute;
  top:22%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align:center;
  color:#fff;
  z-index:6;
  width:90%;
  max-width:600px;
  pointer-events:none;
}

.title-overlay h1{
  font-size:clamp(32px, 7vw, 58px);
  background:linear-gradient(
    110deg,
    #fff4c8 0%,
    #f5d76e 25%,
    #ffffff 45%,
    #f5d76e 55%,
    #c9a227 75%,
    #fff4c8 100%
  );
  background-size:300% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 4px 20px rgba(0,0,0,.75))
         drop-shadow(0 0 40px rgba(201,162,39,.4));
  animation:titleFlow 10s cubic-bezier(.45,0,.55,1) infinite,
             titleBreath 7s cubic-bezier(.45,0,.55,1) infinite;
  will-change:background-position, transform, filter;
}

@keyframes titleFlow{
  0%,100%{background-position:200% 0}
  50%    {background-position:-50% 0}
}

@keyframes titleBreath{
  0%,100%{
    transform:translateY(0) scale(1);
    filter:drop-shadow(0 4px 20px rgba(0,0,0,.75))
           drop-shadow(0 0 40px rgba(201,162,39,.4));
  }
  50%{
    transform:translateY(-6px) scale(1.015);
    filter:drop-shadow(0 5px 25px rgba(0,0,0,.8))
           drop-shadow(0 0 55px rgba(201,162,39,.6));
  }
}

/* ===== استجابة للشاشات الصغيرة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:66vh;
    min-height:420px;
    max-height:560px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:62vh;
    min-height:360px;
    max-height:500px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مسجد 70vh + خطوط فخمة + نجوم ناعمة + عنوان متحرك");

console.log("\\n✅ المرحلة 2 مكتملة!");
console.log("  • 🕌 المسجد: 70vh (من 68vh)");
console.log("  • ✍️ خطوط: Cairo + Tajawal + Aref Ruqaa + Amiri");
console.log("  • ⭐ النجوم: 7s (ناعمة جداً)");
console.log("  • 📝 العنوان: تدفق + تنفس ناعم (10s + 7s)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");