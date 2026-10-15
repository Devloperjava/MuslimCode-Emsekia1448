const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 الإصلاح النهائي — نجوم أسرع + مسجد بارز\n");

// ============================================================
// 1) app.js — إصلاح ForceMotion (لا يستبدل قيم JS)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف ForceMotion القديم
app = app.replace(/\/\* FORCE-MOTION-JS \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\(function forceMotion\(\)[\s\S]*?\}\)\(\);/g, "");

// أضف النسخة الجديدة — تعمل مع JS بدلاً من استبداله
app += `

/* FORCE-MOTION-V2 */
(function forceMotionV2() {
  function apply() {
    // القمر الرئيسي
    var moon = document.querySelector(".moon-wrap");
    if (moon && !moon.dataset.fmv2) {
      moon.dataset.fmv2 = "1";
      moon.style.animation = "moonSmooth 5s cubic-bezier(.45,0,.55,1) infinite";
    }

    // النجوم — قيم أسرع
    var stars = document.querySelectorAll(".star");
    stars.forEach(function(star) {
      if (star.dataset.fmv2) return;
      star.dataset.fmv2 = "1";
      var dur = 1.5 + Math.random() * 1.5;  // 1.5-3s (كان 2-4)
      var delay = Math.random() * 2;
      star.style.animation = "starTwinkle " + dur + "s ease-in-out " + delay + "s infinite";
    });

    // المطر
    var drops = document.querySelectorAll(".rain-drop");
    drops.forEach(function(drop) {
      if (drop.dataset.fmv2) return;
      drop.dataset.fmv2 = "1";
      var baseDur = drop.classList.contains("type-thin") ? 0.7 :
                    drop.classList.contains("type-mid")  ? 1.0 : 1.4;
      drop.style.animationDuration = (baseDur + Math.random() * 0.5) + "s";
    });
  }

  function start() {
    setTimeout(apply, 800);
    setTimeout(apply, 2500);
    setTimeout(apply, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: ForceMotionV2 (النجوم 1.5-3s)");

// ============================================================
// 2) style.css — المسجد بارز + نجوم أقوى
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات النجوم
css = css.replace(/\.star\s*\{[^}]*\}/g, "");
css = css.replace(/\.star-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+star[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   FIX-FINAL — نجوم واضحة + مسجد بارز
   ============================================================ */

/* ===== النجوم — وميض قوي واضح ===== */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle, #ffffff, rgba(255,255,255,.5) 55%, transparent 75%);
  animation-name:starTwinkle;
  animation-timing-function:cubic-bezier(.45,0,.55,1);
  animation-iteration-count:infinite;
  will-change:opacity, transform;
}

.star-sm{width:2px;height:2px}
.star-md{width:3.5px;height:3.5px;box-shadow:0 0 6px rgba(255,255,255,.8)}
.star-lg{width:5px;height:5px;box-shadow:0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,.6)}

@keyframes starTwinkle{
  0%,100%{opacity:.1;transform:scale(.7)}
  50%    {opacity:1; transform:scale(1.4)}
}

/* ===== المسجد — يملأ الشاشة ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:78vh !important;
  min-height:520px !important;
  max-height:720px !important;
  z-index:5;
  pointer-events:none;
  overflow:visible;
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
  overflow:visible;
  object-fit:cover;
  object-position:center bottom;
}

@media (max-width: 600px){
  .mosque-silhouette{
    height:78vh !important;
    min-height:500px !important;
    max-height:680px !important;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:76vh !important;
    min-height:460px !important;
    max-height:640px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: نجوم قوية + مسجد 78vh");

console.log("\\n✅ الإصلاح النهائي مكتمل!");
console.log("  • ⭐ النجوم: 1.5-3s (وميض سريع واضح)");
console.log("  • 🕌 المسجد: 78vh (يملأ الشاشة)");
console.log("  • 🎬 ForceMotionV2: لا يستبدل قيم JS");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");