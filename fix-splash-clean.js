const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");

console.log("🎬 إصلاح Splash — هلال أبيض نظيف\n");

// ============================================================
// Splash جديد — هلال أبيض فقط (بدون دائرة قاطعة)
// ============================================================
function generateSplash(size) {
  const s = size;
  const cx = s / 2;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +

    // خلفية بترولية (نفس لون التطبيق)
    '<rect width="' + s + '" height="' + s + '" fill="#0a1725"/>' +

    // نجوم صغيرة
    '<circle cx="' + (s * 0.15) + '" cy="' + (s * 0.20) + '" r="' + (s * 0.004) + '" fill="#ffffff" opacity="0.7"/>' +
    '<circle cx="' + (s * 0.82) + '" cy="' + (s * 0.15) + '" r="' + (s * 0.003) + '" fill="#ffffff" opacity="0.6"/>' +
    '<circle cx="' + (s * 0.10) + '" cy="' + (s * 0.65) + '" r="' + (s * 0.003) + '" fill="#ffffff" opacity="0.5"/>' +
    '<circle cx="' + (s * 0.88) + '" cy="' + (s * 0.72) + '" r="' + (s * 0.004) + '" fill="#ffffff" opacity="0.7"/>' +
    '<circle cx="' + (s * 0.30) + '" cy="' + (s * 0.85) + '" r="' + (s * 0.002) + '" fill="#ffffff" opacity="0.5"/>' +
    '<circle cx="' + (s * 0.70) + '" cy="' + (s * 0.80) + '" r="' + (s * 0.003) + '" fill="#ffffff" opacity="0.6"/>' +

    // هلال أبيض نظيف — باستخدام SVG Mask (بدون دائرة مرئية)
    '<defs>' +
      '<mask id="moonMask">' +
        '<rect width="' + s + '" height="' + s + '" fill="white"/>' +
        // الدائرة القاطعة — سوداء (تختفي في mask)
        '<circle cx="' + (cx + s * 0.10) + '" cy="' + (s * 0.42) + '" r="' + (s * 0.18) + '" fill="black"/>' +
      '</mask>' +
    '</defs>' +

    // الدائرة البيضاء الكبيرة
    '<circle cx="' + cx + '" cy="' + (s * 0.42) + '" r="' + (s * 0.22) + '" fill="#ffffff" mask="url(#moonMask)"/>' +

    // توهج الهلال
    '<circle cx="' + cx + '" cy="' + (s * 0.42) + '" r="' + (s * 0.30) + '" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="' + (s * 0.01) + '" opacity="0.5"/>' +

    // اسم التطبيق
    '<text x="' + cx + '" y="' + (s * 0.72) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.045) + '" ' +
          'font-weight="bold" ' +
          'fill="#ffffff" ' +
          'text-anchor="middle" ' +
          'letter-spacing="' + (s * 0.002) + '">إمساكية رمضان 1448</text>' +

    // MuslimCode
    '<text x="' + cx + '" y="' + (s * 0.78) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.022) + '" ' +
          'font-weight="bold" ' +
          'fill="#c8d4cf" ' +
          'text-anchor="middle" ' +
          'letter-spacing="' + (s * 0.004) + '">MuslimCode</text>' +

  '</svg>';
}

fs.writeFileSync(path.join(RES, "splash.svg"), generateSplash(2732), "utf8");
console.log("✓ resources/splash.svg — هلال أبيض نظيف");

console.log("\\n✅ الحل:");
console.log("  • 🌙 هلال أبيض ناصع");
console.log("  • 🚫 بدون دائرة قاطعة");
console.log("  • 📝 اسم التطبيق + MuslimCode");
console.log("  • 🌌 خلفية بترولية + نجوم");
console.log("\\n📋 التالي:");
console.log("  svgexport resources\\\\splash.svg resources\\\\splash.png 2732:2732");
console.log("  npx @capacitor/assets generate --android");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb uninstall com.muslim.ramadan2027");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");