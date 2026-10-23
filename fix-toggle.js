const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔽 تقليل حجم الزر + ضمان التبديل\n");

// ============================================================
// 1) style.css — تصغير الزر + زر أكبر عند اللمس
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريف theme-toggle القديم
css = css.replace(/\.theme-toggle\s*\{[^}]*\}/g, "");
css = css.replace(/\.theme-toggle:hover\s*\{[^}]*\}/g, "");
css = css.replace(/\.theme-toggle:active\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.theme-toggle\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   THEME-TOGGLE-V2 — زر أصغر + تبديل مضمون
   ============================================================ */

.theme-toggle{
  position:fixed !important;
  top:14px !important;
  left:14px !important;
  width:40px !important;
  height:40px !important;
  border-radius:50% !important;
  background:rgba(255,255,255,.15) !important;
  backdrop-filter:blur(10px) !important;
  -webkit-backdrop-filter:blur(10px) !important;
  border:1.5px solid rgba(201,162,39,.5) !important;
  cursor:pointer !important;
  z-index:9999 !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  transition:all .3s cubic-bezier(.2,.8,.2,1) !important;
  box-shadow:0 4px 12px rgba(0,0,0,.3) !important;
  font-size:18px !important;
  line-height:1 !important;
  padding:0 !important;
  -webkit-tap-highlight-color:transparent !important;
  user-select:none !important;
}

.theme-toggle:hover{
  transform:scale(1.08) !important;
  background:rgba(255,255,255,.22) !important;
}

.theme-toggle:active{
  transform:scale(.92) !important;
}

/* في الوضع الليلي — زر أوضح */
body.dark-mode .theme-toggle{
  background:rgba(200,212,207,.15) !important;
  border-color:rgba(200,212,207,.6) !important;
  box-shadow:
    0 4px 12px rgba(0,0,0,.4),
    0 0 20px rgba(200,212,207,.3) !important;
}

/* استجابة للهاتف */
@media (max-width: 600px){
  .theme-toggle{
    width:36px !important;
    height:36px !important;
    top:10px !important;
    left:10px !important;
    font-size:16px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: theme-toggle-v2 (40px)");

// ============================================================
// 2) app.js — ضمان التبديل (إضافة onclick مباشر)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* DARK-MODE-FIX \*\/[\s\S]*?(?=\/\*|$)/g, "");

app += `

/* DARK-MODE-FIX */
(function darkModeFix(){
  var KEY = "mc_theme";

  function apply(isDark){
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem(KEY, "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem(KEY, "light");
    }
  }

  function init(){
    var btn = document.getElementById("themeToggle");
    if (!btn) {
      setTimeout(init, 300);
      return;
    }

    // إضافة onclick مباشر (أقوى من addEventListener)
    btn.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      var isDark = document.body.classList.contains("dark-mode");
      apply(!isDark);
    };

    // دعم اللمس
    btn.addEventListener("touchstart", function(e){
      btn.style.transform = "scale(0.92)";
    }, { passive: true });

    btn.addEventListener("touchend", function(e){
      btn.style.transform = "";
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: DARK-MODE-FIX (onclick مباشر)");

console.log("\\n✅ التعديلات:");
console.log("  • 🔽 الزر: 40px (من 52px)");
console.log("  • 📍 موضع: fixed (10px من الأعلى)");
console.log("  • 🔄 التبديل: onclick مباشر");
console.log("  • 📱 دعم اللمس");
console.log("  • 🚫 لا يمس أي ميزة أخرى");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");