const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔤 المرحلة 1: النصوص + ToolTip + العداد\n");

// ============================================================
// 1) index.html — تعديلات النصوص
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// 1a) "متبقي حتى رمضان" → "متبقي على رمضان"
html = html.replace("🌙 متبقٍ حتى رمضان 1448", "متبقٍ على رمضان 1448");
html = html.replace("🌙 متبقي حتى رمضان 1448", "متبقي على رمضان 1448");
html = html.replace("متبقٍ حتى رمضان 1448", "متبقٍ على رمضان 1448");
html = html.replace("متبقي حتى رمضان 1448", "متبقي على رمضان 1448");

// 1b) حذف أي هلال ذهبي قبل "متبقي" في العداد
html = html.replace(/🌙\s*متبقٍ?\s*(حتى|على)\s*رمضان/g, "متبقٍ على رمضان");

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: حتى → على + حذف الهلال الذهبي");

// ============================================================
// 2) style.css — ToolTip أصغر + Text-shadow + خط
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف ToolTip القديم
css = css.replace(/\.tooltip-container\s*\{[^}]*\}/g, "");
css = css.replace(/\.tooltip\s*\{[^}]*\}/g, "");
css = css.replace(/\.tooltip-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+tooltip[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريفات العداد القديمة
css = css.replace(/\.ramadan-counter\s*\{[^}]*\}/g, "");
css = css.replace(/\.rc-[a-z]+\s*\{[^}]*\}/g, "");

// أضف الجديدة
css += `

/* ============================================================
   STAGE-1-TEXTS — ToolTip أصغر + عداد
   ============================================================ */

/* ===== ToolTip — صغير وأنيق ===== */
.tooltip-container{
  position:fixed;
  top:14px;
  left:50%;
  transform:translateX(-50%);
  z-index:99999;
  pointer-events:none;
  width:auto;
  max-width:360px;
  padding:0 10px;
}

.tooltip{
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  padding:10px 18px;
  border-radius:18px;
  border:1px solid rgba(201,162,39,.35);
  box-shadow:0 10px 30px rgba(7,35,23,.45),
             0 0 25px rgba(201,162,39,.12);
  font-size:13px;
  line-height:1.5;
  text-align:center;
  opacity:0;
  transform:translateY(-30px) scale(.92);
  animation:tooltipInS 0.55s cubic-bezier(.2,.8,.2,1) forwards,
            tooltipOutS 0.55s cubic-bezier(.2,.8,.2,1) 7.5s forwards;
}

.tooltip-icon{
  font-size:15px;
  margin-bottom:4px;
  display:block;
}

.tooltip-text{
  color:rgba(255,255,255,.94);
  direction:rtl;
  font-weight:600;
}

.tooltip-brand{
  margin-top:6px;
  font-size:10px;
  color:rgba(201,162,39,.85);
  letter-spacing:1.5px;
  font-family:Georgia,serif;
}

@keyframes tooltipInS{
  0%{opacity:0;transform:translateY(-30px) scale(.92)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tooltipOutS{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-30px) scale(.92)}
}

/* ===== العداد — بدون هلال ذهبي ===== */
.ramadan-counter{
  margin:20px auto;
  max-width:600px;
  padding:22px 18px;
  border-radius:22px;
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  text-align:center;
  box-shadow:0 20px 50px rgba(7,35,23,.35);
  border:1px solid rgba(201,162,39,.25);
}

.rc-label{
  font-family:"Aref Ruqaa","Amiri",serif;
  font-size:15px;
  color:#f5d76e;
  font-weight:700;
  margin-bottom:14px;
  letter-spacing:.5px;
}

.rc-timer{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:8px;
  direction:ltr;
}

.rc-part{
  display:flex;
  flex-direction:column;
  min-width:56px;
}

.rc-num{
  font-size:26px;
  font-weight:850;
  color:#fff;
  font-variant-numeric:tabular-nums;
  text-shadow:0 0 20px rgba(201,162,39,.5);
  line-height:1;
}

.rc-unit{
  font-size:11px;
  color:rgba(255,255,255,.65);
  margin-top:4px;
}

.rc-sep{
  font-size:22px;
  color:rgba(201,162,39,.6);
  font-weight:300;
  margin-top:-12px;
}

/* ===== استجابة ===== */
@media (max-width:520px){
  .tooltip-container{max-width:320px}
  .tooltip{padding:9px 16px;font-size:12px;border-radius:16px}
  .tooltip-brand{font-size:9px}
  .rc-num{font-size:20px}
  .rc-part{min-width:44px}
  .rc-sep{font-size:18px}
  .rc-label{font-size:13px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: ToolTip أصغر + العداد محدّث");

console.log("\\n✅ المرحلة 1 مكتملة!");
console.log("  • 🔤 'متبقي على رمضان' بدل 'حتى'");
console.log("  • 🚫 حذف الهلال الذهبي من العداد");
console.log("  • 💬 ToolTip: أصغر (360px → max) + MuslimCode تحته");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");