const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");

console.log("🎬 إصلاح Splash — صورة قوية + ملء الشاشة\n");

// ============================================================
// إنشاء splash.svg جديد — 2732×2732
// ============================================================
function generateSplash(size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  // أيقونة بحجم معقول (60% من العرض)
  const iconSize = s * 0.5;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +

    // خلفية بترولية غامقة موحدة (تملأ الشاشة)
    '<rect width="' + s + '" height="' + s + '" fill="#0a1725"/>' +

    // تدرج قطري خفيف
    '<defs>' +
      '<radialGradient id="bgGlow" cx="50%" cy="40%" r="70%">' +
        '<stop offset="0%" stop-color="#1f4f5a" stop-opacity="0.4"/>' +
        '<stop offset="100%" stop-color="#0a1725" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +

    // توهج مركزي
    '<rect width="' + s + '" height="' + s + '" fill="url(#bgGlow)"/>' +

    // الأيقونة في المنتصف
    '<g transform="translate(' + (cx - iconSize / 2) + ', ' + (cy - iconSize / 2) + ') scale(' + (iconSize / 1024) + ')">' +

      // ==== الهلال الكبير ====
      '<defs>' +
        '<radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="rgba(245,215,110,.4)"/>' +
          '<stop offset="70%" stop-color="rgba(245,215,110,.1)"/>' +
          '<stop offset="100%" stop-color="rgba(245,215,110,0)"/>' +
        '</radialGradient>' +
        '<radialGradient id="moonG" cx="30%" cy="30%" r="75%">' +
          '<stop offset="0%" stop-color="#fffdf0"/>' +
          '<stop offset="45%" stop-color="#f5d76e"/>' +
          '<stop offset="80%" stop-color="#d4a72c"/>' +
          '<stop offset="100%" stop-color="#a8841a"/>' +
        '</radialGradient>' +
      '</defs>' +

      // توهج الهلال
      '<circle cx="512" cy="400" r="300" fill="url(#moonGlow)"/>' +

      // الهلال
      '<circle cx="512" cy="400" r="220" fill="url(#moonG)"/>' +
      '<circle cx="600" cy="370" r="185" fill="#0a1725"/>' +

      // ==== المسجد في الأسفل ====
      '<g transform="translate(512, 850)">' +
        // القاعدة
        '<rect x="-220" y="0" width="440" height="100" fill="#1a3a4a" rx="10"/>' +
        // القبة
        '<path d="M -140,0 Q 0,-180 140,0 Z" fill="#2a4f6a"/>' +
        // سارية القبة
        '<rect x="-5" y="-195" width="10" height="25" fill="#c9a227"/>' +
        // هلال القبة
        '<circle cx="0" cy="-205" r="15" fill="#f5d76e"/>' +
        '<circle cx="5" cy="-205" r="12" fill="#0a1725"/>' +
        // النوافذ
        '<rect x="-160" y="30" width="24" height="55" fill="#f5d76e" rx="12"/>' +
        '<rect x="-90" y="30" width="24" height="55" fill="#f5d76e" rx="12"/>' +
        '<rect x="-20" y="30" width="24" height="55" fill="#f5d76e" rx="12"/>' +
        '<rect x="60" y="30" width="24" height="55" fill="#f5d76e" rx="12"/>' +
        '<rect x="130" y="30" width="24" height="55" fill="#f5d76e" rx="12"/>' +
        // الباب
        '<rect x="-30" y="50" width="60" height="50" fill="#f5d76e" rx="30"/>' +
      '</g>' +

    '</g>' +

    // ==== النص أسفل ====
    '<text x="' + cx + '" y="' + (s * 0.85) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.045) + '" ' +
          'font-weight="bold" ' +
          'fill="#f5d76e" ' +
          'text-anchor="middle">MuslimCode</text>' +

  '</svg>';
}

// اكتب الملف
fs.writeFileSync(path.join(RES, "splash.svg"), generateSplash(2732), "utf8");
console.log("✓ resources/splash.svg (2732×2732)");

// ============================================================
// تحديث colors.xml للألوان
// ============================================================
const COLORS_FILE = path.join(__dirname, "android", "app", "src", "main", "res", "values", "colors.xml");
if (fs.existsSync(COLORS_FILE)) {
  let colors = fs.readFileSync(COLORS_FILE, "utf8");
  if (!colors.includes("splash_bg")) {
    colors = colors.replace(
      "</resources>",
      '  <color name="splash_bg">#0a1725</color>\n</resources>'
    );
    fs.writeFileSync(COLORS_FILE, colors, "utf8");
    console.log("✓ colors.xml: splash_bg مضاف");
  }
}

console.log("\\n📋 التالي:");
console.log("  1. svgexport resources\\splash.svg resources\\splash.png 2732:2732");
console.log("  2. npx @capacitor/assets generate --android");
console.log("  3. npx cap sync");
console.log("  4. cd android");
console.log("  5. gradlew.bat assembleRelease");
console.log("  6. adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");