const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 المرحلة A — الوضع الليلي + Toggle\n");

// ============================================================
// 1) index.html — إضافة زر Toggle
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي زر سابق
html = html.replace(/<!-- THEME-TOGGLE -->[\s\S]*?<!-- \/THEME-TOGGLE -->\s*/g, "");

// ضع الزر قبل title-overlay
const toggleBtn = `<!-- THEME-TOGGLE -->
    <button class="theme-toggle" id="themeToggle" aria-label="تبديل الوضع الليلي">
      <span class="theme-icon-light">☀️</span>
      <span class="theme-icon-dark">🌙</span>
    </button>
    <!-- /THEME-TOGGLE -->

    `;

html = html.replace(
  /(<div class="title-overlay">)/,
  toggleBtn + "$1"
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: زر Toggle مضاف");

// ============================================================
// 2) style.css — تنسيق الزر + الوضع الليلي
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*STAGE-A-DARKMODE[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   STAGE-A-DARKMODE — الوضع الليلي + Toggle
   ============================================================ */

/* ===== زر Toggle ===== */
.theme-toggle{
  position:absolute;
  top:20px;
  left:20px;
  width:52px;
  height:52px;
  border-radius:50%;
  background:rgba(255,255,255,.12);
  backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
  border:1.5px solid rgba(201,162,39,.5);
  cursor:pointer;
  z-index:100;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all .4s cubic-bezier(.2,.8,.2,1);
  box-shadow:0 4px 16px rgba(0,0,0,.3),
             0 0 0 4px rgba(201,162,39,.08);
  font-size:22px;
  line-height:1;
}

.theme-toggle:hover{
  transform:scale(1.1) rotate(15deg);
  box-shadow:0 8px 24px rgba(0,0,0,.4),
             0 0 0 6px rgba(201,162,39,.15);
  background:rgba(255,255,255,.18);
}

.theme-toggle:active{
  transform:scale(.95);
}

.theme-icon-light,
.theme-icon-dark{
  position:absolute;
  transition:all .5s cubic-bezier(.2,.8,.2,1);
}

/* النهاري — يظهر ☀️ */
.theme-icon-light{
  opacity:1;
  transform:rotate(0) scale(1);
}

.theme-icon-dark{
  opacity:0;
  transform:rotate(-180deg) scale(.5);
}

/* الليلي — يظهر 🌙 */
body.dark-mode .theme-icon-light{
  opacity:0;
  transform:rotate(180deg) scale(.5);
}

body.dark-mode .theme-icon-dark{
  opacity:1;
  transform:rotate(0) scale(1);
}

/* ===== الوضع الليلي — Dark Mode ===== */

/* خلفية الهيدر — أغمق */
body.dark-mode{
  background:#020608 !important;
}

body.dark-mode .sky{
  background:
    radial-gradient(ellipse at 50% 0%, #0a1a2e 0%, #050d1a 50%, #020608 100%) !important;
}

/* المسجد — أكثر إشراقاً */
body.dark-mode .mosque-silhouette svg{
  filter:brightness(1.15) contrast(1.1) !important;
}

/* المربعات — فضية */
body.dark-mode .rc-part{
  background:linear-gradient(145deg,
    rgba(200,212,207,.15),
    rgba(232,240,238,.08)) !important;
  border:1px solid rgba(200,212,207,.3) !important;
  box-shadow:
    0 4px 12px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.1) !important;
}

body.dark-mode .rc-num{
  color:#e8f0ee !important;
  text-shadow:
    0 0 12px rgba(232,240,238,.7),
    0 0 24px rgba(232,240,238,.4) !important;
}

body.dark-mode .rc-unit{
  color:rgba(232,240,238,.8) !important;
}

body.dark-mode .rc-sep{
  color:rgba(200,212,207,.7) !important;
}

/* العدّاد — خلفية أفتح قليلاً */
body.dark-mode .ramadan-counter{
  background:linear-gradient(145deg,#0a1a2e,#050d1a) !important;
  border:1px solid rgba(200,212,207,.2) !important;
  box-shadow:0 20px 50px rgba(0,0,0,.6),
             0 0 40px rgba(74,154,146,.15) !important;
}

/* الجملة — أفتح */
body.dark-mode .rc-typewriter{
  filter:
    drop-shadow(0 0 12px rgba(232,240,238,.6))
    drop-shadow(0 0 25px rgba(200,212,207,.35)) !important;
}

/* البطاقات — فضية شفافة */
body.dark-mode .day-card{
  background:linear-gradient(180deg,
    rgba(200,212,207,.08),
    rgba(232,240,238,.04)) !important;
  border:1px solid rgba(200,212,207,.25) !important;
  box-shadow:
    0 6px 20px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(255,255,255,.05) !important;
}

body.dark-mode .day-card.is-today{
  background:linear-gradient(180deg,
    rgba(245,215,110,.1),
    rgba(232,240,238,.05)) !important;
  border:2px solid rgba(245,215,110,.5) !important;
  box-shadow:0 14px 38px rgba(245,215,110,.2) !important;
}

body.dark-mode .date-label{
  color:#e8f0ee !important;
  text-shadow:0 0 8px rgba(232,240,238,.3) !important;
}

body.dark-mode .date-gregorian{
  color:rgba(232,240,238,.85) !important;
}

/* المربعات الصغيرة (المواقيت) */
body.dark-mode .prayer{
  background:linear-gradient(145deg,
    rgba(200,212,207,.1),
    rgba(232,240,238,.05)) !important;
  border:1px solid rgba(200,212,207,.25) !important;
  box-shadow:
    0 3px 10px rgba(0,0,0,.35),
    inset 0 1px 0 rgba(255,255,255,.08) !important;
}

body.dark-mode .prayer strong{
  color:#c8d4cf !important;
}

body.dark-mode .prayer span{
  color:#ffffff !important;
  text-shadow:0 0 8px rgba(232,240,238,.4) !important;
}

body.dark-mode .prayer.is-next{
  background:linear-gradient(145deg,
    rgba(245,215,110,.2),
    rgba(245,215,110,.1)) !important;
  border-color:rgba(245,215,110,.6) !important;
  box-shadow:0 6px 18px rgba(245,215,110,.25) !important;
}

body.dark-mode .prayer.is-next strong{
  color:#fff4c8 !important;
}

body.dark-mode .prayer.is-next span{
  color:#fff4c8 !important;
}

/* الفوتر — أغمق */
body.dark-mode .site-footer{
  background:transparent !important;
}

/* الآية — فضي لامع */
body.dark-mode .ayah-v2-content{
  color:#c8d4cf !important;
  -webkit-text-fill-color:#c8d4cf !important;
  filter:
    drop-shadow(0 2px 12px rgba(200,212,207,.6))
    drop-shadow(0 0 25px rgba(232,240,238,.4)) !important;
  text-shadow:
    0 0 15px rgba(232,240,238,.4),
    0 0 30px rgba(200,212,207,.25) !important;
}

body.dark-mode .ayah-v2-open,
body.dark-mode .ayah-v2-close{
  color:#f5d76e !important;
  filter:drop-shadow(0 2px 8px rgba(245,215,110,.5)) !important;
}

body.dark-mode .ayah-v2-source{
  color:#c8d4cf !important;
  opacity:0.9 !important;
}

body.dark-mode .ayah-v2-ornament{
  color:#c8d4cf !important;
  text-shadow:0 0 10px rgba(200,212,207,.5) !important;
}

body.dark-mode .footer-line{
  background:linear-gradient(90deg, transparent, rgba(200,212,207,.6), transparent) !important;
}

body.dark-mode .brand-name{
  filter:
    drop-shadow(0 3px 12px rgba(200,212,207,.4))
    drop-shadow(0 0 20px rgba(200,212,207,.2))
    brightness(1.15) !important;
}

/* العنوان في الهيدر — أفتح */
body.dark-mode .title-overlay h1{
  filter:
    drop-shadow(0 4px 20px rgba(0,0,0,.9))
    drop-shadow(0 0 40px rgba(201,162,39,.6)) !important;
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .theme-toggle{
    top:15px;
    left:15px;
    width:44px;
    height:44px;
    font-size:18px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: STAGE-A-DARKMODE مضاف");

// ============================================================
// 3) app.js — Toggle + Auto Detect
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* DARK-MODE \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* DARK-MODE */
(function darkMode(){
  var KEY = "mc_theme";
  var body = document.body;

  // ===== تطبيق الوضع =====
  function applyTheme(isDark){
    if (isDark) {
      body.classList.add("dark-mode");
      localStorage.setItem(KEY, "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem(KEY, "light");
    }
  }

  // ===== كشف التفضيل أو الوقت =====
  function detectTheme(){
    var saved = localStorage.getItem(KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;

    // تلقائي — حسب الوقت (6 صباحاً → 6 مساءً = نهاري)
    var hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  }

  // ===== تشغيل =====
  function init(){
    var btn = document.getElementById("themeToggle");
    var isDark = detectTheme();

    applyTheme(isDark);

    if (btn) {
      btn.addEventListener("click", function(){
        var current = body.classList.contains("dark-mode");
        applyTheme(!current);
      });
    }

    // فحص كل ساعة — للتبديل التلقائي
    setInterval(function(){
      var saved = localStorage.getItem(KEY);
      if (saved) return; // المستخدم اختار يدوياً
      var hour = new Date().getHours();
      applyTheme(hour >= 19 || hour < 6);
    }, 60 * 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: DARK-MODE مضاف");

console.log("\\n✅ المرحلة A — مكتملة:");
console.log("  • 🌙 زر Toggle (☀️/🌙)");
console.log("  • 🎨 الوضع الليلي كامل");
console.log("  • ⏱️ المربعات فضية في الليلي");
console.log("  • 📖 الآية فضي لامع في الليلي");
console.log("  • 💾 حفظ التفضيل في localStorage");
console.log("  • ⏰ تبديل تلقائي (6م-6ص = ليلي)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");