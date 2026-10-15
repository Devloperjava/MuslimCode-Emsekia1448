const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🐦 إصلاح اتجاه الحمام + Counter رمضان\n");

// ============================================================
// 1) index.html — إصلاح الحمام (رأس للأمام) + Counter رمضان
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// الحمامة الجديدة — رأس يسار، تطير يمين→يسار
const doveSVG = `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="32" rx="22" ry="11" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
          <circle cx="22" cy="24" r="8" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
          <circle cx="19" cy="22" r="1.5" fill="#2a2a2a"/>
          <circle cx="18.5" cy="21.5" r="0.5" fill="#ffffff"/>
          <path d="M14,26 L6,28 L14,30 Z" fill="#ffb347"/>
          <path class="wing" d="M45,26 Q55,6 40,15 Q30,6 35,26 Z" fill="#fafafa" stroke="#e0e0e0" stroke-width="0.8"/>
          <path d="M58,30 L74,26 L58,32 Z" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
        </svg>`;

const newFlock = `<!-- BIRDS-V4-DOVES -->
    <div class="bird-flock" id="birdFlock">
      <div class="bird bird-dove bird-dove-1">${doveSVG}</div>
      <div class="bird bird-dove bird-dove-2">${doveSVG}</div>
      <div class="bird bird-dove bird-dove-3">${doveSVG}</div>
    </div>`;

html = html.replace(
  /<!-- BIRDS-V3-DOVES -->[\s\S]*?<\/div>\s*<\/div>\s*(?=\s*<!--|\s*<div class="moon-wrap")/,
  newFlock + "\n\n    "
);

if (html.includes("bird-dove-1")) {
  html = html.replace(
    /<div class="bird-flock" id="birdFlock">[\s\S]*?<\/div>\s*<\/div>/,
    newFlock
  );
}

// ===== إضافة Counter رمضان في أعلى الصفحة =====
if (!html.includes("ramadanCounter")) {
  const counterHTML = `
    <!-- RAMADAN COUNTER -->
    <section class="ramadan-counter" id="ramadanCounter">
      <div class="rc-label">🌙 متبقٍ حتى رمضان 1448</div>
      <div class="rc-timer">
        <div class="rc-part"><span class="rc-num" id="rcDays">—</span><span class="rc-unit">يوم</span></div>
        <div class="rc-sep">:</div>
        <div class="rc-part"><span class="rc-num" id="rcHours">—</span><span class="rc-unit">ساعة</span></div>
        <div class="rc-sep">:</div>
        <div class="rc-part"><span class="rc-num" id="rcMins">—</span><span class="rc-unit">دقيقة</span></div>
        <div class="rc-sep">:</div>
        <div class="rc-part"><span class="rc-num" id="rcSecs">—</span><span class="rc-unit">ثانية</span></div>
      </div>
    </section>`;

  html = html.replace(
    /<section id="countdown" class="countdown" aria-live="polite"><\/section>/,
    counterHTML + '\n\n    <section id="countdown" class="countdown" aria-live="polite"></section>'
  );

  fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
  console.log("✓ index.html: حمام (رأس يسار) + Counter رمضان");
} else {
  fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
  console.log("✓ index.html: حمام محدّث — Counter موجود");
}

// ============================================================
// 2) style.css — إصلاح الاتجاه + Counter + رفرفة ناعمة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات الحمامات القديمة
css = css.replace(/\.bird-dove-1\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove-2\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove-3\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove-1\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove-2\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove-3\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+wingCalm\d\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+dove\dFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+flockV\dFly\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   BIRDS-V4 — اتجاه صحيح + رفرفة ناعمة Smoothly
   ============================================================ */

/* الطيور تطير من اليمين لليسار — الرأس يسار */
.bird-flock{
  position:absolute;
  top:15%;
  left:0;
  width:100%;
  height:140px;
  pointer-events:none;
  z-index:20;
  opacity:0;
}

.bird-flock.fly{
  animation:flockV4Fly 30s cubic-bezier(.35,0,.65,1) forwards;
}

@keyframes flockV4Fly{
  0%   {opacity:0; transform:translateX(110vw) translateY(0)}
  6%   {opacity:1}
  25%  {transform:translateX(75vw) translateY(-15px)}
  50%  {transform:translateX(40vw) translateY(10px)}
  75%  {transform:translateX(5vw)  translateY(-12px)}
  94%  {opacity:1}
  100% {opacity:0; transform:translateX(-40vw) translateY(-6px)}
}

/* الحمامة 1 — قائدة */
.bird-dove-1{
  width:70px;
  height:44px;
  left:0;
  top:20px;
  animation:dove1Float 5s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-1 .wing{
  transform-origin:40px 25px;
  animation:wingCalm1 1.5s cubic-bezier(.45,0,.55,1) infinite;
}

/* الحمامة 2 — وسط */
.bird-dove-2{
  width:62px;
  height:38px;
  left:-62px;
  top:48px;
  animation:dove2Float 5.4s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-2 .wing{
  transform-origin:40px 25px;
  animation:wingCalm2 1.7s cubic-bezier(.45,0,.55,1) infinite;
}

/* الحمامة 3 — خلف */
.bird-dove-3{
  width:54px;
  height:34px;
  left:-118px;
  top:5px;
  animation:dove3Float 5.8s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-3 .wing{
  transform-origin:40px 25px;
  animation:wingCalm3 1.9s cubic-bezier(.45,0,.55,1) infinite;
}

/* رفرفة ناعمة — بطيئة */
@keyframes wingCalm1{
  0%,100%{transform:scaleY(1) rotate(0)}
  30%    {transform:scaleY(.65) rotate(-2.5deg)}
  60%    {transform:scaleY(.9) rotate(0)}
}
@keyframes wingCalm2{
  0%,100%{transform:scaleY(1) rotate(0)}
  35%    {transform:scaleY(.7) rotate(-2deg)}
  65%    {transform:scaleY(.95) rotate(0)}
}
@keyframes wingCalm3{
  0%,100%{transform:scaleY(1) rotate(0)}
  25%    {transform:scaleY(.6) rotate(-3deg)}
  55%    {transform:scaleY(.85) rotate(1deg)}
}

/* طفو ناعم */
@keyframes dove1Float{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-5px)}
}
@keyframes dove2Float{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(4px)}
}
@keyframes dove3Float{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-3px)}
}

