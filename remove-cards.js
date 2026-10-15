const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🗑️ إزالة بطاقة ليلة القدر + بطاقة الأدعية\n");

// ============================================================
// 1) index.html — حذف البطاقتين
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف بطاقة الأدعية (مع التعليقات)
html = html.replace(/<!-- ADHKAR-CARD -->[\s\S]*?<!-- \/ADHKAR-CARD -->\s*/g, "");

// احذف بطاقة ليلة القدر (مع التعليقات)
html = html.replace(/<!-- QADR-CARD -->[\s\S]*?<!-- \/QADR-CARD -->\s*/g, "");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حُذفت البطاقتان");

// ============================================================
// 2) style.css — حذف تنسيقات البطاقتين
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف قسم ADHKAR-QADR بالكامل
css = css.replace(
  /\/\*\s*=+\s*\n\s*ADHKAR-QADR[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);

// احذف تعريفات adhkar و qadr المتبقية
css = css.replace(/\.adhkar-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/\.dhikr-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/\.qadr-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+(adhkar|qadr|dhikr)[A-Za-z]*\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@media[^{]*\{[^}]*\.(adhkar|qadr|dhikr)[^}]*\}[^}]*\}/g, "");

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: حُذفت التنسيقات");

// ============================================================
// التحقق — لا يوجد بقايا
// ============================================================
html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");
css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

const checkHtml = (html.match(/adhkar|qadr/gi) || []).length;
const checkCss = (css.match(/adhkar|qadr|dhikr/gi) || []).length;

console.log("\\n📊 التحقق:");
console.log("  • بقايا في HTML: " + checkHtml);
console.log("  • بقايا في CSS: " + checkCss);

console.log("\\n✅ تم!");
console.log("  • 🗑️ بطاقة الأدعية: محذوفة");
console.log("  • 🗑️ بطاقة ليلة القدر: محذوفة");
console.log("  • 🚫 باقي الميزات: لم تُلمس");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");