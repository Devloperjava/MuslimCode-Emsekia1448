const fs = require("fs");
const path = require("path");

const CSS = path.join(__dirname, "web", "style.css");
let css = fs.readFileSync(CSS, "utf8");
const before = css.length;

console.log("🔧 إزالة قسم NO-ANIMATION المخرب...\n");

// 1) احذف قسم NO-ANIMATION بالكامل (مع تعليقه)
css = css.replace(
  /\/\*\s*=+\s*\n\s*NO-ANIMATION[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|\/\*\s*$|$)/g,
  ""
);

// 2) احذف أي قسم WHITE-MOON (فيه animation)
css = css.replace(
  /\/\*\s*=+\s*\n\s*WHITE-MOON[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/g,
  ""
);

// 3) احذف أي `animation: none !important` متبقٍ
css = css.replace(/animation:\s*none\s*!important;?/gi, "");

// 4) احذف `transition: none !important`
css = css.replace(/transition:\s*none\s*!important;?/gi, "");

// 5) احذف قواعد moon-wrap / moon-body / date-moon القديمة المكررة
// (نحتفظ فقط بقسم FINAL-ANIMATIONS الأخير)
const moonWrapRegex = /\.moon-wrap\s*\{[^}]*\}/g;
const moonBodyRegex = /\.moon-body\s*\{[^}]*\}/g;
const dateMoonRegex = /\.date-moon\s*\{[^}]*\}/g;

// نبحث عن آخر قسم FINAL-ANIMATIONS
const finalIdx = css.indexOf("FINAL-ANIMATIONS");
if (finalIdx > 0) {
  const head = css.substring(0, finalIdx);
  const tail = css.substring(finalIdx);

  // احذف التكرارات من الـ head
  const cleanHead = head
    .replace(moonWrapRegex, "")
    .replace(moonBodyRegex, "")
    .replace(dateMoonRegex, "");

  css = cleanHead + tail;
}

const after = css.length;
console.log("  حُذف: " + (before - after) + " حرف");
console.log("✓ style.css نظيف");

// 6) أضف قاعدة نهائية بضمان (!important) لتفعيل الأنيميشن
if (!css.includes("FORCE-ANIMATION")) {
  css += `

/* ============================================================
   FORCE-ANIMATION — تفعيل مضمون
   ============================================================ */

.moon-wrap{
  animation: moonFloat 8s ease-in-out infinite !important,
             moonDrift 25s ease-in-out infinite !important;
}

.moon-body{
  animation: moonTilt 10s ease-in-out infinite !important;
}

.moon-body svg{
  animation: moonPulse 4s ease-in-out infinite !important;
}

.star{
  animation: starTwinkle infinite ease-in-out !important;
}

.star-sm{animation-duration: 3s !important}
.star-md{animation-duration: 4s !important}
.star-lg{animation-duration: 2.5s !important}

.shooting-star{
  animation: shoot 1.6s cubic-bezier(.4,0,.6,1) forwards !important;
}

.rain-drop{
  animation: rainFall linear infinite !important;
}

.date-moon{
  animation: none !important;
}
`;
  fs.writeFileSync(CSS, css, "utf8");
  console.log("✓ FORCE-ANIMATION أُضيف");
}

console.log("\n✅ جاهز! أعد تشغيل السيرفر.");
console.log("  ثم Ctrl+Shift+R × 5");