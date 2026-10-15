const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 هلال بترولي داكن (A)\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 هلال بترولي داكن — يظهر بوضوح على خلفية بيضاء
  // فتحة نحو اليمين — نفس الشكل في كل البطاقات
  // بدون كرة سوداء — قوس path واحد
  return '<svg viewBox="0 0 80 80" width="68" height="68" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      // تدرج بترولي داكن (للظهور على الأبيض)
      '<linearGradient id="mg' + day + '" x1="30%" y1="20%" x2="70%" y2="80%">' +
        '<stop offset="0%" stop-color="#1a3a4a"/>' +
        '<stop offset="50%" stop-color="#0f2a3a"/>' +
        '<stop offset="100%" stop-color="#061a24"/>' +
      '</linearGradient>' +
      // توهج بترولي فاتح (يبرز الهلال)
      '<radialGradient id="gl' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(26,58,74,0.15)"/>' +
        '<stop offset="100%" stop-color="rgba(26,58,74,0)"/>' +
      '</radialGradient>' +
      // فلتر ناعم
      '<filter id="sf' + day + '" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feGaussianBlur stdDeviation="0.6"/>' +
      '</filter>' +
    '</defs>' +
    // هالة خفيفة
    '<circle cx="40" cy="40" r="34" fill="url(#gl' + day + ')"/>' +
    // 🌙 القوس — path واحد (فرق 4 = متوسط)
    '<path d="M 44,10 ' +
            'A 30,30 0 0,0 44,70 ' +
            'A 26,30 0 0,1 44,10 Z" ' +
          'fill="url(#mg' + day + ')" ' +
          'filter="url(#sf' + day + ')"/>' +
    // ✨ ذرّات بترولية صغيرة
    '<circle cx="53" cy="15" r="0.9" fill="#1a3a4a" opacity="0.5"/>' +
    '<circle cx="56" cy="28" r="0.6" fill="#1a3a4a" opacity="0.4"/>' +
    '<circle cx="57" cy="42" r="1" fill="#1a3a4a" opacity="0.5"/>' +
    '<circle cx="56" cy="56" r="0.7" fill="#1a3a4a" opacity="0.4"/>' +
    '<circle cx="53" cy="67" r="0.9" fill="#1a3a4a" opacity="0.5"/>' +
    // الرقم أسفل الهلال
    '<text x="40" y="78" font-family="Aref Ruqaa, Georgia, serif" font-size="14" font-weight="800" fill="#0a291c" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: هلال بترولي داكن (A)");

console.log("\\n✅ الإصلاح:");
console.log("  • 🌙 هلال بترولي داكن (#1a3a4a → #061a24)");
console.log("  • 🎯 يظهر بوضوح على خلفية بيضاء");
console.log("  • 🚫 بدون كرة سوداء (path واحد فقط)");
console.log("  • 🎯 فتحة يمين — كل البطاقات");
console.log("  • 📐 حجم متوسط (68×68)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");