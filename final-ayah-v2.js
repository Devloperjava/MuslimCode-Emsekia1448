const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🎨 الآية — تدرج بترولي → فضي\n");

// ============================================================
// 1) index.html — إضافة الآية في الفوتر
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة
html = html.replace(/<!-- AYAH-V2 -->[\s\S]*?<!-- \/AYAH-V2 -->\s*/g, "");

const ayahBlock = `<!-- AYAH-V2 -->
      <div class="ayah-v2">
        <div class="ayah-v2-ornament">✦</div>
        <p class="ayah-v2-text">
          <span class="ayah-v2-open">﴿</span>
          <span class="ayah-v2-content">وَأَن تَصُومُوا خَيْرٌ لَّكُمْ</span>
          <span class="ayah-v2-close">﴾</span>
        </p>
        <p class="ayah-v2-source">[سورة البقرة: 184]</p>
        <div class="ayah-v2-ornament">✦</div>
      </div>
      <!-- /AYAH-V2 -->

      `;

// ضع الآية قبل brand-name (فوق MuslimCode)
html = html.replace(
  /(<div class="footer-line"><\/div>[\s\S]*?)(<div class="brand">)/,
  '$1\n      ' + ayahBlock + '\n      $2'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: AYAH-V2 مضاف");

// ============================================================
// 2) style.css — تدرج بترولي → فضي
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*AYAH-V2[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   AYAH-V2 — تدرج بترولي → فضي
   ============================================================ */

.ayah-v2{
  margin:30px auto 24px;
  text-align:center;
  max-width:680px;
  padding:8px 16px;
}

.ayah-v2-ornament{
  color:#4a9a92;
  font-size:18px;
  margin:8px 0;
  opacity:0.8;
  letter-spacing:4px;
  text-shadow:0 0 8px rgba(74,154,146,.5);
}

.ayah-v2-text{
  font-family:"Amiri","Aref Ruqaa","Scheherazade New",serif;
  font-size:clamp(22px, 5.5vw, 30px);
  font-weight:700;
  line-height:1.8;
  text-align:center;
  margin:12px 0;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:8px;
}

/* القوسان — ذهبي خفيف */
.ayah-v2-open,
.ayah-v2-close{
  color:#c9a227;
  font-size:1.3em;
  vertical-align:middle;
  line-height:1;
  filter:drop-shadow(0 2px 6px rgba(201,162,39,.3));
}

/* النص — تدرج بترولي → فضي */
.ayah-v2-content{
  display:inline-block;
  padding:0 8px;
  background:linear-gradient(
    110deg,
    #4a9a92 0%,
    #7ec9c0 25%,
    #c8d4cf 45%,
    #e8f0ee 50%,
    #c8d4cf 55%,
    #7ec9c0 75%,
    #4a9a92 100%
  );
  background-size:300% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent;
  filter:
    drop-shadow(0 2px 10px rgba(74,154,146,.4))
    drop-shadow(0 0 20px rgba(126,201,192,.25));
  animation:ayahShine 6s ease-in-out infinite;
}

@keyframes ayahShine{
  0%,55%,100%{background-position:200% 0}
  75%         {background-position:-50% 0}
}

/* المصدر */
.ayah-v2-source{
  font-family:"Cairo","Tajawal",sans-serif;
  font-size:13px;
  color:#4a9a92;
  letter-spacing:0.5px;
  margin:8px 0 0;
  text-align:center;
  font-weight:600;
  opacity:0.85;
}

/* استجابة للهاتف */
@media (max-width: 520px){
  .ayah-v2{
    margin:24px auto 20px;
    padding:6px 12px;
  }
  .ayah-v2-text{
    font-size:20px;
    gap:6px;
  }
  .ayah-v2-source{
    font-size:11px;
  }
  .ayah-v2-ornament{
    font-size:16px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: AYAH-V2 مضاف (بترولي → فضي)");

console.log("\\n✅ الآية V2 — التصميم النهائي:");
console.log("  • 📖 ﴿ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ﴾");
console.log("  • 🎨 تدرج: بترولي #4a9a92 → فضي #c8d4cf → أبيض");
console.log("  • ✦ زخرفة بترولية");
console.log("  • 📍 فوق MuslimCode");
console.log("  • ✨ لمعان يجري (6s)");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");