const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

// =====================================================
// 1) CSS — كل الأنيميشن
// =====================================================
const cssAdd = `
/* ============================================================
   MOTION — أنيميشن عالمي
   ============================================================ */

/* ===== MOON ===== */
.moon-wrap{
  animation: moonFloat 8s ease-in-out infinite,
             moonDrift 25s ease-in-out infinite !important;
  will-change: transform;
}
.moon-body{
  animation: moonTilt 10s ease-in-out infinite !important;
  will-change: transform, filter;
  filter: drop-shadow(0 0 15px rgba(255,255,255,.75))
          drop-shadow(0 0 40px rgba(255,255,255,.35)) !important;
}
.moon-body svg{
  animation: moonPulse 4s ease-in-out infinite !important;
  will-change: filter;
}

@keyframes moonFloat{
  0%, 100%{transform: translateY(0)}
  50%     {transform: translateY(-12px)}
}

@keyframes moonDrift{
  0%, 100%{margin-right: 0}
  50%     {margin-right: -14px}
}

@keyframes moonTilt{
  0%, 100%{transform: rotate(0deg) scale(1)}
  25%     {transform: rotate(-1.5deg) scale(1.02)}
  50%     {transform: rotate(0deg) scale(1.035)}
  75%     {transform: rotate(1.5deg) scale(1.02)}
}

@keyframes moonPulse{
  0%, 100%{filter: drop-shadow(0 0 12px rgba(255,255,255,.7))
                    drop-shadow(0 0 30px rgba(255,255,255,.3))
                    brightness(1)}
  50%     {filter: drop-shadow(0 0 22px rgba(255,255,255,1))
                    drop-shadow(0 0 55px rgba(255,255,255,.5))
                    brightness(1.15)}
}

/* ===== STARS ===== */
.star{
  animation: starTwinkle infinite ease-in-out !important;
  will-change: opacity, transform;
}

.star-sm{animation-duration: 3s}
.star-md{animation-duration: 4s;animation-delay: 0.5s}
.star-lg{
  animation-duration: 2.5s;
  animation-delay: 1s;
  box-shadow: 0 0 8px #fff, 0 0 16px rgba(255,255,255,.6), 0 0 28px rgba(255,255,255,.3);
}

@keyframes starTwinkle{
  0%, 100%{opacity: 0.3;transform: scale(1)}
  50%     {opacity: 1;  transform: scale(1.4)}
}

/* ===== SHOOTING STARS ===== */
.shooting-star{
  animation: shoot 1.6s cubic-bezier(.4,0,.6,1) forwards !important;
}

@keyframes shoot{
  0%{
    opacity: 0;
    transform: rotate(var(--angle, 210deg)) translateX(-160px) scaleX(.3);
  }
  10%{opacity: 1}
  100%{
    opacity: 0;
    transform: rotate(var(--angle, 210deg)) translateX(240px) scaleX(1);
  }
}

/* ===== RAIN (realistic) ===== */
.rain{
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 7;
  overflow: hidden;
}

.rain-drop{
  position: absolute;
  border-radius: 2px;
  animation: rainFall linear infinite;
  will-change: transform, opacity;
}

/* نوع 1: رقيقة سريعة */
.rain-drop.type-thin{
  width: 1px;
  height: 22px;
  background: linear-gradient(180deg,
    rgba(200,225,255,0) 0%,
    rgba(220,235,255,.85) 50%,
    rgba(200,225,255,0) 100%);
  filter: blur(0.2px);
}

/* نوع 2: متوسطة */
.rain-drop.type-mid{
  width: 1.5px;
  height: 32px;
  background: linear-gradient(180deg,
    rgba(180,215,255,0) 0%,
    rgba(210,230,255,.9) 50%,
    rgba(180,215,255,0) 100%);
  filter: blur(0.4px);
}

/* نوع 3: سميكة بطيئة (قريبة) */
.rain-drop.type-thick{
  width: 2.5px;
  height: 50px;
  background: linear-gradient(180deg,
    rgba(170,205,245,0) 0%,
    rgba(200,225,255,.95) 50%,
    rgba(170,205,245,0) 100%);
  filter: blur(0.6px);
  box-shadow: 0 0 4px rgba(200,225,255,.7);
}

@keyframes rainFall{
  0%{
    transform: translateY(-120px) translateX(0) scaleY(1);
    opacity: 0;
  }
  8%{opacity: 0.9}
  92%{opacity: 0.7}
  100%{
    transform: translateY(650px) translateX(-40px) scaleY(1.4);
    opacity: 0;
  }
}

/* إيقاف عند تفضيل تقليل الحركة */
@media(prefers-reduced-motion:reduce){
  .moon-wrap,
  .moon-body,
  .moon-body svg,
  .star,
  .shooting-star,
  .rain-drop{
    animation: none !important;
  }
}
`;

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف الأنيميشن القديم للقمر
css = css.replace(/@keyframes moonFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonDrift\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonTilt\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonPulse\s*\{[\s\S]*?\n\}/g, "");

