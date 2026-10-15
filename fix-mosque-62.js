const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🕌 تكبير المسجد — 62vh + viewBox 850\n");

// ============================================================
// 1) index.html — viewBox 900×320 → 850×320
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

html = html.replace(
  /(<div class="mosque-silhouette">[\s\S]*?<svg[^>]*?)viewBox="0 0 900 320"/,
  '$1viewBox="0 0 850 320"'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: viewBox 850×320");

// ============================================================
// 2) style.css — height 62vh
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

css += `

/* MOSQUE-62 — مسجد أكبر */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:62vh;
  min-height:440px;
  max-height:560px;
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
    height:60vh;
    min-height:420px;
    max-height:540px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:58vh;
    min-height:380px;
    max-height:500px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: 62vh");

console.log("\\n✅ تكبير:");
console.log("  • 📐 viewBox: 850×320 (أضيق = أملأ)");
console.log("  • 📏 height: 62vh (من 58vh)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");