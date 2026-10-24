const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

console.log("🔢 تكبير أرقام العداد إلى 28px\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COUNTER-28PX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COUNTER-28PX — أرقام العداد 28px
   ============================================================ */

.rc-num{
  font-size:28px !important;
}

/* استجابة للهاتف */
@media (max-width: 600px){
  .rc-num{
    font-size:26px !important;
  }
}

@media (max-width: 380px){
  .rc-num{
    font-size:22px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COUNTER-28PX مضاف");
console.log("  • 🔢 الأرقام: 28px (من 25px)");
console.log("  • 📱 استجابة للهاتف: 26px / 22px");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");