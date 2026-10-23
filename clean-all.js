const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🧹 تنظيف شامل — حذف التعارضات المتراكمة\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احفظ الطول قبل
const before = css.length;

// احذف DARK-CARDS-FIX
css = css.replace(
  /\/\*\s*=+\s*\n\s*DARK-CARDS-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ DARK-CARDS-FIX محذوف");

// احذف COUNTER-DARK-FIX
css = css.replace(
  /\/\*\s*=+\s*\n\s*COUNTER-DARK-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ COUNTER-DARK-FIX محذوف");

// احذف FINAL-FIX (وليس FINAL-FIX-3)
css = css.replace(
  /\/\*\s*=+\s*\n\s*FINAL-FIX\s+[—Γ][\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ FINAL-FIX محذوف");

// احذف STAGE-1-FIX
css = css.replace(
  /\/\*\s*=+\s*\n\s*STAGE-1-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ STAGE-1-FIX محذوف");

// احذف MOSQUE-BIGGER-V2
css = css.replace(
  /\/\*\s*=+\s*\n\s*MOSQUE-BIGGER[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ MOSQUE-BIGGER محذوف");

// احذف MOSQUE-62
css = css.replace(
  /\/\*\s*=+\s*\n\s*MOSQUE-62[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/,
  ""
);
console.log("✓ MOSQUE-62 محذوف");

const after = css.length;
console.log("\\n📊:");
console.log("  • قبل: " + before + " حرف");
console.log("  • بعد: " + after + " حرف");
console.log("  • حُذف: " + (before - after) + " حرف");

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");

console.log("\\n✅ التنظيف مكتمل!");
console.log("  • 🧹 حُذفت 6 أقسام متعارضة");
console.log("  • ✅ FINAL-FIX-3 محفوظ (للهلال والمسجد)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");