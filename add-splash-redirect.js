const fs = require("fs");
const path = require("path");

const HTML = path.join(__dirname, "web", "index.html");
let html = fs.readFileSync(HTML, "utf8");

console.log("🔧 إضافة redirect للـ splash...\n");

// احذف أي إضافة سابقة
html = html.replace(/<script>\s*if \(window\.location\.pathname\.endsWith\("\/index\.html"\)[\s\S]*?<\/script>/g, "");

// أضف الجديد قبل </head>
const redirect = `<script>
  if (window.location.pathname.endsWith("/index.html") && !sessionStorage.getItem("splashShown")) {
    sessionStorage.setItem("splashShown", "1");
    window.location.href = "./splash.html";
  }
</script>`;

html = html.replace("</head>", redirect + "\n</head>");

fs.writeFileSync(HTML, html, "utf8");
console.log("✓ web/index.html: تمت إضافة redirect للـ splash");
console.log("\n📋 الآن نفّذ:");
console.log("  npx cap sync && cd android && gradlew.bat assembleRelease");