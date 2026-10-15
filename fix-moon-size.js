const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌙 تصغير الهلال إلى 30px\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريف moon-emoji القديم
css = css.replace(/\.moon-emoji\s*\{[^}]*\}/g, "");

// احذف تعريف date-moon القديم
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");

css += `

/* ============================================================
   MOON-SIZE — حجم 30px (متناسق)
   ============================================================ */

.date-moon{
  flex:0 0 50px;
  height:56px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:1px;
  animation:moonSmoothCard 5s cubic-bezier(.45,0,.55,1) infinite;
  will-change:transform;
}

.moon-emoji{
  font-size:30px;
  line-height:1;
  display:block;
  filter:grayscale(100%) brightness(0.3) sepia(100%) hue-rotate(140deg) saturate(3) brightness(0.5);
  text-shadow:0 1px 4px rgba(26,58,74,0.35);
}

.moon-day-num{
  font-family:"Aref Ruqaa", Georgia, serif;
  font-size:13px;
  font-weight:800;
  color:#123b2a;
  letter-spacing:0.3px;
}

@keyframes moonSmoothCard{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-4px)}
}

/* استجابة للشاشات الصغيرة */
@media (max-width: 600px){
  .date-moon{flex-basis:46px;height:52px}
  .moon-emoji{font-size:28px}
  .moon-day-num{font-size:12px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: الهلال 30px (من 44px)");

console.log("\\n✅ الحجم الجديد:");
console.log("  • 🌙 الهلال: 30px (بدل 44px)");
console.log("  • 🔢 الرقم: 13px");
console.log("  • 📐 الحاوية: 50×56 (بدل 70×80)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");