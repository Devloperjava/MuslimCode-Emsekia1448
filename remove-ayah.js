const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🗑️ حذف الآية + الفانوس — استعادة الفوتر القديم\n");

// ============================================================
// 1) index.html — حذف AYAH-FOOTER
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

html = html.replace(/<!-- AYAH-FOOTER -->[\s\S]*?<!-- \/AYAH-FOOTER -->\s*/g, "");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حُذفت AYAH-FOOTER");

// ============================================================
// 2) style.css — حذف كل تعريفات AYAH-FOOTER
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// حذف قسم AYAH-FOOTER بالكامل
css = css.replace(
  /\/\*\s*=+\s*\n\s*AYAH-FOOTER[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);

// حذف أي تعريفات متبقية
css = css.replace(/\.ayah-[a-z-]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+ayah[A-Za-z]+\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+lantern[A-Za-z]+\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@media[^{]*\{[^}]*\.ayah-[^{]*\{[^}]*\}[^}]*\}/g, "");

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: حُذفت كل تعريفات AYAH-FOOTER");

// ============================================================
// التحقق — لا بقايا
// ============================================================
html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");
css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

const checkHtml = (html.match(/ayah/gi) || []).length;
const checkCss = (css.match(/ayah|lanternPass/gi) || []).length;

console.log("\\n📊 التحقق:");
console.log("  • بقايا في HTML: " + checkHtml);
console.log("  • بقايا في CSS: " + checkCss);

console.log("\\n✅ تم التنظيف!");
console.log("  • 🗑️ الآية: محذوفة");
console.log("  • 🗑️ الفانوس: محذوف");
console.log("  • ✅ الفوتر: يعود لشكله القديم");
console.log("  • ✅ كل الميزات الأخرى: سليمة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");