"use strict";

const MoonPhase = (function () {

  function render(day, size) {
    size = size || 100;
    const phase = computePhase(day);
    const r = 50, cx = 50, cy = 50;
    const illuminatedPath = buildIlluminatedPath(phase, r, cx, cy);

    return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<radialGradient id="moonGrad-' + day + '" cx="35%" cy="35%" r="70%">' +
          '<stop offset="0%" stop-color="#fffbe6"/>' +
          '<stop offset="55%" stop-color="#f5e2a0"/>' +
          '<stop offset="100%" stop-color="#c9a227"/>' +
        '</radialGradient>' +
        '<radialGradient id="moonGlow-' + day + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="rgba(255,235,150,0.55)"/>' +
          '<stop offset="100%" stop-color="rgba(255,235,150,0)"/>' +
        '</radialGradient>' +
        '<filter id="moonSoft-' + day + '" x="-50%" y="-50%" width="200%" height="200%">' +
          '<feGaussianBlur stdDeviation="1.2"/>' +
        '</filter>' +
      '</defs>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 6) + '" fill="url(#moonGlow-' + day + ')"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#1a1f2e" opacity="0.55"/>' +
      (illuminatedPath ? '<path d="' + illuminatedPath + '" fill="url(#moonGrad-' + day + ')" filter="url(#moonSoft-' + day + ')"/>' : '') +
      (phase.illumination > 0.55 ? renderCraters(cx, cy, r, phase) : '') +
    '</svg>';
  }

  function computePhase(day) {
    let illumination, waxing;
    if (day <= 15) {
      illumination = 0.03 + (day - 1) / 14 * 0.97;
      waxing = true;
    } else {
      illumination = 1.0 - (day - 15) / 15 * 0.95;
      waxing = false;
    }
    const phase = (day - 1) / 29;
    return { illumination: illumination, phase: phase, waxing: waxing };
  }

  function buildIlluminatedPath(phase, r, cx, cy) {
    const illumination = phase.illumination;
    const waxing = phase.waxing;

    if (illumination < 0.02) return "";
    if (illumination > 0.98) {
      return "M " + (cx - r) + "," + cy + " a " + r + "," + r + " 0 1,0 " + (2*r) + ",0 a " + r + "," + r + " 0 1,0 " + (-2*r) + ",0 Z";
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

  function renderCraters(cx, cy, r, phase) {
    const opacity = Math.min(0.25, (phase.illumination - 0.55) * 0.6);
    if (opacity <= 0) return "";
    return '<g fill="#000" opacity="' + opacity + '">' +
      '<circle cx="' + (cx - 12) + '" cy="' + (cy - 8) + '" r="6"/>' +
      '<circle cx="' + (cx + 8) + '" cy="' + (cy - 15) + '" r="4"/>' +
      '<circle cx="' + (cx + 15) + '" cy="' + (cy + 10) + '" r="5"/>' +
      '<circle cx="' + (cx - 5) + '" cy="' + (cy + 18) + '" r="3.5"/>' +
      '<circle cx="' + (cx + 2) + '" cy="' + (cy - 2) + '" r="7"/>' +
    '</g>';
  }

  return { render: render, computePhase: computePhase };

})();

if (typeof window !== "undefined") {
  window.MoonPhase = MoonPhase;
}