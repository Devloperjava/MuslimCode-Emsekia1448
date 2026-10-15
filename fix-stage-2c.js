const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 المرحلة 2C: نجوم + مسجد + خط 28px + مواقيت 25px\n");

// ============================================================
// 1) style.css — إصلاح النجوم + الخط + المسجد + البطاقات
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات النجوم القديمة (بما فيها animation shorthand)
css = css.replace(/\.star\s*\{[^}]*\}/g, "");
css = css.replace(/\.star-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+star[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريفات المسجد القديمة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف تعريفات الخط القديمة
css = css.replace(/\.date-label\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-gregorian\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+strong\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+span\s*\{[^}]*\}/g, "");
css = css.replace(/\.day-card\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayers\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s*\{[^}]*\}/g, "");

css += `

/* ============================================================
   STAGE-2C — نجوم تتحرك + مسجد + خط 28px + مواقيت 25px
   ============================================================ */

/* ===== 1) النجوم — لا shorthand! كل خاصية منفصلة ===== */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle, #ffffff, rgba(255,255,255,.4) 60%, transparent 70%);
  animation-name:starSoft;
  animation-timing-function:cubic-bezier(.45,0,.55,1);
  animation-iteration-count:infinite;
  will-change:opacity, transform;
  /* لا نضع animation-duration هنا — يأتي من JS */
}

.star-sm{width:2px;height:2px}
.star-md{width:3px;height:3px;box-shadow:0 0 4px rgba(255,255,255,.6)}
.star-lg{width:4px;height:4px;box-shadow:0 0 8px rgba(255,255,255,.8), 0 0 14px rgba(255,255,255,.4)}

@keyframes starSoft{
  0%,100%{opacity:.15;transform:scale(.85)}
  50%    {opacity:.9; transform:scale(1.15)}
}

/* ===== 2) المسجد — 78vh ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw;
  height:78vh;
  min-height:520px;
  max-height:720px;
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

/* ===== 3) البطاقات — أكبر ===== */
.day-card{
  position:relative;
  overflow:hidden;
  background:#ffffff;
  border:1px solid #dce6e0;
  border-radius:24px;
  padding:26px 24px;
  box-shadow:0 6px 22px rgba(18,59,42,.07);
  margin-bottom:18px;
  animation:cardEnter .8s cubic-bezier(.2,.8,.2,1) both;
  transition:transform .35s ease, box-shadow .35s ease, border-color .3s ease;
}

.day-card.is-today{
  border:2px solid #c9a227;
  box-shadow:0 14px 38px rgba(201,162,39,.28);
  background:linear-gradient(180deg,#fffdf5,#ffffff);
}

.day-card.is-past{opacity:.55}

.day-card.tapped,
.day-card:active{
  transform:scale(1.02);
  box-shadow:0 20px 45px rgba(18,59,42,.18);
}

@keyframes cardEnter{
  from{opacity:0;transform:translateY(20px) scale(.98)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

/* ===== 4) الخط — 28px + 25px ===== */

/* التواريخ: "1 رمضان 1448" */
.date-label{
  font-family:"Aref Ruqaa","Amiri",serif !important;
  font-size:28px !important;
  font-weight:800 !important;
  color:#0a291c !important;
  line-height:1.25 !important;
  margin-bottom:6px !important;
}

/* "الثلاثاء 9 فبراير 2027" */
.date-gregorian{
  font-family:"Cairo","Tajawal",sans-serif !important;
  font-size:20px !important;
  font-weight:750 !important;
  color:#1a3a2a !important;
  line-height:1.4 !important;
}

.date-info{
  min-width:0;
  flex:1;
  padding-left:8px;
}

/* المواقيت — 25px */
.prayers{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:14px;
}

.prayer{
  padding:18px 14px;
  border:1px solid #dfeae3;
  border-radius:16px;
  background:linear-gradient(145deg,#f3f8f5,#eaf3ed);
  text-align:center;
  transition:transform .3s ease, box-shadow .3s ease;
}

.prayer:hover{
  transform:translateY(-2px);
  box-shadow:0 6px 14px rgba(18,59,42,.1);
}

.prayer strong{
  font-family:"Cairo","Tajawal",sans-serif !important;
  display:block;
  margin-bottom:6px;
  color:#0a291c !important;
  font-size:20px !important;
  font-weight:800 !important;
}

.prayer span{
  font-family:"Tajawal","Cairo",sans-serif !important;
  color:#0a291c !important;
  font-size:25px !important;
  font-weight:800 !important;
  font-variant-numeric:tabular-nums !important;
}

.prayer.is-next{
  background:linear-gradient(145deg,#fff7d6,#ffefb3);
  border-color:#c9a227;
  box-shadow:0 8px 22px rgba(201,162,39,.3);
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:74vh;
    min-height:480px;
    max-height:640px;
  }
  .date-label{font-size:26px !important}
  .date-gregorian{font-size:19px !important}
  .prayer span{font-size:23px !important}
  .prayer strong{font-size:19px !important}
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:70vh;
    min-height:420px;
    max-height:580px;
  }
  .date-label{font-size:24px !important}
  .date-gregorian{font-size:17px !important}
  .prayer span{font-size:21px !important}
  .prayer strong{font-size:17px !important}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: كل التعديلات مطبقة");

console.log("\\n✅ المرحلة 2C مكتملة!");
console.log("  • ⭐ النجوم: animation منفصل (لا shorthand)");
console.log("  • 🕌 المسجد: 78vh (من 74vh)");
console.log("  • 📅 التواريخ: 28px");
console.log("  • 📝 المواقيت: 25px");
console.log("  • 📐 البطاقات: padding 26px");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  node --check web/night-sky.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");