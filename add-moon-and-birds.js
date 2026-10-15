const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 المرحلة 2+3: هلال البطاقة + الطيور\n");

// ============================================================
// 1) app.js — استبدال date-moon بـ SVG هلال معلق بالرقم
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* MOON-CARD-BIRD \*\/[\s\S]*$/g, "");

// أضف دالة SVG للهلال المعلق
if (!app.includes("moonCardSVG")) {
  const helper = `
/* MOON-CARD-BIRD */
function moonCardSVG(day) {
  // هلال رفيع حاد + رقم معلق بـ 1px
  return '<svg viewBox="0 0 60 110" width="56" height="70" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<radialGradient id="mcg' + day + '" cx="35%" cy="30%" r="80%">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="60%" stop-color="#f5f5f5"/>' +
        '<stop offset="100%" stop-color="#e0e0e0"/>' +
      '</radialGradient>' +
    '</defs>' +
    // الهلال — قوس حاد رفيع (اتجاه طبيعي ☾)
    '<path d="M 42,4 A 32,32 0 1,0 42,68 A 26,32 0 1,1 42,4 Z" fill="url(#mcg' + day + ')"/>' +
    // الخيط الرفيع 1px
    '<line x1="30" y1="68" x2="30" y2="72" stroke="rgba(255,255,255,.7)" stroke-width="1"/>' +
    // الرقم معلق
    '<text x="30" y="92" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="#123b2a" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}
`;

  // أضف قبل نهاية الملف
  app = app + helper;
}

// استبدل date-number بالهلال
app = app.replace(
  /<div class="date-moon">[\s\S]*?<\/div>\s*<div class="date-number">[\s\S]*?<\/div>/,
  '<div class="date-moon">${moonCardSVG(day.day)}</div>'
);

// في حال لم يكن هناك date-moon — استبدل date-number فقط
app = app.replace(
  /<div class="date-number">[\s\S]*?<\/div>/,
  '<div class="date-moon">${moonCardSVG(day.day)}</div>'
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: moonCardSVG مضاف + date-number مستبدل");

// ============================================================
// 2) style.css — تنسيق الهلال المعلق + الطيور
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي تعريفات سابقة
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-number\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird[\s\S]*?@keyframes[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   MOON-CARD — هلال البطاقة المعلق بالرقم
   ============================================================ */

.date-moon{
  flex:0 0 56px;
  height:70px;
  display:grid;
  place-items:center;
  animation:moonSmooth 3.2s ease-in-out infinite;
  will-change:transform;
}

.date-moon svg{
  width:100%;
  height:100%;
  display:block;
}

/* اليوم الحالي — توهج خفيف */
.day-card.is-today .date-moon{
  filter:drop-shadow(0 0 6px rgba(255,255,255,.5));
}

@keyframes moonSmooth{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-7px)}
}

/* ============================================================
   BIRDS — 3 طيور بحركة طبيعية
   ============================================================ */

.bird-flock{
  position:absolute;
  top:20%;
  left:0;
  width:100%;
  height:120px;
  pointer-events:none;
  z-index:7;
  opacity:0;
}

.bird-flock.fly{
  animation:flockFly 24s linear forwards;
}

@keyframes flockFly{
  0%   {opacity:0; transform:translateX(100vw)}
  5%   {opacity:.9}
  95%  {opacity:.9}
  100% {opacity:0; transform:translateX(-30vw)}
}

.bird{
  position:absolute;
  width:34px;
  height:20px;
  will-change:transform;
}

.bird svg{
  width:100%;
  height:100%;
  display:block;
}

.bird-1{
  left:0;
  top:0;
  animation:birdWing1 .25s ease-in-out infinite,
            birdWobble1 2.4s ease-in-out infinite;
}

.bird-2{
  left:-42px;
  top:12px;
  transform:scale(0.85);
  animation:birdWing2 .28s ease-in-out infinite,
            birdWobble2 2.8s ease-in-out infinite;
}

