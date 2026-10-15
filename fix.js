const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🔧 بدء الإصلاح...\n");

// ==== 1) index.html — حذف قسم garland ====
let htmlPath = path.join(WEB, "index.html");
let html = read(htmlPath);
const before1 = html.length;
html = html.replace(/<!-- Ramadan lantern garland[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- Mosque)/, "");
write(htmlPath, html);
console.log("✓ index.html: تم حذف " + (before1 - html.length) + " حرف (garland)");

// ==== 2) style.css — رفع المسجد ====
let cssPath = path.join(WEB, "style.css");
let css = read(cssPath);

css = css.replace(
  /\.mosque-silhouette\s*\{[^}]*\}/,
  ".mosque-silhouette{position:absolute;left:0;right:0;bottom:60px;height:280px;z-index:3;pointer-events:none;filter:drop-shadow(0 -8px 30px rgba(0,0,0,.6))}"
);

// ==== 3) style.css — سحب واضحة ====
css = css.replace(
  /\.cloud\s*\{[^}]*\}/,
  ".cloud{position:absolute;height:34px;width:160px;background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(220,230,245,.30) 50%,rgba(200,210,230,.10) 100%);border-radius:60px;filter:blur(4px);opacity:.9;box-shadow:0 0 30px rgba(255,255,255,.2)}"
);

css = css.replace(
  /\.cloud-1\s*\{[^}]*\}/,
  ".cloud-1{top:90px;animation:cloudMove 32s linear infinite;animation-delay:0s}"
);
css = css.replace(
  /\.cloud-2\s*\{[^}]*\}/,
  ".cloud-2{top:160px;width:200px;height:38px;opacity:.7;animation:cloudMove 48s linear infinite;animation-delay:-16s}"
);
css = css.replace(
  /\.cloud-3\s*\{[^}]*\}/,
  ".cloud-3{top:50px;width:130px;height:28px;opacity:.6;animation:cloudMove 40s linear infinite;animation-delay:-28s}"
);

// ==== 4) style.css — حذف قسم garland ====
css = css.replace(/\/\*\s*=+\s*RAMADAN GARLAND[\s\S]*?@keyframes miniLanternSway\s*\{[^}]*\}/, "");

write(cssPath, css);
console.log("✓ style.css: تم رفع المسجد + إظهار السحب + حذف garland");

// ==== 5) moon.js — إزالة الفوهات ====
let moonPath = path.join(WEB, "moon.js");
let moon = read(moonPath);
const before5 = moon.length;
moon = moon.replace(
  /\(phase\.illumination > 0\.55 \? renderCraters\(cx,\s*cy,\s*r,\s*phase\)\s*:\s*''\)/g,
  "''"
);
write(moonPath, moon);
console.log("✓ moon.js: تم تعديل " + (before5 - moon.length) + " حرف (حذف الفوهات)");

// ==== 6) generate-timings.js — 12 ساعة ====
let genPath = path.join(__dirname, "src", "generate-timings.js");
let gen = read(genPath);

const newFormatFn = `function formatTime(date) {
  let h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  const period = h < 12 ? "ص" : "م";
  h = h % 12;
  if (h === 0) h = 12;
  return h + ":" + m + " " + period;
}`;

gen = gen.replace(/function formatTime\(date\)\s*\{[\s\S]*?\n\}/, newFormatFn);
write(genPath, gen);
console.log("✓ generate-timings.js: تم تحويل الوقت إلى 12 ساعة");

console.log("\n✅ كل التعديلات تمت بنجاح!");