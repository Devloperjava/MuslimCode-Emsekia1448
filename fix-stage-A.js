const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 المرحلة A: إصلاحات عاجلة\n");

// ============================================================
// 1) app.js — إصلاح السطر المكسور (moonCardSVG)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف السطر المكرر الخاطئ
app = app.replace(
  /'<div class="date-moon">\$\{moonCardSVG\(day\.day\)\}<\/div>' \+\s*/g,
  ""
);

// استبدل السطر القديم (safeMoon) بالجديد كـ template string صحيح
app = app.replace(
  /'<div class="date-moon">' \+ safeMoon\(day\.day, 44\) \+ '<\/div>' \+/g,
  "'<div class=\"date-moon\">' + moonCardSVG(day.day) + '</div>' +"
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: moonCardSVG يُستخدم بشكل صحيح");

// ============================================================
// 2) style.css — إصلاحات حجم المسجد + إخفاء MuslimCode المبكر + تكبير الخط
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف التعريفات السابقة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.date-moon\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.moon-wrap\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   STAGE-A — إصلاحات عاجلة
   ============================================================ */

/* المسجد — أكبر */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:44vh;
  min-height:260px;
  max-height:360px;
  z-index:5;
  pointer-events:none;
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
}

/* هلال البطاقة المعلق بالرقم */
.date-moon{
  flex:0 0 56px;
  height:70px;
  display:grid;
  place-items:center;
  animation:moonSmooth 3.2s ease-in-out infinite;
  will-change:transform;
}

.date-moon svg{
  width:100%;
  height:100%;
  display:block;
}

@keyframes moonSmooth{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-7px)}
}

/* ===== إخفاء MuslimCode المبكر — يظهر فقط عند الوصول للفوتر ===== */
.site-footer{
  margin-top:auto;
  padding-top:60px;
}

.site-footer .brand{
  opacity:0;
  transform:translateY(20px);
  transition:opacity 0.8s ease, transform 0.8s ease;
}

.site-footer.visible .brand{
  opacity:1;
  transform:translateY(0);
}

/* ===== تكبير خط الأيام والمواقيت (responsive) ===== */
.date-label{
  font-size:clamp(15px, 4vw, 18px) !important;
  font-weight:800 !important;
}

.date-gregorian{
  font-size:clamp(14px, 3.5vw, 16px) !important;
  font-weight:700 !important;
}

.prayer strong{
  font-size:clamp(13px, 3.5vw, 15px) !important;
  font-weight:700 !important;
}

.prayer span{
  font-size:clamp(14px, 3.8vw, 17px) !important;
  font-weight:800 !important;
  color:#123b2a !important;
}

/* ===== تفاعل عند الضغط على البطاقة ===== */
.day-card{
  cursor:pointer;
  transition:transform 0.35s cubic-bezier(.2,.8,.2,1),
             box-shadow 0.35s ease,
             border-color 0.3s ease;
}

.day-card:active,
.day-card.tapped{
  transform:scale(1.03);
  box-shadow:0 18px 40px rgba(18,59,42,.2);
  border-color:#c9a227;
}

.day-card.tapped .prayer strong{
  color:#0a291c;
}

.day-card.tapped .prayer span{
  font-size:clamp(16px, 4.5vw, 19px) !important;
  color:#0a291c !important;
}

/* ===== استجابة ===== */
@media (max-width:600px){
  .mosque-silhouette{height:40vh;min-height:240px;max-height:320px}
}
@media (max-width:380px){
  .mosque-silhouette{height:36vh;min-height:220px;max-height:280px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مسجد أكبر + مسلم كود مؤجل + خط أكبر");

// ============================================================
// 3) app.js — إضافة تفاعل الضغط + ظهور الفوتر
// ============================================================
app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

if (!app.includes("STAGE-A-INTERACTIONS")) {
  app += `

/* STAGE-A-INTERACTIONS */
(function stageA(){
  function init(){
    // 1) تفاعل الضغط على بطاقة اليوم
    document.addEventListener("click", function(e){
      var card = e.target.closest(".day-card");
      if (!card) return;
      // إزالة tapped من البطاقات الأخرى
      document.querySelectorAll(".day-card.tapped").forEach(function(c){
        if (c !== card) c.classList.remove("tapped");
      });
      card.classList.toggle("tapped");
    });

    // 2) ظهور الفوتر عند التمرير
    var footer = document.querySelector(".site-footer");
    if (footer && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            footer.classList.add("visible");
          }
        });
      }, { threshold: 0.1 });
      observer.observe(footer);
    } else if (footer) {
      footer.classList.add("visible");
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;
  fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
  console.log("✓ app.js: تفاعل الضغط + ظهور الفوتر");
}

console.log("\\n✅ المرحلة A مكتملة!");
console.log("  • moonCardSVG: يُستخدم بشكل صحيح");
console.log("  • المسجد: 44vh (أكبر)");
console.log("  • MuslimCode: مخفي حتى الوصول للفوتر");
console.log("  • خط أكبر: responsive");
console.log("  • تفاعل الضغط على البطاقة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");