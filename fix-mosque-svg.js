const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🕌 تعديل نوافذ المسجد — SVG مباشرة\n");

// ============================================================
// index.html — تعديل SVG المسجد
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احفظ قبل
const before = html.length;

// 1) غيّر fill="#ffd97a" إلى fill="#4a9a92" في SVG المسجد
// (سنستهدف فقط الـ rects داخل mosque-silhouette)
const mosqueRegex = /(<div class="mosque-silhouette">[\s\S]*?<\/svg>)/;

html = html.replace(mosqueRegex, function(mosqueBlock) {
  // غيّر كل rect بـ fill="#ffd97a"
  let modified = mosqueBlock.replace(/fill="#ffd97a"/g, 'fill="#4a9a92"');
  // غيّر الباب (آخر rect) — يحتاج تمييز
  // نستخدم replace آخر rect فقط
  modified = modified.replace(
    /(<rect\s+x="590"\s+y="200"\s+width="20"\s+height="40"\s+rx="10"[^>]*?fill=")#4a9a92(")/,
    '$1#7ec9c0$2'
  );
  // احتياطي — إذا الباب بـ coordinates مختلفة
  modified = modified.replace(
    /(<rect\s+x="[^"]*"\s+y="2[0-9][0-9]"\s+width="[^"]*"\s+height="[^"]*"\s+rx="[^"]*"[^>]*?fill=")#4a9a92(")/g,
    '$1#7ec9c0$2'
  );
  return modified;
});

// 2) احتياطي — إذا لم يعمل regex أعلاه
html = html.replace(/fill="#ffd97a"/g, 'fill="#4a9a92"');

// احفظ
fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");

console.log("✓ index.html: النوافذ بترولية (#4a9a92)");
console.log("✓ الباب بترولي أفتح (#7ec9c0)");

// ============================================================
// التحقق
// ============================================================
html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");
const checkOld = (html.match(/fill="#ffd97a"/g) || []).length;
const checkNew = (html.match(/fill="#4a9a92"/g) || []).length;
const checkDoor = (html.match(/fill="#7ec9c0"/g) || []).length;

console.log("\\n📊 التحقق:");
console.log("  • fill='#ffd97a' (ذهبي): " + checkOld);
console.log("  • fill='#4a9a92' (بترولي): " + checkNew);
console.log("  • fill='#7ec9c0' (باب): " + checkDoor);

// ============================================================
// style.css — حذف تعريفات CSS التي قد تتعارض
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات MOSQUE-WINDOWS القديمة
css = css.replace(/\/\*\s*=+\s*\n\s*COLOR-TWEAKS[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

// أضف تعريف CSS جديد — يدعم الجديد
css += `

/* ============================================================
   MOSQUE-WINDOWS-FINAL — بترولي مباشر
   ============================================================ */

.mosque-silhouette rect[fill="#4a9a92"]{
  filter:
    drop-shadow(0 0 6px rgba(74,154,146,.9))
    drop-shadow(0 0 12px rgba(74,154,146,.6)) !important;
}

.mosque-silhouette rect[fill="#7ec9c0"]{
  filter:
    drop-shadow(0 0 8px rgba(126,201,192,1))
    drop-shadow(0 0 16px rgba(126,201,192,.7)) !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("\\n✓ style.css: MOSQUE-WINDOWS-FINAL مضاف");

console.log("\\n✅ تم!");
console.log("  • 🕌 النوافذ: بترولية (#4a9a92)");
console.log("  • 🚪 الباب: بترولي أفتح (#7ec9c0)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");