// احذف أي motion سابق
css = css.replace(/\/\* =+\s*MOTION[\s\S]*$/m, "");

css += cssAdd;
fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: الأنيميشن العالمي مضاف");

// =====================================================
// 2) night-sky.js — إعادة كتابة كاملة
// =====================================================
const nightSky = [
'"use strict";',
'',
'const NightSky = (function () {',
'',
'  /* ===== نجوم ===== */',
'  function createStars(layer, count) {',
'    if (!layer) return;',
'    const frag = document.createDocumentFragment();',
'    for (let i = 0; i < count; i++) {',
'      const star = document.createElement("div");',
'      star.className = "star";',
'      const roll = Math.random();',
'      let cls;',
'      if (roll < 0.7) cls = "star-sm";',
'      else if (roll < 0.92) cls = "star-md";',
'      else cls = "star-lg";',
'      star.classList.add(cls);',
'      star.style.left = (Math.random() * 100) + "%";',
'      star.style.top  = (Math.random() * 100) + "%";',
'      star.style.animationDelay = (Math.random() * 4) + "s";',
'      if (Math.random() < 0.15) {',
'        star.style.background = "radial-gradient(circle, #a8c8ff, transparent 70%)";',
'      } else if (Math.random() < 0.15) {',
'        star.style.background = "radial-gradient(circle, #ffe8b8, transparent 70%)";',
'      }',
'      frag.appendChild(star);',
'    }',
'    layer.appendChild(frag);',
'  }',
'',
'  /* ===== شُهُب ===== */',
'  function startShootingStars(layer) {',
'    if (!layer) return;',
'    function spawn() {',
'      const sh = document.createElement("div");',
'      sh.className = "shooting-star";',
'      sh.style.top  = (Math.random() * 40) + "%";',
'      sh.style.left = (Math.random() * 60 + 20) + "%";',
'      sh.style.setProperty("--angle", (200 + Math.random() * 30) + "deg");',
'      layer.appendChild(sh);',
'      setTimeout(function () { sh.remove(); }, 1800);',
'      setTimeout(spawn, 5000 + Math.random() * 5000);',
'    }',
'    setTimeout(spawn, 3000);',
'  }',
'',
'  /* ===== مطر واقعي ===== */',
'  function createRain() {',
'    const layer = document.getElementById("rainLayer");',
'    if (!layer) return;',
'',
'    // 25 رقيقة (سريعة)',
'    for (let i = 0; i < 25; i++) spawnDrop(layer, "type-thin", 0.6, 1.0, 2);',
'    // 20 متوسطة',
'    for (let i = 0; i < 20; i++) spawnDrop(layer, "type-mid", 0.9, 1.4, 3);',
'    // 15 سميكة (بطيئة)',
'    for (let i = 0; i < 15; i++) spawnDrop(layer, "type-thick", 1.3, 2.0, 4);',
'',
'    console.log("✓ " + layer.children.length + " rain drops created");',
'  }',
'',
'  function spawnDrop(layer, type, minDur, maxDur, delayMax) {',
'    const d = document.createElement("div");',
'    d.className = "rain-drop " + type;',
'    d.style.left = (Math.random() * 100) + "%";',
'    d.style.top = (Math.random() * -100) + "px";',
'    d.style.animationDuration = (minDur + Math.random() * (maxDur - minDur)) + "s";',
'    d.style.animationDelay = (Math.random() * delayMax) + "s";',
'    layer.appendChild(d);',
'  }',
'',
'  /* ===== init ===== */',
'  function init() {',
'    const starsLayer = document.getElementById("starsLayer");',
'    const shootingLayer = document.getElementById("shootingStars");',
'    if (starsLayer) createStars(starsLayer, 150);',
'    if (shootingLayer) startShootingStars(shootingLayer);',
'    createRain();',
'  }',
'',
'  return { init: init };',
'',
'})();',
'',
'if (typeof window !== "undefined") {',
'  window.NightSky = NightSky;',
'  window.addEventListener("DOMContentLoaded", function () { NightSky.init(); });',
'}',
''
].join("\n");

fs.writeFileSync(path.join(WEB, "night-sky.js"), nightSky, "utf8");
console.log("✓ night-sky.js: 150 نجمة + شُهُب + 60 قطرة مطر (3 أنواع)");

console.log("\\n✅ الأنيميشن العالمي جاهز!");
console.log("  🌙 القمر: طفو + دوران + نبض");
console.log("  ⭐ النجوم: تلألؤ + 3 طبقات");
console.log("  💫 الشهب: كل 5-10 ثوانٍ");
console.log("  🌧️ المطر: 60 قطرة (3 أنواع) بزاوية ميل");