const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 استرجاع القواعد الأساسية المفقودة\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف فقط التعريفات القديمة المتضاربة (لتفادي التعارض)
css = css.replace(/\.day-card\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayers\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+strong\s*\{[^}]*\}/g, "");
css = css.replace(/\.prayer\s+span\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-block\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-number\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-info\s*\{[^}]*\}/g, "");

// أضف القواعد الأساسية الكاملة في النهاية (تتغلب على أي متبقٍ)
css += `

/* ============================================================
   RESTORE-BASICS — القواعد الأساسية للبطاقات (مفقودة)
   ============================================================ */

/* ===== البطاقة اليومية — الأساسية ===== */
.day-card{
  position:relative;
  overflow:hidden;
  background:#ffffff;
  border:1px solid #dce6e0;
  border-radius:22px;
  padding:22px;
  box-shadow:0 5px 18px rgba(18,59,42,.06);
  margin-bottom:14px;
  animation:cardEnter .8s cubic-bezier(.2,.8,.2,1) both;
  transition:transform .35s ease, box-shadow .35s ease, border-color .3s ease;
}

.day-card.is-today{
  border:2px solid #c9a227;
  box-shadow:0 12px 32px rgba(201,162,39,.25);
  background:linear-gradient(180deg,#fffdf5,#ffffff);
}

.day-card.is-past{
  opacity:.55;
}

.day-card.tapped,
.day-card:active{
  transform:scale(1.02);
  box-shadow:0 18px 40px rgba(18,59,42,.15);
}

/* ===== بلوك التاريخ ===== */
.date-block{
  display:flex;
  align-items:center;
  gap:16px;
  margin-bottom:18px;
  padding-bottom:18px;
  border-bottom:1px solid #e7eee9;
}

/* ===== رقم اليوم ===== */
.date-number{
  flex:0 0 60px;
  height:60px;
  display:grid;
  place-items:center;
  border-radius:16px;
  background:linear-gradient(145deg,#18543b,#0e3022);
  color:#fff;
  font-size:24px;
  font-weight:800;
  box-shadow:0 8px 20px rgba(18,59,42,.2);
}

.day-card.is-today .date-number{
  background:linear-gradient(145deg,#c9a227,#a8831a);
  box-shadow:0 8px 20px rgba(201,162,39,.4);
}

/* ===== معلومات التاريخ ===== */
.date-info{
  min-width:0;
  flex:1;
}

/* ===== شبكة المواقيت ===== */
.prayers{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:12px;
}

/* ===== بطاقة الصلاة ===== */
.prayer{
  padding:16px 12px;
  border:1px solid #dfeae3;
  border-radius:14px;
  background:linear-gradient(145deg,#f3f8f5,#eaf3ed);
  text-align:center;
  transition:transform .3s ease, box-shadow .3s ease;
}

.prayer:hover{
  transform:translateY(-2px);
  box-shadow:0 6px 14px rgba(18,59,42,.1);
}

.prayer strong{
  display:block;
  margin-bottom:4px;
  color:#0a291c;
  font-size:clamp(14px, 4vw, 17px);
  font-weight:800;
}

.prayer span{
  color:#0a291c;
  font-size:clamp(15px, 4.2vw, 19px);
  font-weight:800;
  font-variant-numeric:tabular-nums;
}

.prayer.is-next{
  background:linear-gradient(145deg,#fff7d6,#ffefb3);
  border-color:#c9a227;
  box-shadow:0 6px 18px rgba(201,162,39,.3);
}

/* ===== أنيميشن دخول البطاقة ===== */
@keyframes cardEnter{
  from{opacity:0; transform:translateY(20px) scale(.98)}
  to  {opacity:1; transform:translateY(0) scale(1)}
}

/* ===== استجابة ===== */
@media (max-width:520px){
  .day-card{padding:16px}
  .date-number{flex-basis:52px;height:52px;font-size:20px}
  .prayer{padding:12px 8px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");

console.log("✓ style.css: استُرجعت القواعد الأساسية");
console.log("\\n✅ القواعد المُضافة:");
console.log("  • .day-card (خلفية + padding + border)");
console.log("  • .date-block + .date-number + .date-info");
console.log("  • .prayers (grid) + .prayer (بطاقة)");
console.log("  • .prayer strong + span");
console.log("  • @keyframes cardEnter");
console.log("  • media queries");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");