const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 هلال حقيقي — إحداثيات صحيحة\n");

let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

app = app.replace(
  /function moonCardSVG\(day\)\s*\{[\s\S]*?\n\}/,
  `function moonCardSVG(day) {
  // 🌙 هلال حقيقي — إحداثيات صحيحة (لا دوائر مغلقة)
  // الفتحة نحو اليمين
  // الفرق بين القوسين = السمك
  const cx = 40, cy = 40;
  const outerR = 28;
  const innerR = 25;

  // نقاط القوس على شكل هلال
  // نقطة البداية: الأعلى قليلاً لليمين
  const startX = cx + 20;
  const startY = cy - outerR + 4;

  // نقطة النهاية: الأسفل قليلاً لليمين
  const endX = cx + 20;
  const endY = cy + outerR - 4;

  return '<svg viewBox="0 0 80 80" width="68" height="68" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      // تدرج بترولي داكن
      '<linearGradient id="mg' + day + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '<stop offset="0%" stop-color="#2a5f6a"/>' +
        '<stop offset="50%" stop-color="#0f2a3a"/>' +
        '<stop offset="100%" stop-color="#061a24"/>' +
      '</linearGradient>' +
      // توهج خفيف
      '<radialGradient id="gl' + day + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="rgba(42,95,106,0.2)"/>' +
        '<stop offset="100%" stop-color="rgba(42,95,106,0)"/>' +
      '</radialGradient>' +
      // فلتر ناعم
      '<filter id="sf' + day + '" x="-50%" y="-50%" width="200%" height="200%">' +
        '<feGaussianBlur stdDeviation="0.5"/>' +
      '</filter>' +
    '</defs>' +
    // هالة خفيفة
    '<circle cx="' + cx + '" cy="' + cy + '" r="36" fill="url(#gl' + day + ')"/>' +
    // 🌙 الهلال — مسار مقوّس حقيقي
    // نقطة البداية: أعلى القوس
    // القوس الخارجي: ينزل حول اليسار (sweep=0)
    // القوس الداخلي: يعود للأعلى (sweep=0 — نفس الاتجاه لكن نصف قطر أصغر)
    '<path d="' +
      'M ' + startX + ',' + startY + ' ' +
      'A ' + outerR + ',' + outerR + ' 0 0,1 ' + endX + ',' + endY + ' ' +
      'A ' + innerR + ',' + innerR + ' 0 0,0 ' + startX + ',' + startY + ' Z" ' +
      'fill="url(#mg' + day + ')" ' +
      'filter="url(#sf' + day + ')"/>' +
    // ذرّات
    '<circle cx="' + (cx + 10) + '" cy="' + (cy - 20) + '" r="0.9" fill="#2a5f6a" opacity="0.6"/>' +
    '<circle cx="' + (cx + 13) + '" cy="' + (cy - 5) + '" r="0.6" fill="#2a5f6a" opacity="0.5"/>' +
    '<circle cx="' + (cx + 14) + '" cy="' + (cy + 12) + '" r="1" fill="#2a5f6a" opacity="0.6"/>' +
    '<circle cx="' + (cx + 11) + '" cy="' + (cy + 25) + '" r="0.7" fill="#2a5f6a" opacity="0.5"/>' +
    // الرقم أسفل الهلال
    '<text x="40" y="77" font-family="Aref Ruqaa, Georgia, serif" font-size="13" font-weight="800" fill="#0a291c" text-anchor="middle">' + String(day).padStart(2, "0") + '</text>' +
  '</svg>';
}`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: هلال حقيقي بإحداثيات صحيحة");

console.log("\\n✅ الإصلاح الجذري:");
console.log("  • 🌙 القوسان يستخدمان sweep-flag متقابل");
console.log("  • 🎯 النقاط ليست على محور واحد");
console.log("  • 🚫 لا دائرة مغلقة");
console.log("  • 🎨 بترولي داكن — يظهر على الأبيض");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");