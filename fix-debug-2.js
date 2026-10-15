const fs = require("fs");
const path = require("path");

const CONFIG = path.join(__dirname, "capacitor.config.json");
let config = fs.readFileSync(CONFIG, "utf8");

// تأكد من الملف
console.log("قبل:");
console.log(config);

// استبدل false بـ true (بشكل أكثر قوة)
config = config.replace(/"webContentsDebuggingEnabled"\s*:\s*false/g, '"webContentsDebuggingEnabled": true');

// إذا لم يكن موجوداً — أضفه
if (!config.includes("webContentsDebuggingEnabled")) {
  config = config.replace(
    /"android"\s*:\s*\{/,
    '"android": {\n    "webContentsDebuggingEnabled": true,'
  );
}

fs.writeFileSync(CONFIG, config, "utf8");

console.log("\nبعد:");
console.log(config);