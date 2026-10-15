const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "web", "app.js");
let app = fs.readFileSync(APP, "utf8");

// احذف أي إضافة سابقة
app = app.replace(/\/\* FORCE-MOTION-JS \*\/[\s\S]*$/, "");

// أضف الكود في النهاية
if (!app.includes("FORCE-MOTION-JS")) {
  app += `

/* FORCE-MOTION-JS */
(function forceMotion() {
  function applyAnimations() {
    // ===== القمر الرئيسي =====
    const moon = document.querySelector(".moon-wrap");
    if (moon) {
      moon.style.animation = "moonFloat 8s ease-in-out infinite, moonDrift 25s ease-in-out infinite";
      moon.style.willChange = "transform";
    }

    const moonBody = document.querySelector(".moon-body");
    if (moonBody) {
      moonBody.style.animation = "moonTilt 10s ease-in-out infinite";
    }

    const moonSvg = document.querySelector(".moon-body svg");
    if (moonSvg) {
      moonSvg.style.animation = "moonPulse 4s ease-in-out infinite";
    }

    // ===== النجوم =====
    const stars = document.querySelectorAll(".star");
    stars.forEach(function(star) {
      const dur = 2.5 + Math.random() * 2.5;
      const delay = Math.random() * 3;
      star.style.animation = "starTwinkle " + dur + "s ease-in-out infinite";
      star.style.animationDelay = delay + "s";
      star.style.willChange = "opacity, transform";
    });

    // ===== المطر (نعيد تطبيقه لضمان) =====
    const drops = document.querySelectorAll(".rain-drop");
    drops.forEach(function(drop) {
      if (drop.classList.contains("type-thin")) {
        drop.style.animationDuration = (0.6 + Math.random() * 0.4) + "s";
      } else if (drop.classList.contains("type-mid")) {
        drop.style.animationDuration = (0.9 + Math.random() * 0.5) + "s";
      } else {
        drop.style.animationDuration = (1.3 + Math.random() * 0.7) + "s";
      }
    });

    console.log("✓ ForceMotion: applied to " + stars.length + " stars, " + drops.length + " drops");
  }

  // طبّق بعد تحميل الصفحة
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(applyAnimations, 500);
    });
  } else {
    setTimeout(applyAnimations, 500);
  }

  // أعد التطبيق كل 3 ثوانٍ (للعناصر التي تُنشأ لاحقاً)
  setInterval(applyAnimations, 3000);
})();
`;
  fs.writeFileSync(APP, app, "utf8");
  console.log("✓ app.js: ForceMotion مضاف");
} else {
  console.log("موجود مسبقاً");
}