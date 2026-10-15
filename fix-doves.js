const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🕊️  3 حمامات بيضاء + رفرفة هادئة\n");

// ============================================================
// 1) index.html — استبدال الطيور الثلاث بـ 3 حمامات
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

const doveSVG = (scale) => {
  const w = Math.round(80 * scale);
  const h = Math.round(50 * scale);
  return `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="32" rx="22" ry="11" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
          <circle cx="58" cy="24" r="8" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
          <circle cx="61" cy="22" r="1.5" fill="#2a2a2a"/>
          <circle cx="61.5" cy="21.5" r="0.5" fill="#ffffff"/>
          <path d="M66,26 L74,28 L66,30 Z" fill="#ffb347"/>
          <path class="wing" d="M35,26 Q25,6 40,15 Q50,6 45,26 Z" fill="#fafafa" stroke="#e0e0e0" stroke-width="0.8"/>
          <path d="M22,30 L6,26 L22,32 Z" fill="#ffffff" stroke="#e8e8e8" stroke-width="0.8"/>
        </svg>`;
};

const newFlock = `<!-- BIRDS-V3-DOVES -->
    <div class="bird-flock" id="birdFlock">
      <!-- 🕊️ حمامة 1 — قائدة -->
      <div class="bird bird-dove bird-dove-1">
        ${doveSVG(1)}
      </div>

      <!-- 🕊️ حمامة 2 — وسط -->
      <div class="bird bird-dove bird-dove-2">
        ${doveSVG(0.88)}
      </div>

      <!-- 🕊️ حمامة 3 — خلف -->
      <div class="bird bird-dove bird-dove-3">
        ${doveSVG(0.76)}
      </div>
    </div>`;

// استبدل من BIRDS-V2 إلى نهاية bird-flock
html = html.replace(
  /<!-- BIRDS-V2 -->[\s\S]*?<\/div>\s*<\/div>\s*(?=\s*<!--|\s*<div class="moon-wrap")/,
  newFlock + "\n\n    "
);

// احتياطي
if (html.includes("bird-crow") || html.includes("bird-myth")) {
  html = html.replace(
    /<div class="bird-flock" id="birdFlock">[\s\S]*?<\/div>\s*<\/div>/,
    newFlock
  );
}

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: 3 حمامات بيضاء (بدل 3 طيور مختلفة)");

// ============================================================
// 2) style.css — استبدال CSS الطيور القديمة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات الطيور القديمة
css = css.replace(/\.bird-dove\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-crow\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-myth\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-dove\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-crow\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-myth\s+\.wing\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-myth\s+\.wing2\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+wingFlap[123][a-z]?\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+doveWobble[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+crowWobble[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+mythWobble[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   BIRDS-V3 — 3 حمامات بيضاء + رفرفة هادئة smoothly
   ============================================================ */

/* الحمامة 1 — قائدة (كبيرة) */
.bird-dove-1{
  width:70px;
  height:44px;
  left:0;
  top:20px;
  animation:dove1Float 5s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-1 .wing{
  transform-origin:40px 25px;
  animation:wingCalm1 1.4s cubic-bezier(.45,0,.55,1) infinite;
}

/* الحمامة 2 — وسط */
.bird-dove-2{
  width:62px;
  height:38px;
  left:-62px;
  top:44px;
  animation:dove2Float 5.4s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-2 .wing{
  transform-origin:40px 25px;
  animation:wingCalm2 1.6s cubic-bezier(.45,0,.55,1) infinite;
}

/* الحمامة 3 — خلف */
.bird-dove-3{
  width:54px;
  height:34px;
  left:-118px;
  top:8px;
  animation:dove3Float 5.8s cubic-bezier(.45,0,.55,1) infinite;
}

.bird-dove-3 .wing{
  transform-origin:40px 25px;
  animation:wingCalm3 1.8s cubic-bezier(.45,0,.55,1) infinite;
}

/* ===== الرفرفة الهادئة — ناعمة و smoothly ===== */

/* رفرفة الحمامة 1 — 1.4s ناعم */
@keyframes wingCalm1{
  0%,100%{transform:scaleY(1) rotate(0deg)}
  30%    {transform:scaleY(0.55) rotate(-3deg)}
  60%    {transform:scaleY(0.85) rotate(0deg)}
}

/* رفرفة الحمامة 2 — 1.6s */
@keyframes wingCalm2{
  0%,100%{transform:scaleY(1) rotate(0deg)}
  35%    {transform:scaleY(0.6) rotate(-2.5deg)}
  65%    {transform:scaleY(0.9) rotate(0deg)}
}

/* رفرفة الحمامة 3 — 1.8s */
@keyframes wingCalm3{
  0%,100%{transform:scaleY(1) rotate(0deg)}
  25%    {transform:scaleY(0.5) rotate(-3.5deg)}
  55%    {transform:scaleY(0.8) rotate(1deg)}
}

/* ===== الطفو الهادئ — كأنها تسبح في الهواء ===== */

@keyframes dove1Float{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-6px)}
}

@keyframes dove2Float{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(5px)}
}

@keyframes dove3Float{
  0%,100%{transform:translateY(0) rotate(0deg)}
  50%    {transform:translateY(-4px) rotate(2deg)}
}

/* ===== توسيع نطاق الطفو ليشمل الكتلة كاملة ===== */
.bird-flock.fly{
  animation:flockV3Fly 32s cubic-bezier(.35,0,.65,1) forwards;
}

@keyframes flockV3Fly{
  0%   {opacity:0; transform:translateX(110vw) translateY(0)}
  6%   {opacity:1}
  25%  {transform:translateX(75vw) translateY(-20px)}
  50%  {transform:translateX(40vw) translateY(10px)}
  75%  {transform:translateX(5vw)  translateY(-15px)}
  94%  {opacity:1}
  100% {opacity:0; transform:translateX(-40vw) translateY(-8px)}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: رفرفة هادئة (1.4-1.8s) + طفو ناعم");

// ============================================================
// 3) app.js — birdCycle (بدون تغيير — يعمل كما هو)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

if (app.includes("birdCycleV2")) {
  console.log("✓ app.js: birdCycleV2 يعمل (لا تغيير)");
} else {
  console.log("⚠ app.js: birdCycleV2 مفقود");
}

console.log("\\n✅ التعديل جاهز!");
console.log("  • 🕊️ 3 حمامات بيضاء");
console.log("  • 🎬 رفرفة هادئة (1.4-1.8s)");
console.log("  • 🌊 طفو ناعم cubic-bezier");
console.log("  • 🚫 لا كسر لأي ميزة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");