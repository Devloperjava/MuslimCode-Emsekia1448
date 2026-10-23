const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚨 Rollback طارئ — استعادة من GitHub\n");

try {
  // 1) احفظ النسخة الحالية
  console.log("1️⃣ حفظ النسخة الحالية (احتياطي)...");
  if (fs.existsSync("web/style.css")) {
    fs.copyFileSync("web/style.css", "web/style.broken.css");
    console.log("✓ web/style.broken.css");
  }
  if (fs.existsSync("web/app.js")) {
    fs.copyFileSync("web/app.js", "web/app.broken.js");
    console.log("✓ web/app.broken.js");
  }
  if (fs.existsSync("web/index.html")) {
    fs.copyFileSync("web/index.html", "web/index.broken.html");
    console.log("✓ web/index.broken.html");
  }

  // 2) Rollback من Git
  console.log("\\n2️⃣ Rollback من Git...");
  execSync("git checkout -- web/", { stdio: "inherit" });
  console.log("✓ تم Rollback");

  console.log("\\n✅ التطبيق عاد لآخر نسخة سليمة (v1.2.1)");
  console.log("  • 📁 الملفات المكسورة محفوظة باسم .broken");
  console.log("  • 🔄 Git استرجع آخر commit");
  console.log("\\n📋 التالي:");
  console.log("  node --check web/app.js");
  console.log("  npx cap sync");
  console.log("  cd android");
  console.log("  gradlew.bat assembleRelease");
  console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");

} catch (e) {
  console.error("❌ خطأ:", e.message);
}