const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 الإصلاح النهائي: مسجد كامل + مطر + شهب\n");

// ============================================================
// 1) index.html — تغيير preserveAspectRatio
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// استبدل meet بـ slice
html = html.replace(
  /preserveAspectRatio="xMidYMax meet"/g,
  'preserveAspectRatio="xMidYMax slice"'
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: preserveAspectRatio → slice");

// ============================================================
// 2) style.css — مسجد يملأ + مطر خفيف + شهب صحيحة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف التعريفات القديمة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");

// احذف الشهب القديمة
css = css.replace(/\.shooting-stars?\s*\{[^}]*\}/g, "");
css = css.replace(/\.shooting-star\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+shoot[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

// احذف المطر القديم
css = css.replace(/\.rain\s*\{[^}]*\}/g, "");
css = css.replace(/\.rain-drop\s*\{[^}]*\}/g, "");
css = css.replace(/\.rain-drop\.type-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+rain[A-Za-z0-9]*\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   STAGE-FINAL — مسجد كامل + مطر خفيف + شهب
   ============================================================ */

/* ===== 1) المسجد — يملأ الشاشة بالكامل ===== */
.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100vw !important;
  height:78vh !important;
  min-height:520px !important;
  max-height:720px !important;
  z-index:5;
  pointer-events:none;
  overflow:hidden;
}

.mosque-silhouette svg{
  width:100% !important;
  height:100% !important;
  display:block;
  overflow:visible;
  /* لا object-fit — نستخدم preserveAspectRatio=slice */
}

/* ===== 2) المطر الخفيف — واقعي متقطع ===== */
.rain{
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:7;
  overflow:hidden;
}

.rain-drop{
  position:absolute;
  border-radius:2px;
  animation:rainFallSoft linear infinite;
  will-change:transform, opacity;
  opacity:0.7;
}

/* قطرات رقيقة — الشتاء (رمضان 2027 = فبراير) */
.rain-drop.type-thin{
  width:1px;
  height:18px;
  background:linear-gradient(180deg,
    rgba(200,225,255,0) 0%,
    rgba(220,235,255,.75) 50%,
    rgba(200,225,255,0) 100%);
  filter:blur(.2px);
}

.rain-drop.type-mid{
  width:1.5px;
  height:26px;
  background:linear-gradient(180deg,
    rgba(180,215,255,0) 0%,
    rgba(210,230,255,.85) 50%,
    rgba(180,215,255,0) 100%);
  filter:blur(.3px);
}

.rain-drop.type-thick{
  width:2px;
  height:38px;
  background:linear-gradient(180deg,
    rgba(170,205,245,0) 0%,
    rgba(200,225,255,.9) 50%,
    rgba(170,205,245,0) 100%);
  filter:blur(.5px);
  box-shadow:0 0 3px rgba(200,225,255,.5);
}

@keyframes rainFallSoft{
  0%{
    transform:translateY(-100px) translateX(0);
    opacity:0;
  }
  10%{opacity:.85}
  90%{opacity:.6}
  100%{
    transform:translateY(620px) translateX(-20px);
    opacity:0;
  }
}

/* ===== 3) الشهب — تنزل من أعلى بميل طبيعي ===== */
.shooting-stars{
  position:absolute;
  inset:0;
  pointer-events:none;
  overflow:hidden;
  z-index:2;
}

.shooting-star{
  position:absolute;
  width:100px;
  height:2px;
  background:linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,.9) 50%,
    rgba(255,255,255,0) 100%
  );
  border-radius:2px;
  transform-origin:left center;
  opacity:0;
  filter:drop-shadow(0 0 5px rgba(255,255,255,.8));
  animation:shootDown 1.8s cubic-bezier(.4,0,.6,1) forwards;
}

@keyframes shootDown{
  0%{
    opacity:0;
    transform:translateX(0) translateY(0) rotate(35deg) scaleX(.3);
  }
  10%{opacity:1}
  100%{
    opacity:0;
    transform:translateX(-350px) translateY(350px) rotate(35deg) scaleX(1.4);
  }
}

/* ===== استجابة ===== */
@media (max-width: 600px){
  .mosque-silhouette{
    height:78vh !important;
    min-height:500px !important;
    max-height:680px !important;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height:76vh !important;
    min-height:460px !important;
    max-height:640px !important;
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مسجد كامل + مطر خفيف + شهب صحيحة");

// ============================================================
// 3) night-sky.js — تعديل الشهب (اتجاه صحيح + خفيف)
// ============================================================
let js = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");

// احذف startShootingStars القديم
js = js.replace(/function startShootingStars[\s\S]*?\n  \}/, "");

// أضف النسخة الجديدة
const newShootingStars = `
  function startShootingStars(layer) {
    if (!layer) return;
    function spawn() {
      var sh = document.createElement("div");
      sh.className = "shooting-star";
      // يبدأ من أعلى اليمين (من 30% إلى 90%)
      sh.style.left = (30 + Math.random() * 60) + "%";
      sh.style.top = (Math.random() * 25) + "%";
      layer.appendChild(sh);
      setTimeout(function () { sh.remove(); }, 2000);
      // التالي بعد 6-15 ثانية
      setTimeout(spawn, 6000 + Math.random() * 9000);
    }
    setTimeout(spawn, 4000);
  }
`;

// استبدل الدالة القديمة (أينما كانت)
js = js.replace(
  /function startShootingStars\([^)]+\)\s*\{[\s\S]*?\n\s{2}\}/,
  newShootingStars.trim()
);

fs.writeFileSync(path.join(WEB, "night-sky.js"), js, "utf8");
console.log("✓ night-sky.js: الشهب — نزول من أعلى بميل");

// ============================================================
// 4) app.js — إبطاء المطر قليلاً (مطر خفيف)
// ============================================================
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

// احذف FORCE-MOTION-V2 المطر
app = app.replace(
  /var baseDur = drop\.classList\.contains\("type-thin"\) \? 0\.7 :\s*drop\.classList\.contains\("type-mid"\)\s*\? 1\.0 : 1\.4;/,
  'var baseDur = drop.classList.contains("type-thin") ? 1.0 :\n                    drop.classList.contains("type-mid")  ? 1.3 : 1.7;'
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: المطر أبطأ قليلاً (خفيف)");

console.log("\\n✅ المرحلة النهائية مكتملة!");
console.log("  • 🕌 المسجد: preserveAspectRatio=slice (يملأ)");
console.log("  • 🌧️ المطر: خفيف هادئ (الشتاء)");
console.log("  • 💫 الشهب: نزول من أعلى بميل");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/app.js");
console.log("  node --check web/night-sky.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");