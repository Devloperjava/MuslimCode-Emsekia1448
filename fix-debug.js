const fs = require("fs");
const path = require("path");

const CONFIG = path.join(__dirname, "capacitor.config.json");
let config = fs.readFileSync(CONFIG, "utf8");

// فعّل webContentsDebuggingEnabled
config = config.replace(
  /"webContentsDebuggingEnabled"\s*:\s*false/,
  '"webContentsDebuggingEnabled": true'
);

fs.writeFileSync(CONFIG, config, "utf8");

console.log("✓ capacitor.config.json: webContentsDebuggingEnabled = true");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");