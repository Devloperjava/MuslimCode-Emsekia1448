const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 هلال نصي — مضمون 100%\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 هلال نصي — مضمون 100%
  // الرمز ☪ (U+262A) = هلال ونجمة
  // أو 🌙 (U+1F319)
  return '<span class="moon-emoji">🌙</span>' +
         '<span class="moon-day-num">' + String(day).padStart(2, "0") + '</span>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: هلال نصي (🌙)");

// ============================================================
// style.css — تنسيق الرمز
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-emoji\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-day-num\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+moonSmoothCard\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   MOON-UNICODE — هلال نصي مضمون
   ============================================================ */

.date-moon{
  flex:0 0 70px;
  height:80px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:2px;
  animation:moonSmoothCard 5s cubic-bezier(.45,0,.55,1) infinite;
  will-change:transform;
}

.moon-emoji{
  font-size:44px;
  line-height:1;
  display:block;
  /* تحويل اللون إلى بترولي داكن (لأن الخلفية بيضاء) */
  filter:grayscale(100%) brightness(0.3) sepia(100%) hue-rotate(140deg) saturate(3) brightness(0.5);
  /* بديل: استخدام ظل ناعم */
  text-shadow:0 2px 6px rgba(26,58,74,0.4);
}

.moon-day-num{
  font-family:"Aref Ruqaa", Georgia, serif;
  font-size:15px;
  font-weight:800;
  color:#123b2a;
  letter-spacing:0.5px;
}

@keyframes moonSmoothCard{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-5px)}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: تنسيق الرمز (44px، بترولي)");

console.log("\\n✅ الحل النهائي:");
console.log("  • 🌙 رمز نصي — مضمون 100%");
console.log("  • 🎨 تحويل اللون إلى بترولي داكن");
console.log("  • 🔢 الرقم أسفل الهلال");
console.log("  • 🎬 حركة ناعمة (5s)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");