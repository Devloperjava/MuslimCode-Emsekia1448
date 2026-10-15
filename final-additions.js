const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🌧️ مطر خفيف + 💫 شهب صحيحة\n");

// ============================================================
// 1) night-sky.js — تحسين المطر + إضافة الشهب
// ============================================================
let js = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");

// احذف createRain القديم
js = js.replace(/function createRain\(\)\s*\{[\s\S]*?\n  \}/, "");

// احذف startShootingStars القديم إن وجد
js = js.replace(/function startShootingStars\([^)]*\)\s*\{[\s\S]*?\n  \}/, "");

// أضف النسختين الجديدتين
const newFunctions = `
  /* ===== المطر الخفيف الواقعي ===== */
  function createRain() {
    const layer = document.getElementById("rainLayer");
    if (!layer) return;

    // مطر شتوي خفيف — 30 قطرة فقط (قليل، هادئ)
    // أنواع: 15 رقيقة + 10 متوسطة + 5 سميكة
    for (let i = 0; i < 15; i++) spawnDrop(layer, "type-thin", 1.5, 2.2, 4);
    for (let i = 0; i < 10; i++) spawnDrop(layer, "type-mid", 1.8, 2.5, 5);
    for (let i = 0; i < 5; i++)  spawnDrop(layer, "type-thick", 2.0, 2.8, 6);

    console.log("✓ " + layer.children.length + " rain drops created");
  }

  function spawnDrop(layer, type, minDur, maxDur, delayMax) {
    const d = document.createElement("div");
    d.className = "rain-drop " + type;
    d.style.left = (Math.random() * 100) + "%";
    d.style.top = (Math.random() * -100) + "px";
    d.style.animationDuration = (minDur + Math.random() * (maxDur - minDur)) + "s";
    d.style.animationDelay = (Math.random() * delayMax) + "s";
    layer.appendChild(d);
  }

  /* ===== الشهب — نزول مائل من أعلى اليمين ===== */
  function startShootingStars(layer) {
    if (!layer) return;

    function spawn() {
      const sh = document.createElement("div");
      sh.className = "shooting-star";

      // نقطة البداية: أعلى اليمين (من 40% إلى 90% أفقياً)
      sh.style.left = (40 + Math.random() * 50) + "%";
      sh.style.top = (Math.random() * 20) + "%";

      layer.appendChild(sh);

      // إزالة بعد 2 ثانية
      setTimeout(function () { sh.remove(); }, 2000);

      // التالي بعد 8-15 ثانية
      setTimeout(spawn, 8000 + Math.random() * 7000);
    }

    // أول شهاب بعد 5 ثوانٍ
    setTimeout(spawn, 5000);
  }
`;

// استبدل تعريف init
js = js.replace(
  /function init\(\)\s*\{[\s\S]*?\n  \}/,
  `function init() {
    const starsLayer = document.getElementById("starsLayer");
    const shootingLayer = document.getElementById("shootingStars");
    if (starsLayer) createStars(starsLayer, 150);
    if (shootingLayer) startShootingStars(shootingLayer);
    createRain();
  }`
);

// أضف الدوال الجديدة قبل "return { init"
js = js.replace(
  /return\s*\{\s*init:\s*init\s*\};/,
  newFunctions + "\n\n  return { init: init };"
);

fs.writeFileSync(path.join(WEB, "night-sky.js"), js, "utf8");
console.log("✓ night-sky.js: مطر خفيف + شهب نازلة");

// ============================================================
// 2) style.css — تحديث تعريفات المطر + إضافة الشهب
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات المطر القديمة
css = css.replace(/\.rain\s*\{[^}]*\}/g, "");
css = css.replace(/\.rain-drop\s*\{[^}]*\}/g, "");
css = css.replace(/\.rain-drop\.type-[a-z]+\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+rainFall[A-Za-z]*\s*\{[\s\S]*?\n\}/g, "");

// احذف تعريفات الشهب القديمة
css = css.replace(/\.shooting-stars?\s*\{[^}]*\}/g, "");
css = css.replace(/\.shooting-star\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+shoot[A-Za-z]*\s*\{[\s\S]*?\n\}/g, "");

css += `

/* ============================================================
   FINAL-ADDITIONS — مطر خفيف + شهب
   ============================================================ */

/* ===== المطر الخفيف ===== */
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
}

/* قطرات رقيقة */
.rain-drop.type-thin{
  width:1px;
  height:16px;
  background:linear-gradient(180deg,
    rgba(200,225,255,0) 0%,
    rgba(220,235,255,.7) 50%,
    rgba(200,225,255,0) 100%);
  filter:blur(.2px);
}

/* قطرات متوسطة */
.rain-drop.type-mid{
  width:1.2px;
  height:24px;
  background:linear-gradient(180deg,
    rgba(180,215,255,0) 0%,
    rgba(210,230,255,.8) 50%,
    rgba(180,215,255,0) 100%);
  filter:blur(.3px);
}

/* قطرات سميكة */
.rain-drop.type-thick{
  width:1.8px;
  height:34px;
  background:linear-gradient(180deg,
    rgba(170,205,245,0) 0%,
    rgba(200,225,255,.85) 50%,
    rgba(170,205,245,0) 100%);
  filter:blur(.4px);
  box-shadow:0 0 3px rgba(200,225,255,.5);
}

@keyframes rainFallSoft{
  0%{
    transform:translateY(-80px) translateX(0);
    opacity:0;
  }
  12%{opacity:.75}
  88%{opacity:.5}
  100%{
    transform:translateY(620px) translateX(-15px);
    opacity:0;
  }
}

/* ===== الشهب ===== */
.shooting-stars{
  position:absolute;
  inset:0;
  pointer-events:none;
  overflow:hidden;
  z-index:2;
}

.shooting-star{
  position:absolute;
  width:120px;
  height:2px;
  background:linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,1) 50%,
    rgba(255,255,255,0) 100%
  );
  border-radius:2px;
  transform-origin:right center;
  opacity:0;
  filter:drop-shadow(0 0 6px rgba(255,255,255,.9))
         drop-shadow(0 0 12px rgba(255,255,255,.5));
  animation:shootDown 1.8s cubic-bezier(.4,0,.6,1) forwards;
}

@keyframes shootDown{
  0%{
    opacity:0;
    transform:translateX(0) translateY(0) rotate(45deg) scaleX(.3);
  }
  10%{opacity:1}
  100%{
    opacity:0;
    transform:translateX(-300px) translateY(300px) rotate(45deg) scaleX(1.5);
  }
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: مطر خفيف + شهب مائلة");

console.log("\\n✅ تم!");
console.log("  • 🌧️ المطر: 30 قطرة خفيفة (1.5-2.8s)");
console.log("  • 💫 الشهب: نزول مائل 45° من أعلى اليمين");
console.log("  • 🚫 لا كسر");
console.log("\\n📋 التالي:");
console.log("  node --check web/night-sky.js");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");