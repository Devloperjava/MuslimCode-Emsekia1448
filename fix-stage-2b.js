const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 المرحلة 2B: نجوم + خط + مسجد + ToolTip\n");

// ============================================================
// 1) night-sky.js — إضافة animationDuration
// ============================================================
let js = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");

// احذف أي animationDuration قديم
js = js.replace(/star\.style\.animationDuration\s*=\s*[^;]+;/g, "");

// أضف animationDuration بعد animationDelay
js = js.replace(
  /star\.style\.animationDelay = \(Math\.random\(\) \* 4\) \+ "s";/,
  'star.style.animationDelay = (Math.random() * 4) + "s";\n      star.style.animationDuration = (5 + Math.random() * 4) + "s";'
);

fs.writeFileSync(path.join(WEB, "night-sky.js"), js, "utf8");
console.log("✓ night-sky.js: animationDuration مضاف (5-9s)");

// ============================================================
// 2) style.css — خط + مسجد + ToolTip مستطيل
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المسجد
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف tooltip-container القديم
css = css.replace(/\.tooltip-container\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.tooltip-container\s*\{[^}]*\}\s*\}/g, "");

// احذف تواريخ قديمة
css = css.replace(/\.date-label\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-gregorian\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-info\s*\{[^}]*\}/g, "");

css += `

/* ============================================================
   STAGE-2B — نجوم + خط + مسجد + ToolTip مستطيل
   ============================================================ */

/* ===== 1) النجوم — تتحرك بنعومة ===== */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle, #ffffff, rgba(255,255,255,.4) 60%, transparent 70%);
  animation-name:starSoft;
  animation-timing-function:cubic-bezier(.45,0,.55,1);
  animation-iteration-count:infinite;
  will-change:opacity, transform;
}

.star-sm{width:2px;height:2px}
.star-md{width:3px;height:3px;box-shadow:0 0 4px rgba(255,255,255,.6)}
.star-lg{width:4px;height:4px;box-shadow:0 0 8px rgba(255,255,255,.8), 0 0 14px rgba(255,255,255,.4)}

@keyframes starSoft{
  0%,100%{opacity:.15;transform:scale(.85)}
  50%    {opacity:.9; transform:scale(1.15)}
}

/* ===== 2) المسجد — 74vh (أكبر) ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:74vh;
  min-height:500px;
  max-height:680px;
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

/* ===== 3) الخط — أكبر وأوضح ===== */

/* التواريخ — أكبر */
.date-label{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-size:clamp(19px, 5vw, 24px) !important;
  font-weight:800 !important;
  color:#0a291c !important;
  line-height:1.3 !important;
}

.date-gregorian{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-size:clamp(16px, 4.2vw, 20px) !important;
  font-weight:750 !important;
  color:#1a3a2a !important;
  margin-top:4px !important;
}

.date-info{
  min-width:0;
  flex:1;
  padding-left:6px;
}

/* البطاقة — خط أوضح */
.day-card{
  padding:24px 20px !important;
}

/* المواقيت — أكبر */
.prayer strong{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-size:clamp(15px, 4.2vw, 18px) !important;
  font-weight:800 !important;
}

.prayer span{
  font-family:"Tajawal","Cairo",sans-serif !important;
  font-size:clamp(16px, 4.5vw, 21px) !important;
  font-weight:800 !important;
}

/* ===== 4) ToolTip — مستطيل بعرض الشاشة ===== */
.tooltip-container{
  position:fixed;
  top:14px;
  left:50%;
  transform:translateX(-50%);
  z-index:99999;
  pointer-events:none;
  width:calc(100vw - 32px);
  max-width:520px;
}

.tooltip{
  background:linear-gradient(145deg,#123b2a,#0b291c);
  color:#fff;
  padding:12px 22px;
  border-radius:18px;
  border:1px solid rgba(201,162,39,.35);
  box-shadow:0 10px 30px rgba(7,35,23,.45),
             0 0 25px rgba(201,162,39,.12);
  font-size:13px;
  line-height:1.55;
  text-align:center;
  opacity:0;
  transform:translateY(-30px) scale(.95);
  animation:tooltipInR 0.55s cubic-bezier(.2,.8,.2,1) forwards,
            tooltipOutR 0.55s cubic-bezier(.2,.8,.2,1) 7.5s forwards;
}

.tooltip-icon{font-size:15px;margin-bottom:4px;display:block}

.tooltip-text{
  color:rgba(255,255,255,.94);
  direction:rtl;
  font-weight:700;
  font-family:"Cairo","Tajawal",sans-serif;
  font-size:13px;
}

.tooltip-brand{
  margin-top:6px;
  font-size:10px;
  color:rgba(201,162,39,.85);
  letter-spacing:1.5px;
  font-family:Georgia,serif;
}

@keyframes tooltipInR{
  0%{opacity:0;transform:translateY(-30px) scale(.95)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes tooltipOutR{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-30px) scale(.95)}
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:70vh;
    min-height:460px;
    max-height:600px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:66vh;
    min-height:400px;
    max-height:540px;
  }
  .tooltip-container{width:calc(100vw - 24px)}
  .tooltip{padding:11px 18px;font-size:12px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: نجوم + مسجد 74vh + خط أكبر + ToolTip مستطيل");

console.log("\\n✅ المرحلة 2B مكتملة!");
console.log("  • ⭐ النجوم: animationDuration مضاف (5-9s)");
console.log("  • 🕌 المسجد: 74vh (من 70vh)");
console.log("  • ✍️ الخط: التواريخ 24px + المواقيت 21px");
console.log("  • 💬 ToolTip: مستطيل بعرض الشاشة");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");