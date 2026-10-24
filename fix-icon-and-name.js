const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
const RES = path.join(__dirname, "resources");
const ANDROID_RES = path.join(__dirname, "android", "app", "src", "main", "res");
const ANDROID_STRINGS = path.join(ANDROID_RES, "values", "strings.xml");

console.log("🖼️ تغيير الأيقونة (فانوس) + الاسم إلى Emsakiah\n");

// ============================================================
// 1) إنشاء أيقونة فانوس SVG احترافية (1024×1024)
// ============================================================
const lanternSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#1f4f5a"/>
      <stop offset="45%" stop-color="#0f2a3a"/>
      <stop offset="100%" stop-color="#05141c"/>
    </radialGradient>
    <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,220,120,.9)"/>
      <stop offset="50%" stop-color="rgba(255,200,80,.3)"/>
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

  <!-- نجوم صغيرة -->
  <circle cx="180" cy="180" r="4" fill="#ffffff" opacity="0.8"/>
  <circle cx="850" cy="140" r="3" fill="#ffffff" opacity="0.7"/>
  <circle cx="120" cy="400" r="3" fill="#ffffff" opacity="0.6"/>
  <circle cx="900" cy="500" r="4" fill="#ffffff" opacity="0.7"/>
  <circle cx="220" cy="700" r="3" fill="#ffffff" opacity="0.6"/>
  <circle cx="820" cy="800" r="3" fill="#ffffff" opacity="0.7"/>

  <!-- توهج الفانوس -->
  <circle cx="512" cy="512" r="380" fill="url(#lanternGlow)"/>

  <!-- سلك التعليق -->
  <line x1="512" y1="80" x2="512" y2="200" stroke="#c9a227" stroke-width="6" stroke-linecap="round"/>

  <!-- الجزء العلوي من الفانوس -->
  <ellipse cx="512" cy="220" rx="70" ry="20" fill="url(#goldDark)"/>
  <rect x="442" y="200" width="140" height="30" rx="8" fill="url(#gold)"/>
  <ellipse cx="512" cy="200" rx="40" ry="12" fill="url(#goldDark)"/>

  <!-- الجسم الرئيسي -->
  <rect x="380" y="260" width="264" height="440" rx="30" fill="url(#gold)" opacity="0.95"/>
  <rect x="380" y="260" width="264" height="440" rx="30" fill="none" stroke="#8b6914" stroke-width="6"/>

  <!-- الزخارف الرأسية -->
  <line x1="420" y1="260" x2="420" y2="700" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="470" y1="260" x2="470" y2="700" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="512" y1="260" x2="512" y2="700" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="554" y1="260" x2="554" y2="700" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="604" y1="260" x2="604" y2="700" stroke="#8b6914" stroke-width="3" opacity="0.6"/>

  <!-- الزخارف الأفقية -->
  <line x1="380" y1="340" x2="644" y2="340" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="380" y1="420" x2="644" y2="420" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="380" y1="500" x2="644" y2="500" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="380" y1="580" x2="644" y2="580" stroke="#8b6914" stroke-width="3" opacity="0.6"/>
  <line x1="380" y1="660" x2="644" y2="660" stroke="#8b6914" stroke-width="3" opacity="0.6"/>

  <!-- التوهج الداخلي -->
  <ellipse cx="512" cy="480" rx="80" ry="140" fill="rgba(255,255,255,.5)" opacity="0.7"/>

  <!-- القاعدة السفلية -->
  <rect x="440" y="700" width="144" height="30" rx="6" fill="url(#goldDark)"/>
  <ellipse cx="512" cy="740" rx="50" ry="14" fill="url(#goldDark)"/>
  <circle cx="512" cy="770" r="16" fill="url(#gold)"/>

  <!-- الجزء العلوي من الفانوس -->
  <path d="M 380 260 L 512 180 L 644 260 Z" fill="url(#goldDark)"/>
</svg>`;

if (!fs.existsSync(RES)) fs.mkdirSync(RES);
fs.writeFileSync(path.join(RES, "icon.svg"), lanternSVG, "utf8");
console.log("✓ resources/icon.svg — فانوس احترافي");

// ============================================================
// 2) تغيير اسم التطبيق في capacitor.config.json
// ============================================================
const CAP_CONFIG = path.join(__dirname, "capacitor.config.json");
let config = fs.readFileSync(CAP_CONFIG, "utf8");
config = config.replace(/"appName":\s*"[^"]*"/, '"appName": "Emsakiah"');
fs.writeFileSync(CAP_CONFIG, config, "utf8");
console.log("✓ capacitor.config.json — appName: Emsakiah");

// ============================================================
// 3) تغيير اسم التطبيق في strings.xml
// ============================================================
if (fs.existsSync(ANDROID_STRINGS)) {
  let strings = fs.readFileSync(ANDROID_STRINGS, "utf8");
  strings = strings.replace(/<string name="app_name">[^<]*<\/string>/, '<string name="app_name">Emsakiah</string>');
  strings = strings.replace(/<string name="title_activity_main">[^<]*<\/string>/, '<string name="title_activity_main">Emsakiah</string>');
  fs.writeFileSync(ANDROID_STRINGS, strings, "utf8");
  console.log("✓ strings.xml — app_name: Emsakiah");
} else {
  console.log("⚠ strings.xml غير موجود — سيتم تحديثه عبر npx cap sync");
}

console.log("\\n✅ التعديلات:");
console.log("  • 🖼️ الأيقونة: فانوس ذهبي احترافي");
console.log("  • 📝 الاسم: Emsakiah");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  npx @capacitor/assets generate --android");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb uninstall com.muslim.ramadan2027");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");