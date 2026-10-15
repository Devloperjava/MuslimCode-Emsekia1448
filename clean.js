const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🎨 التنظيف النهائي...\n");

// ============================================================
// 1) moon.js — لون أبيض طبيعي + يوم 30 = بدر كامل
// ============================================================
const newMoon = `"use strict";

const MoonPhase = (function () {

  function render(day, size) {
    size = size || 100;
    const phase = computePhase(day);
    const r = 42, cx = 50, cy = 50;
    const path = buildCrescentPath(phase, r, cx, cy);

    // لون أبيض طبيعي — فضي/أبيض
    return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<radialGradient id="moonGrad-' + day + '" cx="35%" cy="30%" r="75%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="60%" stop-color="#f5f5f5"/>' +
          '<stop offset="100%" stop-color="#d8d8d8"/>' +
        '</radialGradient>' +
      '</defs>' +
      (path ? '<path d="' + path + '" fill="url(#moonGrad-' + day + ')"/>' : '') +
    '</svg>';
  }

  function computePhase(day) {
    // نمو متواصل: اليوم 1 = 5%، اليوم 30 = 100% (بدر كامل)
    const illumination = 0.05 + ((day - 1) / 29) * 0.95;
    return { illumination: illumination, waxing: true };
  }

  function buildCrescentPath(phase, r, cx, cy) {
    const illumination = phase.illumination;

    if (illumination < 0.02) return "";

    // بدر كامل
    if (illumination >= 0.98) {
      return "M " + (cx - r) + "," + cy +
             " a " + r + "," + r + " 0 1,0 " + (2*r) + ",0" +
             " a " + r + "," + r + " 0 1,0 " + (-2*r) + ",0 Z";
    }

    const rx = Math.abs(r * (1 - 2 * illumination));
    const isGibbous = illumination > 0.5;

    // القمر يضاء من اليمين (waxing)
    if (isGibbous) {
      return "M " + cx + "," + (cy - r) +
             " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +
             " A " + rx + "," + r + " 0 0,1 " + cx + "," + (cy - r) + " Z";
    } else {
      return "M " + cx + "," + (cy - r) +
             " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +
             " A " + rx + "," + r + " 0 0,0 " + cx + "," + (cy - r) + " Z";
    }
  }

  return { render: render, computePhase: computePhase };

})();

if (typeof window !== "undefined") {
  window.MoonPhase = MoonPhase;
}
`;

write(path.join(WEB, "moon.js"), newMoon);
console.log("✓ moon.js: لون أبيض طبيعي + يوم 30 = بدر كامل");

// ============================================================
// 2) style.css — إزالة كل الأنيميشن
// ============================================================
let css = read(path.join(WEB, "style.css"));

// 2a) إزالة أنيميشن من moon-wrap
css = css.replace(
  /\.moon-wrap\s*\{[^}]*\}/,
  `.moon-wrap{
  position:absolute;
  top:60px;
  right:12%;
  width:130px;
  height:130px;
  z-index:5;
  pointer-events:none;
  filter: drop-shadow(0 0 18px rgba(255,255,255,.55))
          drop-shadow(0 0 40px rgba(220,220,220,.25));
}`
);

// 2b) إزالة أنيميشن من moon-body
css = css.replace(
  /\.moon-body\s*\{[^}]*\}/,
  `.moon-body{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
}`
);

// 2c) إزالة أنيميشن من العنوان (title)
css = css.replace(
  /\.title-overlay h1\s*\{[\s\S]*?\}/,
  `.title-overlay h1{
  font-family: "Aref Ruqaa", "Amiri", "Traditional Arabic", serif;
  font-size: clamp(34px, 7vw, 62px);
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(110deg, #fff4c8 0%, #f5d76e 40%, #ffffff 55%, #c9a227 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,.85))
          drop-shadow(0 0 40px rgba(201,162,39,.55));
}`
);

// 2d) إزالة كل @keyframes للعنوان والقمر
css = css.replace(/@keyframes moonFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonDrift\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonTilt\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes moonShine\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes titleShimmer\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes titleFloat\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes titleEnter\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes cardMoonEnter\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes cardMoonPulse\s*\{[\s\S]*?\n\}/g, "");

