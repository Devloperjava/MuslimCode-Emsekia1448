const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 إصلاح الهلال النهائي — الاتجاه الصحيح\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 قوس مفتوح نحو اليمين — اتجاه طبيعي (مثل الصورة 1)
  return '<svg viewBox="0 0 60 110" width="62" height="84" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="mcg' + day + '" x1="20%" y1="20%" x2="80%" y2="80%">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="50%" stop-color="#f5e5b0"/>' +
        '<stop offset="100%" stop-color="#c9a227"/>' +
      '</linearGradient>' +
      '<radialGradient id="mhg' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(212,167,44,0.18)"/>' +
        '<stop offset="100%" stop-color="rgba(212,167,44,0)"/>' +
      '</radialGradient>' +
    '</defs>' +
    // هالة ذهبية خفيفة
    '<circle cx="30" cy="36" r="34" fill="url(#mhg' + day + ')"/>' +
    // ✨ قوس الهلال — مفتوح نحو اليمين (اتجاه طبيعي)
    // الحد الخارجي: يمين الدائرة (بميل بسيط)
    // الحد الداخلي: منحنى مقلوب نحو اليسار
    '<path d="M 42,4 ' +
            'A 32,32 0 0,1 42,68 ' +     // قوس خارجي — من الأعلى لليمين للأسفل
            'A 26,32 0 0,0 42,4 Z" ' +   // قوس داخلي — يعود للأعلى (مقلوب)
          'fill="url(#mcg' + day + ')"/>' +
    // ✨ sparkles صغيرة
    '<circle cx="20" cy="20" r="1" fill="#fff8d6" opacity="0.8"/>' +
    '<circle cx="24" cy="56" r="0.8" fill="#fff8d6" opacity="0.6"/>' +
    // الخيط الرفيع 1px
    '<line x1="30" y1="68" x2="30" y2="73" stroke="rgba(212,167,44,.6)" stroke-width="1"/>' +
    // الرقم معلق
    '<text x="30" y="93" font-family="Aref Ruqaa, Georgia, serif" font-size="22" font-weight="800" fill="#123b2a" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: الهلال باتجاه صحيح (فتحة نحو اليمين)");

console.log("\\n✅ الإصلاح النهائي:");
console.log("  • 🌙 قوس مفتوح نحو اليمين (اتجاه طبيعي)");
console.log("  • 🚫 بدون دائرة سوداء");
console.log("  • ✨ هالة ذهبية + sparkles");
console.log("  • 🔢 الرقم معلق بخيط 1px");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");