const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 تفعيل THAWRA — نسخة آمنة\n");

// ============================================================
// 1) style.css — احذف فقط rc-label (لا تلمس الباقي)
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف فقط تعريفات .rc-label
css = css.replace(/\.rc-label\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.rc-label\s*\{[^}]*\}\s*\}/g, "");

// احذف فقط rc-typewriter القديم (لنعيده)
css = css.replace(/\.rc-typewriter\s*\{[^}]*\}/g, "");

// احذف @keyframes المكررة (سنعيدها)
css = css.replace(/@keyframes\s+labelShine\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+typewriter\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+cursorBlink\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonFast\s*\{[\s\S]*?\n\}/g, "");

// ⚠️ لا نلمس: rc-timer, rc-part, rc-num, rc-unit, rc-sep

// أضف التعريفات الجديدة في النهاية
css += `

/* ============================================================
   THAWRA-SAFE — تنسيقات جديدة (لا تلمس القديمة)
   ============================================================ */

/* ===== الخط الفخم ===== */
.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",serif !important;
  font-size:28px !important;
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.5 !important;
  padding:10px 16px !important;
  background:linear-gradient(
    110deg,
    #2a5f5a 0%,
    #4a7d78 25%,
    #c8d4cf 45%,
    #ffffff 50%,
    #c8d4cf 55%,
    #4a7d78 75%,
    #2a5f5a 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:drop-shadow(0 2px 8px rgba(42,95,90,.4)) !important;
  animation:labelShine 6s ease-in-out infinite !important;
  text-align:center !important;
  margin-bottom:18px !important;
  display:block !important;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

/* ===== Typewriter ===== */
.rc-typewriter{
  display:inline-block !important;
  overflow:hidden !important;
  white-space:nowrap !important;
  border-right:3px solid #c8d4cf !important;
  animation:
    typewriter 3s steps(22, end) 0.5s 1 normal both,
    cursorBlink 0.8s step-end infinite !important;
  vertical-align:bottom !important;
  padding-right:4px !important;
  direction:rtl !important;
}

@keyframes typewriter{
  0%   {width:0}
  100% {width:100%}
}

@keyframes cursorBlink{
  0%,100%{border-right-color:#c8d4cf}
  50%    {border-right-color:transparent}
}

/* ===== الهلال أسرع + نجوم ===== */
.date-moon{
  animation:moonFast 2.5s cubic-bezier(.45,0,.55,1) infinite !important;
  position:relative !important;
}

@keyframes moonFast{
  0%,100%{transform:translateY(0) scale(1)}
  50%    {transform:translateY(-7px) scale(1.06)}
}

.date-moon::before,
.date-moon::after{
  content:"";
  position:absolute;
  width:3px;
  height:3px;
  border-radius:50%;
  background:#ffffff;
  box-shadow:0 0 5px rgba(255,255,255,1),
             0 0 10px rgba(255,255,255,.7);
  pointer-events:none;
}

.date-moon::before{
  top:10%;
  right:15%;
  animation:miniStar 1.8s ease-in-out infinite;
}

.date-moon::after{
  bottom:20%;
  left:20%;
  animation:miniStar 1.8s ease-in-out 0.9s infinite;
}

@keyframes miniStar{
  0%,100%{opacity:.15;transform:scale(.6)}
  50%    {opacity:1;transform:scale(1.5)}
}

@media (max-width: 600px){
  .rc-label{
    font-size:24px !important;
    padding:8px 12px !important;
  }
  .rc-typewriter{
    border-right-width:2px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: حُذفت rc-label فقط (الباقي سليم)");
console.log("✓ style.css: THAWRA-SAFE مضاف");

// ============================================================
// 2) app.js — قسر inline (نفس النسخة السابقة)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(/\/\* FORCE-THAWRA-JS \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* FORCE-THAWRA-JS */
(function forceThawra(){
  function apply(){
    var label = document.querySelector(".rc-label");
    if (label && !label.dataset.thawraForced) {
      label.dataset.thawraForced = "1";
      label.style.cssText = 
        "font-family:'Reem Kufi','Aref Ruqaa','Amiri',serif;" +
        "font-size:28px;" +
        "font-weight:900;" +
        "letter-spacing:0.5px;" +
        "line-height:1.5;" +
        "padding:10px 16px;" +
        "background:linear-gradient(110deg,#2a5f5a 0%,#4a7d78 25%,#c8d4cf 45%,#ffffff 50%,#c8d4cf 55%,#4a7d78 75%,#2a5f5a 100%);" +
        "background-size:300% 100%;" +
        "-webkit-background-clip:text;" +
        "background-clip:text;" +
        "-webkit-text-fill-color:transparent;" +
        "color:transparent;" +
        "text-align:center;" +
        "margin-bottom:18px;" +
        "display:block;" +
        "animation:labelShine 6s ease-in-out infinite;";
    }

    var tw = document.querySelector(".rc-typewriter");
    if (tw && !tw.dataset.thawraForced) {
      tw.dataset.thawraForced = "1";
      tw.style.cssText =
        "display:inline-block;" +
        "overflow:hidden;" +
        "white-space:nowrap;" +
        "border-right:3px solid #c8d4cf;" +
        "animation:typewriter 3s steps(22, end) 0.5s 1 normal both, cursorBlink 0.8s step-end infinite;" +
        "vertical-align:bottom;" +
        "padding-right:4px;" +
        "direction:rtl;";
    }

    var moons = document.querySelectorAll(".date-moon");
    moons.forEach(function(m){
      if (m.dataset.thawraForced) return;
      m.dataset.thawraForced = "1";
      m.style.position = "relative";
      m.style.animation = "moonFast 2.5s cubic-bezier(.45,0,.55,1) infinite";
    });
  }

  function start(){
    setTimeout(apply, 500);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: FORCE-THAWRA-JS مضاف");

console.log("\\n✅ الحل الآمن:");
console.log("  • حُذف rc-label فقط");
console.log("  • ✅ rc-timer, rc-part, rc-num, rc-unit, rc-sep محفوظة");
console.log("  • ✅ الهلال والبطاقات محفوظة");
console.log("  • ✅ كل الميزات الأخرى سليمة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");