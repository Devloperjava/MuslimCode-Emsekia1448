const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 3 تعديلات فقط — بطاقات + أرقام + آية\n");

// ============================================================
// 1) index.html — إضافة الآية في الفوتر فقط
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة
html = html.replace(/<!-- AYAH-CLEAN -->[\s\S]*?<!-- \/AYAH-CLEAN -->\s*/g, "");

// الآية — بسيطة في الفوتر فوق MuslimCode
const ayahBlock = `<!-- AYAH-CLEAN -->
      <div class="ayah-clean">
        <span class="ayah-clean-open">﴿</span>
        <span class="ayah-clean-text">وَأَن تَصُومُوا خَيْرٌ لَّكُمْ</span>
        <span class="ayah-clean-close">﴾</span>
      </div>
      <!-- /AYAH-CLEAN -->

      `;

// ضع الآية قبل brand-name
html = html.replace(
  /(<div class="footer-line"><\/div>\s*)(<div class="brand">)/,
  '$1\n      ' + ayahBlock + '\n      $2'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: الآية في الفوتر");

// ============================================================
// 2) style.css — 3 تعديلات فقط
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*FINAL-3-FIXES[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   FINAL-3-FIXES — بطاقات + أرقام + آية فقط
   (لا يمس أي ميزة أخرى)
   ============================================================ */

/* ===== 1) البطاقات — لون بترولي موحّد ===== */
.day-card{
  background:linear-gradient(180deg, #123b2a, #0b291c) !important;
  border:1px solid rgba(201,162,39,.3) !important;
  box-shadow:0 6px 20px rgba(0,0,0,.4) !important;
}

.day-card.is-today{
  background:linear-gradient(180deg, #1a4d3a, #0f3524) !important;
  border:2px solid rgba(201,162,39,.6) !important;
  box-shadow:0 12px 32px rgba(201,162,39,.25) !important;
}

/* النصوص داخل البطاقة — أبيض/فضي */
.day-card .date-label{
  color:#ffffff !important;
  text-shadow:0 0 8px rgba(255,255,255,.3) !important;
}

.day-card .date-gregorian{
  color:#e8f0ee !important;
}

/* المربعات (المواقيت) — داكنة */
.day-card .prayer{
  background:linear-gradient(145deg, #0f2e22, #0a2418) !important;
  border:1px solid rgba(201,162,39,.2) !important;
}

.day-card .prayer strong{
  color:#f5d76e !important;
}

.day-card .prayer span{
  color:#ffffff !important;
  text-shadow:0 0 6px rgba(255,255,255,.3) !important;
}

.day-card .prayer.is-next{
  background:linear-gradient(145deg, #2a4a20, #1f3a18) !important;
  border-color:#f5d76e !important;
  box-shadow:0 4px 16px rgba(245,215,110,.4) !important;
}

.day-card .prayer.is-next strong,
.day-card .prayer.is-next span{
  color:#fff4c8 !important;
}

/* رقم اليوم (المربع الكبير) */
.day-card .date-number{
  background:linear-gradient(145deg, #f5d76e, #c9a227) !important;
  color:#0a2418 !important;
  font-weight:900 !important;
  box-shadow:0 4px 12px rgba(201,162,39,.4) !important;
}

.day-card.is-today .date-number{
  background:linear-gradient(145deg, #fff4c8, #f5d76e) !important;
  box-shadow:0 6px 18px rgba(245,215,110,.6) !important;
}

/* ===== 2) أرقام الأيام (تحت الهلال) — تكبير 26px ===== */
.moon-day-num{
  font-size:26px !important;
  font-weight:900 !important;
  color:#ffffff !important;
  text-shadow:
    0 0 8px rgba(255,255,255,.8),
    0 0 16px rgba(232,240,238,.5) !important;
  letter-spacing:1px !important;
  line-height:1 !important;
  margin-top:4px !important;
}

/* في البطاقة الحالية — ذهبي */
.day-card.is-today .moon-day-num{
  color:#fff4c8 !important;
  text-shadow:
    0 0 10px rgba(245,215,110,1),
    0 0 20px rgba(245,215,110,.7),
    0 0 30px rgba(201,162,39,.5) !important;
}

/* ===== 3) الآية في الفوتر + أنيميشن ===== */
.ayah-clean{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  margin:24px auto 20px;
  padding:12px 16px;
  text-align:center;
  flex-wrap:wrap;
  animation:ayahFadeIn 1.5s ease-out both;
}

@keyframes ayahFadeIn{
  0%{
    opacity:0;
    transform:translateY(15px);
    filter:blur(8px);
  }
  100%{
    opacity:1;
    transform:translateY(0);
    filter:blur(0);
  }
}

.ayah-clean-open,
.ayah-clean-close{
  color:#f5d76e;
  font-size:32px;
  line-height:1;
  filter:drop-shadow(0 2px 8px rgba(201,162,39,.5));
  animation:ayahGlow 3s ease-in-out infinite;
}

@keyframes ayahGlow{
  0%,100%{
    filter:drop-shadow(0 2px 8px rgba(201,162,39,.5));
    transform:scale(1);
  }
  50%{
    filter:drop-shadow(0 2px 16px rgba(245,215,110,1));
    transform:scale(1.05);
  }
}

.ayah-clean-text{
  font-family:"Amiri","Aref Ruqaa","Scheherazade New",serif;
  font-size:clamp(22px, 5vw, 28px);
  font-weight:700;
  color:#ffffff;
  text-shadow:
    0 2px 10px rgba(0,0,0,.6),
    0 0 20px rgba(245,215,110,.4),
    0 0 40px rgba(245,215,110,.2);
  animation:ayahShine 4s ease-in-out infinite;
  padding:0 8px;
}

@keyframes ayahShine{
  0%,100%{
    text-shadow:
      0 2px 10px rgba(0,0,0,.6),
      0 0 20px rgba(245,215,110,.4),
      0 0 40px rgba(245,215,110,.2);
  }
  50%{
    text-shadow:
      0 2px 10px rgba(0,0,0,.6),
      0 0 30px rgba(245,215,110,.8),
      0 0 60px rgba(245,215,110,.5),
      0 0 80px rgba(245,215,110,.3);
  }
}

/* استجابة للهاتف */
@media (max-width: 520px){
  .ayah-clean{
    margin:20px auto 16px;
    padding:10px 12px;
    gap:6px;
  }
  .ayah-clean-open,
  .ayah-clean-close{
    font-size:26px;
  }
  .ayah-clean-text{
    font-size:20px;
  }
  .moon-day-num{
    font-size:24px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: 3 تعديلات (بطاقات + أرقام + آية)");

console.log("\\n✅ 3 تغييرات فقط:");
console.log("  • 🎨 البطاقات: بترولي موحّد (#123b2a)");
console.log("  • 🔢 أرقام الأيام: 26px + توهج");
console.log("  • 📖 الآية: في الفوتر + أنيميشن");
console.log("\\n🚫 لم نمس:");
console.log("  • الهلال، العداد، المسجد، MuslimCode");
console.log("  • المطر، النجوم، Typewriter");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");