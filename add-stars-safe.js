const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("⭐ نجوم الهلال (فضي+ذهبي) + نجوم خلف البطاقات\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*STARS-SAFE[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   STARS-SAFE — نجوم الهلال + نجوم خلف البطاقات
   ============================================================ */

/* ===== 1) نجوم الهلال — فضي + ذهبي ===== */

/* نجمة 1 (فضي) — أعلى يمين */
.date-moon::before{
  content:"" !important;
  position:absolute !important;
  top:8% !important;
  right:12% !important;
  width:3.5px !important;
  height:3.5px !important;
  border-radius:50% !important;
  background:#e8f0ee !important;  /* فضي */
  box-shadow:
    0 0 5px rgba(232,240,238,1),
    0 0 10px rgba(232,240,238,.8),
    0 0 18px rgba(232,240,238,.5) !important;
  animation:moonStarSilver 3s ease-in-out infinite !important;
  pointer-events:none !important;
  z-index:2 !important;
}

@keyframes moonStarSilver{
  0%,100%{
    opacity:.2;
    transform:scale(.7);
    box-shadow:0 0 3px rgba(232,240,238,.4);
  }
  40%{
    opacity:1;
    transform:scale(1.7);
    box-shadow:
      0 0 7px rgba(232,240,238,1),
      0 0 15px rgba(232,240,238,.95),
      0 0 25px rgba(232,240,238,.6);
  }
}

/* نجمة 2 (ذهبي) — أسفل يسار */
.date-moon::after{
  content:"" !important;
  position:absolute !important;
  bottom:15% !important;
  left:18% !important;
  width:3px !important;
  height:3px !important;
  border-radius:50% !important;
  background:#f5d76e !important;  /* ذهبي */
  box-shadow:
    0 0 5px rgba(245,215,110,1),
    0 0 10px rgba(245,215,110,.8),
    0 0 18px rgba(245,215,110,.5) !important;
  animation:moonStarGold 3.5s ease-in-out 1s infinite !important;
  pointer-events:none !important;
  z-index:2 !important;
}

@keyframes moonStarGold{
  0%,100%{
    opacity:.2;
    transform:scale(.7);
    box-shadow:0 0 3px rgba(245,215,110,.4);
  }
  50%{
    opacity:1;
    transform:scale(1.6);
    box-shadow:
      0 0 6px rgba(245,215,110,1),
      0 0 14px rgba(245,215,110,.9),
      0 0 22px rgba(245,215,110,.6);
  }
}

/* ===== 2) نجوم خلف كل بطاقة — بلون بترولي فاتح ===== */

.day-card{
  background-image:
    radial-gradient(circle at 15% 20%, rgba(74,154,146,.35) 1.5px, transparent 2px),
    radial-gradient(circle at 85% 15%, rgba(74,154,146,.3) 2px, transparent 2.5px),
    radial-gradient(circle at 25% 80%, rgba(74,154,146,.3) 1.5px, transparent 2px),
    radial-gradient(circle at 75% 70%, rgba(74,154,146,.35) 2px, transparent 2.5px),
    radial-gradient(circle at 50% 50%, rgba(74,154,146,.2) 1px, transparent 1.5px),
    radial-gradient(circle at 10% 60%, rgba(74,154,146,.25) 1.5px, transparent 2px),
    radial-gradient(circle at 90% 85%, rgba(74,154,146,.3) 1.5px, transparent 2px) !important;
  background-size:100% 100% !important;
  background-repeat:no-repeat !important;
  background-color:#ffffff !important;  /* ✅ أبقِ الخلفية البيضاء */
  animation:cardStarsTwinkle 5s ease-in-out infinite !important;
}

@keyframes cardStarsTwinkle{
  0%,100%{
    background-position:0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
    filter:brightness(1);
  }
  50%{
    background-position:2px -2px, -2px 2px, 1px 1px, -1px -1px, 0 0, 1px 0, -1px 1px;
    filter:brightness(1.08);
  }
}

/* البطاقة الحالية — نجوم ذهبية */
.day-card.is-today{
  background-image:
    radial-gradient(circle at 15% 20%, rgba(201,162,39,.4) 1.5px, transparent 2px),
    radial-gradient(circle at 85% 15%, rgba(201,162,39,.35) 2px, transparent 2.5px),
    radial-gradient(circle at 25% 80%, rgba(201,162,39,.35) 1.5px, transparent 2px),
    radial-gradient(circle at 75% 70%, rgba(201,162,39,.4) 2px, transparent 2.5px),
    radial-gradient(circle at 50% 50%, rgba(201,162,39,.25) 1px, transparent 1.5px) !important;
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .date-moon::before{
    width:3px !important;
    height:3px !important;
  }
  .date-moon::after{
    width:2.5px !important;
    height:2.5px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: STARS-SAFE مضاف");
console.log("  • ⭐ نجوم الهلال: فضي + ذهبي");
console.log("  • ⭐ نجوم خلف البطاقات: بترولي فاتح");
console.log("  • 🎬 وميض واقعي (3-5s)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");