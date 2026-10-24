const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

console.log("🔢 تكبير أرقام العداد إلى 31px\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COUNTER-31PX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COUNTER-31PX — أرقام العداد 31px
   ============================================================ */

.rc-num{
  font-size:31px !important;
}

/* استجابة للهاتف */
@media (max-width: 600px){
  .rc-num{
    font-size:29px !important;
  }
}

@media (max-width: 380px){
  .rc-num{
    font-size:25px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COUNTER-31PX مضاف");
console.log("  • 🔢 الأرقام: 31px (من 28px)");
console.log("  • 📱 استجابة للهاتف: 29px / 25px");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");