.bird-3{
  left:-78px;
  top:22px;
  transform:scale(0.75);
  animation:birdWing3 .22s ease-in-out infinite,
            birdWobble3 2.6s ease-in-out infinite;
}

/* رفرفة 4 إطارات/ثانية — 15-25 درجة */
@keyframes birdWing1{
  0%,100%{transform:scaleY(1) rotate(0)}
  25%    {transform:scaleY(.7) rotate(-8deg)}
  50%    {transform:scaleY(1) rotate(0)}
  75%    {transform:scaleY(.7) rotate(8deg)}
}
@keyframes birdWing2{
  0%,100%{transform:scaleY(1) rotate(0)}
  30%    {transform:scaleY(.65) rotate(-10deg)}
  60%    {transform:scaleY(.95) rotate(0)}
  80%    {transform:scaleY(.7) rotate(10deg)}
}
@keyframes birdWing3{
  0%,100%{transform:scaleY(1) rotate(0)}
  20%    {transform:scaleY(.6) rotate(-9deg)}
  55%    {transform:scaleY(1) rotate(0)}
  75%    {transform:scaleY(.75) rotate(9deg)}
}

/* تذبذب عمودي ±8px — كأنها تتقافز */
@keyframes birdWobble1{
  0%,100%{margin-top:0}
  50%    {margin-top:-8px}
}
@keyframes birdWobble2{
  0%,100%{margin-top:0}
  50%    {margin-top:6px}
}
@keyframes birdWobble3{
  0%,100%{margin-top:0}
  50%    {margin-top:-5px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: الهلال المعلق + الطيور");

// ============================================================
// 3) index.html — إضافة حاوية الطيور داخل sky
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

if (!html.includes("bird-flock")) {
  const birdsHTML = `
    <!-- BIRDS -->
    <div class="bird-flock" id="birdFlock">
      <div class="bird bird-1">
        <svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2,14 Q10,4 20,12 Q30,4 38,14" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="bird bird-2">
        <svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2,14 Q10,4 20,12 Q30,4 38,14" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="bird bird-3">
        <svg viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2,14 Q10,4 20,12 Q30,4 38,14" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    </div>`;

  // أضف داخل sky بعد السحاب
  html = html.replace(
    /(<div class="clouds">[\s\S]*?<\/div>)/,
    "$1\n" + birdsHTML
  );

  fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
  console.log("✓ index.html: حاوية الطيور");
} else {
  console.log("⚠ index.html: bird-flock موجود مسبقاً");
}

// ============================================================
// 4) app.js — تشغيل الطيور دورياً
// ============================================================
app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");
app = app.replace(/\/\* BIRD-CYCLE \*\/[\s\S]*$/g, "");

if (!app.includes("birdCycle")) {
  app += `

/* BIRD-CYCLE */
(function birdCycle(){
  function launch(){
    var flock = document.getElementById("birdFlock");
    if (!flock) return;
    // موضع عمودي عشوائي
    flock.style.top = (10 + Math.random() * 30) + "%";
    flock.classList.remove("fly");
    void flock.offsetWidth;
    flock.classList.add("fly");
    // الجدولة القادمة — 15-30 ثانية
    var next = 15000 + Math.random() * 15000;
    setTimeout(launch, next);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(launch, 5000);
    });
  } else {
    setTimeout(launch, 5000);
  }
})();
`;
  fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
  console.log("✓ app.js: birdCycle مضاف");
} else {
  console.log("⚠ app.js: birdCycle موجود");
}

console.log("\\n✅ المرحلة 2+3 مكتملة!");
console.log("  • هلال البطاقة المعلق بالرقم");
console.log("  • 3 طيور بحركة طبيعية");
console.log("\\n📋 التالي:");
console.log("  1. node --check web/app.js");
console.log("  2. npx cap sync");
console.log("  3. cd android");
console.log("  4. gradlew.bat assembleRelease");
console.log("  5. adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");