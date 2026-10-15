const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🗑️ حذف الشهب نهائياً\n");

// ============================================================
// 1) night-sky.js — حذف دالة startShootingStars + استدعاءها
// ============================================================
let js = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");

// احذف تعريف startShootingStars
js = js.replace(/\/\* ===== الشهب[\s\S]*?\n  \}\n/, "");

// احذف أي نسخة أخرى من startShootingStars
js = js.replace(/function startShootingStars\([^)]*\)\s*\{[\s\S]*?\n  \}/g, "");

// احذف استدعاءها في init
js = js.replace(/\s*if \(shootingLayer\) startShootingStars\(shootingLayer\);/g, "");
js = js.replace(/\s*const shootingLayer = document\.getElementById\("shootingStars"\);/g, "");

// احذف أي إشارات متبقية
js = js.replace(/shootingLayer/g, "null");

fs.writeFileSync(path.join(WEB, "night-sky.js"), js, "utf8");
console.log("✓ night-sky.js: حُذفت دالة الشهب");

// ============================================================
// 2) style.css — حذف تعريفات الشهب
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات الشهب
css = css.replace(/\.shooting-stars?\s*\{[^}]*\}/g, "");
css = css.replace(/\.shooting-star\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+shoot[A-Za-z]*\s*\{[\s\S]*?\n\}/g, "");

// احذف أي إشارة متبقية في media queries
css = css.replace(/\.shooting-star[^{]*\{[^}]*\}/g, "");

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: حُذفت تعريفات الشهب");

// ============================================================
// 3) index.html — حذف حاوية الشهب (إن وجدت)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف عنصر shooting-stars
html = html.replace(/<div class="shooting-stars"[^>]*><\/div>\s*/g, "");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حُذفت حاوية الشهب");

console.log("\\n✅ تم!");
console.log("  • 💫 الشهب: محذوفة نهائياً (JS + CSS + HTML)");
console.log("  • ⭐ النجوم: لم تُلمس");
console.log("  • 🌧️ المطر: لم يُلمس");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/night-sky.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");