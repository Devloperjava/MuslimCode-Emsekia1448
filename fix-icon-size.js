const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");

console.log("🖼️ تكبير الفانوس في الأيقونة (80% من المساحة)\n");

// ============================================================
// أيقونة جديدة — الفانوس يملأ 80% من الأيقونة
// ============================================================
const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#1f4f5a"/>
      <stop offset="45%" stop-color="#0f2a3a"/>
      <stop offset="100%" stop-color="#05141c"/>
    </radialGradient>
    <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,220,120,.95)"/>
      <stop offset="50%" stop-color="rgba(255,200,80,.35)"/>
      <stop offset="100%" stop-color="rgba(255,200,80,0)"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff4c8"/>
      <stop offset="40%" stop-color="#f5d76e"/>
      <stop offset="100%" stop-color="#c9a227"/>
    </linearGradient>
    <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c9a227"/>
      <stop offset="100%" stop-color="#8b6914"/>
    </linearGradient>
  </defs>

  <!-- خلفية -->
  <rect width="1024" height="1024" fill="url(#bg)"/>

  <!-- نجوم صغيرة (خلفية) -->
  <circle cx="150" cy="200" r="4" fill="#ffffff" opacity="0.7"/>
  <circle cx="870" cy="180" r="3" fill="#ffffff" opacity="0.6"/>
  <circle cx="100" cy="500" r="3" fill="#ffffff" opacity="0.5"/>
  <circle cx="920" cy="600" r="4" fill="#ffffff" opacity="0.6"/>
  <circle cx="200" cy="850" r="3" fill="#ffffff" opacity="0.5"/>
  <circle cx="830" cy="880" r="3" fill="#ffffff" opacity="0.6"/>

  <!-- توهج الفانوس الكبير -->
  <circle cx="512" cy="512" r="420" fill="url(#lanternGlow)"/>

  <!-- مجموعة الفانوس (مكبّرة) -->
  <g transform="translate(512, 512) scale(1.5) translate(-512, -512)">

    <!-- سلك التعليق -->
    <line x1="512" y1="20" x2="512" y2="140" stroke="#c9a227" stroke-width="8" stroke-linecap="round"/>

    <!-- الجزء العلوي -->
    <ellipse cx="512" cy="180" rx="90" ry="24" fill="url(#goldDark)"/>
    <rect x="422" y="155" width="180" height="40" rx="10" fill="url(#gold)"/>
    <ellipse cx="512" cy="150" rx="50" ry="16" fill="url(#goldDark)"/>

    <!-- الجسم الرئيسي -->
    <rect x="340" y="220" width="344" height="560" rx="40" fill="url(#gold)" opacity="0.98"/>
    <rect x="340" y="220" width="344" height="560" rx="40" fill="none" stroke="#8b6914" stroke-width="8"/>

    <!-- الزخارف الرأسية -->
    <line x1="390" y1="220" x2="390" y2="780" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="450" y1="220" x2="450" y2="780" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="512" y1="220" x2="512" y2="780" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="574" y1="220" x2="574" y2="780" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="634" y1="220" x2="634" y2="780" stroke="#8b6914" stroke-width="4" opacity="0.5"/>

    <!-- الزخارف الأفقية -->
    <line x1="340" y1="320" x2="684" y2="320" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="340" y1="420" x2="684" y2="420" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="340" y1="520" x2="684" y2="520" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="340" y1="620" x2="684" y2="620" stroke="#8b6914" stroke-width="4" opacity="0.5"/>
    <line x1="340" y1="720" x2="684" y2="720" stroke="#8b6914" stroke-width="4" opacity="0.5"/>

    <!-- التوهج الداخلي -->
    <ellipse cx="512" cy="500" rx="110" ry="180" fill="rgba(255,255,255,.55)" opacity="0.75"/>

    <!-- القاعدة السفلية -->
    <rect x="420" y="780" width="184" height="40" rx="8" fill="url(#goldDark)"/>
    <ellipse cx="512" cy="830" rx="70" ry="20" fill="url(#goldDark)"/>
    <circle cx="512" cy="870" r="22" fill="url(#gold)"/>

    <!-- الجزء العلوي (قمة الفانوس) -->
    <path d="M 340 220 L 512 120 L 684 220 Z" fill="url(#goldDark)"/>

  </g>
</svg>`;

fs.writeFileSync(path.join(RES, "icon.svg"), iconSVG, "utf8");
console.log("✓ resources/icon.svg: الفانوس بحجم 1.5× (يملأ 80% من الأيقونة)");

console.log("\\n✅ التصميم الجديد:");
console.log("  • 🖼️ الفانوس: مكبّر 1.5×");
console.log("  • 🎨 الخلفية: كما هي");
console.log("  • ✨ التوهج: أقوى");
console.log("\\n📋 التالي:");
console.log("  svgexport resources\\\\icon.svg resources\\\\icon.png 1024:1024");
console.log("  npx @capacitor/assets generate --android");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb uninstall com.muslim.ramadan2027");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");