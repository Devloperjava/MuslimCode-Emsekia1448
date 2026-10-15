const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 إصلاح فوري: slice → meet (استعادة المشهد)\n");

// ============================================================
// 1) index.html — slice → meet
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

html = html.replace(
  /preserveAspectRatio="xMidYMax slice"/g,
  'preserveAspectRatio="xMidYMax meet"'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: preserveAspectRatio → meet (استعادة)");

// ============================================================
// 2) style.css — مسجد بحجم مناسب (لا 78vh مفرط)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   REVERT — مسجد بحجم متناسق + استعادة المشهد
   ============================================================ */

.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:48vh;
  min-height:300px;
  max-height:420px;
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
    height:46vh;
    min-height:280px;
    max-height:400px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:44vh;
    min-height:260px;
    max-height:360px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مسجد 48vh (متناسق)");

console.log("\\n✅ تم!");
console.log("  • 🕌 المسجد: 48vh (من 78vh)");
console.log("  • 🎬 preserveAspectRatio: meet (استعادة)");
console.log("  • 🌙 الهلال + ⭐ النجوم + 🏮 الفانوس: تعود");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");