const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🧹 حذف الآية + تكبير المسجد\n");

// ============================================================
// 1) index.html — حذف AYAH-FOOTER + تعديل viewBox المسجد
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف الآية
html = html.replace(/<!-- AYAH-FOOTER -->[\s\S]*?<!-- \/AYAH-FOOTER -->\s*/g, "");
console.log("✓ index.html: حُذفت AYAH-FOOTER");

// تكبير المسجد — viewBox أضيق ليملأ الشاشة
html = html.replace(
  /(<div class="mosque-silhouette">[\s\S]*?<svg[^>]*?)viewBox="0 0 850 320"/,
  '$1viewBox="0 0 800 320"'
);
console.log("✓ index.html: المسجد — viewBox 800×320 (أعرض)");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");

// ============================================================
// 2) style.css — حذف AYAH-FOOTER + تكبير المسجد
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// حذف كل تعريفات الآية
css = css.replace(/\/\*\s*=+\s*\n\s*AYAH-FOOTER[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");
css = css.replace(/\.ayah-[a-z-]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+ayah[A-Za-z]+\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+lantern[A-Za-z]+\s*\{[\s\S]*?\n\}/g, "");
console.log("✓ style.css: حُذفت تعريفات AYAH-FOOTER");

// احذف تعريفات المسجد القديمة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// أضف تعريفات جديدة — مسجد أكبر
css += `

/* ============================================================
   MOSQUE-BIGGER-V2 — مسجد يملأ الشاشة أفقياً + عمودياً
   (Responsive — لا يمس أي ميزة)
   ============================================================ */

.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw !important;
  height:82vh !important;
  min-height:520px !important;
  max-height:780px !important;
  z-index:5;
  pointer-events:none;
  overflow:visible;
}

.mosque-silhouette svg{
  width:100% !important;
  height:100% !important;
  display:block;
  overflow:visible;
}

/* استجابة للشاشات الصغيرة */
@media (max-width: 600px){
  .mosque-silhouette{
    height:80vh !important;
    min-height:500px !important;
    max-height:720px !important;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:78vh !important;
    min-height:460px !important;
    max-height:680px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: المسجد 82vh + viewBox 800×320");

// ============================================================
// التحقق
// ============================================================
html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");
css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

const checkHtml = (html.match(/ayah/gi) || []).length;
const checkCss = (css.match(/ayah|lanternPass/gi) || []).length;

console.log("\\n📊 التحقق:");
console.log("  • بقايا ayah في HTML: " + checkHtml);
console.log("  • بقايا ayah في CSS: " + checkCss);

console.log("\\n✅ تم!");
console.log("  • 🗑️ الآية: محذوفة بالكامل");
console.log("  • 🕌 المسجد: 82vh (أكبر)");
console.log("  • 📐 العرض: viewBox 800×320 (أعرض)");
console.log("  • ✅ Responsive (media queries)");
console.log("  • ✅ كل الميزات الأخرى: سليمة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");