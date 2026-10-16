const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔇 إزالة الصوت + تفعيل THAWRA\n");

// ============================================================
// 1) app.js — استبدال ramadan-thawra بنسخة بدون صوت
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف RAMADAN-THAWRA القديم
app = app.replace(/\/\* RAMADAN-THAWRA \*\/[\s\S]*?(?=\/\*|$)/g, "");

// احذف FORCE-THAWRA-JS القديم
app = app.replace(/\/\* FORCE-THAWRA-JS \*\/[\s\S]*?(?=\/\*|$)/g, "");

// أضف النسخة الجديدة — بدون صوت
app += `

/* THAWRA-FINAL — بدون صوت */
(function thawraFinal(){
  // ===== قسر تنسيق rc-label + typewriter =====
  function applyLabel(){
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

    // الهلال أسرع + نجوم
    var moons = document.querySelectorAll(".date-moon");
    moons.forEach(function(m){
      if (m.dataset.thawraForced) return;
      m.dataset.thawraForced = "1";
      m.style.position = "relative";
      m.style.animation = "moonFast 2.5s cubic-bezier(.45,0,.55,1) infinite";
    });
  }

  // ===== إشعار الإفطار (بدون صوت) =====
  function showIftarToast(){
    var existing = document.querySelector(".iftar-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "iftar-toast";
    toast.innerHTML =
      '<span class="iftar-icon">🌅</span>' +
      '<div class="iftar-text">' +
        'نتمنى لكم صوماً مقبولاً وإفطاراً شهياً' +
      '</div>';
    document.body.appendChild(toast);

    setTimeout(function(){ toast.classList.add("show"); }, 100);
    setTimeout(function(){
      toast.classList.remove("show");
      setTimeout(function(){ toast.remove(); }, 600);
    }, 8000);
  }

  // ===== فحص وقت الإفطار =====
  var lastFired = {};

  function checkIftarTime(){
    if (typeof DATA === "undefined" || !DATA || !DATA.days) return;

    var now = new Date();
    var todayStr = now.getFullYear() + "-" +
                   String(now.getMonth() + 1).padStart(2, "0") + "-" +
                   String(now.getDate()).padStart(2, "0");
    var today = DATA.days.find(function(d){ return d.date === todayStr; });
    if (!today) return;

    var t = today.timings.Maghrib;
    if (!t) return;

    var clean = t.replace(/\\s*(ص|م)\\s*$/, "").trim();
    var isPM = /م\\s*$/.test(t);
    var parts = clean.split(":");
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    if (isPM && h < 12) h += 12;
    if (!isPM && h === 12) h = 0;

    var maghribTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    var diff = now - maghribTime;

    var key = today.date + ":iftar";
    if (diff >= 0 && diff < 60000 && !lastFired[key]) {
      lastFired[key] = true;
      showIftarToast();
    }
  }

  function start(){
    applyLabel();
    setTimeout(applyLabel, 1000);
    setTimeout(applyLabel, 2500);
    setInterval(checkIftarTime, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: THAWRA-FINAL (بدون صوت)");

// ============================================================
// 2) index.html — إزالة زر الصوت
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

html = html.replace(/<!-- AUDIO-BTN -->[\s\S]*?<!-- \/AUDIO-BTN -->\s*/g, "");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حُذف زر الصوت");

// ============================================================
// 3) style.css — حذف زر الصوت + تطبيق THAWRA
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// حذف تنسيق زر الصوت
css = css.replace(/\.audio-enable\s*\{[^}]*\}/g, "");
css = css.replace(/\.audio-enable:[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/\.audio-icon\s*\{[^}]*\}/g, "");
css = css.replace(/\.audio-text\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+pulseIcon\s*\{[\s\S]*?\n\}/g, "");

// احذف التعريفات القديمة لـ rc-label
css = css.replace(/\.rc-label\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.rc-label\s*\{[^}]*\}\s*\}/g, "");

// احذف THAWRA القديم
css = css.replace(/\/\* =+\s*\n\s*THAWRA[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");
css = css.replace(/\/\* =+\s*\n\s*THAWRA-FORCE[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   THAWRA-FINAL — التنسيقات النهائية
   ============================================================ */

.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",serif !important;
  font-size:28px !important;
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.5 !important;
  padding:10px 16px !important;
  background:linear-gradient(110deg,#2a5f5a 0%,#4a7d78 25%,#c8d4cf 45%,#ffffff 50%,#c8d4cf 55%,#4a7d78 75%,#2a5f5a 100%) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  text-align:center !important;
  margin-bottom:18px !important;
  display:block !important;
  animation:labelShine 6s ease-in-out infinite !important;
  filter:drop-shadow(0 2px 8px rgba(42,95,90,.4)) !important;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

.rc-typewriter{
  display:inline-block !important;
  overflow:hidden !important;
  white-space:nowrap !important;
  border-right:3px solid #c8d4cf !important;
  animation:typewriter 3s steps(22, end) 0.5s 1 normal both,
            cursorBlink 0.8s step-end infinite !important;
  vertical-align:bottom !important;
  padding-right:4px !important;
  direction:rtl !important;
}

@keyframes typewriter{
  0%{width:0}
  100%{width:100%}
}

@keyframes cursorBlink{
  0%,100%{border-right-color:#c8d4cf}
  50%    {border-right-color:transparent}
}

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

.iftar-toast{
  position:fixed;
  top:20px;
  left:50%;
  transform:translateX(-50%) translateY(-30px);
  z-index:99999;
  padding:16px 24px;
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  border-radius:18px;
  border:1px solid rgba(42,95,90,.6);
  box-shadow:0 20px 50px rgba(7,35,23,.5);
  font-family:"Cairo","Tajawal",sans-serif;
  font-size:16px;
  font-weight:700;
  text-align:center;
  max-width:420px;
  opacity:0;
  transition:opacity .5s ease, transform .5s ease;
  pointer-events:none;
}

.iftar-toast.show{
  opacity:1;
  transform:translateX(-50%) translateY(0);
}

.iftar-toast .iftar-icon{
  font-size:24px;
  display:block;
  margin-bottom:6px;
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
console.log("✓ style.css: THAWRA-FINAL (بدون صوت)");

console.log("\\n✅ الحل:");
console.log("  • ⚡ الهلال 2.5s");
console.log("  • ✍️ الخط: بترولي-فضي");
console.log("  • ⌨️ Typewriter");
console.log("  • ⭐ نجوم حول الهلال");
console.log("  • 🌅 إشعار إفطار (بدون صوت)");
console.log("  • 🚫 لا صوت (لاحقاً)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");