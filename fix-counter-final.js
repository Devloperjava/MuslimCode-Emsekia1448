const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 إصلاح شامل — العداد + المسجد + MuslimCode\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*FINAL-FIX[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   FINAL-FIX — إصلاحات جذرية نهائية
   ============================================================ */

/* ===== 1) العداد — أرقام بيضاء متوهجة ===== */
html body.dark-mode .ramadan-counter .rc-timer .rc-part .rc-num{
  color:#ffffff !important;
  -webkit-text-fill-color:#ffffff !important;
  opacity:1 !important;
  filter:none !important;
  text-shadow:
    0 0 12px rgba(255,255,255,1),
    0 0 24px rgba(232,240,238,.9),
    0 0 40px rgba(200,212,207,.6),
    0 0 60px rgba(200,212,207,.4) !important;
  font-weight:900 !important;
  letter-spacing:1px !important;
  animation:numGlowPulse 3s ease-in-out infinite !important;
}

@keyframes numGlowPulse{
  0%,100%{
    text-shadow:
      0 0 10px rgba(255,255,255,.9),
      0 0 20px rgba(232,240,238,.7),
      0 0 35px rgba(200,212,207,.5);
  }
  50%{
    text-shadow:
      0 0 15px rgba(255,255,255,1),
      0 0 30px rgba(232,240,238,.95),
      0 0 50px rgba(200,212,207,.7),
      0 0 70px rgba(200,212,207,.4);
  }
}

html body.dark-mode .ramadan-counter .rc-timer .rc-part .rc-unit{
  color:#e8f0ee !important;
  -webkit-text-fill-color:#e8f0ee !important;
  opacity:1 !important;
  text-shadow:
    0 0 8px rgba(232,240,238,.8),
    0 0 16px rgba(200,212,207,.5) !important;
  font-weight:800 !important;
}

html body.dark-mode .ramadan-counter .rc-timer .rc-part{
  background:linear-gradient(145deg,
    rgba(200,212,207,.2),
    rgba(232,240,238,.1)) !important;
  border:1.5px solid rgba(200,212,207,.5) !important;
  box-shadow:
    0 4px 16px rgba(0,0,0,.6),
    inset 0 1px 0 rgba(255,255,255,.2),
    0 0 25px rgba(200,212,207,.15) !important;
  padding:14px 12px !important;
}

html body.dark-mode .ramadan-counter .rc-timer .rc-sep{
  color:#f5d76e !important;
  -webkit-text-fill-color:#f5d76e !important;
  opacity:1 !important;
  text-shadow:
    0 0 10px rgba(245,215,110,.9),
    0 0 20px rgba(245,215,110,.6) !important;
}

/* ===== 2) نوافذ المسجد — ذهبية متوهجة ===== */
html body.dark-mode .mosque-silhouette rect[fill="#ffd97a"],
html body.dark-mode .mosque-silhouette rect[fill="#f5d76e"],
html .mosque-silhouette rect[fill="#ffd97a"]{
  fill:#f5d76e !important;
  filter:
    drop-shadow(0 0 6px rgba(245,215,110,1))
    drop-shadow(0 0 12px rgba(245,215,110,.8))
    drop-shadow(0 0 20px rgba(201,162,39,.6)) !important;
  opacity:1 !important;
}

/* الباب — ذهبي ===== */
html body.dark-mode .mosque-silhouette rect[fill="#ffd97a"]:last-child,
html .mosque-silhouette rect[fill="#ffd97a"]:last-child{
  fill:#f5d76e !important;
  filter:
    drop-shadow(0 0 8px rgba(245,215,110,1))
    drop-shadow(0 0 16px rgba(245,215,110,.9))
    drop-shadow(0 0 30px rgba(201,162,39,.7)) !important;
}

/* المسجد كامل — إبراز */
html body.dark-mode .mosque-silhouette svg{
  filter:
    drop-shadow(0 0 20px rgba(120,180,255,.3))
    drop-shadow(0 0 40px rgba(245,215,110,.2))
    brightness(1.2) !important;
}

/* ===== 3) MuslimCode — تدرج بترولي-فضي ===== */
html body.dark-mode .site-footer .brand .brand-name{
  background:linear-gradient(
    110deg,
    #4a9a92 0%,
    #7ec9c0 20%,
    #e8f0ee 45%,
    #ffffff 50%,
    #e8f0ee 55%,
    #7ec9c0 80%,
    #4a9a92 100%
  ) !important;
  background-size:300% 100% !important;
  -webkit-background-clip:text !important;
  background-clip:text !important;
  -webkit-text-fill-color:transparent !important;
  color:transparent !important;
  filter:
    drop-shadow(0 3px 15px rgba(126,201,192,.7))
    drop-shadow(0 0 30px rgba(200,212,207,.4)) !important;
  animation:brandShineDark 5s ease-in-out infinite !important;
}

@keyframes brandShineDark{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

html body.dark-mode .site-footer .footer-line{
  background:linear-gradient(90deg,
    transparent,
    rgba(126,201,192,.8),
    rgba(200,212,207,.9),
    rgba(126,201,192,.8),
    transparent) !important;
}

/* النهاري — أبقِ كما هو */
html body:not(.dark-mode) .site-footer .brand .brand-name{
  color:inherit !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: FINAL-FIX مضاف");
console.log("  • 🔢 العداد: أرقام بيضاء + نبض توهج");
console.log("  • 🕌 نوافذ المسجد: ذهبية متوهجة");
console.log("  • 📝 MuslimCode: بترولي-فضي (متناسق)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");