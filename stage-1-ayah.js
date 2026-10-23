const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("📖 المرحلة 1 — الآية القرآنية + الفانوس\n");

// ============================================================
// 1) index.html — إضافة الآية في الفوتر فوق MuslimCode
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف أي إضافة سابقة
html = html.replace(/<!-- AYAH-FOOTER -->[\s\S]*?<!-- \/AYAH-FOOTER -->/g, "");

// الآية بالتشكيل + الفانوس
const ayahBlock = `<!-- AYAH-FOOTER -->
      <div class="ayah-container">
        <div class="ayah-lantern">
          <div class="ayah-lantern-body"></div>
          <div class="ayah-lantern-glow"></div>
        </div>
        <p class="ayah-text">
          <span class="ayah-ornament">﴿</span>
          <span class="ayah-typewriter">وَأَن تَصُومُوا خَيْرٌ لَّكُمْ</span>
          <span class="ayah-ornament">﴾</span>
        </p>
        <p class="ayah-source">[سورة البقرة: 184]</p>
      </div>
      <!-- /AYAH-FOOTER -->

      `;

// ضع الآية قبل brand-name (فوق MuslimCode)
html = html.replace(
  /(<div class="footer-line"><\/div>[\s\S]*?)(<div class="brand">)/,
  '$1\n      ' + ayahBlock + '\n      $2'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: الآية + الفانوس مضافان في الفوتر");

// ============================================================
// 2) style.css — تنسيق الآية + الفانوس
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي إضافة سابقة
css = css.replace(/\/\* =+\s*\n\s*AYAH-FOOTER[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

css += `

/* ============================================================
   AYAH-FOOTER — الآية القرآنية + الفانوس المتحرك
   ============================================================ */

.ayah-container{
  position:relative;
  margin:24px auto 28px;
  max-width:680px;
  padding:20px 24px;
  text-align:center;
  background:linear-gradient(145deg,
    rgba(18,59,42,.06),
    rgba(42,95,90,.04));
  border-radius:20px;
  border:1px solid rgba(201,162,39,.25);
  overflow:hidden;
}

/* ===== الفانوس المتحرك ===== */
.ayah-lantern{
  position:absolute;
  top:-10px;
  left:-40px;
  width:30px;
  height:44px;
  z-index:2;
  animation:lanternPass 8s ease-in-out infinite;
  pointer-events:none;
}

.ayah-lantern-body{
  width:100%;
  height:100%;
  background:radial-gradient(ellipse at 50% 40%,
    #fff4c8 0%,
    #f5d76e 40%,
    #c9a227 75%,
    #8b6914 100%);
  border-radius:50% 50% 40% 40%;
  box-shadow:
    0 0 12px rgba(255,220,120,.9),
    0 0 24px rgba(255,200,80,.6),
    0 0 40px rgba(255,180,40,.3);
  position:relative;
}

.ayah-lantern-body::before{
  content:"";
  position:absolute;
  top:-6px;
  left:50%;
  width:8px;
  height:6px;
  border:1px solid rgba(201,162,39,.8);
  border-bottom:none;
  border-radius:4px 4px 0 0;
  transform:translateX(-50%);
}

.ayah-lantern-glow{
  position:absolute;
  inset:-16px;
  background:radial-gradient(circle, rgba(255,220,120,.4), transparent 65%);
  border-radius:50%;
  filter:blur(10px);
  animation:lanternGlowPulse 2.5s ease-in-out infinite;
}

/* الفانوس يمر من اليمين لليسار ثم يعود */
@keyframes lanternPass{
  0%{
    left:110%;
    top:-5px;
    transform:rotate(0deg);
  }
  25%{
    left:75%;
    top:-15px;
    transform:rotate(-8deg);
  }
  50%{
    left:50%;
    top:0px;
    transform:rotate(0deg);
  }
  75%{
    left:25%;
    top:-12px;
    transform:rotate(6deg);
  }
  100%{
    left:-40px;
    top:-5px;
    transform:rotate(0deg);
  }
}

@keyframes lanternGlowPulse{
  0%,100%{opacity:.55;transform:scale(.9)}
  50%    {opacity:1;transform:scale(1.15)}
}

/* ===== الآية ===== */
.ayah-text{
  position:relative;
  z-index:1;
  font-family:"Amiri","Aref Ruqaa","Scheherazade New",serif;
  font-size:clamp(20px, 5vw, 28px);
  font-weight:700;
  line-height:1.8;
  color:#f5d76e;
  text-align:center;
  margin:0 0 6px;
  text-shadow:
    0 2px 10px rgba(0,0,0,.4),
    0 0 20px rgba(201,162,39,.3);
}

.ayah-ornament{
  display:inline-block;
  color:#c9a227;
  font-size:1.1em;
  margin:0 6px;
  vertical-align:middle;
}

.ayah-typewriter{
  display:inline-block;
  overflow:hidden;
  white-space:nowrap;
  border-left:2px solid #c9a227;
  animation:ayahTypewriter 4s steps(28, end) 1s 1 normal both,
            ayahCursor 0.8s step-end infinite;
  vertical-align:bottom;
  padding-left:3px;
}

@keyframes ayahTypewriter{
  from{width:0}
  to  {width:100%}
}

@keyframes ayahCursor{
  0%,100%{border-left-color:#c9a227}
  50%    {border-left-color:transparent}
}

.ayah-source{
  font-family:"Cairo","Tajawal",sans-serif;
  font-size:12px;
  color:rgba(201,162,39,.7);
  letter-spacing:.5px;
  margin:0;
  text-align:center;
}

/* ===== استجابة للهاتف ===== */
@media (max-width: 600px){
  .ayah-container{
    margin:18px auto 22px;
    padding:16px 18px;
  }
  .ayah-lantern{
    width:24px;
    height:36px;
  }
  .ayah-text{
    font-size:18px;
  }
  .ayah-source{
    font-size:11px;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: AYAH-FOOTER مضاف");

console.log("\\n✅ المرحلة 1 — آمنة 100%:");
console.log("  • 📖 الآية: ﴿وَأَن تَصُومُوا خَيْرٌ لَّكُمْ﴾");
console.log("  • 🏮 فانوس يمر فوقها");
console.log("  • ⌨️ Typewriter للآية");
console.log("  • 📍 في الفوتر فوق MuslimCode");
console.log("  • 🎨 ألوان ذهبية");
console.log("  • 🚫 لا يمس العداد أو البطاقات");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleRelease");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");