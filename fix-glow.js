const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");

console.log("🔧 إصلاح توهج الهلال...\n");

// ============================================================
// 1) moon.js — إزالة filter الداخلي + الاعتماد على CSS
// ============================================================
const moonContent = [
'"use strict";',
'',
'const MoonPhase = (function () {',
'',
'  function render(day, size) {',
'    size = size || 100;',
'    const r = 38, cx = 50, cy = 50;',
'    const illumination = 0.08 + ((day - 1) / 29) * 0.92;',
'    const path = buildPath(illumination, r, cx, cy);',
'',
'    // بدون أي filter داخلي — التوهج في CSS',
'    return \'<svg viewBox="0 0 100 100" width="\' + size + \'" height="\' + size + \'" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">\' +',
'      \'<defs>\' +',
'        \'<radialGradient id="m\' + day + \'" cx="35%" cy="30%" r="80%">\' +',
'          \'<stop offset="0%" stop-color="#ffffff"/>\' +',
'          \'<stop offset="60%" stop-color="#fafafa"/>\' +',
'          \'<stop offset="100%" stop-color="#e8e8e8"/>\' +',
'        \'</radialGradient>\' +',
'      \'</defs>\' +',
'      (path ? \'<path d="\' + path + \'" fill="url(#m\' + day + \')"/>\' : \'\') +',
'    \'</svg>\';',
'  }',
'',
'  function buildPath(illumination, r, cx, cy) {',
'    if (illumination < 0.02) return "";',
'',
'    if (illumination >= 0.98) {',
'      return "M " + (cx - r) + "," + cy +',
'             " a " + r + "," + r + " 0 1,0 " + (2*r) + ",0" +',
'             " a " + r + "," + r + " 0 1,0 " + (-2*r) + ",0 Z";',
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
].join("\n");

fs.writeFileSync(path.join(WEB, "moon.js"), moonContent, "utf8");
console.log("✓ moon.js: بدون filter داخلي");

// ============================================================
// 2) style.css — إزالة أي filter قديم + إضافة توهج ناعم
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات moon-body القديمة
css = css.replace(/\.moon-body\s*\{[^}]*\}/g, "");

// احذف تعريفات moon-body svg
css = css.replace(/\.moon-body\s+svg\s*\{[^}]*\}/g, "");

// أضف تعريف جديد بتوهج drop-shadow ناعم
css += `

/* ============================================================
   GLOW-FIX — توهج ناعم بدون قص
   ============================================================ */

.moon-body{
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: visible !important;
  filter: drop-shadow(0 0 12px rgba(255,255,255,.9))
          drop-shadow(0 0 30px rgba(255,255,255,.5))
          drop-shadow(0 0 60px rgba(255,255,255,.25)) !important;
}

.moon-body svg{
  width: 100%;
  height: 100%;
  overflow: visible !important;
}

/* القمر في البطاقات */
.date-moon{
  overflow: visible !important;
}

.date-moon svg{
  width: 100%;
  height: 100%;
  overflow: visible !important;
}

/* توهج قوي لقمر اليوم */
.day-card.is-today .date-moon{
  filter: drop-shadow(0 0 12px rgba(255,255,255,.9))
          drop-shadow(0 0 24px rgba(255,255,255,.5)) !important;
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: توهج ناعم بدون قص");

console.log("\\n✅ تم!");
console.log("  • إزالة filter الداخلي من SVG");
console.log("  • overflow: visible على SVG");
console.log("  • توهج drop-shadow ناعم");
console.log("\\n📋 الآن:");
console.log("  npx cap sync && cd android && gradlew.bat assembleRelease && adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");