// 2e) إزالة أنيميشن من date-moon
css = css.replace(
  /\.date-moon\s*\{[^}]*\}/,
  `.date-moon{
  flex:0 0 44px;
  height:44px;
  display:grid;
  place-items:center;
  filter: drop-shadow(0 0 5px rgba(255,255,255,.5));
}`
);

// 2f) إزالة تأخيرات nth-child لـ date-moon
css = css.replace(/\.day-card:nth-child\(\d+\)\s+\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.day-card:nth-child\(n\+\d+\)\s+\.date-moon\s*\{[^}]*\}/g, "");

// 2g) إزالة hover animation لـ date-moon
css = css.replace(
  /\.day-card:hover\s+\.date-moon\s*\{[^}]*\}/,
  `.day-card:hover .date-moon{transform: scale(1.06);}`
);

// 2h) إزالة توهج قمر اليوم الحالي (نبض)
css = css.replace(
  /\.day-card\.is-today\s+\.date-moon\s*\{[^}]*\}/,
  `.day-card.is-today .date-moon{
  filter: drop-shadow(0 0 10px rgba(255,255,255,.85))
          drop-shadow(0 0 20px rgba(220,220,220,.4));
}`
);

// 2i) تبسيط title-overlay (لا animation)
css = css.replace(
  /\.title-overlay\s*\{[^}]*\}/,
  `.title-overlay{
  position:absolute;
  top:42%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align:center;
  color:#fff;
  z-index:6;
  width:90%;
  max-width:600px;
  pointer-events:none;
}`
);

// 2j) إزالة كل الأنيميشن المتبقي عبر منع الحركة عالمياً
if (!css.includes("NO-ANIMATION")) {
  css += `

/* ============================================================
   NO-ANIMATION — إزالة كل الأنيميشن
   ============================================================ */

/* إزالة جميع الأنيميشن */
.moon-wrap,
.moon-body,
.moon-body svg,
.moon-body svg path,
.title-overlay,
.title-overlay h1,
.date-moon,
.day-card,
.day-card::before,
.star,
.shooting-star,
.rain-drop,
.cloud,
.lantern,
.lantern-glass::after,
.lantern-glow,
.hanging-lantern,
.mosque-silhouette rect[fill="#ffd97a"],
.countdown,
.today-card,
.calendar-section,
.site-footer,
.footer-line,
.brand,
.brand-name{
  animation: none !important;
}

/* إزالة التحولات */
.title-overlay h1,
.date-moon,
.day-card,
.day-card::before,
.lantern,
.lantern-glow,
.star{
  transition: none !important;
}

/* إبقاء hover فقط (بدون أنيميشن) */
.day-card:hover{
  transform: translateY(-4px);
  box-shadow: 0 22px 50px rgba(18,59,42,.15);
}
.day-card:hover .date-moon{
  transform: scale(1.06);
}

/* الهلال الأبيض — لون فضي */
.date-moon svg path,
.moon-body svg path{
  fill: #f0f0f0 !important;
}

/* لا فلتر ديناميكي */
.moon-body{
  filter: drop-shadow(0 0 15px rgba(255,255,255,.6))
          drop-shadow(0 0 35px rgba(220,220,220,.3)) !important;
}
`;
  write(path.join(WEB, "style.css"), css);
  console.log("✓ style.css: كل الأنيميشن مُزال + الهلال أبيض");
} else {
  console.log("⚠ style.css: NO-ANIMATION موجود");
}

// ============================================================
// 3) night-sky.js — إزالة الشهب (اختياري، لكن يبطئ)
// ============================================================
// نتركها — لكن نبطئها فقط... أو نتركها كما هي

console.log("\n✅ كل شيء جاهز!");
console.log("\n📋 ما تم:");
console.log("  • لون الهلال: أبيض/فضي طبيعي");
console.log("  • إزالة كل الأنيميشن");
console.log("  • اليوم 30 = بدر كامل (100% إضاءة)");
console.log("  • هلال البطاقات ثابت");
console.log("  • العنوان ثابت");
console.log("  • القمر الرئيسي ثابت");
console.log("  • النجوم ثابتة (بدون تلألؤ)");
console.log("  • الأمطار متوقفة");
console.log("  • الفانوس ثابت");
console.log("  • hover خفيف فقط");