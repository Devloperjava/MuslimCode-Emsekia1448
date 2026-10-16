const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");

console.log("🎨 Ramadan Kareem Splash — بترولي + زيتوني\n");

// ============================================================
// Splash جديد — Ramadan Kareem
// ============================================================
function generateSplash(size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +

    // ==== defs ====
    '<defs>' +

    // خلفية متدرجة — بترولي → زيتوني → بترولي
    '<radialGradient id="bg" cx="50%" cy="50%" r="80%">' +
      '<stop offset="0%" stop-color="#2a5f5a"/>' +      // بترولي فاتح
      '<stop offset="35%" stop-color="#1a4d4a"/>' +     // بترولي دافئ
      '<stop offset="65%" stop-color="#4a6b3a"/>' +     // زيتوني متوسط
      '<stop offset="100%" stop-color="#6b7d3a"/>' +    // زيتوني دافئ
    '</radialGradient>' +

    // توهج علوي
    '<radialGradient id="glow" cx="50%" cy="30%" r="50%">' +
      '<stop offset="0%" stop-color="rgba(200,220,200,0.15)"/>' +
      '<stop offset="100%" stop-color="rgba(200,220,200,0)"/>' +
    '</radialGradient>' +

    // تدرج النص (أبيض → ذهبي فاتح)
    '<linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#fff8e0"/>' +
      '<stop offset="50%" stop-color="#ffffff"/>' +
      '<stop offset="100%" stop-color="#fff8e0"/>' +
    '</linearGradient>' +

    // تدرج زخرفي
    '<linearGradient id="decoGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="rgba(255,255,255,0)"/>' +
      '<stop offset="50%" stop-color="rgba(255,255,255,0.6)"/>' +
      '<stop offset="100%" stop-color="rgba(255,255,255,0)"/>' +
    '</linearGradient>' +

    // فلتر التوهج الناعم
    '<filter id="soft" x="-50%" y="-50%" width="200%" height="200%">' +
      '<feGaussianBlur stdDeviation="' + (s * 0.008) + '"/>' +
    '</filter>' +

    '</defs>' +

    // ==== الخلفية ====
    '<rect width="' + s + '" height="' + s + '" fill="url(#bg)"/>' +

    // ==== توهج علوي ====
    '<rect width="' + s + '" height="' + s + '" fill="url(#glow)"/>' +

    // ==== زخرفة علوية (خط أفقي رفيع) ====
    '<line x1="' + (s * 0.30) + '" y1="' + (s * 0.35) + '" ' +
          'x2="' + (s * 0.70) + '" y2="' + (s * 0.35) + '" ' +
          'stroke="url(#decoGrad)" stroke-width="' + (s * 0.002) + '"/>' +

    // ==== رمز الهلال الصغير العلوي ====
    '<g transform="translate(' + cx + ', ' + (s * 0.42) + ')" filter="url(#soft)">' +
      '<circle cx="0" cy="0" r="' + (s * 0.035) + '" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="' + (s * 0.003) + '"/>' +
    '</g>' +

    // ==== Ramadan Kareem ====
    '<text x="' + cx + '" y="' + (s * 0.52) + '" ' +
          'font-family="Georgia, Times New Roman, serif" ' +
          'font-size="' + (s * 0.085) + '" ' +
          'font-weight="bold" ' +
          'font-style="italic" ' +
          'fill="url(#textGrad)" ' +
          'text-anchor="middle" ' +
          'filter="url(#soft)">Ramadan Kareem</text>' +

    // ==== خط فاصل ====
    '<line x1="' + (s * 0.32) + '" y1="' + (s * 0.57) + '" ' +
          'x2="' + (s * 0.68) + '" y2="' + (s * 0.57) + '" ' +
          'stroke="url(#decoGrad)" stroke-width="' + (s * 0.0025) + '"/>' +

    // ==== 1448 ====
    '<text x="' + cx + '" y="' + (s * 0.63) + '" ' +
          'font-family="Georgia, Times New Roman, serif" ' +
          'font-size="' + (s * 0.045) + '" ' +
          'font-weight="bold" ' +
          'fill="rgba(255,255,255,0.9)" ' +
          'text-anchor="middle" ' +
          'letter-spacing="' + (s * 0.005) + '">1448</text>' +

    // ==== زخرفة سفلية (نجوم صغيرة) ====
    '<g fill="rgba(255,255,255,0.6)">' +
      '<circle cx="' + (s * 0.45) + '" cy="' + (s * 0.72) + '" r="' + (s * 0.0025) + '"/>' +
      '<circle cx="' + (s * 0.50) + '" cy="' + (s * 0.74) + '" r="' + (s * 0.0035) + '"/>' +
      '<circle cx="' + (s * 0.55) + '" cy="' + (s * 0.72) + '" r="' + (s * 0.0025) + '"/>' +
    '</g>' +

    // ==== خط ذهبي فاصل آخر ====
    '<line x1="' + (s * 0.35) + '" y1="' + (s * 0.78) + '" ' +
          'x2="' + (s * 0.65) + '" y2="' + (s * 0.78) + '" ' +
          'stroke="url(#decoGrad)" stroke-width="' + (s * 0.0015) + '"/>' +

  '</svg>';
}

// اكتب الملف
fs.writeFileSync(path.join(RES, "splash.svg"), generateSplash(2732), "utf8");
console.log("✓ resources/splash.svg: Ramadan Kareem (خلفية بترولي-زيتوني)");

console.log("\\n✅ التصميم الجديد:");
console.log("  • 🎨 خلفية: بترولي → زيتوني دافئ");
console.log("  • 📝 Ramadan Kareem (خط serif فخم)");
console.log("  • 🔢 1448 أسفله");
console.log("  • ✨ زخارف فاصلة");
console.log("  • ❌ لا هلال + لا مسجد + لا MuslimCode");
console.log("\\n📋 التالي:");
console.log("  1. svgexport resources\\splash.svg resources\\splash.png 2732:2732");
console.log("  2. npx @capacitor/assets generate --android");
console.log("  3. npx cap sync");
console.log("  4. cd android");
console.log("  5. gradlew.bat assembleRelease");
console.log("  6. adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");