"use strict";

const NightSky = (function () {

  /* ===== نجوم ===== */
  function createStars(layer, count) {
    if (!layer) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const roll = Math.random();
      let cls;
      if (roll < 0.7) cls = "star-sm";
      else if (roll < 0.92) cls = "star-md";
      else cls = "star-lg";
      star.classList.add(cls);
      star.style.left = (Math.random() * 100) + "%";
      star.style.top  = (Math.random() * 100) + "%";
      star.style.animationDelay = (Math.random() * 4) + "s";
      star.style.animationDuration = (2 + Math.random() * 2) + "s";
      if (Math.random() < 0.15) {
        star.style.background = "radial-gradient(circle, #a8c8ff, transparent 70%)";
      } else if (Math.random() < 0.15) {
        star.style.background = "radial-gradient(circle, #ffe8b8, transparent 70%)";
      }
      frag.appendChild(star);
    }
    layer.appendChild(frag);
  }

  /* ===== شُهُب ===== */
  

  /* ===== مطر واقعي ===== */
  

  function spawnDrop(layer, type, minDur, maxDur, delayMax) {
    const d = document.createElement("div");
    d.className = "rain-drop " + type;
    d.style.left = (Math.random() * 100) + "%";
    d.style.top = (Math.random() * -100) + "px";
    d.style.animationDuration = (minDur + Math.random() * (maxDur - minDur)) + "s";
    
    layer.appendChild(d);
  }

  /* ===== init ===== */
  function init() {
    const starsLayer = document.getElementById("starsLayer");
    if (starsLayer) createStars(starsLayer, 150);
    createRain();
  }

  
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

  

  return { init: init };

})();

if (typeof window !== "undefined") {
  window.NightSky = NightSky;
  window.addEventListener("DOMContentLoaded", function () { NightSky.init(); });
}
