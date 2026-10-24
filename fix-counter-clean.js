const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

console.log("🔢 تنظيف العداد — بدون مربعات + أرقام أكبر\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COUNTER-CLEAN[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COUNTER-CLEAN — بدون مربعات + أرقام أكبر
   ============================================================ */

/* ===== إزالة المربعات نهائياً ===== */
.rc-part{
  background:transparent !important;
  border:none !important;
  box-shadow:none !important;
  padding:0 8px !important;
  min-width:60px !important;
  max-width:80px !important;
  width:auto !important;
  height:auto !important;
}

/* ===== الأرقام — تكبير +3px ===== */
.rc-num{
  color:#7ec9c0 !important;
  -webkit-text-fill-color:#7ec9c0 !important;
  font-size:25px !important;
  font-weight:900 !important;
  line-height:1 !important;
  text-shadow:
    0 0 8px rgba(126,201,192,.7),
    0 0 16px rgba(74,154,146,.4) !important;
}

/* ===== التسميات — كما هي ===== */
.rc-unit{
  color:#4a9a92 !important;
  font-size:11px !important;
  font-weight:700 !important;
  margin-top:4px !important;
  line-height:1 !important;
}

/* ===== الفواصل — كما هي ===== */
.rc-sep{
  color:#7ec9c0 !important;
  font-size:20px !important;
  font-weight:700 !important;
  margin-top:-2px !important;
  opacity:0.7 !important;
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .rc-part{
    min-width:52px !important;
    max-width:70px !important;
    padding:0 6px !important;
  }
  .rc-num{
    font-size:23px !important;
  }
  .rc-unit{
    font-size:10px !important;
  }
}

@media (max-width: 380px){
  .rc-part{
    min-width:46px !important;
    max-width:60px !important;
    padding:0 4px !important;
  }
  .rc-num{
    font-size:20px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COUNTER-CLEAN مضاف");
console.log("  • 🔲 المربعات: محذوفة (شفافة)");
console.log("  • 🔢 الأرقام: 25px (من 22px)");
console.log("  • : الفواصل: 20px");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");