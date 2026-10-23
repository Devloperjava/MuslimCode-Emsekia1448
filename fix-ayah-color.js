const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 الآية — بترولي داكن موحّد\n");

// ============================================================
// style.css — استبدال التدرج بلون موحّد داكن
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريف ayah-v2-content القديم
css = css.replace(/\.ayah-v2-content\s*\{[^}]*\}/g, "");

// احذف @keyframes ayahShine
css = css.replace(/@keyframes\s+ayahShine\s*\{[\s\S]*?\n\}/g, "");

// أضف تعريف جديد — بترولي داكن موحّد
css += `

/* ============================================================
   AYAH-COLOR — بترولي داكن موحّد (تباين عالي)
   ============================================================ */

.ayah-v2-content{
  display:inline-block;
  padding:0 8px;
  color:#1a4d4a !important;
  -webkit-text-fill-color:#1a4d4a !important;
  background:none !important;
  font-weight:800 !important;
  filter:
    drop-shadow(0 2px 10px rgba(26,77,74,.35))
    drop-shadow(0 0 25px rgba(26,77,74,.15)) !important;
  text-shadow:
    0 1px 2px rgba(26,77,74,.15),
    0 0 30px rgba(26,77,74,.1) !important;
  animation:none !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: الآية — بترولي داكن (#1a4d4a)");

console.log("\\n✅ التصميم الجديد:");
console.log("  • 🎨 اللون: بترولي داكن #1a4d4a");
console.log("  • ✅ تباين عالي مع الخلفية البيضاء");
console.log("  • 📖 مقروء بوضوح");
console.log("  • ✨ توهج خفيف");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");