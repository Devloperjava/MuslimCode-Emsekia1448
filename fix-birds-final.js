const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🐦 طيور بترولية دافئة + ToolTip + إشعارات\n");

// ============================================================
// 1) index.html — استبدال الحمام بـ 5 طيور بترولية
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

const birdSVG = (size, color) => `<svg viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
          <path class="bird-body" d="M8,12 Q12,6 20,8 Q28,4 32,10 Q34,14 28,15 L14,15 Q8,14 8,12 Z" fill="${color.body}"/>
          <circle cx="30" cy="10" r="3" fill="${color.head}"/>
          <circle cx="31" cy="9.5" r="0.6" fill="#0a1a18"/>
          <path d="M33,10 L36,10.5 L33,11 Z" fill="#6b7d3a"/>
          <path class="wing" d="M16,10 Q10,2 18,6 Q24,2 22,10 Z" fill="${color.wing}"/>
          <path d="M8,12 L2,10 L8,13 Z" fill="${color.tail}"/>
        </svg>`;

const colors = [
  { body: "#1a4d4a", head: "#2a5f5a", wing: "#3d6f6a", tail: "#6b7d3a" },
  { body: "#1e5450", head: "#2d6460", wing: "#437672", tail: "#6d8038" },
  { body: "#225b56", head: "#316a64", wing: "#497e78", tail: "#708340" },
  { body: "#1a4d4a", head: "#2a5f5a", wing: "#3d6f6a", tail: "#6b7d3a" },
  { body: "#1e5450", head: "#2d6460", wing: "#437672", tail: "#6d8038" }
];

const newFlock = `<!-- BIRDS-FINAL -->
    <div class="bird-flock" id="birdFlock">
      <div class="bird bird-1">${birdSVG(22, colors[0])}</div>
      <div class="bird bird-2">${birdSVG(18, colors[1])}</div>
      <div class="bird bird-3">${birdSVG(16, colors[2])}</div>
      <div class="bird bird-4">${birdSVG(14, colors[3])}</div>
      <div class="bird bird-5">${birdSVG(12, colors[4])}</div>
    </div>`;

// استبدال من BIRDS-V4-DOVES حتى نهاية bird-flock
html = html.replace(
  /<!-- BIRDS-V4-DOVES -->[\s\S]*?<\/div>\s*<\/div>\s*(?=\s*<!--|\s*<div class="moon-wrap")/,
  newFlock + "\n\n    "
);

// احتياطي
if (html.includes("bird-dove")) {
  html = html.replace(
    /<div class="bird-flock" id="birdFlock">[\s\S]*?<\/div>\s*<\/div>/,
    newFlock
  );
}

// إضافة حاوية ToolTip إذا غير موجودة
if (!html.includes("tooltip-container")) {
  html = html.replace(
    /<section id="countdown"/,
    '<div class="tooltip-container" id="tooltipContainer"></div>\n\n    <section id="countdown"'
  );
}

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: 5 طيور بترولية + tooltip-container");

// ============================================================
// 2) style.css — ألوان الطيور + tooltip
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف الطيور القديمة
css = css.replace(/\.bird-dove[-\s][^{]*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove\s*\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+wingCalm\d\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+dove\dFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+flockV\dFly\s*\{[\s\S]*?\n\}/g, "");

// احتفظ بـ .bird-flock الأساسي وأعد تعريفه
css = css.replace(/\.bird-flock\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird\s+svg\s*\{[^}]*\}/g, "");

