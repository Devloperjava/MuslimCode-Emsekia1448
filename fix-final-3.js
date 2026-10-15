const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 إصلاح نهائي: خطوط + هلال + مسجد\n");

// ============================================================
// 1) index.html — خطوط إضافية فخمة (Reem Kufi + Lateef + Scheherazade)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف رابط الخطوط القديم
html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*>/g,
  ""
);

// أضف رابط محدّث — خطوط فخمة أكثر
const newFontsLink = '<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&family=Almarai:wght@400;700;800&family=Reem+Kufi:wght@400;600;700&family=Scheherazade+New:wght@400;700&display=swap" rel="stylesheet">';

html = html.replace("</head>", "  " + newFontsLink + "\n</head>");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: خطوط Google محدّثة (Reem Kufi + Scheherazade)");

// ============================================================
// 2) style.css — حذف تعريفات moonSmooth المكررة + إعادة موحّدة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات moonSmooth المكررة
css = css.replace(/@keyframes\s+moonSmooth\s*\{[^}]*\}/g, "");

// احذف كل تعريفات moon-wrap
css = css.replace(/\.moon-wrap\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-wrap:hover\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-wrap:active\s*\{[^}]*\}/g, "");

// احذف كل تعريفات moon-body
css = css.replace(/\.moon-body\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-body\s+svg\s*\{[^}]*\}/g, "");

// احذف تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   FINAL-FIX-3 — هلال موحّد + مسجد كامل + خطوط فخمة
   ============================================================ */

/* ===== 1) الهلال العلوي — نفس حركة البطاقات (5s) ===== */
.moon-wrap{
  position:absolute;
  top:55px;
  right:12%;
  width:100px;
  height:100px;
  z-index:6;
  pointer-events:none;
  animation:moonSmooth 5s cubic-bezier(.45,0,.55,1) infinite !important;
  will-change:transform;
}

.moon-body{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
}

.moon-body svg{
  width:100%;
  height:100%;
  display:block;
}

@keyframes moonSmooth{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-7px)}
}

/* ===== 2) المسجد — يملأ الشاشة ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw !important;
  height:78vh !important;
  min-height:520px !important;
  max-height:720px !important;
  z-index:5;
  pointer-events:none;
  overflow:hidden;
}

.mosque-silhouette svg{
  width:100% !important;
  height:100% !important;
  display:block;
  overflow:visible;
}

/* ===== 3) الخطوط الفخمة ===== */
body, .app, .calendar-section{
  font-family:"Cairo","Tajawal","Almarai",sans-serif !important;
}

.title-overlay h1{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",serif !important;
  font-weight:800 !important;
}

.date-label{
  font-family:"Aref Ruqaa","Scheherazade New","Amiri",serif !important;
  font-weight:800 !important;
}

.date-gregorian{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:750 !important;
}

.prayer strong{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-weight:800 !important;
}

.prayer span{
  font-family:"Tajawal","Cairo",sans-serif !important;
  font-weight:800 !important;
}

.rc-label{
  font-family:"Aref Ruqaa","Scheherazade New",serif !important;
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:78vh !important;
    min-height:500px !important;
    max-height:680px !important;
  }
  .moon-wrap{
    top:50px;
    right:10%;
    width:90px;
    height:90px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:76vh !important;
    min-height:460px !important;
    max-height:640px !important;
  }
  .moon-wrap{
    top:45px;
    width:80px;
    height:80px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: هلال موحّد + مسجد كامل + خطوط فخمة");

console.log("\\n✅ الإصلاح النهائي مكتمل!");
console.log("  • ✍️ الخطوط: Reem Kufi + Scheherazade + Cairo + Tajawal");
console.log("  • 🌙 الهلال: moonSmooth 5s (موحّد)");
console.log("  • 🕌 المسجد: 78vh + slice (يملأ)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");