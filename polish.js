const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🎨 تلميع الهلال — حذف القرص + أنيميشن عالمي\n");

// ============================================================
// 1) index.html — حذف halo و glow-pulse نهائياً
// ============================================================
let html = read(path.join(WEB, "index.html"));

// احذف <div class="moon-halo"></div>
html = html.replace(/<div class="moon-halo"><\/div>\s*/g, "");

// احذف <div class="moon-glow-pulse"></div>
html = html.replace(/<div class="moon-glow-pulse"><\/div>\s*/g, "");

write(path.join(WEB, "index.html"), html);
console.log("✓ index.html: حُذف القرص المحيط والهالة النابضة");

// ============================================================
// 2) style.css — إزالة halo القديم + إضافة أنيميشن عالمي
// ============================================================
let css = read(path.join(WEB, "style.css"));

// إزالة تعليمات moon-halo / moon-glow-pulse القديمة
css = css.replace(/\.moon-halo\s*\{[^}]*\}/g, ".moon-halo{display:none}");
css = css.replace(/\.moon-glow-pulse\s*\{[^}]*\}/g, ".moon-glow-pulse{display:none}");
css = css.replace(/@keyframes haloPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes glowPulse\s*\{[\s\S]*?\n\}/g, "");

// إزالة الأنيميشن القديم من moon-wrap
css = css.replace(
  /\.moon-wrap\s*\{[^}]*\}/,
  `.moon-wrap{
  position:absolute;
  top:60px;
  right:12%;
  width:130px;
  height:130px;
  z-index:5;
  will-change:transform;
  animation: moonFloat 9s ease-in-out infinite,
             moonDrift 28s ease-in-out infinite;
  pointer-events:none;
  filter: drop-shadow(0 0 20px rgba(255,220,120,.7))
          drop-shadow(0 0 50px rgba(255,200,80,.35));
}`
);

// إزالة أي فلتر قديم من moon-body
css = css.replace(
  /\.moon-body\s*\{[^}]*\}/,
  `.moon-body{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  animation: moonTilt 12s ease-in-out infinite,
             moonPulse 4s ease-in-out infinite;
  will-change:transform, filter;
}`
);