css += `

/* ============================================================
   BIRDS-FINAL — 5 طيور بترولية بعيدة واقعية
   ============================================================ */

.bird-flock{
  position:absolute;
  top:12%;
  left:0;
  width:100%;
  height:100px;
  pointer-events:none;
  z-index:15;
  opacity:0;
}

.bird-flock.fly{
  animation:flockFinalFly 34s cubic-bezier(.35,0,.65,1) forwards;
}

@keyframes flockFinalFly{
  0%   {opacity:0; transform:translateX(110vw)}
  6%   {opacity:1}
  50%  {opacity:.85}
  94%  {opacity:1}
  100% {opacity:0; transform:translateX(-40vw)}
}

.bird{
  position:absolute;
  will-change:transform;
  opacity:.85;
  filter:blur(.3px) drop-shadow(0 2px 4px rgba(0,0,0,.35));
}

.bird svg{
  width:100%;
  height:100%;
  display:block;
}

/* الأحجام والمواقع */
.bird-1{width:22px;height:12px;left:0;    top:30px;animation:birdFloat1 6s cubic-bezier(.45,0,.55,1) infinite}
.bird-2{width:18px;height:10px;left:-32px;top:48px;animation:birdFloat2 6.4s cubic-bezier(.45,0,.55,1) infinite}
.bird-3{width:16px;height:9px; left:-58px;top:14px;animation:birdFloat3 6.8s cubic-bezier(.45,0,.55,1) infinite}
.bird-4{width:14px;height:8px; left:-80px;top:36px;animation:birdFloat4 7.2s cubic-bezier(.45,0,.55,1) infinite}
.bird-5{width:12px;height:7px; left:-98px;top:22px;animation:birdFloat5 7.6s cubic-bezier(.45,0,.55,1) infinite}

/* رفرفة ناعمة بطيئة */
.bird .wing{
  transform-origin:20px 12px;
  animation:wingFinal 1.8s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-2 .wing{animation-duration:1.9s}
.bird-3 .wing{animation-duration:2.0s}
.bird-4 .wing{animation-duration:1.85s}
.bird-5 .wing{animation-duration:1.95s}

@keyframes wingFinal{
  0%,100%{transform:scaleY(1) rotate(0)}
  30%    {transform:scaleY(.6) rotate(-2deg)}
  60%    {transform:scaleY(.9) rotate(0)}
}

/* طفو ناعم */
@keyframes birdFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes birdFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
@keyframes birdFloat3{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes birdFloat4{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
@keyframes birdFloat5{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}

/* ============================================================
   TOOLTIP — أدعية رمضان
   ============================================================ */

.tooltip-container{
  position:fixed;
  top:20px;
  left:50%;
  transform:translateX(-50%);
  z-index:9999;
  pointer-events:none;
  width:90%;
  max-width:520px;
}

.tooltip{
  background:linear-gradient(145deg, #123b2a, #0b291c);
  color:#fff;
  padding:14px 20px;
  border-radius:16px;
  border:1px solid rgba(201,162,39,.35);
  box-shadow:0 20px 50px rgba(7,35,23,.45);
  font-size:14px;
  line-height:1.6;
  text-align:center;
  opacity:0;
  transform:translateY(-30px);
  animation:tooltipIn 0.5s cubic-bezier(.2,.8,.2,1) forwards,
            tooltipOut 0.5s cubic-bezier(.2,.8,.2,1) 7.5s forwards;
}

.tooltip-icon{
  font-size:18px;
  margin-bottom:6px;
  display:block;
}

.tooltip-text{
  color:rgba(255,255,255,.92);
  direction:rtl;
}

.tooltip-brand{
  margin-top:8px;
  font-size:11px;
  color:rgba(201,162,39,.8);
  letter-spacing:1px;
}

@keyframes tooltipIn{
  from{opacity:0;transform:translateY(-30px) scale(.95)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tooltipOut{
  to{opacity:0;transform:translateY(-30px) scale(.95)}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: طيور بترولية + tooltip");

// ============================================================
// 3) app.js — دورة الطيور + ToolTip + إشعارات 12 ساعة
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف الأجزاء القديمة
app = app.replace(/\/\* BIRD-CYCLE-V2 \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* NOTIFY-12H \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* BIRD-CYCLE-FINAL */
(function birdCycleFinal(){
  function launch(){
    var flock = document.getElementById("birdFlock");
    if (!flock) return;
    flock.style.top = (8 + Math.random() * 20) + "%";
    flock.classList.remove("fly");
    void flock.offsetWidth;
    flock.classList.add("fly");
    var next = 8000 + Math.random() * 12000;
    setTimeout(launch, next);
  }
  function start(){ setTimeout(launch, 4000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

/* TOOLTIP-ADHKAR */
(function tooltipAdhkar(){
  var ADHKAR = [
    { icon: "🌙", text: "اللهم بلّغنا رمضان وأعنا على صيامه وقيامه" },
    { icon: "✨", text: "اللهم إنك عفوٌّ كريم تحب العفو فاعفُ عنا" },
    { icon: "🕌", text: "اللهم تقبّل صيامنا وقيامنا واغفر لنا ذنوبنا" },
    { icon: "🌿", text: "اللهم اجعل رمضان هذا خير رمضان مرّ علينا" },
    { icon: "🌟", text: "اللهم أعنا على ذكرك وشكرك وحسن عبادتك" },
    { icon: "🤲", text: "اللهم ارزقنا صيام رمضان إيماناً واحتساباً" },
    { icon: "🌌", text: "اللهم اجعل القرآن ربيع قلوبنا في رمضان" }
  ];

  var idx = 0;
  function show(){
    var container = document.getElementById("tooltipContainer");
    if (!container) return;
    var dhikr = ADHKAR[idx % ADHKAR.length];
    idx++;

    container.innerHTML =
      '<div class="tooltip">' +
        '<span class="tooltip-icon">' + dhikr.icon + '</span>' +
        '<div class="tooltip-text">' + dhikr.text + '</div>' +
        '<div class="tooltip-brand">MuslimCode</div>' +
      '</div>';

    // إزالة بعد 8.5 ثانية
    setTimeout(function(){ container.innerHTML = ""; }, 8500);
  }

  function start(){
    setTimeout(function(){
      show();
      setInterval(show, 2.5 * 60 * 1000);  // كل 2.5 دقيقة
    }, 15000);  // أول ToolTip بعد 15 ثانية
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

/* NOTIFY-12H-FINAL */
(function notify12hFinal(){
  var KEY = "mc_notify_last";
  var INTERVAL = 12 * 60 * 60 * 1000;  // 12 ساعة

  var MESSAGES = [
    "Supported For MuslimCode\\n🌙 إمساكية رمضان 1448",
    "من تطوير MuslimCode\\n🤲 لا تنسَ الدعاء",
    "Supported For MuslimCode\\n✨ تقبّل الله صيامك",
    "MuslimCode — Ramadan 1448\\n🌿 اللهم بلّغنا رمضان"
  ];

  function notify(){
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    var last = parseInt(localStorage.getItem(KEY) || "0", 10);
    var now = Date.now();
    if (now - last < INTERVAL) return;
    localStorage.setItem(KEY, String(now));

    var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    try {
      new Notification("🌙 MuslimCode", {
        body: msg,
        dir: "rtl",
        lang: "ar",
        tag: "mc-12h-final",
        requireInteraction: false
      });
    } catch(e){}
  }

  function start(){
    setTimeout(notify, 5000);
    setInterval(notify, 60 * 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: دورة الطيور + ToolTip + إشعارات");

console.log("\\n✅ التعديل جاهز!");
console.log("  • 🐦 5 طيور بترولية دافئة (لا حمام)");
console.log("  • 🎨 ألوان: #1a4d4a → #6b7d3a");
console.log("  • 📏 أحجام: 12-22px (بعيدة)");
console.log("  • 💬 ToolTip: 7 أدعية رمضان");
console.log("  • 🔔 إشعارات 12 ساعة (MuslimCode)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");