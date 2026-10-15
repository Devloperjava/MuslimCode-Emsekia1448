const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🔧 fix3 — تشخيص دقيق...\n");

// ==========================================
// 1) night-sky.js — نقل createRain فوق init
// ==========================================
let js = read(path.join(WEB, "night-sky.js"));

// احذف السطر المُدرج سابقاً
js = js.replace(/\n\s*createRain\(\);/g, "");

// احذف تعريف createRain القديم إذا كان داخل دالة init
js = js.replace(/\s*function createRain\(\)\{[\s\S]*?layer\.appendChild\(d\);\}\}\s*\}/, "");

// اكتب ملفاً نظيفاً بالكامل
const newJs = `"use strict";

const NightSky = (function () {

  function createStars(layer, count) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const roll = Math.random();
      let cls;
      if (roll < 0.7) cls = "star-sm";
      else if (roll < 0.95) cls = "star-md";
      else cls = "star-lg";
      star.classList.add(cls);
      star.style.left = (Math.random() * 100) + "%";
      star.style.top  = (Math.random() * 100) + "%";
      star.style.animationDelay = (Math.random() * 4) + "s";
      star.style.animationDuration = (2 + Math.random() * 3) + "s";
      if (Math.random() < 0.15) {
        star.style.background = "radial-gradient(circle, #a8c8ff, transparent 70%)";
      } else if (Math.random() < 0.15) {
        star.style.background = "radial-gradient(circle, #ffe8b8, transparent 70%)";
      }
      frag.appendChild(star);
    }
    layer.appendChild(frag);
  }

  function createRain() {
    const layer = document.getElementById("rainLayer");
    if (!layer) {
      console.warn("rainLayer not found");
      return;
    }
    for (let i = 0; i < 60; i++) {
      const d = document.createElement("div");
      d.className = "rain-drop";
      d.style.left = (Math.random() * 100) + "%";
      d.style.top  = (Math.random() * -100) + "px";
      d.style.animationDuration = (0.8 + Math.random() * 1.4) + "s";
      d.style.animationDelay = (Math.random() * 3) + "s";
      d.style.height = (20 + Math.random() * 50) + "px";
      d.style.opacity = 0.4 + Math.random() * 0.5;
      layer.appendChild(d);
    }
    console.log("✓ 60 rain drop created");
  }

  function startShootingStars(layer) {
    function spawn() {
      const sh = document.createElement("div");
      sh.className = "shooting-star";
      sh.style.top  = (Math.random() * 40) + "%";
      sh.style.left = (Math.random() * 60 + 20) + "%";
      const angle = 200 + Math.random() * 30;
      sh.style.setProperty("--angle", angle + "deg");
      layer.appendChild(sh);
      setTimeout(function () { sh.remove(); }, 1800);
      setTimeout(spawn, 3000 + Math.random() * 7000);
    }
    setTimeout(spawn, 2000);
  }

  function init() {
    const starsLayer = document.getElementById("starsLayer");
    const shootingLayer = document.getElementById("shootingStars");
    if (starsLayer) createStars(starsLayer, 150);
    if (shootingLayer) startShootingStars(shootingLayer);
    createRain();
  }

  return { init: init };

})();

if (typeof window !== "undefined") {
  window.NightSky = NightSky;
  window.addEventListener("DOMContentLoaded", function () { NightSky.init(); });
}
`;

write(path.join(WEB, "night-sky.js"), newJs);
console.log("✓ night-sky.js: أُعيد كتابته بشكل صحيح (createRain قبل init)");

// ==========================================
// 2) app.js — إصلاح ترتيب القمر في البطاقات
// ==========================================
let app = read(path.join(WEB, "app.js"));

// تأكد من وجود MoonPhase قبل الاستخدام
if (!app.includes("function safeMoon")) {
  app = app.replace(
    "// ===== رسم قائمة الأيام =====",
    `// ===== قمر آمن (يُرجع SVG أو فراغ) =====
function safeMoon(day, size) {
  if (typeof window.MoonPhase === "undefined") return "";
  try {
    return window.MoonPhase.render(day, size);
  } catch (e) {
    console.error("Moon render error for day " + day, e);
    return "";
  }
}

// ===== رسم قائمة الأيام =====`
  );

  // استبدل MoonPhase.render بالدالة الآمنة
  app = app.replace(
    '<div class="date-moon">${MoonPhase.render(day.day, 44)}</div>',
    '<div class="date-moon">${safeMoon(day.day, 44)}</div>'
  );

  // استبدل استدعاء القمر الرئيسي
  app = app.replace(
    "moonBody.innerHTML = MoonPhase.render(dayNum, 130);",
    "moonBody.innerHTML = safeMoon(dayNum, 130);"
  );

  write(path.join(WEB, "app.js"), app);
  console.log("✓ app.js: إضافة safeMoon (يضمن ظهور القمر)");
} else {
  console.log("⚠ app.js: safeMoon موجود");
}

console.log("\n✅ fix3 تم!");