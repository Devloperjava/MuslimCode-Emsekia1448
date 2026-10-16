const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("✨ تقوية اللون + تكبير الخط +3px\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة لـ POLISH-LABEL
css = css.replace(/\/\* =+\s*\n\s*POLISH-LABEL[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   POLISH-LABEL — تباين قوي + خط أكبر +3px
   ============================================================ */

.rc-label{
  font-family:"Reem Kufi","Aref Ruqaa","Amiri",Georgia,serif !important;
  font-size:clamp(33px, 7.5vw, 41px) !important;  /* ← +3px */
  font-weight:900 !important;
  letter-spacing:0.5px !important;
  line-height:1.6 !important;
  padding:14px 20px !important;
  min-height:64px !important;
  text-align:center !important;
  margin-bottom:20px !important;
  display:block !important;
}

.rc-typewriter{
  display:inline-block !important;
  background:linear-gradient(
    110deg,
    #4a9a92 0%,       /* بترولي فاتح جداً — تباين عالي */
    #7ec9c0 20%,      /* فاتح */
    #e8f0ee 45%,      /* فضي فاتح */
    #ffffff 50%,      /* أبيض ناصع */
    #e8f0ee 55%,      /* فضي فاتح */
    #7ec9c0 80%,      /* فاتح */
    #4a9a92 100%      /* بترولي فاتح */
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:
    drop-shadow(0 0 15px rgba(126,201,192,.7))    /* توهج بترولي فاتح */
    drop-shadow(0 0 30px rgba(126,201,192,.4))
    drop-shadow(0 3px 12px rgba(0,0,0,.5)) !important;
  animation:labelShine 5s ease-in-out infinite !important;
  will-change:contents !important;
  vertical-align:bottom !important;
}

@keyframes labelShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

.rc-cursor{
  display:inline-block !important;
  width:4px !important;
  height:1em !important;
  background:#7ec9c0 !important;
  margin-right:4px !important;
  vertical-align:middle !important;
  animation:cursorBlink 0.8s step-end infinite !important;
  box-shadow:
    0 0 10px rgba(126,201,192,1),
    0 0 20px rgba(126,201,192,.6) !important;
  border-radius:1px !important;
}

@keyframes cursorBlink{
  0%,100%{opacity:1;transform:scaleY(1)}
  50%    {opacity:0.3;transform:scaleY(0.85)}
}

@media (max-width: 600px){
  .rc-label{
    font-size:clamp(29px, 7vw, 35px) !important;
    padding:10px 14px !important;
    min-height:56px !important;
  }
  .rc-cursor{
    width:3.5px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: POLISH-LABEL مضاف");
console.log("  • 🎨 ألوان فاتحة (تباين عالي)");
console.log("  • ✨ توهج مزدوج");
console.log("  • 📏 الخط +3px (41px → 38px)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");