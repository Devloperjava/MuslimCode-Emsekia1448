const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 هلال أبيض نظيف — mask + خيط + رقم\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 هلال أبيض نظيف (نفس اتجاه الرئيسي)
  // اليسار = أبيض | اليمين = مقصوص (شفاف)
  return '<svg viewBox="0 0 60 90" width="60" height="90" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      // تدرج أبيض
      '<radialGradient id="mcg' + day + '" cx="30%" cy="30%" r="75%">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="60%" stop-color="#f5f5f5"/>' +
        '<stop offset="100%" stop-color="#d8d8d8"/>' +
      '</radialGradient>' +
      // mask — يقصّ الجزء الأيمن (يُجعله شفافاً)
      '<mask id="mm' + day + '">' +
        '<rect x="0" y="0" width="60" height="60" fill="white"/>' +
        '<circle cx="42" cy="26" r="22" fill="black"/>' +
      '</mask>' +
    '</defs>' +
    // 🌙 قوس أبيض (دائرة مقصوصة بـ mask)
    '<circle cx="26" cy="26" r="22" fill="url(#mcg' + day + ')" mask="url(#mm' + day + ')"/>' +
    // ✨ sparkle صغيرة
    '<circle cx="12" cy="14" r="0.8" fill="#ffffff" opacity="0.7"/>' +
    // خيط 1px
    '<line x1="30" y1="52" x2="30" y2="60" stroke="rgba(255,255,255,.7)" stroke-width="1"/>' +
    // الرقم معلق
    '<text x="30" y="80" font-family="Aref Ruqaa, Georgia, serif" font-size="20" font-weight="800" fill="#123b2a" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: هلال أبيض + mask (شفاف — لا كرة سوداء)");

console.log("\\n✅ الإصلاح النهائي:");
console.log("  • 🌙 قوس أبيض نظيف (بدون ذهبي)");
console.log("  • 🚫 بدون كرة سوداء (mask)");
console.log("  • ✨ sparkle صغيرة");
console.log("  • 🔗 خيط 1px + رقم معلق");
console.log("  • 🎯 نفس اتجاه الهلال الرئيسي");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");