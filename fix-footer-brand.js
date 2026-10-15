const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("✨ تدرج بترولي + زيتوني لـ MuslimCode\n");

// ============================================================
// style.css — تنسيق MuslimCode في الفوتر
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات brand-name القديمة
css = css.replace(/\.brand-name\s*\{[^}]*\}/g, "");
css = css.replace(/\.brand-name::?before\s*\{[^}]*\}/g, "");
css = css.replace(/\.brand-name::?after\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+brandShimmer\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+brandPulse\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+brandOlive\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   FOOTER-BRAND — MuslimCode بتدرج بترولي + زيتوني
   ============================================================ */

.site-footer{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin-top:36px;
  padding:34px 20px 20px;
  overflow:hidden;
  isolation:isolate;
}

.footer-line{
  width:min(420px,80%);
  height:1.5px;
  background:linear-gradient(90deg,
    transparent,
    rgba(42,95,90,.6),
    rgba(107,125,58,.8),
    rgba(42,95,90,.6),
    transparent);
  margin-bottom:24px;
}

.brand{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:4px;
  direction:ltr;
  cursor:default;
}

.brand-name{
  position:relative;
  display:inline-block;
  font-family:"Amiri","Georgia",serif;
  font-size:30px;                /* ← الخط +4px (كان 26px) */
  font-weight:800;
  letter-spacing:1.5px;
  background:linear-gradient(
    110deg,
    #1a4d4a 0%,          /* بترولي غامق */
    #2a5f5a 20%,         /* بترولي */
    #6b7d3a 40%,         /* زيتوني */
    #8a9d5a 50%,         /* زيتوني فاتح */
    #6b7d3a 60%,         /* زيتوني */
    #2a5f5a 80%,         /* بترولي */
    #1a4d4a 100%         /* بترولي غامق */
  );
  background-size:300% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:brandOliveFlow 6s ease-in-out infinite,
             brandOlivePulse 4s ease-in-out infinite;
  filter:drop-shadow(0 3px 12px rgba(42,95,90,.4));
  will-change:background-position, filter;
}

@keyframes brandOliveFlow{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

@keyframes brandOlivePulse{
  0%,100%{
    filter:drop-shadow(0 3px 12px rgba(42,95,90,.4))
           drop-shadow(0 0 15px rgba(107,125,58,.25))
           brightness(1);
  }
  50%{
    filter:drop-shadow(0 5px 20px rgba(42,95,90,.7))
           drop-shadow(0 0 30px rgba(107,125,58,.5))
           brightness(1.15);
  }
}

.brand-name::after{
  content:"";
  position:absolute;
  left:-10px;
  right:-10px;
  bottom:-4px;
  height:1.5px;
  background:linear-gradient(90deg,
    transparent,
    rgba(107,125,58,.7),
    rgba(42,95,90,.8),
    rgba(107,125,58,.7),
    transparent);
}

/* توهج خلفي */
.footer-glow{
  position:absolute;
  left:50%;
  bottom:-80px;
  width:260px;
  height:140px;
  transform:translateX(-50%);
  border-radius:50%;
  background:radial-gradient(
    ellipse,
    rgba(42,95,90,.2),
    rgba(107,125,58,.1) 50%,
    transparent 70%);
  filter:blur(14px);
  pointer-events:none;
  z-index:-1;
}

@media(max-width:520px){
  .brand-name{font-size:26px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: MuslimCode (بترولي + زيتوني + خط +4px)");
console.log("\\n✅ التعديل جاهز!");
console.log("  • تدرج بترولي → زيتوني → بترولي");
console.log("  • لمعان يجري عبر النص");
console.log("  • نبض توهج ناعم");
console.log("  • الخط: 30px (كان 26px = +4px)");
console.log("  • لا كسر لأي ميزة");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");