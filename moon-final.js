const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🌙 القمر الأبيض — إعادة البناء\n");

// =====================================================
// moon.js
// =====================================================
const lines = [
  '"use strict";',
  '',
  'const MoonPhase = (function () {',
  '',
  '  function render(day, size) {',
  '    size = size || 100;',
  '    const r = 42, cx = 50, cy = 50;',
  '    const illumination = 0.05 + ((day - 1) / 29) * 0.95;',
  '    const path = buildPath(illumination, r, cx, cy);',
  '    const isFull = illumination >= 0.97;',
  '',
  '    let svg = \'<svg viewBox="0 0 100 100" width="\' + size + \'" height="\' + size + \'" xmlns="http://www.w3.org/2000/svg">\';',
  '    svg += "<defs>";',
  '',
  '    svg += \'<radialGradient id="mg-\' + day + \'" cx="38%" cy="35%" r="75%">\';',
  '    svg += \'<stop offset="0%" stop-color="#ffffff"/>\';',
  '    svg += \'<stop offset="55%" stop-color="#fefefe"/>\';',
  '    svg += \'<stop offset="85%" stop-color="#f8f4e8"/>\';',
  '    svg += \'<stop offset="100%" stop-color="#f0e8d0"/>\';',
  '    svg += "</radialGradient>";',
  '',
  '    svg += \'<radialGradient id="hg-\' + day + \'" cx="50%" cy="50%" r="50%">\';',
  '    svg += \'<stop offset="60%" stop-color="rgba(255,255,255,0)"/>\';',
  '    svg += \'<stop offset="85%" stop-color="rgba(255,255,255,0.15)"/>\';',
  '    svg += \'<stop offset="100%" stop-color="rgba(255,255,255,0.35)"/>\';',
  '    svg += "</radialGradient>";',
  '',
  '    svg += \'<filter id="glow-\' + day + \'" x="-60%" y="-60%" width="220%" height="220%">\';',
  '    svg += \'<feGaussianBlur stdDeviation="2.5" result="b"/>\';',
  '    svg += "<feMerge>";',
  '    svg += \'<feMergeNode in="b"/>\';',
  '    svg += \'<feMergeNode in="SourceGraphic"/>\';',
  '    svg += "</feMerge>";',
  '    svg += "</filter>";',
  '',
  '    if (isFull) {',
  '      svg += \'<filter id="tex-\' + day + \'">\';',
  '      svg += \'<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="\' + day + \'"/>\';',
  '      svg += \'<feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.90  0 0 0 0 0.80  0 0 0 0.08 0"/>\';',
  '      svg += "</filter>";',
  '    }',
  '',
  '    svg += "</defs>";',
  '',
  '    svg += \'<circle cx="\' + cx + \'" cy="\' + cy + \'" r="\' + (r + 8) + \'" fill="url(#hg-\' + day + \')"/>\';',
  '',
  '    if (path) {',
  '      svg += \'<path d="\' + path + \'" fill="url(#mg-\' + day + \')" filter="url(#glow-\' + day + \')"/>\';',
  '    }',
  '',
  '    if (isFull) {',
  '      svg += \'<circle cx="\' + cx + \'" cy="\' + cy + \'" r="\' + r + \'" fill="#ffffff" filter="url(#tex-\' + day + \')" opacity="0.6"/>\';',
  '    }',
  '',
  '    if (illumination < 0.4) {',
  '      svg += \'<g fill="#ffffff" opacity="0.7">\';',
  '      svg += \'<circle cx="22" cy="28" r="1.2"/>\';',
  '      svg += \'<circle cx="78" cy="70" r="1.0"/>\';',
  '      svg += \'<circle cx="30" cy="78" r="1.5"/>\';',
  '      svg += \'<circle cx="70" cy="22" r="1.3"/>\';',
  '      svg += \'<circle cx="18" cy="52" r="0.9"/>\';',
  '      svg += \'<circle cx="82" cy="48" r="1.1"/>\';',
  '      svg += \'<circle cx="50" cy="12" r="1.0"/>\';',
  '      svg += \'<circle cx="48" cy="88" r="1.2"/>\';',
  '      svg += "</g>";',
  '    }',
  '',
  '    svg += "</svg>";',
  '    return svg;',
  '  }',
  '',
  '  function buildPath(illumination, r, cx, cy) {',
  '    if (illumination < 0.02) return "";',
  '',
  '    if (illumination >= 0.98) {',
  '      return "M " + (cx - r) + "," + cy +',
  '             " a " + r + "," + r + " 0 1,0 " + (2 * r) + ",0" +',
  '             " a " + r + "," + r + " 0 1,0 " + (-2 * r) + ",0 Z";',
  '    }',
  '',
  '    const rx = Math.abs(r * (1 - 2 * illumination));',
  '    const isGibbous = illumination > 0.5;',
  '',
  '    if (isGibbous) {',
  '      return "M " + cx + "," + (cy - r) +',
  '             " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +',
  '             " A " + rx + "," + r + " 0 0,1 " + cx + "," + (cy - r) + " Z";',
  '    } else {',
  '      return "M " + cx + "," + (cy - r) +',
  '             " A " + r + "," + r + " 0 0,1 " + cx + "," + (cy + r) +',
  '             " A " + rx + "," + r + " 0 0,0 " + cx + "," + (cy - r) + " Z";',
  '    }',
  '  }',
  '',
  '  return { render: render };',
  '',
  '})();',
  '',
  'if (typeof window !== "undefined") {',
  '  window.MoonPhase = MoonPhase;',
  '}',
  ''
];

write(path.join(WEB, "moon.js"), lines.join("\n"));
console.log("✓ moon.js: أبيض ناصع + ملمس بدر + رذاذ");

// =====================================================
// style.css
// =====================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

css = css.replace(
  /\.moon-wrap\s*\{[^}]*\}/,
  ".moon-wrap{position:absolute;top:60px;right:12%;width:130px;height:130px;z-index:5;pointer-events:none;filter:drop-shadow(0 0 20px rgba(255,255,255,.85)) drop-shadow(0 0 50px rgba(255,255,255,.4))}"
);

if (!css.includes("WHITE-MOON")) {
  css += "\n\n";
  css += "/* WHITE-MOON */\n";
  css += ".moon-body{filter:drop-shadow(0 0 15px rgba(255,255,255,.9)) drop-shadow(0 0 35px rgba(255,255,255,.5)) !important}\n";
  css += ".date-moon{filter:drop-shadow(0 0 6px rgba(255,255,255,.7)) drop-shadow(0 0 14px rgba(255,255,255,.35))}\n";
  css += ".day-card.is-today .date-moon{filter:drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 0 24px rgba(255,255,255,.6)) !important}\n";
}

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: توهج أبيض");

console.log("\n✅ تم!");
console.log("  • يوم 1: هلال رفيع أبيض + رذاذ");
console.log("  • يوم 15: ثلاثة أرباع");
console.log("  • يوم 30: بدر كامل بملمس");