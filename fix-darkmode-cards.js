const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 إصلاح البطاقات في الوضع الليلي\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*DARK-CARDS-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   DARK-CARDS-FIX — البطاقات + الجملة في الليلي
   ============================================================ */

/* ===== 1) الجملة العلوية — فضي في الليلي ===== */
body.dark-mode .rc-typewriter{
  background:linear-gradient(
    110deg,
    #c8d4cf 0%,
    #7ec9c0 20%,
    #e8f0ee 45%,
    #ffffff 50%,
    #e8f0ee 55%,
    #7ec9c0 80%,
    #c8d4cf 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:
    drop-shadow(0 0 15px rgba(200,212,207,.7))
    drop-shadow(0 0 30px rgba(126,201,192,.4)) !important;
}

body.dark-mode .rc-cursor{
  background:#e8f0ee !important;
  box-shadow:
    0 0 10px rgba(232,240,238,1),
    0 0 20px rgba(232,240,238,.6) !important;
}

/* ===== 2) البطاقات الكبيرة — خلفية داكنة ===== */
body.dark-mode .day-card{
  background:linear-gradient(180deg, #0f2a24, #0a1f18) !important;
  border:1px solid rgba(200,212,207,.2) !important;
  box-shadow:
    0 8px 24px rgba(0,0,0,.5),
    inset 0 1px 0 rgba(255,255,255,.05) !important;
}

body.dark-mode .day-card.is-today{
  background:linear-gradient(180deg, #1a3528, #0f2a20) !important;
  border:2px solid rgba(245,215,110,.5) !important;
  box-shadow:
    0 12px 32px rgba(245,215,110,.2),
    inset 0 1px 0 rgba(255,255,255,.08) !important;
}

/* ===== 3) نص التاريخ في البطاقة — فضي ===== */
body.dark-mode .date-label{
  color:#e8f0ee !important;
  text-shadow:0 0 8px rgba(200,212,207,.4) !important;
}

body.dark-mode .date-gregorian{
  color:#c8d4cf !important;
}

/* ===== 4) المواقيت داخل البطاقة — داكنة ===== */
body.dark-mode .prayer{
  background:linear-gradient(145deg, #142e26, #0f2a20) !important;
  border:1px solid rgba(200,212,207,.2) !important;
  box-shadow:
    0 2px 8px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.04) !important;
}

body.dark-mode .prayer strong{
  color:#c8d4cf !important;
}

body.dark-mode .prayer span{
  color:#ffffff !important;
  text-shadow:0 0 8px rgba(232,240,238,.4) !important;
}

body.dark-mode .prayer.is-next{
  background:linear-gradient(145deg, #2a3a20, #1f2e18) !important;
  border-color:rgba(245,215,110,.6) !important;
  box-shadow:0 6px 18px rgba(245,215,110,.3) !important;
}

body.dark-mode .prayer.is-next strong{
  color:#fff4c8 !important;
}

body.dark-mode .prayer.is-next span{
  color:#fff4c8 !important;
}

/* ===== 5) رقم اليوم — فضي ===== */
body.dark-mode .date-number{
  background:linear-gradient(145deg, #2a5f5a, #1a3a2a) !important;
  color:#e8f0ee !important;
  box-shadow:0 4px 12px rgba(0,0,0,.5) !important;
}

body.dark-mode .day-card.is-today .date-number{
  background:linear-gradient(145deg, #f5d76e, #c9a227) !important;
  color:#0a1f18 !important;
}

/* ===== 6) الهلال في البطاقة — فضي ===== */
body.dark-mode .moon-emoji{
  filter:
    grayscale(100%)
    brightness(1.8)
    contrast(1.2)
    drop-shadow(0 0 8px rgba(232,240,238,.8)) !important;
}

/* ===== 7) الفوتر ===== */
body.dark-mode .site-footer{
  background:transparent !important;
}

body.dark-mode .brand-name{
  filter:
    drop-shadow(0 3px 12px rgba(200,212,207,.5))
    drop-shadow(0 0 24px rgba(126,201,192,.3))
    brightness(1.2) !important;
}

body.dark-mode .footer-line{
  background:linear-gradient(90deg, transparent, rgba(200,212,207,.7), transparent) !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: DARK-CARDS-FIX مضاف");
console.log("  • 🎨 البطاقات: خلفية داكنة #0f2a24");
console.log("  • 📊 المواقيت: خلفية داكنة");
console.log("  • ✍️ الجملة: تدرج فضي-بترولي");
console.log("  • 🌙 الهلال: فضي");
console.log("  • 🔢 رقم اليوم: فضي");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");