/* ============================================================
   RAMADAN-COUNTER — Counter تنازلي
   ============================================================ */

.ramadan-counter{
  margin:20px auto;
  max-width:600px;
  padding:22px 18px;
  border-radius:22px;
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  text-align:center;
  box-shadow:0 20px 50px rgba(7,35,23,.35);
  border:1px solid rgba(201,162,39,.25);
  animation:rcEnter 1s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes rcEnter{
  from{opacity:0;transform:translateY(20px) scale(.95)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

.rc-label{
  font-size:14px;
  color:#f5d76e;
  font-weight:700;
  margin-bottom:14px;
  letter-spacing:.5px;
}

.rc-timer{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:8px;
  direction:ltr;
}

.rc-part{
  display:flex;
  flex-direction:column;
  min-width:56px;
}

.rc-num{
  font-size:26px;
  font-weight:850;
  color:#fff;
  font-variant-numeric:tabular-nums;
  text-shadow:0 0 20px rgba(201,162,39,.5);
  line-height:1;
}

.rc-unit{
  font-size:11px;
  color:rgba(255,255,255,.65);
  margin-top:4px;
}

.rc-sep{
  font-size:22px;
  color:rgba(201,162,39,.6);
  font-weight:300;
  margin-top:-12px;
}

@media (max-width:520px){
  .rc-num{font-size:20px}
  .rc-part{min-width:44px}
  .rc-sep{font-size:18px}
  .rc-label{font-size:13px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: اتجاه صحيح + Counter + رفرفة ناعمة");

// ============================================================
// 3) app.js — Counter رمضان + إشعارات 12 ساعة
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* RAMADAN-COUNTER \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* RAMADAN-COUNTER */
(function ramadanCounter(){
  var RAMADAN_START = new Date(2027, 1, 9, 0, 0, 0);  // 9 فبراير 2027

  function tick(){
    var now = new Date();
    var diff = RAMADAN_START - now;
    if (diff <= 0) {
      var el = document.getElementById("ramadanCounter");
      if (el) el.style.display = "none";
      return;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;

    var elD = document.getElementById("rcDays");
    var elH = document.getElementById("rcHours");
    var elM = document.getElementById("rcMins");
    var elS = document.getElementById("rcSecs");

    if (elD) elD.textContent = String(d).padStart(2, "0");
    if (elH) elH.textContent = String(h).padStart(2, "0");
    if (elM) elM.textContent = String(m).padStart(2, "0");
    if (elS) elS.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
})();

/* NOTIFY-12H */
(function notify12h(){
  var KEY = "mc_last_notify";
  var INTERVAL = 12 * 60 * 60 * 1000;  // 12 ساعة

  function maybeNotify(){
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    var last = parseInt(localStorage.getItem(KEY) || "0", 10);
    var now = Date.now();
    if (now - last < INTERVAL) return;
    localStorage.setItem(KEY, String(now));
    try {
      new Notification("🌙 MuslimCode", {
        body: "Supported For MuslimCode\\nإمساكية رمضان 1448",
        dir: "rtl",
        lang: "ar",
        tag: "mc-12h"
      });
    } catch(e){}
  }

  setTimeout(maybeNotify, 3000);
  setInterval(maybeNotify, 60 * 1000);
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: Counter + إشعارات 12 ساعة");

console.log("\\n✅ التعديل جاهز!");
console.log("  • 🐦 اتجاه الحمام صحيح (رأس يسار)");
console.log("  • 🌊 رفرفة ناعمة (1.5-1.9s)");
console.log("  • ⏱️ Counter رمضان تنازلي");
console.log("  • 🔔 إشعارات 12 ساعة (MuslimCode)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");