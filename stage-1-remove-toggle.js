const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🗑️ المرحلة 1 — حذف Toggle + إصلاح العداد\n");

// ============================================================
// 1) index.html — حذف زر Toggle
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

html = html.replace(/<!-- THEME-TOGGLE -->[\s\S]*?<!-- \/THEME-TOGGLE -->\s*/g, "");
console.log("✓ index.html: زر Toggle محذوف");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");

// ============================================================
// 2) app.js — حذف DARK-MODE-FINAL (لا حاجة له بدون زر)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(/\/\* DARK-MODE-FINAL \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* DARK-TOGGLE-FIX \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* DARK-MODE-FIX \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* DARK-MODE \*\/[\s\S]*?(?=\/\*|$)/g, "");
console.log("✓ app.js: DARK-MODE محذوف");

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");

// ============================================================
// 3) style.css — حذف Theme Toggle + إبقاء الوضع الليلي (لون فقط)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف زر Toggle (CSS فقط)
css = css.replace(/\.theme-toggle\s*\{[^}]*\}/g, "");
css = css.replace(/\.theme-toggle:hover\s*\{[^}]*\}/g, "");
css = css.replace(/\.theme-toggle:active\s*\{[^}]*\}/g, "");
css = css.replace(/body\.dark-mode\s+\.theme-toggle\s*\{[^}]*\}/g, "");
css = css.replace(/\.theme-icon-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/body\.dark-mode\s+\.theme-icon-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.theme-toggle\s*\{[^}]*\}\s*\}/g, "");
console.log("✓ style.css: theme-toggle محذوف");

// نُبقي body.dark-mode — لكن نُطبّقها دائماً (لأننا نحذف التبديل)
// هذا يجعل التطبيق دائماً بالوضع الليلي
css = css.replace(/body\.dark-mode\s+/g, "body.always-dark ");

// لكن نُبقي على :root أو body عادي
// الآن نضيف class ثابت
css += `

/* ============================================================
   STAGE-1-FIX — العداد بحجم معقول + لون بترولي
   ============================================================ */

/* ===== العداد — حجم طبيعي ===== */
.ramadan-counter{
  max-width:600px !important;
  padding:22px 18px !important;
  margin:20px auto !important;
}

.rc-timer{
  display:flex !important;
  justify-content:center !important;
  align-items:center !important;
  gap:8px !important;
}

.rc-part{
  min-width:56px !important;
  max-width:70px !important;
  padding:10px 8px !important;
}

.rc-num{
  font-size:26px !important;
  line-height:1 !important;
}

.rc-unit{
  font-size:11px !important;
  margin-top:4px !important;
}

.rc-sep{
  font-size:22px !important;
}

/* ===== الوضع الداكن — ثابت (لا Toggle) ===== */
body.always-dark{
  background:#020608 !important;
}

body.always-dark .sky{
  background:
    radial-gradient(ellipse at 50% 0%, #0a1a2e 0%, #050d1a 50%, #020608 100%) !important;
}

body.always-dark .rc-part{
  background:linear-gradient(145deg,
    rgba(200,212,207,.18),
    rgba(232,240,238,.08)) !important;
  border:1.5px solid rgba(200,212,207,.4) !important;
  box-shadow:
    0 4px 12px rgba(0,0,0,.5),
    inset 0 1px 0 rgba(255,255,255,.15) !important;
}

body.always-dark .rc-num{
  color:#ffffff !important;
  -webkit-text-fill-color:#ffffff !important;
  text-shadow:
    0 0 10px rgba(255,255,255,.9),
    0 0 20px rgba(232,240,238,.7) !important;
}

body.always-dark .rc-unit{
  color:#e8f0ee !important;
}

body.always-dark .rc-sep{
  color:#f5d76e !important;
}

body.always-dark .day-card{
  background:linear-gradient(180deg, #0f2a24, #0a1f18) !important;
  border:1px solid rgba(200,212,207,.2) !important;
}

body.always-dark .date-label{
  color:#e8f0ee !important;
}

body.always-dark .date-gregorian{
  color:#c8d4cf !important;
}

body.always-dark .prayer{
  background:linear-gradient(145deg, #142e26, #0f2a20) !important;
  border:1px solid rgba(200,212,207,.2) !important;
}

body.always-dark .prayer strong{
  color:#c8d4cf !important;
}

body.always-dark .prayer span{
  color:#ffffff !important;
}

/* ===== رقم اليوم — كبير وواضح ===== */
.date-number{
  font-size:24px !important;
  font-weight:800 !important;
}

body.always-dark .date-number{
  background:linear-gradient(145deg, #2a5f5a, #1a3a2a) !important;
  color:#e8f0ee !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: theme-toggle محذوف + العداد مُصلح + الوضع الداكن ثابت");

// ============================================================
// 4) app.js — تفعيل always-dark دائم
// ============================================================
app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* ALWAYS-DARK \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* ALWAYS-DARK */
(function alwaysDark(){
  document.body.classList.add("always-dark");
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: always-dark مضاف");

console.log("\\n✅ المرحلة 1:");
console.log("  • 🗑️ زر Toggle: محذوف");
console.log("  • 🎨 الوضع الليلي: ثابت (دائماً داكن)");
console.log("  • ⏱️ العداد: حجم طبيعي (max 70px)");
console.log("  • 🔢 أرقام العداد: بيضاء متوهجة");
console.log("  • 🔢 رقم اليوم: 24px (كان 20)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");