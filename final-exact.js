const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎯 4 تعديلات نهائية — بترولي + فضي + آية\n");

// ============================================================
// 1) index.html — نوافذ المسجد بترولي (SVG مباشر)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// نوافذ المسجد: غيّر كل fill الذهبي إلى بترولي
html = html.replace(/fill="#ffd97a"/g, 'fill="#4a9a92"');
html = html.replace(/fill="#f5d76e"/g, 'fill="#4a9a92"');

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: نوافذ المسجد — بترولي (#4a9a92)");

// ============================================================
// 2) style.css — العداد بترولي + الهلال فضي + الآية بترولي
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*FINAL-EXACT[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   FINAL-EXACT — 4 تعديلات فقط
   ============================================================ */

/* ===== 1) العداد — بترولي ===== */
.ramadan-counter{
  background:linear-gradient(145deg, #123b2a, #0b291c) !important;
  border:1px solid rgba(74,154,146,.35) !important;
}

.rc-part{
  background:linear-gradient(145deg,
    rgba(74,154,146,.25),
    rgba(42,95,90,.15)) !important;
  border:1.5px solid rgba(74,154,146,.55) !important;
  box-shadow:
    0 4px 12px rgba(0,0,0,.4),
    inset 0 1px 0 rgba(126,201,192,.2) !important;
}

.rc-num{
  color:#7ec9c0 !important;
  -webkit-text-fill-color:#7ec9c0 !important;
  font-size:28px !important;
  font-weight:900 !important;
  text-shadow:
    0 0 10px rgba(126,201,192,.8),
    0 0 20px rgba(74,154,146,.5) !important;
}

.rc-unit{
  color:#4a9a92 !important;
  font-size:12px !important;
  font-weight:700 !important;
}

.rc-sep{
  color:#7ec9c0 !important;
  font-size:22px !important;
}

/* ===== 2) الهلال + الرقم في البطاقات — فضي ناصع + كبير ===== */
.moon-emoji{
  filter:
    grayscale(100%)
    brightness(2.2)
    contrast(1.2)
    drop-shadow(0 0 12px rgba(255,255,255,1))
    drop-shadow(0 0 24px rgba(232,240,238,.7)) !important;
  font-size:42px !important;
  animation:moonSilverBig 4s ease-in-out infinite !important;
}

@keyframes moonSilverBig{
  0%,100%{
    filter:
      grayscale(100%)
      brightness(2)
      contrast(1.2)
      drop-shadow(0 0 10px rgba(255,255,255,.9))
      drop-shadow(0 0 20px rgba(232,240,238,.6));
    transform:scale(1);
  }
  50%{
    filter:
      grayscale(100%)
      brightness(2.4)
      contrast(1.3)
      drop-shadow(0 0 18px rgba(255,255,255,1))
      drop-shadow(0 0 36px rgba(232,240,238,.9));
    transform:scale(1.08);
  }
}

/* الرقم تحت الهلال — فضي كبير */
.moon-day-num{
  color:#ffffff !important;
  -webkit-text-fill-color:#ffffff !important;
  font-size:30px !important;
  font-weight:900 !important;
  letter-spacing:1px !important;
  text-shadow:
    0 0 10px rgba(255,255,255,.9),
    0 0 20px rgba(232,240,238,.7),
    0 0 35px rgba(200,212,207,.5) !important;
  line-height:1 !important;
  margin-top:6px !important;
}

/* البطاقة الحالية — الرقم ذهبي */
.day-card.is-today .moon-day-num{
  color:#fff4c8 !important;
  -webkit-text-fill-color:#fff4c8 !important;
  text-shadow:
    0 0 10px rgba(245,215,110,1),
    0 0 20px rgba(245,215,110,.7),
    0 0 35px rgba(201,162,39,.5) !important;
}

/* ===== 3) الآية — بترولي داكن جداً (واضح على الفوتر الفاتح) ===== */
.ayah-clean-text{
  font-family:"Amiri","Aref Ruqaa","Scheherazade New",serif !important;
  font-size:clamp(24px, 5.5vw, 32px) !important;
  font-weight:900 !important;
  color:#0a1f1a !important;
  -webkit-text-fill-color:#0a1f1a !important;
  text-shadow:
    0 2px 4px rgba(0,0,0,.2),
    0 0 15px rgba(10,31,26,.4) !important;
  padding:0 8px !important;
  animation:ayahDarkShine 4s ease-in-out infinite !important;
}

@keyframes ayahDarkShine{
  0%,100%{
    text-shadow:
      0 2px 4px rgba(0,0,0,.2),
      0 0 15px rgba(10,31,26,.4);
  }
  50%{
    text-shadow:
      0 2px 4px rgba(0,0,0,.2),
      0 0 25px rgba(10,31,26,.6),
      0 0 50px rgba(74,154,146,.3);
  }
}

.ayah-clean-open,
.ayah-clean-close{
  color:#c9a227 !important;
  -webkit-text-fill-color:#c9a227 !important;
  font-size:32px !important;
  filter:drop-shadow(0 2px 8px rgba(201,162,39,.6)) !important;
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .moon-emoji{font-size:36px !important}
  .moon-day-num{font-size:26px !important}
  .ayah-clean-text{font-size:22px !important}
  .ayah-clean-open, .ayah-clean-close{font-size:28px !important}
  .rc-num{font-size:24px !important}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: العداد بترولي + الهلال فضي + الآية بترولي داكن");

console.log("\\n✅ 4 تعديلات نهائية:");
console.log("  • ⏱️ العداد: بترولي (#7ec9c0 + #4a9a92)");
console.log("  • 🕌 نوافذ المسجد: بترولي (#4a9a92)");
console.log("  • 🌙 الهلال: فضي ناصع 42px + توهج");
console.log("  • 🔢 الرقم تحت الهلال: فضي 30px");
console.log("  • 📖 الآية: بترولي داكن (#0a1f1a)");
console.log("\\n🚫 لم نمس:");
console.log("  • البطاقات، MuslimCode، Typewriter");
console.log("  • المطر، النجوم، الهلال الرئيسي");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");