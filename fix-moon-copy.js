const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 نسخة حرفية من الهلال الرئيسي\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // نسخة حرفية من SVG الهلال الرئيسي
  // التغيير الوحيد: الدائرة البترولية (#050d1a) → بيضاء (تندمج مع خلفية البطاقة)
  return '<svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      // نفس crescentGrad من الرئيسي (معرف فريد لكل يوم)
      '<radialGradient id="mcg' + day + '" cx="35%" cy="35%" r="75%">' +
        '<stop offset="0%"  stop-color="#fffbe6"/>' +
        '<stop offset="55%" stop-color="#f5e2a0"/>' +
        '<stop offset="100%" stop-color="#c9a227"/>' +
      '</radialGradient>' +
      // نفس haloGrad
      '<radialGradient id="mhg' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%"   stop-color="rgba(255,235,150,0.4)"/>' +
        '<stop offset="70%"  stop-color="rgba(255,235,150,0.1)"/>' +
        '<stop offset="100%" stop-color="rgba(255,235,150,0)"/>' +
      '</radialGradient>' +
    '</defs>' +
    // هالة خفيفة
    '<circle cx="50" cy="50" r="48" fill="url(#mhg' + day + ')"/>' +
    // القوس (نفس بنية الرئيسي)
    '<circle cx="50" cy="50" r="30" fill="url(#mcg' + day + ')"/>' +
    // ← الفرق الوحيد: دائرة بيضاء بدل #050d1a
    '<circle cx="62" cy="46" r="26" fill="#ffffff"/>' +
    // sparkles صغيرة
    '<circle cx="30" cy="36" r="1.5" fill="#fff8d6" opacity="0.9"/>' +
    '<circle cx="38" cy="68" r="1.2" fill="#fff8d6" opacity="0.7"/>' +
    // الرقم أسفل الهلال (منفصل خارج SVG)
    '<text x="50" y="96" font-family="Aref Ruqaa, Georgia, serif" font-size="16" font-weight="800" fill="#123b2a" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: نسخة حرفية من هلال الرئيسي");

console.log("\\n✅ التغيير الوحيد:");
console.log("  • 🌙 نفس بنية الرئيسي حرفياً");
console.log("  • 🎨 نفس الألوان (crescentGrad + haloGrad)");
console.log("  • ⚪ الدائرة البترولية → بيضاء (خلفية بيضاء)");
console.log("  • 📐 حجم: 70×70 (بدل 110×110)");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");