const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🕌 تكبير المسجد — 🅰️ + 🅱️\n");

// ============================================================
// 1) index.html — تعديل viewBox (يملأ العرض)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة على viewBox المسجد
// الـ viewBox الأصلي: "0 0 1000 320"
// الجديد: "0 0 900 320" ← أضيق → يملأ العرض
html = html.replace(
  /(<div class="mosque-silhouette">[\s\S]*?<svg[^>]*?)viewBox="0 0 1000 320"/,
  '$1viewBox="0 0 900 320"'
);

// تأكد من preserveAspectRatio = meet (لا slice)
html = html.replace(
  /(<div class="mosque-silhouette">[\s\S]*?<svg[^>]*?)preserveAspectRatio="[^"]*"/,
  '$1preserveAspectRatio="xMidYMax meet"'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: viewBox 900×320 (يملأ العرض)");

// ============================================================
// 2) style.css — height 58vh (تكبير الارتفاع)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المسجد القديمة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   MOSQUE-BIGGER — مسجد أكبر (عرض + ارتفاع)
   ============================================================ */

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
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: 58vh (من 48vh)");

console.log("\\n✅ الإصلاح:");
console.log("  • 📐 viewBox: 900×320 (من 1000×320)");
console.log("  • 📏 height: 58vh (من 48vh)");
console.log("  • 🎨 preserveAspectRatio: meet (آمن)");
console.log("  • 🚫 بدون slice");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");