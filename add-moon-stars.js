const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("⭐ نجوم حول الهلال + حركة أسرع\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*MOON-STARS[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   MOON-STARS — نجوم حول الهلال + حركة أسرع
   ============================================================ */

/* ===== 1) نجوم حول الهلال — في كل بطاقة ===== */
.date-moon{
  position:relative !important;
}

/* نجمة 1 — أعلى يمين */
.date-moon::before{
  content:"" !important;
  position:absolute !important;
  top:8% !important;
  right:12% !important;
  width:3px !important;
  height:3px !important;
  border-radius:50% !important;
  background:#ffffff !important;
  box-shadow:
    0 0 4px rgba(255,255,255,1),
    0 0 8px rgba(255,255,255,.7) !important;
  animation:moonStarA 3s ease-in-out infinite !important;
  pointer-events:none !important;
}

/* نجمة 2 — أسفل يسار */
.date-moon::after{
  content:"" !important;
  position:absolute !important;
  bottom:15% !important;
  left:18% !important;
  width:2.5px !important;
  height:2.5px !important;
  border-radius:50% !important;
  background:#ffffff !important;
  box-shadow:
    0 0 4px rgba(255,255,255,.9),
    0 0 8px rgba(255,255,255,.6) !important;
  animation:moonStarB 3.5s ease-in-out 1s infinite !important;
  pointer-events:none !important;
}

/* وميض النجمة الأولى */
@keyframes moonStarA{
  0%,100%{
    opacity:.15;
    transform:scale(.7);
    box-shadow:0 0 3px rgba(255,255,255,.4);
  }
  40%{
    opacity:1;
    transform:scale(1.6);
    box-shadow:
      0 0 6px rgba(255,255,255,1),
      0 0 14px rgba(255,255,255,.9),
      0 0 22px rgba(255,255,255,.5);
  }
}

/* وميض النجمة الثانية */
@keyframes moonStarB{
  0%,100%{
    opacity:.15;
    transform:scale(.7);
    box-shadow:0 0 3px rgba(255,255,255,.4);
  }
  50%{
    opacity:1;
    transform:scale(1.5);
    box-shadow:
      0 0 5px rgba(255,255,255,1),
      0 0 12px rgba(255,255,255,.8),
      0 0 18px rgba(255,255,255,.5);
  }
}

/* في البطاقة الحالية — نجوم بلون مختلف */
.day-card.is-today .date-moon::before,
.day-card.is-today .date-moon::after{
  background:#4a9a92 !important;
  box-shadow:
    0 0 5px rgba(74,154,146,1),
    0 0 10px rgba(74,154,146,.7) !important;
}

/* ===== 2) حركة الهلال — أسرع + أوضح ===== */
.moon-emoji{
  animation:moonFaster 2.5s cubic-bezier(.45,0,.55,1) infinite !important;
  display:inline-block !important;
  will-change:transform !important;
}

@keyframes moonFaster{
  0%,100%{
    transform:translateY(0) rotate(-2deg) scale(1);
  }
  50%{
    transform:translateY(-8px) rotate(2deg) scale(1.08);
  }
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .date-moon::before{
    width:2.5px !important;
    height:2.5px !important;
  }
  .date-moon::after{
    width:2px !important;
    height:2px !important;
  }
  .moon-emoji{
    animation-duration:2.8s !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: MOON-STARS مضاف");
console.log("  • ⭐ نجمتان حول كل هلال (في 30 بطاقة)");
console.log("  • 🎬 وميض واقعي (3-3.5s)");
console.log("  • 🌙 الهلال: أسرع (2.5s) + دوران");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");