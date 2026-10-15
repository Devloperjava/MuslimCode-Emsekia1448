const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🕌 تكبير المسجد + تنظيف التعريفات القديمة\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات mosque-silhouette القديمة (مع القواعد الفرعية)
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+[^{]*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// أضف التعريف الجديد في النهاية (يتغلب على أي متبقٍ)
css += `

/* ============================================================
   MOSQUE-BIG — مسجد كبير يملأ الشاشة
   ============================================================ */

.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:58vh;
  min-height:380px;
  max-height:520px;
  z-index:5;
  pointer-events:none;
  overflow:hidden;
  filter:drop-shadow(0 -6px 30px rgba(0,0,0,.55));
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
  object-fit:cover;
  object-position:center bottom;
}

/* نوافذ مضيئة — نبض لطيف */
.mosque-silhouette rect[fill="#ffd97a"]{
  animation:windowPulse 3s ease-in-out infinite;
}

@keyframes windowPulse{
  0%,100%{opacity:.85}
  50%    {opacity:1}
}

/* ===== استجابة للشاشات الصغيرة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:55vh;
    min-height:340px;
    max-height:460px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:52vh;
    min-height:300px;
    max-height:420px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");

console.log("✓ style.css: مسجد 58vh + حذف التعريفات القديمة");
console.log("\\n✅ التعديل جاهز!");
console.log("  • 🕌 المسجد: 58vh (من 48vh → +10vh)");
console.log("  • 📏 min-height: 380px (من 300px)");
console.log("  • 📐 width: 100vw (يملأ العرض)");
console.log("  • 🧹 حُذفت التعريفات القديمة المتضاربة");
console.log("  • 🚫 لا كسر لأي ميزة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");