// ==== إضافة قسم جديد: أنيميشن عالمي ====
if (!css.includes("MOON-PREMIUM")) {
  css += `

/* ============================================================
   MOON-PREMIUM — أنيميشن عالمي للهلال
   ============================================================ */

/* طفو ناعم (موجّة) */
@keyframes moonFloat{
  0%,100%{transform:translateY(0) rotate(0deg)}
  20%    {transform:translateY(-8px)  rotate(-1.5deg)}
  40%    {transform:translateY(-14px) rotate(-0.5deg)}
  60%    {transform:translateY(-10px) rotate(0.8deg)}
  80%    {transform:translateY(-4px)  rotate(1.2deg)}
}

/* انحراف جانبي بطيء */
@keyframes moonDrift{
  0%,100%{margin-right:0}
  50%    {margin-right:-18px}
}

/* دوران 3D وهمي */
@keyframes moonTilt{
  0%,100%{transform:rotate(0deg)    scale(1)}
  25%    {transform:rotate(-2.5deg) scale(1.02)}
  50%    {transform:rotate(0deg)    scale(1.045)}
  75%    {transform:rotate(2.5deg)  scale(1.02)}
}

/* نبض قوة الضوء */
@keyframes moonPulse{
  0%,100%{
    filter: drop-shadow(0 0 12px rgba(255,220,140,.7))
            drop-shadow(0 0 28px rgba(255,200,80,.4))
            brightness(1);
  }
  50%{
    filter: drop-shadow(0 0 22px rgba(255,230,150,1))
            drop-shadow(0 0 50px rgba(255,210,90,.65))
            brightness(1.18);
  }
}

/* وميض على السطح (للـ SVG الداخلي) */
.moon-body svg path{
  animation: moonShine 5s ease-in-out infinite;
}

@keyframes moonShine{
  0%,100%{opacity:1}
  50%    {opacity:.92}
}

/* ============================================================
   MOON-IN-CARD — أنيميشن لكل هلال بطاقة
   ============================================================ */

.date-moon{
  flex:0 0 44px;
  height:44px;
  display:grid;
  place-items:center;
  filter: drop-shadow(0 0 6px rgba(255,220,120,.55))
          drop-shadow(0 0 12px rgba(255,200,80,.25));
  animation: cardMoonEnter .9s cubic-bezier(.2,.8,.2,1) both,
             cardMoonPulse 3.5s ease-in-out infinite;
  transition: transform .35s ease;
  will-change: transform, filter;
}

/* تأخير متتالي — كل بطاقة تدخل بعد الأخرى */
.day-card:nth-child(1)  .date-moon{animation-delay:0.05s,0s}
.day-card:nth-child(2)  .date-moon{animation-delay:0.10s,0.2s}
.day-card:nth-child(3)  .date-moon{animation-delay:0.15s,0.4s}
.day-card:nth-child(4)  .date-moon{animation-delay:0.20s,0.6s}
.day-card:nth-child(5)  .date-moon{animation-delay:0.25s,0.8s}
.day-card:nth-child(6)  .date-moon{animation-delay:0.30s,1.0s}
.day-card:nth-child(7)  .date-moon{animation-delay:0.35s,1.2s}
.day-card:nth-child(8)  .date-moon{animation-delay:0.40s,1.4s}
.day-card:nth-child(9)  .date-moon{animation-delay:0.45s,1.6s}
.day-card:nth-child(10) .date-moon{animation-delay:0.50s,1.8s}
.day-card:nth-child(n+11) .date-moon{animation-delay:0.55s,0s}

.date-moon svg{
  width:100%;
  height:100%;
  filter: drop-shadow(0 0 3px rgba(255,220,140,.6));
}

/* دخول بانسياب */
@keyframes cardMoonEnter{
  from{
    opacity:0;
    transform: scale(.4) rotate(-40deg);
    filter: drop-shadow(0 0 0 rgba(255,220,120,0)) blur(4px);
  }
  to{
    opacity:1;
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 6px rgba(255,220,120,.55))
            drop-shadow(0 0 12px rgba(255,200,80,.25)) blur(0);
  }
}

/* نبض ضوئي مستمر */
@keyframes cardMoonPulse{
  0%,100%{
    filter: drop-shadow(0 0 5px rgba(255,220,120,.5))
            drop-shadow(0 0 10px rgba(255,200,80,.2))
            brightness(1);
    transform: scale(1);
  }
  50%{
    filter: drop-shadow(0 0 10px rgba(255,230,150,.9))
            drop-shadow(0 0 22px rgba(255,210,90,.5))
            brightness(1.15);
    transform: scale(1.06);
  }
}

/* عند hover على البطاقة — يكبر الهلال */
.day-card:hover .date-moon{
  animation-play-state:paused;
  transform: scale(1.18) rotate(8deg);
  filter: drop-shadow(0 0 14px rgba(255,230,150,1))
          drop-shadow(0 0 28px rgba(255,200,80,.7))
          brightness(1.25);
}

/* قمر اليوم الحالي — توهج مضاعف */
.day-card.is-today .date-moon{
  filter: drop-shadow(0 0 12px rgba(255,230,150,1))
          drop-shadow(0 0 24px rgba(255,210,90,.7))
          brightness(1.2);
  animation: cardMoonEnter .9s cubic-bezier(.2,.8,.2,1) both,
             cardMoonPulse 2.2s ease-in-out infinite;
}

/* احترام تفضيل المستخدم */
@media(prefers-reduced-motion:reduce){
  .moon-wrap, .moon-body, .date-moon{animation:none!important}
}
`;
  write(path.join(WEB, "style.css"), css);
  console.log("✓ style.css: أنيميشن عالمي مضاف");
} else {
  console.log("⚠ style.css: MOON-PREMIUM موجود");
}

// ============================================================
// 3) moon.js — إزالة الفلتر الداخلي (الشمس)
// ============================================================
let moon = read(path.join(WEB, "moon.js"));

// احذف filter filter:
moon = moon.replace(/\s*filter="url\(#moonGlow-[^"]+\)"/g, "");

// احذف تعريف filter من defs
moon = moon.replace(
  /'<filter id="moonGlow-' \+ day \+ '"[\s\S]*?'<\/filter>' \+/,
  ""
);

write(path.join(WEB, "moon.js"), moon);
console.log("✓ moon.js: حُذف الفلتر الداخلي (الشمس)");

console.log("\n✅ كل شيء جاهز!");
console.log("\n📋 ما تم:");
console.log("  • حذف الدائرة المحيطة بالهلال (moon-halo)");
console.log("  • حذف النبض الخارجي (moon-glow-pulse)");
console.log("  • حذف الفلتر الداخلي (الشمس)");
console.log("  • إضافة 6 أنيميشن للهلال الرئيسي");
console.log("  • إضافة 2 أنيميشن لكل بطاقة يوم");
console.log("  • تأثير hover تفاعلي");