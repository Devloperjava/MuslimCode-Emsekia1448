const fs = require("fs");
const path = require("path");

const CONFIG = path.join(__dirname, "capacitor.config.json");
let config = fs.readFileSync(CONFIG, "utf8");

console.log("🔒 تعطيل webContentsDebuggingEnabled للـ Release\n");

// قبل
console.log("قبل:");
console.log(config);

// استبدل true بـ false
config = config.replace(
  /"webContentsDebuggingEnabled"\s*:\s*true/,
  '"webContentsDebuggingEnabled": false'
);

// بعد
console.log("بعد:");
console.log(config);

fs.writeFileSync(CONFIG, config, "utf8");
console.log("\n✓ capacitor.config.json: webContentsDebuggingEnabled = false");