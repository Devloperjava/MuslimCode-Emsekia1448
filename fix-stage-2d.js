const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 الإصلاح الجذري: مسجد + إمساكية + نجوم + هلال\n");

// ============================================================
// 1) index.html — حذف "إمساكية الشهر كاملة"
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف الجملة (مع علامات h2)
html = html.replace(
  /<h2>إمساكية الشهر كاملة<\/h2>\s*/g,
  ""
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حُذفت 'إمساكية الشهر كاملة'");

// ============================================================
// 2) night-sky.js — تسريع النجوم (2-4s بدل 5-9s)
// ============================================================
let js = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");

js = js.replace(
  /star\.style\.animationDuration = \(5 \+ Math\.random\(\) \* 4\) \+ "s";/,
  'star.style.animationDuration = (2 + Math.random() * 2) + "s";'
);

fs.writeFileSync(path.join(WEB, "night-sky.js"), js, "utf8");
console.log("✓ night-sky.js: النجوم 2-4s (وميض أسرع)");

// ============================================================
// 3) style.css — كل الإصلاحات
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف تعريفات moon-wrap القديمة (كلها)
css = css.replace(/\.moon-wrap\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-wrap:hover\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-wrap:active\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-wrap\.clicked\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+moonFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonDrift\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonTilt\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonClick\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   FIX-STAGE-2D — الإصلاح الجذري النهائي
   ============================================================ */

/* ===== 1) المسجد — 78vh دائماً (لا media يقلّصه) ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:78vh !important;
  min-height:520px !important;
  max-height:720px !important;
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

/* ===== 2) الهلال العلوي — نفس حركة البطاقات (moonSmooth 5s) ===== */
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

/* ===== استجابة — لا تقلّص المسجد! ===== */
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
console.log("✓ style.css: مسجد 78vh + هلال moonSmooth + إزالة media المخرب");

console.log("\\n✅ الإصلاح الجذري مكتمل!");
console.log("  • 🕌 المسجد: 78vh (لا media يقلّصه)");
console.log("  • 🚫 حُذفت 'إمساكية الشهر كاملة'");
console.log("  • ⭐ النجوم: 2-4s (وميض أسرع)");
console.log("  • 🌙 الهلال: moonSmooth (نفس البطاقات)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  node --check web/night-sky.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");