const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 إزالة تعارض Toggle — نسخة واحدة نظيفة\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// ============================================================
// 1) احذف كل إضافات DARK-MODE السابقة
// ============================================================
app = app.replace(/\/\* DARK-MODE \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* DARK-MODE-FIX \*\/[\s\S]*?(?=\/\*|$)/g, "");
app = app.replace(/\/\* DARK-MODE-FINAL \*\/[\s\S]*?(?=\/\*|$)/g, "");
console.log("✓ app.js: حُذفت الإضافات القديمة");

// ============================================================
// 2) أضف نسخة واحدة نظيفة
// ============================================================
app += `

/* DARK-MODE-FINAL */
(function darkModeFinal(){
  var KEY = "mc_theme";
  var body = document.body;

  // ===== تطبيق الوضع =====
  function apply(isDark){
    if (isDark) {
      body.classList.add("dark-mode");
      localStorage.setItem(KEY, "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem(KEY, "light");
    }
  }

  // ===== كشف التفضيل =====
  function detect(){
    var saved = localStorage.getItem(KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
    var hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  }

  // ===== التهيئة =====
  function init(){
    var btn = document.getElementById("themeToggle");
    if (!btn) {
      setTimeout(init, 300);
      return;
    }

    // تطبيق الوضع المحفوظ
    apply(detect());

    // ربط الزر
    btn.onclick = function(e){
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      var current = body.classList.contains("dark-mode");
      apply(!current);
    };

    console.log("✓ Dark mode toggle ready. Current:", body.classList.contains("dark-mode"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: DARK-MODE-FINAL مضاف (نسخة واحدة)");

console.log("\\n✅ تم!");
console.log("  • 🧹 حُذفت كل الإضافات القديمة");
console.log("  • ✅ نسخة واحدة نظيفة");
console.log("  • 🔧 الزر يبدّل الوضع بشكل صحيح");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");