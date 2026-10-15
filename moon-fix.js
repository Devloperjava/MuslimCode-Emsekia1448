const fs = require("fs");
const path = require("path");

const newMoon = `"use strict";

const MoonPhase = (function () {

  function render(day, size) {
    size = size || 100;
    const phase = computePhase(day);
    const r = 42, cx = 50, cy = 50;
    const path = buildCrescentPath(phase, r, cx, cy);

    return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<radialGradient id="moonGrad-' + day + '" cx="30%" cy="30%" r="75%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="55%" stop-color="#fff4c8"/>' +
          '<stop offset="100%" stop-color="#e8b94a"/>' +
        '</radialGradient>' +
        '<filter id="moonGlow-' + day + '" x="-50%" y="-50%" width="200%" height="200%">' +
          '<feGaussianBlur stdDeviation="2" result="blur"/>' +
          '<feMerge>' +
            '<feMergeNode in="blur"/>' +
            '<feMergeNode in="SourceGraphic"/>' +
          '</feMerge>' +
        '</filter>' +
      '</defs>' +
      (path ? '<path d="' + path + '" fill="url(#moonGrad-' + day + ')" filter="url(#moonGlow-' + day + ')"/>' : '') +
    '</svg>';
  }

  function computePhase(day) {
    let illumination, waxing;
    if (day <= 15) {
      illumination = 0.05 + (day - 1) / 14 * 0.95;
      waxing = true;
    } else {
      illumination = 1.0 - (day - 15) / 15 * 0.95;
      waxing = false;
    }
    return { illumination: illumination, phase: (day - 1) / 29, waxing: waxing };
  }

  function buildCrescentPath(phase, r, cx, cy) {
    const illumination = phase.illumination;
    const waxing = phase.waxing;

    if (illumination < 0.02) return "";

    if (illumination > 0.98) {
      return "M " + (cx - r) + "," + cy +
             " a " + r + "," + r + " 0 1,0 " + (2*r) + ",0" +
             " a " + r + "," + r + " 0 1,0 " + (-2*r) + ",0 Z";
    }

    const rx = Math.abs(r * (1 - 2 * illumination));
    const isGibbous = illumination > 0.5;

    if (waxing) {
      if (isGibbous) {
        return "M " + cx + "," + (cy - r) +
               " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +
               " A " + rx + "," + r + " 0 0,1 " + cx + "," + (cy - r) + " Z";
      } else {
        return "M " + cx + "," + (cy - r) +
               " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +
               " A " + rx + "," + r + " 0 0,0 " + cx + "," + (cy - r) + " Z";
      }
    } else {
      if (isGibbous) {
        return "M " + cx + "," + (cy - r) +
               " A " + r + "," + r + " 0 0,0 " + cx + "," + (cy + r) +
               " A " + rx + "," + r + " 0 0,0 " + cx + "," + (cy - r) + " Z";
      } else {
        return "M " + cx + "," + (cy - r) +
               " A " + r + "," + r + " 0 0,0 " + cx + "," + (cy + r) +
               " A " + rx + "," + r + " 0 0,1 " + cx + "," + (cy - r) + " Z";
      }
    }
  }

  return { render: render, computePhase: computePhase };

})();

if (typeof window !== "undefined") {
  window.MoonPhase = MoonPhase;
}
`;

const target = path.join(__dirname, "web", "moon.js");
fs.writeFileSync(target, newMoon, "utf8");
console.log("✓ moon.js: هلال نظيف فقط — بدون جسم أسود");
console.log("  المسار: " + target);