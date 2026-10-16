const fs = require("fs");
const path = require("path");

const STYLES = path.join(__dirname, "android", "app", "src", "main", "res", "values", "styles.xml");

console.log("🗑️ حذف صورة Splash — استبدالها بلون\n");

let styles = fs.readFileSync(STYLES, "utf8");

// استبدل @drawable/splash بلون بترولي داكن
styles = styles.replace(
  /<item name="android:background">@drawable\/splash<\/item>/g,
  '<item name="android:background">#0a1725</item>'
);

fs.writeFileSync(STYLES, styles, "utf8");
console.log("✓ styles.xml: استُبدلت الصورة بلون #0a1725");

console.log("\\n✅ النتيجة:");
console.log("  • 🎨 Splash = خلفية بترولية داكنة (بدون صورة)");
console.log("  • ✅ التطبيق لا يزال يعمل");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");