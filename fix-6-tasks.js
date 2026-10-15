const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 6 مهام: مسجد + ToolTip + خط + بطاقات + هلال\n");

// ============================================================
// style.css — كل التعديلات
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// ------------------------------------------------------------
// 1) حذف تعريفات المسجد القديمة
// ------------------------------------------------------------
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+[^{]*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// ------------------------------------------------------------
// 2) حذف تعريفات ToolTip القديمة
// ------------------------------------------------------------
css = css.replace(/\.tooltip\s*\{[^}]*\}/g, "");
css = css.replace(/\.tooltip-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/\.tooltip-container\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+tooltip[In|Out]+\s*\{[\s\S]*?\n\}/g, "");

// ------------------------------------------------------------
// 3) حذف تعريفات البطاقات والخط
// ------------------------------------------------------------
css = css.replace(/\.day-card\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-block\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-label\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-gregorian\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+strong\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+span\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayers\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s*\{[^}]*\}/g, "");

// ------------------------------------------------------------
// 4) إضافة التعريفات الجديدة في النهاية
// ------------------------------------------------------------
css += `

/* ============================================================
   FIX-6-TASKS — 6 تحسينات شاملة
   ============================================================ */

/* ===== 1) المسجد — أكبر (68vh) ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:68vh;
  min-height:440px;
  max-height:600px;
  z-index:5;
  pointer-events:none;
  overflow:visible;
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
  overflow:visible;
}

.mosque-silhouette rect[fill="#ffd97a"]{
  animation:windowPulse 3s ease-in-out infinite;
}

@keyframes windowPulse{
  0%,100%{opacity:.85}
  50%    {opacity:1}
}

/* ===== 2) ToolTip — زوايا ناعمة + أعلى الشاشة ===== */
.tooltip-container{
  position:fixed;
  top:12px;
  left:50%;
  transform:translateX(-50%);
  z-index:99999;
  pointer-events:none;
  width:92%;
  max-width:560px;
}

.tooltip{
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  padding:16px 24px;
  border-radius:26px;
  border:1px solid rgba(201,162,39,.4);
  box-shadow:0 22px 60px rgba(7,35,23,.5),
             0 0 40px rgba(201,162,39,.15);
  font-size:15px;
  line-height:1.7;
  text-align:center;
  opacity:0;
  transform:translateY(-40px) scale(.94);
  animation:tooltipInV2 0.6s cubic-bezier(.2,.8,.2,1) forwards,
            tooltipOutV2 0.6s cubic-bezier(.2,.8,.2,1) 7.4s forwards;
}

.tooltip-icon{
  font-size:22px;
  margin-bottom:8px;
  display:block;
}

.tooltip-text{
  color:rgba(255,255,255,.95);
  direction:rtl;
  font-weight:600;
}

.tooltip-brand{
  margin-top:10px;
  font-size:12px;
  color:rgba(201,162,39,.85);
  letter-spacing:1.5px;
}

@keyframes tooltipInV2{
  0%{opacity:0;transform:translateY(-40px) scale(.94)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tooltipOutV2{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-40px) scale(.94)}
}

/* ===== 3) الخط العربي — أكبر + فخم ===== */
.date-label{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-size:clamp(17px, 4.5vw, 21px) !important;
  font-weight:800 !important;
  color:#0a291c !important;
}

.date-gregorian{
  font-size:clamp(15px, 4vw, 18px) !important;
  font-weight:750 !important;
}

.prayer strong{
  font-size:clamp(14px, 4vw, 17px) !important;
  font-weight:800 !important;
  color:#0a291c !important;
}

.prayer span{
  font-size:clamp(15px, 4.2vw, 19px) !important;
  font-weight:800 !important;
  color:#0a291c !important;
}

/* ===== 4) البطاقات — أكبر ===== */
.day-card{
  padding:22px !important;
  border-radius:22px !important;
  margin-bottom:14px;
}

.date-block{
  gap:16px !important;
  margin-bottom:18px !important;
  padding-bottom:18px !important;
}

.date-moon{
  flex:0 0 72px !important;
  height:82px !important;
  display:grid;
  place-items:center;
  animation:moonSmooth 5s cubic-bezier(.45,0,.55,1) infinite !important;
  will-change:transform;
}

.date-moon svg{
  width:100%;
  height:100%;
  display:block;
}

.prayers{
  grid-template-columns:repeat(2, 1fr) !important;
  gap:12px !important;
}

.prayer{
  padding:16px 12px !important;
  border-radius:14px !important;
}

/* ===== 5) الهلال — حركة ناعمة بطيئة ===== */
@keyframes moonSmooth{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-7px)}
}

/* ===== استجابة للشاشات الصغيرة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:64vh;
    min-height:400px;
    max-height:540px;
  }
  .tooltip{
    padding:14px 18px;
    font-size:14px;
    border-radius:22px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:60vh;
    min-height:340px;
    max-height:480px;
  }
  .date-moon{
    flex-basis:60px !important;
    height:70px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");

console.log("✓ style.css: كل التعديلات مطبقة");
console.log("\\n✅ 6 مهام جاهزة!");
console.log("  • 🕌 المسجد: 68vh (من 58vh)");
console.log("  • 💬 ToolTip: زوايا 26px + أعلى الشاشة");
console.log("  • ✍️ الخط: أكبر + Amiri/Aref Ruqaa");
console.log("  • 📅 البطاقات: padding 22px + هلال 72px");
console.log("  • 🌙 الهلال: 5s (ناعم smooth)");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");