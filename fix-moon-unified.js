const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 توحيد الهلال + مسجد أكبر\n");

// ============================================================
// 1) app.js — moonCardSVG مطابق للرئيسي + إصلاح moonBody
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف تعريف moonCardSVG القديم
app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // نسخة طبق الأصل من هلال الصفحة الرئيسية
  return '<svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<radialGradient id="mcg' + day + '" cx="35%" cy="35%" r="75%">' +
        '<stop offset="0%" stop-color="#fffbe6"/>' +
        '<stop offset="55%" stop-color="#f5e2a0"/>' +
        '<stop offset="100%" stop-color="#c9a227"/>' +
      '</radialGradient>' +
      '<radialGradient id="mhg' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(255,235,150,0.5)"/>' +
        '<stop offset="70%" stop-color="rgba(255,235,150,0.15)"/>' +
        '<stop offset="100%" stop-color="rgba(255,235,150,0)"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<circle cx="50" cy="50" r="48" fill="url(#mhg' + day + ')"/>' +
    '<circle cx="50" cy="50" r="30" fill="url(#mcg' + day + ')"/>' +
    '<circle cx="62" cy="46" r="26" fill="#0a1725"/>' +
    '<circle cx="30" cy="36" r="1.5" fill="#fff8d6" opacity="0.9"/>' +
    '<circle cx="38" cy="68" r="1.2" fill="#fff8d6" opacity="0.7"/>' +
  '</svg>';
}`
);

// أضف دالة moonBodySVG (للهلال الرئيسي)
if (!app.includes("function moonBodySVG")) {
  app = app.replace(
    /function safeMoon\(day, size\)\s*\{[\s\S]*?\n\}/,
    `function safeMoon(day, size) {
  if (typeof window.MoonPhase === "undefined") {
    // استخدام moonCardSVG كـ fallback
    var svg = moonCardSVG(day);
    return svg.replace('width="70"', 'width="' + size + '"')
              .replace('height="70"', 'height="' + size + '"');
  }
  try {
    return window.MoonPhase.render(day, size);
  } catch (e) {
    return "";
  }
}`
  );
}

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: moonCardSVG مطابق للرئيسي (هالة + تدرج)");

// ============================================================
// 2) style.css — مسجد 58vh (زيادة آمنة بدون slice)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف تعريفات date-moon
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");

css += `

/* ============================================================
   MOON-UNIFIED — هلال موحّد + مسجد 58vh (آمن)
   ============================================================ */

/* ===== 1) المسجد — 58vh (زيادة آمنة) ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:58vh;
  min-height:400px;
  max-height:520px;
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

/* ===== 2) هلال البطاقة — حجم ثابت ===== */
.date-moon{
  flex:0 0 70px;
  height:70px;
  display:grid;
  place-items:center;
  animation:moonSmoothCard 5s cubic-bezier(.45,0,.55,1) infinite;
  will-change:transform;
}

.date-moon svg{
  width:100%;
  height:100%;
  display:block;
}

@keyframes moonSmoothCard{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-5px)}
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:56vh;
    min-height:380px;
    max-height:500px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:54vh;
    min-height:340px;
    max-height:460px;
  }
  .date-moon{
    flex-basis:60px;
    height:60px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مسجد 58vh + هلال البطاقة موحّد");

console.log("\\n✅ الإصلاح مكتمل!");
console.log("  • 🌙 الهلال: نفس الشكل في البطاقات والرئيسي");
console.log("  • 🕌 المسجد: 58vh (زيادة آمنة)");
console.log("  • 🚫 لا slice (لا قص)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");