const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🐦 الطيور الجديدة + الهلال الأسود\n");

// ============================================================
// 1) index.html — استبدال حاوية الطيور (3 طيور كبيرة واضحة)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

const newBirds = `<!-- BIRDS-V2 -->
    <div class="bird-flock" id="birdFlock">
      <!-- 🕊️ حمامة بيضاء -->
      <div class="bird bird-dove">
        <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="32" rx="22" ry="11" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/>
          <circle cx="58" cy="24" r="8" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/>
          <circle cx="61" cy="22" r="1.5" fill="#333"/>
          <path d="M66,26 L74,28 L66,30 Z" fill="#ffb347"/>
          <path class="wing" d="M35,26 Q25,5 40,15 Q50,5 45,26 Z" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="1"/>
          <path d="M22,30 L5,26 L22,32 Z" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/>
        </svg>
      </div>

      <!-- 🐦‍⬛ غراب -->
      <div class="bird bird-crow">
        <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="32" rx="24" ry="12" fill="#1a1a1a"/>
          <circle cx="60" cy="24" r="9" fill="#1a1a1a"/>
          <circle cx="63" cy="22" r="2" fill="#ff0000"/>
          <path d="M69,26 L78,28 L69,30 Z" fill="#333"/>
          <path class="wing" d="M35,26 Q22,5 40,15 Q52,5 45,26 Z" fill="#0a0a0a"/>
          <path d="M18,30 L0,24 L18,34 Z" fill="#1a1a1a"/>
        </svg>
      </div>

      <!-- 🦅 طير غريب خيالي -->
      <div class="bird bird-myth">
        <svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mythG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f5d76e"/>
              <stop offset="50%" stop-color="#c9a227"/>
              <stop offset="100%" stop-color="#8b6914"/>
            </linearGradient>
            <radialGradient id="mythH" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fffbe6"/>
              <stop offset="100%" stop-color="#c9a227"/>
            </radialGradient>
          </defs>
          <ellipse cx="45" cy="38" rx="24" ry="12" fill="url(#mythG)"/>
          <circle cx="65" cy="28" r="10" fill="url(#mythH)" stroke="#8b6914" stroke-width="1"/>
          <circle cx="68" cy="26" r="2.5" fill="#000"/>
          <circle cx="68.5" cy="25.5" r="0.8" fill="#fff"/>
          <path d="M75,30 L85,33 L75,36 Z" fill="#ff4500"/>
          <path class="wing" d="M40,30 Q20,-5 45,12 Q55,-5 50,30 Z" fill="url(#mythG)" stroke="#8b6914" stroke-width="1"/>
          <path class="wing2" d="M40,30 Q25,50 45,38 Q55,50 50,30 Z" fill="url(#mythG)" opacity="0.7"/>
          <path d="M22,34 L2,26 L22,40 Z" fill="url(#mythG)"/>
          <circle cx="80" cy="20" r="2" fill="#ffd700" opacity="0.8"/>
          <circle cx="82" cy="42" r="1.5" fill="#ffd700" opacity="0.6"/>
        </svg>
      </div>
    </div>`;

html = html.replace(
  /<!-- BIRDS -->[\s\S]*?<\/div>\s*(?=\s*<!--|\s*<div class="moon-wrap")/,
  newBirds + "\n\n    "
);

// احتياطي: إذا لم يستبدل
html = html.replace(
  /<div class="bird-flock" id="birdFlock">[\s\S]*?<\/div>\s*<\/div>/,
  newBirds
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: 3 طيور جديدة (حمامة + غراب + خيالي)");

// ============================================================
// 2) style.css — استبدال الطيور القديمة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف كل تعريفات الطيور القديمة
css = css.replace(/\.bird-flock\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-flock\.fly\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-1\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-2\s*\{[^}]*\}/g, "");
css = css.replace(/\.bird-3\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+birdWing\d\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+birdWobble\d\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+flockFly\s*\{[\s\S]*?\n\}/g, "");

