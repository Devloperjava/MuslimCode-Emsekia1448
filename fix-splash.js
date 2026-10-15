const fs = require("fs");
const path = require("path");

const HTML = path.join(__dirname, "web", "index.html");
let html = fs.readFileSync(HTML, "utf8");

console.log("🔧 إصلاح splash redirect...\n");

// احذف الإضافة القديمة
html = html.replace(/<script>\s*if \(window\.location\.pathname\.endsWith\("\/index\.html"\)[\s\S]*?<\/script>/g, "");

// أضف جديدة — localStorage + timestamp (كل 6 ساعات)
const newScript = `<script>
  (function() {
    var KEY = "splash_last_shown";
    var INTERVAL = 6 * 60 * 60 * 1000; // 6 ساعات
    var lastShown = parseInt(localStorage.getItem(KEY) || "0", 10);
    var now = Date.now();
    var isIndex = window.location.pathname.endsWith("/index.html") ||
                  window.location.pathname.endsWith("/") ||
                  window.location.pathname === "";
    if (isIndex && (now - lastShown) > INTERVAL) {
      localStorage.setItem(KEY, String(now));
      window.location.replace("./splash.html");
    }
  })();
</script>`;

html = html.replace("</head>", newScript + "\n</head>");

fs.writeFileSync(HTML, html, "utf8");
console.log("✓ web/index.html: تم تحديث splash redirect");
console.log("\n📋 الآن نفّذ:");
console.log("  npx cap sync && cd android && gradlew.bat assembleRelease && adb install -r app\\build\\outputs\\apk\\release\\app-release.apk");