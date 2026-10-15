const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
const CSS_FILE = path.join(WEB, "style.css");

console.log("🧹 تنظيف CSS من التكرارات...\n");

let css = fs.readFileSync(CSS_FILE, "utf8");
const before = css.length;

// ============================================================
// 1) احذف كل تعريفات .rain-drop المتكررة
// ============================================================
css = css.replace(/\.rain-drop\{[^}]*\}/g, "");
css = css.replace(/\.rain-drop\s*\{[\s\S]*?\n\}/g, "");

// 2) احذف كل @keyframes rainFall
css = css.replace(/@keyframes\s+rainFall\s*\{[\s\S]*?\n\}/g, "");

// 3) احذف كل @keyframes moonFloat / moonDrift / moonTilt / moonPulse
css = css.replace(/@keyframes\s+moonFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonDrift\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonTilt\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+moonPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+haloPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+glowPulse\s*\{[\s\S]*?\n\}/g, "");

// 4) احذف كل @keyframes starTwinkle
css = css.replace(/@keyframes\s+starTwinkle\s*\{[\s\S]*?\n\}/g, "");

// 5) احذف كل @keyframes shoot
css = css.replace(/@keyframes\s+shoot\s*\{[\s\S]*?\n\}/g, "");

// 6) احذف كل تعريفات .star المكررة (نحتفظ فقط بالأنيميشن)
css = css.replace(/\.star\{[^}]*animation:[^}]*\}/g, "");
css = css.replace(/\.star-sm\{[^}]*\}/g, "");
css = css.replace(/\.star-md\{[^}]*\}/g, "");
css = css.replace(/\.star-lg\{[^}]*\}/g, "");

// 7) احذف تعريفات moon-wrap / moon-body القديمة
css = css.replace(/\.moon-wrap\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/\.moon-body\s*\{[\s\S]*?\n\}/g, "");

// 8) احذف تعريف .shooting-star القديم
css = css.replace(/\.shooting-star\s*\{[\s\S]*?\n\}/g, "");

// 9) احذف كل قسم MOTION القديم
css = css.replace(/\/\* =+\s*MOTION[\s\S]*$/m, "");

const after = css.length;
console.log("  حُذف: " + (before - after) + " حرف من التكرارات");

// ============================================================
// 10) أضف قسم أنيميشن نظيف نهائي
// ============================================================
css += `

/* ============================================================
   FINAL-ANIMATIONS — نسخة نهائية نظيفة
   ============================================================ */

/* ===== MOON ===== */
.moon-wrap{
  position:absolute;
  top:60px;
  right:12%;
  width:130px;
  height:130px;
  z-index:5;
  pointer-events:none;
  animation: moonFloat 8s ease-in-out infinite,
             moonDrift 25s ease-in-out infinite;
  will-change: transform;
}

.moon-body{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  animation: moonTilt 10s ease-in-out infinite;
  filter: drop-shadow(0 0 15px rgba(255,255,255,.75))
          drop-shadow(0 0 40px rgba(255,255,255,.35));
  will-change: transform, filter;
}

.moon-body svg{
  animation: moonPulse 4s ease-in-out infinite;
  will-change: filter;
}

@keyframes moonFloat{
  0%,100%{transform: translateY(0)}
  50%    {transform: translateY(-12px)}
}
@keyframes moonDrift{
  0%,100%{margin-right: 0}
  50%    {margin-right: -14px}
}
@keyframes moonTilt{
  0%,100%{transform: rotate(0deg) scale(1)}
  25%    {transform: rotate(-1.5deg) scale(1.02)}
  50%    {transform: rotate(0deg) scale(1.035)}
  75%    {transform: rotate(1.5deg) scale(1.02)}
}
@keyframes moonPulse{
  0%,100%{filter: drop-shadow(0 0 12px rgba(255,255,255,.7))
                    drop-shadow(0 0 30px rgba(255,255,255,.3))
                    brightness(1)}
  50%    {filter: drop-shadow(0 0 22px rgba(255,255,255,1))
                    drop-shadow(0 0 55px rgba(255,255,255,.5))
                    brightness(1.15)}
}

/* ===== STARS ===== */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle, #fff, rgba(255,255,255,.4) 60%, transparent 70%);
  animation: starTwinkle infinite ease-in-out;
  will-change: opacity, transform;
}
.star-sm{width:2px;height:2px;animation-duration:3s}
.star-md{width:3px;height:3px;animation-duration:4s;animation-delay:0.5s;box-shadow:0 0 4px rgba(255,255,255,.6)}
.star-lg{
  width:4px;height:4px;animation-duration:2.5s;animation-delay:1s;
  box-shadow: 0 0 8px #fff, 0 0 16px rgba(255,255,255,.6), 0 0 28px rgba(255,255,255,.3);
}

@keyframes starTwinkle{
  0%,100%{opacity: 0.3;transform: scale(1)}
  50%    {opacity: 1;  transform: scale(1.4)}
}

/* ===== SHOOTING STARS ===== */
.shooting-star{
  position:absolute;
  width:120px;
  height:2px;
  background:linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(255,255,255,0));
  border-radius:2px;
  transform-origin:right center;
  transform:rotate(var(--angle, 210deg)) translateX(-160px);
  opacity:0;
  filter:drop-shadow(0 0 4px rgba(255,255,255,.7));
  animation: shoot 1.6s cubic-bezier(.4,0,.6,1) forwards;
}

@keyframes shoot{
  0%{opacity:0;transform:rotate(var(--angle, 210deg)) translateX(-160px) scaleX(.3)}
  10%{opacity:1}
  100%{opacity:0;transform:rotate(var(--angle, 210deg)) translateX(240px) scaleX(1)}
}

/* ===== RAIN (3 أنواع) ===== */
.rain{
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:7;
  overflow:hidden;
}

.rain-drop{
  position:absolute;
  border-radius:2px;
  animation: rainFall linear infinite;
  will-change: transform, opacity;
}

.rain-drop.type-thin{
  width:1px;
  height:22px;
  background:linear-gradient(180deg,
    rgba(200,225,255,0) 0%,
    rgba(220,235,255,.85) 50%,
    rgba(200,225,255,0) 100%);
  filter: blur(0.2px);
}

.rain-drop.type-mid{
  width:1.5px;
  height:32px;
  background:linear-gradient(180deg,
    rgba(180,215,255,0) 0%,
    rgba(210,230,255,.9) 50%,
    rgba(180,215,255,0) 100%);
  filter: blur(0.4px);
}

.rain-drop.type-thick{
  width:2.5px;
  height:50px;
  background:linear-gradient(180deg,
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

/* إيقاف عند التفضيل */
@media(prefers-reduced-motion:reduce){
  .moon-wrap, .moon-body, .moon-body svg,
  .star, .shooting-star, .rain-drop{
    animation: none !important;
  }
}
`;

fs.writeFileSync(CSS_FILE, css, "utf8");
console.log("✓ style.css: أُعيد كتابته بـ " + css.length + " حرف");
console.log("  حُذفت كل التكرارات");
console.log("  أُضيف قسم FINAL-ANIMATIONS النظيف");
console.log("\n✅ جاهز!");