// أضف التعريفات الجديدة
css += `

/* ============================================================
   BIRDS-V2 — 3 طيور كبيرة واضحة
   ============================================================ */

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
  animation:flockV2Fly 26s linear forwards;
}

@keyframes flockV2Fly{
  0%   {opacity:0; transform:translateX(110vw)}
  8%   {opacity:1}
  92%  {opacity:1}
  100% {opacity:0; transform:translateX(-40vw)}
}

.bird{
  position:absolute;
  will-change:transform;
}

.bird svg{
  width:100%;
  height:100%;
  display:block;
  filter:drop-shadow(0 3px 6px rgba(0,0,0,.4));
}

/* الحمامة — بيضاء كبيرة */
.bird-dove{
  width:70px;
  height:44px;
  left:0;
  top:20px;
}
.bird-dove svg{
  filter:drop-shadow(0 3px 8px rgba(0,0,0,.5))
         drop-shadow(0 0 12px rgba(255,255,255,.5));
}
.bird-dove .wing{
  transform-origin:40px 25px;
  animation:wingFlap1 .28s ease-in-out infinite;
}

/* الغراب */
.bird-crow{
  width:65px;
  height:42px;
  left:-65px;
  top:48px;
}
.bird-crow .wing{
  transform-origin:40px 25px;
  animation:wingFlap2 .32s ease-in-out infinite;
}

/* الطير الغريب */
.bird-myth{
  width:80px;
  height:52px;
  left:-140px;
  top:5px;
}
.bird-myth .wing{
  transform-origin:42px 28px;
  animation:wingFlap3 .24s ease-in-out infinite;
}
.bird-myth .wing2{
  transform-origin:42px 30px;
  animation:wingFlap3b .24s ease-in-out infinite;
}

/* ===== رفرفة الأجنحة ===== */
@keyframes wingFlap1{
  0%,100%{transform:scaleY(1) rotate(0)}
  50%    {transform:scaleY(0.35) rotate(-5deg)}
}
@keyframes wingFlap2{
  0%,100%{transform:scaleY(1) rotate(0)}
  50%    {transform:scaleY(0.4) rotate(6deg)}
}
@keyframes wingFlap3{
  0%,100%{transform:scaleY(1) rotate(0)}
  50%    {transform:scaleY(0.3) rotate(-8deg)}
}
@keyframes wingFlap3b{
  0%,100%{transform:scaleY(1) rotate(0)}
  50%    {transform:scaleY(0.5) rotate(8deg)}
}

/* ===== تذبذب عمودي طبيعي ===== */
.bird-dove{animation:doveWobble 2.4s ease-in-out infinite}
.bird-crow{animation:crowWobble 2.8s ease-in-out infinite}
.bird-myth{animation:mythWobble 2.2s ease-in-out infinite}

@keyframes doveWobble{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-10px)}
}
@keyframes crowWobble{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(8px)}
}
@keyframes mythWobble{
  0%,100%{transform:translateY(0) rotate(0)}
  50%    {transform:translateY(-8px) rotate(3deg)}
}

/* ===== هلال البطاقات أسود ===== */
.date-moon svg path{
  fill:#0a0a0a !important;
}

.date-moon svg [fill*="url"]{
  fill:#0a0a0a !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: طيور جديدة + هلال أسود");

// ============================================================
// 3) app.js — تحديث birdCycle (كل 5-12 ثانية)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف birdCycle القديم
app = app.replace(/\/\* BIRD-CYCLE \*\/[\s\S]*$/g, "");

// أضف الجديد
app += `

/* BIRD-CYCLE-V2 */
(function birdCycleV2(){
  function launch(){
    var flock = document.getElementById("birdFlock");
    if (!flock) return;
    flock.style.top = (8 + Math.random() * 25) + "%";
    flock.classList.remove("fly");
    void flock.offsetWidth;
    flock.classList.add("fly");
    var next = 5000 + Math.random() * 7000;
    setTimeout(launch, next);
  }
  function start(){
    setTimeout(launch, 3000);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: birdCycleV2 (كل 5-12 ثانية)");

console.log("\\n✅ الطيور الجديدة + الهلال الأسود جاهزة!");
console.log("  • 🕊️ حمامة بيضاء (70px)");
console.log("  • 🐦‍⬛ غراب (65px)");
console.log("  • 🦅 طير غريب ذهبي (80px)");
console.log("  • 🌙 هلال البطاقات أسود");
console.log("  • ⏱️ تظهر كل 5-12 ثانية");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");