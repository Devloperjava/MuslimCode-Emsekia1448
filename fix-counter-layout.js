const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 إصلاح تنسيق العداد — مربعات متناسقة\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COUNTER-LAYOUT[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COUNTER-LAYOUT — مربعات متناسقة
   (لا يمس أي شيء آخر)
   ============================================================ */

/* ===== الحاوية ===== */
.ramadan-counter{
  max-width:600px !important;
  padding:20px 16px !important;
  margin:20px auto !important;
}

.rc-timer{
  display:flex !important;
  justify-content:center !important;
  align-items:center !important;
  gap:6px !important;
  direction:ltr !important;
}

/* ===== المربعات — متساوية ===== */
.rc-part{
  width:64px !important;
  height:64px !important;
  min-width:64px !important;
  max-width:64px !important;
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  justify-content:center !important;
  padding:6px 4px !important;
  box-sizing:border-box !important;
  border-radius:12px !important;
  background:linear-gradient(145deg,
    rgba(74,154,146,.25),
    rgba(42,95,90,.15)) !important;
  border:1px solid rgba(74,154,146,.5) !important;
  box-shadow:
    0 3px 10px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(126,201,192,.2) !important;
}

/* ===== الأرقام ===== */
.rc-num{
  color:#7ec9c0 !important;
  -webkit-text-fill-color:#7ec9c0 !important;
  font-size:22px !important;
  font-weight:900 !important;
  line-height:1 !important;
  text-shadow:
    0 0 8px rgba(126,201,192,.7),
    0 0 16px rgba(74,154,146,.4) !important;
}

/* ===== التسميات ===== */
.rc-unit{
  color:#4a9a92 !important;
  font-size:10px !important;
  font-weight:700 !important;
  margin-top:4px !important;
  line-height:1 !important;
}

/* ===== الفواصل ===== */
.rc-sep{
  color:#7ec9c0 !important;
  font-size:18px !important;
  font-weight:700 !important;
  margin-top:-2px !important;
  opacity:0.7 !important;
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .rc-part{
    width:56px !important;
    height:56px !important;
    min-width:56px !important;
    max-width:56px !important;
  }
  .rc-num{
    font-size:20px !important;
  }
  .rc-unit{
    font-size:9px !important;
  }
  .rc-sep{
    font-size:16px !important;
  }
}

@media (max-width: 380px){
  .rc-part{
    width:50px !important;
    height:50px !important;
    min-width:50px !important;
    max-width:50px !important;
  }
  .rc-num{
    font-size:18px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COUNTER-LAYOUT مضاف");
console.log("  • 🔲 المربعات: 64×64 (متساوية)");
console.log("  • 📏 الأرقام: 22px");
console.log("  • 📝 التسميات: 10px");
console.log("  • 🎨 الألوان: بترولي (كما هي)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");