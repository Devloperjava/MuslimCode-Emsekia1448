const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 إصلاح العداد في الوضع الليلي\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COUNTER-DARK-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COUNTER-DARK-FIX — العداد واضح في الوضع الليلي
   ============================================================ */

body.dark-mode .rc-part{
  background:linear-gradient(145deg,
    rgba(200,212,207,.18),
    rgba(232,240,238,.08)) !important;
  border:1.5px solid rgba(200,212,207,.4) !important;
  box-shadow:
    0 4px 12px rgba(0,0,0,.5),
    inset 0 1px 0 rgba(255,255,255,.15),
    0 0 20px rgba(200,212,207,.1) !important;
  padding:12px 10px !important;
}

body.dark-mode .rc-num{
  color:#ffffff !important;
  -webkit-text-fill-color:#ffffff !important;
  text-shadow:
    0 0 10px rgba(255,255,255,.9),
    0 0 20px rgba(232,240,238,.7),
    0 0 35px rgba(200,212,207,.5),
    0 0 50px rgba(200,212,207,.3) !important;
  font-weight:900 !important;
  letter-spacing:1px !important;
}

body.dark-mode .rc-unit{
  color:#e8f0ee !important;
  -webkit-text-fill-color:#e8f0ee !important;
  text-shadow:
    0 0 6px rgba(232,240,238,.6),
    0 0 12px rgba(200,212,207,.4) !important;
  font-weight:700 !important;
}

body.dark-mode .rc-sep{
  color:#f5d76e !important;
  -webkit-text-fill-color:#f5d76e !important;
  text-shadow:
    0 0 8px rgba(245,215,110,.8),
    0 0 16px rgba(245,215,110,.5) !important;
  font-weight:700 !important;
}

body.dark-mode .rc-label{
  filter:
    drop-shadow(0 0 15px rgba(200,212,207,.5))
    drop-shadow(0 0 30px rgba(232,240,238,.3)) !important;
}

body.dark-mode .rc-typewriter{
  background:linear-gradient(
    110deg,
    #c8d4cf 0%,
    #e8f0ee 25%,
    #ffffff 45%,
    #ffffff 55%,
    #e8f0ee 75%,
    #c8d4cf 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:
    drop-shadow(0 0 12px rgba(232,240,238,.8))
    drop-shadow(0 0 25px rgba(200,212,207,.5)) !important;
}

body.dark-mode .ramadan-counter{
  background:linear-gradient(145deg,#0a1a2e,#050d1a) !important;
  border:1px solid rgba(200,212,207,.25) !important;
  box-shadow:
    0 20px 50px rgba(0,0,0,.7),
    0 0 40px rgba(200,212,207,.15),
    inset 0 1px 0 rgba(255,255,255,.05) !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COUNTER-DARK-FIX مضاف");
console.log("  • 📊 المربعات: حدود فضية");
console.log("  • 🔢 الأرقام: بيضاء + توهج");
console.log("  • 📝 التسميات: فضي");
console.log("  • : الفواصل: ذهبية");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");