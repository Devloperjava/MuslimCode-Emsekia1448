const fs = require("fs");
const path = require("path");

const HTML = path.join(__dirname, "web", "index.html");
let html = fs.readFileSync(HTML, "utf8");

console.log("🔧 جعل splash يظهر كل فتح...\n");

// احذف الإضافة القديمة
html = html.replace(/<script>\s*\(function\(\)\s*\{[\s\S]*?splash_last_shown[\s\S]*?\}\)\(\);\s*<\/script>/g, "");

// أضف الجديدة — كل فتح
const newScript = `<script>
  (function() {
    var KEY = "splash_shown_this_session";
    var isIndex = window.location.pathname.endsWith("/index.html") ||
                  window.location.pathname.endsWith("/") ||
                  window.location.pathname === "" ||
                  window.location.pathname === "/index.html";

    // إذا كنا في index والـ splash لم يظهر في هذه الجلسة
    if (isIndex && !sessionStorage.getItem(KEY)) {
      sessionStorage.setItem(KEY, "1");
      window.location.replace("./splash.html");
    }

    // امسح العلامة عند العودة للمرة القادمة (عند إغلاق التطبيق)
    window.addEventListener("beforeunload", function() {
      // لا نحذف هنا — sessionStorage يُحذف تلقائياً عند إغلاق WebView
    });
  })();
</script>`;

html = html.replace("</head>", newScript + "\n</head>");

fs.writeFileSync(HTML, html, "utf8");
console.log("✓ web/index.html: splash يظهر كل فتح جديد");
console.log("\n📋 الآن:");
console.log("  npx cap sync && cd android && gradlew.bat assembleRelease && adb install -r app\\build\\outputs\\apk\\release\\app-release.apk");