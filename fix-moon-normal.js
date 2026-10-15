const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 هلال طبيعي — متوسط\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 هلال طبيعي — قوس أبيض واضح
  // فتحة نحو اليمين — نفس الشكل في كل البطاقات
  return '<svg viewBox="0 0 80 80" width="72" height="72" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      // توهج أبيض ناعم
      '<radialGradient id="glow' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>' +
        '<stop offset="70%" stop-color="rgba(255,255,255,0.06)"/>' +
        '<stop offset="100%" stop-color="rgba(255,255,255,0)"/>' +
      '</radialGradient>' +
      // فلتر التوهج
      '<filter id="soft' + day + '" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feGaussianBlur stdDeviation="1"/>' +
      '</filter>' +
    '</defs>' +
    // هالة بيضاء خفيفة
    '<circle cx="40" cy="40" r="36" fill="url(#glow' + day + ')"/>' +
    // 🌙 القوس — الفرق 4 (متوسط — طبيعي)
    '<path d="M 44,10 ' +
            'A 30,30 0 0,0 44,70 ' +     // قوس خارجي (يسار)
            'A 26,30 0 0,1 44,10 Z" ' +   // قوس داخلي (متوسط)
          'fill="#ffffff" ' +
          'filter="url(#soft' + day + ')"/>' +
    // ✨ ذرّات حول القوس
    '<circle cx="53" cy="14" r="1" fill="#ffffff" opacity="0.8"/>' +
    '<circle cx="56" cy="25" r="0.6" fill="#ffffff" opacity="0.6"/>' +
    '<circle cx="57" cy="40" r="1.1" fill="#ffffff" opacity="0.75"/>' +
    '<circle cx="56" cy="55" r="0.7" fill="#ffffff" opacity="0.6"/>' +
    '<circle cx="53" cy="66" r="1" fill="#ffffff" opacity="0.8"/>' +
    // الرقم أسفل الهلال
    '<text x="40" y="78" font-family="Aref Ruqaa, Georgia, serif" font-size="14" font-weight="800" fill="#123b2a" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: هلال متوسط (فرق 4)");

console.log("\\n✅ الإصلاح:");
console.log("  • 🌙 قوس متوسط — طبيعي");
console.log("  • 🎨 أبيض ناصع");
console.log("  • ✨ توهج + ذرّات");
console.log("  • 🎯 فتحة يمين");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");