const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
const HTML = path.join(WEB, "index.html");

let html = fs.readFileSync(HTML, "utf8");

// ============ 1) استبدل SVG المسجد بـ SVG أكثر مرونة ============
const oldSvgRegex = /<div class="mosque-silhouette">[\s\S]*?<\/div>/;

const newMosque = `<div class="mosque-silhouette">
      <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mosqueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a5f8a"/>
            <stop offset="100%" stop-color="#0f2a4a"/>
          </linearGradient>
          <linearGradient id="domeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4a7099"/>
            <stop offset="100%" stop-color="#152e52"/>
          </linearGradient>
        </defs>

        <!-- القاعدة -->
        <rect x="0" y="270" width="1000" height="30" fill="url(#mosqueGrad)"/>

        <!-- المسجد الرئيسي — أكبر وأوضح -->
        <g fill="url(#mosqueGrad)">
          <!-- جسم المسجد -->
          <rect x="300" y="140" width="420" height="130" rx="6"/>

          <!-- القبة الكبيرة -->
          <path d="M395,140 Q510,30 625,140 Z" fill="url(#domeGrad)"/>
          <!-- سارية القبة -->
          <rect x="507" y="18" width="5" height="22"/>
          <circle cx="510" cy="14" r="6"/>

          <!-- المأذنة الواحدة (يمين) -->
          <rect x="740" y="60" width="34" height="210"/>
          <!-- شرفة المأذنة -->
          <rect x="732" y="105" width="50" height="10" rx="3"/>
          <rect x="732" y="180" width="50" height="8" rx="3"/>
          <!-- قمة المأذنة -->
          <path d="M740,60 L757,15 L774,60 Z"/>
          <!-- سارية المأذنة -->
          <rect x="755" y="2" width="4" height="14"/>
          <circle cx="757" cy="-2" r="4"/>

          <!-- قبة صغيرة يسار -->
          <path d="M280,140 Q310,100 340,140 Z"/>
        </g>

        <!-- النوافذ المضيئة -->
        <g fill="#ffd97a" opacity="0.95">
          <rect x="340" y="185" width="16" height="45" rx="8"/>
          <rect x="390" y="185" width="16" height="45" rx="8"/>
          <rect x="440" y="185" width="16" height="45" rx="8"/>
          <rect x="570" y="185" width="16" height="45" rx="8"/>
          <rect x="620" y="185" width="16" height="45" rx="8"/>
          <rect x="670" y="185" width="16" height="45" rx="8"/>
          <!-- الباب الرئيسي -->
          <rect x="488" y="205" width="44" height="65" rx="22"/>
        </g>

        <!-- هلال فوق المأذنة -->
        <g fill="#ffd97a">
          <circle cx="757" cy="-2" r="6"/>
          <circle cx="760" cy="-3" r="5" fill="url(#mosqueGrad)"/>
        </g>
      </svg>
    </div>`;

html = html.replace(oldSvgRegex, newMosque);
fs.writeFileSync(HTML, html, "utf8");
console.log("✓ index.html: المسجد محدّث (أكبر + responsive)");

// ============ 2) CSS — املأ العرض ============
const CSS = path.join(WEB, "style.css");
let css = fs.readFileSync(CSS, "utf8");

// احذف أي تعريف قديم
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");

// أضف التعريف الجديد في النهاية (ليتغلب)
css += `

/* ============================================================
   MOSQUE-RESPONSIVE — يملأ الشاشة تلقائياً
   ============================================================ */

.mosque-silhouette{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 42vh;
  min-height: 220px;
  max-height: 380px;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  filter: drop-shadow(0 -10px 30px rgba(0,0,0,.55));
}

.mosque-silhouette svg{
  width: 100%;
  height: 100%;
  display: block;
}

/* شاشات صغيرة */
@media (max-width: 600px){
  .mosque-silhouette{
    height: 38vh;
    min-height: 200px;
  }
}

/* شاشات صغيرة جداً */
@media (max-width: 380px){
  .mosque-silhouette{
    height: 34vh;
    min-height: 180px;
  }
}
`;

fs.writeFileSync(CSS, css, "utf8");
console.log("✓ style.css: mosque-responsive مضاف");

// ============ 3) sky (خلفية) — املأ الشاشة ============
css = fs.readFileSync(CSS, "utf8");

if (!css.includes("SKY-RESPONSIVE")) {
  css += `

/* SKY-RESPONSIVE */
.sky{
  height: 520px;
}

@media (max-width: 800px){
  .sky{height: 480px}
}

@media (max-width: 600px){
  .sky{height: 55vh; min-height: 400px}
}

@media (max-width: 380px){
  .sky{height: 52vh; min-height: 360px}
}
`;
  fs.writeFileSync(CSS, css, "utf8");
  console.log("✓ sky-responsive مضاف");
}

console.log("\\n✅ كل شيء جاهز!");