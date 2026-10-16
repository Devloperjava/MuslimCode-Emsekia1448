const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("⚡ ثورة التطبيق — 5 ميزات\n");

// ============================================================
// 1) index.html — إضافة زر الصوت + تعديل الـ label
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة
html = html.replace(/<!-- AUDIO-BTN -->[\s\S]*?<!-- \/AUDIO-BTN -->/g, "");

// 1a) ضع typewriter placeholder
html = html.replace(
  /<div class="rc-label">متبقي على رمضان 1448<\/div>/,
  '<div class="rc-label"><span class="rc-typewriter">متبقي على رمضان 1448</span></div>'
);

// 1b) أضف زر تفعيل الصوت (قبل إغلاق main)
const audioBtn = `
    <!-- AUDIO-BTN -->
    <button class="audio-enable" id="audioEnableBtn" aria-label="تفعيل صوت مدفع الإفطار">
      <span class="audio-icon">🔊</span>
      <span class="audio-text">تفعيل صوت مدفع الإفطار</span>
    </button>
    <!-- /AUDIO-BTN -->
    `;

html = html.replace(/(<\/main>)/, audioBtn + "\n$1");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: typewriter + زر الصوت");

// ============================================================
// 2) style.css — كل التنسيقات
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*THAWRA[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   THAWRA — ثورة التطبيق
   ============================================================ */

/* ===== 1) خط "متبقي على رمضان 1448" — فخم + تدرج بترولي-فضي ===== */
.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",serif !important;
  font-size:clamp(22px, 5.5vw, 28px) !important;
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.4 !important;
  padding:8px 12px !important;
  background:linear-gradient(
    110deg,
    #2a5f5a 0%,
    #4a7d78 20%,
    #c8d4cf 45%,
    #ffffff 50%,
    #c8d4cf 55%,
    #4a7d78 80%,
    #2a5f5a 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  filter:drop-shadow(0 2px 8px rgba(42,95,90,.35))
         drop-shadow(0 0 15px rgba(200,212,207,.2));
  animation:labelShine 6s ease-in-out infinite;
  text-align:center;
  margin-bottom:18px;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

/* ===== 2) Typewriter Animation ===== */
.rc-typewriter{
  display:inline-block;
  overflow:hidden;
  white-space:nowrap;
  border-left:2px solid #c8d4cf;
  animation:
    typewriter 3s steps(25, end) 0.5s 1 normal both,
    cursorBlink 0.8s step-end infinite;
  vertical-align:bottom;
  padding-left:2px;
}

@keyframes typewriter{
  from{width:0}
  to  {width:100%}
}

@keyframes cursorBlink{
  0%,100%{border-color:#c8d4cf}
  50%    {border-color:transparent}
}

/* ===== 3) هلال البطاقة — أسرع ===== */
.date-moon{
  animation:moonFast 2.5s cubic-bezier(.45,0,.55,1) infinite !important;
}

@keyframes moonFast{
  0%,100%{transform:translateY(0) scale(1)}
  50%    {transform:translateY(-6px) scale(1.05)}
}

/* ===== 4) نجوم حول كل هلال ===== */
.date-moon{
  position:relative;
}

.date-moon::before,
.date-moon::after{
  content:"";
  position:absolute;
  width:3px;
  height:3px;
  border-radius:50%;
  background:#ffffff;
  box-shadow:0 0 4px rgba(255,255,255,.9);
  animation:miniStar 1.8s ease-in-out infinite;
  pointer-events:none;
}

.date-moon::before{
  top:8%;
  right:12%;
  animation-delay:0s;
}

.date-moon::after{
  bottom:15%;
  left:15%;
  animation-delay:0.9s;
}

@keyframes miniStar{
  0%,100%{opacity:.2;transform:scale(.7)}
  50%    {opacity:1;transform:scale(1.4)}
}

/* نجمة إضافية بحجم أكبر */
.day-card .date-moon svg{
  filter:drop-shadow(0 0 3px rgba(255,255,255,.5));
}

.day-card.is-today .date-moon::before,
.day-card.is-today .date-moon::after{
  background:#123b2a;
  box-shadow:0 0 4px rgba(18,59,42,.7);
}

/* ===== 5) زر تفعيل الصوت ===== */
.audio-enable{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  width:min(500px, 90%);
  margin:20px auto;
  padding:14px 20px;
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  border:1px solid rgba(42,95,90,.5);
  border-radius:16px;
  font-family:"Cairo","Tajawal",sans-serif;
  font-size:15px;
  font-weight:700;
  cursor:pointer;
  box-shadow:0 10px 30px rgba(7,35,23,.25);
  transition:transform .3s ease, box-shadow .3s ease;
}

.audio-enable:hover{
  transform:translateY(-2px);
  box-shadow:0 14px 36px rgba(7,35,23,.35);
}

.audio-enable:active{
  transform:scale(.97);
}

.audio-enable.enabled{
  background:linear-gradient(145deg,#2a5f5a,#123b2a);
  border-color:rgba(200,212,207,.4);
  cursor:default;
}

.audio-enable.enabled .audio-icon{
  animation:pulseIcon 2s ease-in-out infinite;
}

.audio-icon{
  font-size:20px;
}

@keyframes pulseIcon{
  0%,100%{transform:scale(1);opacity:.8}
  50%    {transform:scale(1.15);opacity:1}
}

/* ===== إشعار الإفطار ===== */
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

.iftar-toast .iftar-text{
  line-height:1.6;
}

/* ===== استجابة للشاشات الصغيرة ===== */
@media (max-width: 600px){
  .rc-label{
    font-size:20px !important;
    padding:6px 10px !important;
  }
  .rc-typewriter{
    border-left-width:1.5px;
  }
  .audio-enable{
    font-size:14px;
    padding:12px 16px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: label + typewriter + نجوم + زر الصوت");

// ============================================================
// 3) app.js — صوت المدفع + إشعار الإفطار
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* RAMADAN-THAWRA \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* RAMADAN-THAWRA */
(function ramadanThawra(){
  var CANNON_URL = "https://www.soundjay.com/misc/cannon-fire-01.mp3";
  var audioEnabled = false;

  // ===== زر تفعيل الصوت =====
  function setupAudioButton(){
    var btn = document.getElementById("audioEnableBtn");
    if (!btn) return;
    btn.addEventListener("click", function(){
      if (audioEnabled) return;
      // جرّب تشغيل صوت قصير
      try {
        var testAudio = new Audio(CANNON_URL);
        testAudio.volume = 0.8;
        testAudio.play().then(function(){
          audioEnabled = true;
          btn.classList.add("enabled");
          btn.querySelector(".audio-text").textContent = "✓ صوت المدفع مفعّل";
          localStorage.setItem("mc_audio_enabled", "1");
        }).catch(function(e){
          btn.querySelector(".audio-text").textContent = "⚠ تعذر التفعيل — جرّب مرة أخرى";
        });
      } catch(e) {
        btn.querySelector(".audio-text").textContent = "⚠ تعذر التفعيل";
      }
    });

    // استرجاع الحالة المحفوظة
    if (localStorage.getItem("mc_audio_enabled") === "1") {
      audioEnabled = true;
      btn.classList.add("enabled");
      btn.querySelector(".audio-text").textContent = "✓ صوت المدفع مفعّل";
    }
  }

  // ===== تشغيل صوت المدفع =====
  function fireCannon(){
    if (!audioEnabled) return;
    try {
      var audio = new Audio(CANNON_URL);
      audio.volume = 0.9;
      audio.play();
    } catch(e){}
  }

  // ===== إشعار الإفطار =====
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

    // حساب وقت المغرب
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

    // إذا كانت اللحظة هي وقت الإفطار (خلال 60 ثانية)
    var key = today.date + ":cannon";
    if (diff >= 0 && diff < 60000 && !lastFired[key]) {
      lastFired[key] = true;
      fireCannon();
      showIftarToast();
    }
  }

  // ===== التشغيل =====
  function start(){
    setupAudioButton();
    setInterval(checkIftarTime, 5000); // كل 5 ثوانٍ
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: صوت مدفع + إشعار إفطار");

console.log("\\n✅ ثورة التطبيق — 5 ميزات:");
console.log("  • ⚡ الهلال: 2.5s (أسرع)");
console.log("  • ✍️ الخط: بترولي-فضي + حجم 28px");
console.log("  • ⌨️ Typewriter: 3s");
console.log("  • ⭐ نجوم حول الهلال: نجمتان تومضان");
console.log("  • 🔊 صوت مدفع + إشعار 'إفطاراً شهياً'");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");