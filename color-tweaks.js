const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 3 تعديلات ألوان — نوافذ + أهلة + آية\n");

let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*COLOR-TWEAKS[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   COLOR-TWEAKS — 3 تعديلات ألوان فقط
   ============================================================ */

/* ===== 1) نوافذ المسجد — بترولي دافئ ===== */
.mosque-silhouette rect[fill="#ffd97a"],
.mosque-silhouette rect[fill="#f5d76e"]{
  fill:#4a9a92 !important;
  filter:
    drop-shadow(0 0 6px rgba(74,154,146,.9))
    drop-shadow(0 0 12px rgba(74,154,146,.6)) !important;
}

/* الباب — بترولي أفتح */
.mosque-silhouette rect[fill="#ffd97a"]:last-child{
  fill:#7ec9c0 !important;
  filter:
    drop-shadow(0 0 8px rgba(126,201,192,1))
    drop-shadow(0 0 16px rgba(126,201,192,.7)) !important;
}

/* ===== 2) أهلة البطاقات — فضي + لمعان بسيط ===== */
.moon-emoji{
  filter:
    grayscale(100%)
    brightness(1.7)
    contrast(1.1)
    drop-shadow(0 0 6px rgba(232,240,238,.7))
    drop-shadow(0 0 12px rgba(200,212,207,.4)) !important;
  animation:moonSilverGlow 4s ease-in-out infinite !important;
}

@keyframes moonSilverGlow{
  0%,100%{
    filter:
      grayscale(100%)
      brightness(1.6)
      contrast(1.1)
      drop-shadow(0 0 5px rgba(232,240,238,.6))
      drop-shadow(0 0 10px rgba(200,212,207,.3));
  }
  50%{
    filter:
      grayscale(100%)
      brightness(1.9)
      contrast(1.15)
      drop-shadow(0 0 10px rgba(232,240,238,.9))
      drop-shadow(0 0 20px rgba(200,212,207,.6))
      drop-shadow(0 0 30px rgba(200,212,207,.3));
  }
}

/* ===== 3) الآية — بترولي + لمعان فضي ===== */
.ayah-clean-text{
  color:#4a9a92 !important;
  -webkit-text-fill-color:#4a9a92 !important;
  font-weight:800 !important;
  text-shadow:
    0 2px 8px rgba(0,0,0,.4),
    0 0 15px rgba(74,154,146,.5),
    0 0 30px rgba(200,212,207,.3) !important;
  animation:ayahTealShine 4s ease-in-out infinite !important;
}

@keyframes ayahTealShine{
  0%,100%{
    text-shadow:
      0 2px 8px rgba(0,0,0,.4),
      0 0 15px rgba(74,154,146,.5),
      0 0 30px rgba(200,212,207,.3);
    color:#4a9a92;
  }
  50%{
    text-shadow:
      0 2px 8px rgba(0,0,0,.4),
      0 0 25px rgba(74,154,146,.9),
      0 0 50px rgba(200,212,207,.6),
      0 0 70px rgba(200,212,207,.3);
    color:#7ec9c0;
  }
}

/* القوسان ﴿ ﴾ — ذهبي (للتباين) */
.ayah-clean-open,
.ayah-clean-close{
  color:#f5d76e !important;
  -webkit-text-fill-color:#f5d76e !important;
  filter:drop-shadow(0 2px 8px rgba(245,215,110,.6)) !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: COLOR-TWEAKS مضاف");
console.log("  • 🕌 نوافذ المسجد: بترولي #4a9a92");
console.log("  • 🌙 أهلة البطاقات: فضي + لمعان");
console.log("  • 📖 الآية: بترولي #4a9a92 + لمعان فضي");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");