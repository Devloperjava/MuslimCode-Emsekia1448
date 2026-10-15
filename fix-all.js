const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
console.log("🔧 إصلاح شامل: توهج + إزالة MuslimCode من Splash...\n");

// ============================================================
// 1) style.css — إزالة كل التوهج من القمر
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات القمر القديمة
css = css.replace(/\.moon-wrap\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-body\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-body\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.day-card\.is-today\s+\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.day-card:hover\s+\.date-moon\s*\{[^}]*\}/g, "");

// أضف تعريفات نظيفة بدون توهج قوي
css += `

/* ============================================================
   CLEAN-MOON — قمر نظيف بدون توهج مشوّه
   ============================================================ */

.moon-wrap{
  position: absolute;
  top: 60px;
  right: 12%;
  width: 130px;
  height: 130px;
  z-index: 5;
  pointer-events: none;
  animation: moonFloat 8s ease-in-out infinite,
             moonDrift 25s ease-in-out infinite;
  will-change: transform;
  background: transparent !important;
  box-shadow: none !important;
}

.moon-body{
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  animation: moonTilt 10s ease-in-out infinite;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  filter: none !important;
  overflow: visible !important;
}

.moon-body svg{
  width: 100%;
  height: 100%;
  overflow: visible !important;
  /* توهج ناعم جداً من drop-shadow فقط */
  filter: drop-shadow(0 0 8px rgba(255,255,255,.6))
          drop-shadow(0 0 20px rgba(255,255,255,.3));
}

/* قمر البطاقات — بدون توهج */
.date-moon{
  flex: 0 0 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: transparent !important;
  filter: none !important;
}

.date-moon svg{
  width: 100%;
  height: 100%;
  overflow: visible !important;
  filter: drop-shadow(0 0 4px rgba(255,255,255,.5));
}

.day-card.is-today .date-moon svg{
  filter: drop-shadow(0 0 6px rgba(255,255,255,.7));
}

.day-card:hover .date-moon{
  transform: scale(1.05);
}

/* الأنيميشن */
@keyframes moonFloat{
  0%,100%{transform: translateY(0)}
  50%    {transform: translateY(-14px)}
}
@keyframes moonDrift{
  0%,100%{margin-right: 0}
  50%    {margin-right: -14px}
}
@keyframes moonTilt{
  0%,100%{transform: rotate(0deg) scale(1)}
  50%    {transform: rotate(0deg) scale(1.03)}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: القمر نظيف بدون توهج قوي");

// ============================================================
// 2) splash.html — إزالة MuslimCode
// ============================================================
let splash = fs.readFileSync(path.join(WEB, "splash.html"), "utf8");

// احذف قسم brand بالكامل من HTML
splash = splash.replace(/<div class="brand">MuslimCode<\/div>\s*/g, "");
splash = splash.replace(/<div class="divider"><\/div>\s*/g, "");

// احذف قواعد CSS الخاصة بالـ brand
splash = splash.replace(/\.brand\s*\{[^}]*\}/g, "");
splash = splash.replace(/@keyframes brandEnter\s*\{[\s\S]*?\n  \}/g, "");
splash = splash.replace(/@keyframes brandShimmer\s*\{[\s\S]*?\n  \}/g, "");
splash = splash.replace(/\.divider\s*\{[^}]*\}/g, "");
splash = splash.replace(/@keyframes dividerGrow\s*\{[\s\S]*?\n  \}/g, "");

fs.writeFileSync(path.join(WEB, "splash.html"), splash, "utf8");
console.log("✓ splash.html: أُزيل MuslimCode والخط الفاصل");

console.log("\n✅ تم!");
console.log("  • القمر: أبيض نظيف + توهج ناعم جداً");
console.log("  • Splash: هلال + 'إمساكية رمضان 1448' فقط");
console.log("\n📋 الآن:");
console.log("  npx cap sync && cd android && gradlew.bat assembleRelease && adb install -r app\\build\\outputs\\apk\\release\\app-release.apk");