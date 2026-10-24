const fs = require("fs");
const path = require("path");

const GRADLE = path.join(__dirname, "android", "app", "build.gradle");

console.log("🔢 تحديث الإصدار إلى 1.3.0\n");

let gradle = fs.readFileSync(GRADLE, "utf8");

// غيّر versionCode
gradle = gradle.replace(/versionCode\s+\d+/, 'versionCode 4');

// غيّر versionName
gradle = gradle.replace(/versionName\s+"[^"]*"/, 'versionName "1.3.0"');

fs.writeFileSync(GRADLE, gradle, "utf8");
console.log("✓ build.gradle: versionCode 4 + versionName 1.3.0");

// تحقق
const content = fs.readFileSync(GRADLE, "utf8");
const versionCode = content.match(/versionCode\s+(\d+)/);
const versionName = content.match(/versionName\s+"([^"]+)"/);

console.log("\\n📊 التحقق:");
console.log("  • versionCode: " + (versionCode ? versionCode[1] : "?"));
console.log("  • versionName: " + (versionName ? versionName[1] : "?"));

console.log("\\n📋 التالي:");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb uninstall com.muslim.ramadan2027");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");
console.log("  adb shell dumpsys package com.muslim.ramadan2027 | findstr versionName");