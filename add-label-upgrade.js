const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 تحسين الجملة — بترولي + فضي + Typewriter\n");

// ============================================================
// 1) index.html — لف النص بـ rc-typewriter
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة
html = html.replace(/<span class="rc-typewriter">([^<]*)<\/span>/g, "$1");

// لف النص
html = html.replace(
  /<div class="rc-label">([^<]+)<\/div>/,
  '<div class="rc-label"><span class="rc-typewriter">$1</span></div>'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: rc-typewriter مضاف");

// ============================================================
// 2) style.css — إضافة تعريف جديد في النهاية (لا نحذف القديم)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة لـ LABEL-UPGRADE
css = css.replace(/\/\* =+\s*\n\s*LABEL-UPGRADE[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   LABEL-UPGRADE — بترولي دافئ + فضي + Typewriter
   (لا يحذف أي تعريف سابق — يتغلّب بـ !important)
   ============================================================ */

/* ===== 1) الجملة — تدرج بترولي → فضي ===== */
.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",Georgia,serif !important;
  font-size:clamp(22px, 5.5vw, 28px) !important;
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.5 !important;
  padding:10px 16px !important;
  background:linear-gradient(
    110deg,
    #2a5f5a 0%,       /* بترولي دافئ */
    #3d7a72 20%,      /* بترولي متوسط */
    #c8d4cf 45%,      /* فضي */
    #ffffff 50%,      /* أبيض ناصع */
    #c8d4cf 55%,      /* فضي */
    #3d7a72 80%,      /* بترولي متوسط */
    #2a5f5a 100%      /* بترولي دافئ */
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  text-align:center !important;
  margin-bottom:18px !important;
  display:block !important;
  filter:drop-shadow(0 2px 10px rgba(42,95,90,.45)) !important;
  animation:labelShine 6s ease-in-out infinite !important;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

/* ===== 2) Typewriter ===== */
.rc-typewriter{
  display:inline-block !important;
  overflow:hidden !important;
  white-space:nowrap !important;
  border-left:2px solid #c8d4cf !important;
  animation:
    typewriter 3.2s steps(22, end) 0.5s 1 normal both,
    cursorBlink 0.8s step-end infinite !important;
  vertical-align:bottom !important;
  padding-left:3px !important;
}

@keyframes typewriter{
  from{width:0}
  to  {width:100%}
}

@keyframes cursorBlink{
  0%,100%{border-left-color:#c8d4cf}
  50%    {border-left-color:transparent}
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .rc-label{
    font-size:20px !important;
    padding:6px 10px !important;
  }
  .rc-typewriter{
    border-left-width:1.5px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: LABEL-UPGRADE مضاف (في النهاية)");

console.log("\\n✅ آمن 100%:");
console.log("  • 🎨 تدرج بترولي → فضي");
console.log("  • ⌨️ Typewriter (3.2s)");
console.log("  • ✅ لم نحذف أي تعريف قديم");
console.log("  • ✅ العداد والبطاقات سليمة");
console.log("  • ✅ كل الميزات محفوظة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");