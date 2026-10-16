const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("⌨️ Typewriter JS + خط أكبر — بترولي/فضي\n");

// ============================================================
// 1) style.css — إزالة CSS animation، خط أكبر
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف CSS animation القديم (لا يمس العداد)
css = css.replace(/@keyframes\s+typewriter\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+cursorBlink\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريف .rc-typewriter القديم فقط
css = css.replace(/\.rc-typewriter\s*\{[^}]*\}/g, "");

// احذف media القديم
css = css.replace(/@media[^{]*\{\s*\.rc-typewriter\s*\{[^}]*\}\s*\}/g, "");

// أضف التعريفات الجديدة في النهاية
css += `

/* ============================================================
   TYPEWRITER-JS — JS يتحكم في النص
   ============================================================ */

/* ===== الجملة — أكبر + بترولي/فضي ===== */
.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",Georgia,serif !important;
  font-size:clamp(30px, 7vw, 38px) !important;
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.6 !important;
  padding:14px 20px !important;
  min-height:60px !important;
  text-align:center !important;
  margin-bottom:20px !important;
  display:block !important;
}

/* ===== Span — تدرج + مؤشر ===== */
.rc-typewriter{
  display:inline-block !important;
  background:linear-gradient(
    110deg,
    #2a5f5a 0%,
    #3d7a72 20%,
    #c8d4cf 45%,
    #ffffff 50%,
    #c8d4cf 55%,
    #3d7a72 80%,
    #2a5f5a 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:drop-shadow(0 2px 10px rgba(42,95,90,.5)) !important;
  animation:labelShine 6s ease-in-out infinite !important;
  will-change:contents !important;
  vertical-align:bottom !important;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

/* ===== المؤشر الوامض ===== */
.rc-cursor{
  display:inline-block !important;
  width:3px !important;
  height:1em !important;
  background:#c8d4cf !important;
  margin-right:4px !important;
  vertical-align:middle !important;
  animation:cursorBlink 0.8s step-end infinite !important;
  box-shadow:0 0 8px rgba(200,212,207,.8) !important;
}

@keyframes cursorBlink{
  0%,100%{opacity:1}
  50%    {opacity:0}
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .rc-label{
    font-size:clamp(26px, 6vw, 32px) !important;
    padding:10px 14px !important;
    min-height:50px !important;
  }
  .rc-cursor{
    width:2.5px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: خط أكبر + بترولي/فضي + مؤشر");

// ============================================================
// 2) index.html — إضافة مؤشر داخل span
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي مؤشر سابق
html = html.replace(/<span class="rc-cursor"><\/span>/g, "");

// أضف المؤشر قبل إغلاق rc-typewriter
html = html.replace(
  /<span class="rc-typewriter">([^<]*)<\/span>/,
  '<span class="rc-typewriter">$1</span><span class="rc-cursor"></span>'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: مؤشر مضاف");

// ============================================================
// 3) app.js — JS Typewriter Loop
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* TYPEWRITER-JS \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* TYPEWRITER-JS */
(function typewriterJS(){
  function start(){
    var el = document.querySelector(".rc-typewriter");
    if (!el) {
      setTimeout(start, 500);
      return;
    }

    var text = "متبقي على رمضان 1448";
    var i = 0;
    var direction = 1; // 1 = typing, -1 = deleting
    var pauseCounter = 0;
    var PAUSE_TICKS = 20; // 20 × 100ms = 2 seconds pause
    var TYPING_SPEED = 100; // ms per char

    function tick(){
      if (pauseCounter > 0) {
        pauseCounter--;
        return;
      }

      if (direction === 1) {
        // typing
        i++;
        el.textContent = text.substring(0, i);
        if (i >= text.length) {
          direction = -1;
          pauseCounter = PAUSE_TICKS;
        }
      } else {
        // deleting
        i--;
        el.textContent = text.substring(0, i);
        if (i <= 0) {
          direction = 1;
          pauseCounter = PAUSE_TICKS / 2;
        }
      }
    }

    setInterval(tick, TYPING_SPEED);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(start, 800);
    });
  } else {
    setTimeout(start, 800);
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: TYPEWRITER-JS مضاف (loop)");

console.log("\\n✅ الميزات:");
console.log("  • ✍️ يكتب حرفاً حرفاً (100ms)");
console.log("  • ⏸️ ينتظر 2 ثانية بعد اكتمال الجملة");
console.log("  • 🗑️ يمسح حرفاً حرفاً");
console.log("  • 🔄 يبدأ من جديد");
console.log("  • 📏 الخط أكبر (38px)");
console.log("  • 🎨 بترولي → فضي");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");