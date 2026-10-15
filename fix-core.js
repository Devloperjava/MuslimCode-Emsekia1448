const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("🔧 المرحلة 1: fix-core.js\n");

// ============================================================
// 1) splash.html — إعادة كتابة كاملة (هلال نظيف + MuslimCode)
// ============================================================
const splashHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Splash</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{
    width:100%;height:100%;overflow:hidden;
    background:radial-gradient(circle at 50% 40%,#1f4f4a 0%,#163a38 50%,#0d2523 100%);
    font-family:Georgia,"Times New Roman",serif;
    display:flex;align-items:center;justify-content:center;
  }
  .splash{position:relative;width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px}
  .stars{position:absolute;inset:0;pointer-events:none}
  .star{position:absolute;background:#fff;border-radius:50%;opacity:.3;animation:tw 5s ease-in-out infinite}
  @keyframes tw{0%,100%{opacity:.15;transform:scale(1)}50%{opacity:.9;transform:scale(1.3)}}
  .moon{width:150px;height:150px;opacity:0;animation:me 1.1s cubic-bezier(.2,.8,.2,1) .2s forwards}
  .moon svg{width:100%;height:100%;display:block}
  @keyframes me{from{opacity:0;transform:scale(.6) rotate(-90deg)}to{opacity:1;transform:scale(1) rotate(0)}}
  .title{font-size:26px;font-weight:bold;color:#fff;text-align:center;opacity:0;animation:te 1.1s cubic-bezier(.2,.8,.2,1) .8s forwards;text-shadow:0 4px 20px rgba(0,0,0,.5)}
  @keyframes te{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .brand{margin-top:6px;font-size:16px;font-weight:600;letter-spacing:2px;color:#c8d4cf;opacity:0;animation:be 1s cubic-bezier(.2,.8,.2,1) 1.4s forwards;font-family:Georgia,serif}
  @keyframes be{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
</style>
</head>
<body>
<div class="splash">
  <div class="stars" id="stars"></div>
  <div class="moon">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mg" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#f5f5f5"/>
          <stop offset="100%" stop-color="#e0e0e0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#mg)"/>
      <circle cx="64" cy="46" r="36" fill="#163a38"/>
    </svg>
  </div>
  <div class="title">إمساكية رمضان 1448</div>
  <div class="brand">MuslimCode</div>
</div>
<script>
  var s=document.getElementById("stars");
  for(var i=0;i<25;i++){
    var d=document.createElement("div");
    d.className="star";
    d.style.left=Math.random()*100+"%";
    d.style.top=Math.random()*100+"%";
    var sz=(1+Math.random()*2).toFixed(1);
    d.style.width=sz+"px";d.style.height=sz+"px";
    d.style.animationDelay=(Math.random()*4)+"s";
    s.appendChild(d);
  }
  setTimeout(function(){location.replace("./index.html")},2600);
</script>
</body>
</html>`;

fs.writeFileSync(path.join(WEB, "splash.html"), splashHTML, "utf8");
console.log("✓ splash.html: هلال نظيف + MuslimCode");

// ============================================================
// 2) index.html — استبدال SVG المسجد (مأذنة متوسطة)
// ============================================================
let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

const newMosque = `<div class="mosque-silhouette">
      <svg viewBox="0 0 1000 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a5f8a"/>
            <stop offset="100%" stop-color="#0f2a4a"/>
          </linearGradient>
          <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4a7099"/>
            <stop offset="100%" stop-color="#152e52"/>
          </linearGradient>
        </defs>
        <rect x="0" y="290" width="1000" height="30" fill="url(#mg1)"/>
        <g fill="url(#mg1)">
          <rect x="300" y="180" width="400" height="110" rx="6"/>
          <path d="M395,180 Q500,80 605,180 Z" fill="url(#mg2)"/>
          <rect x="497" y="68" width="6" height="20"/>
          <circle cx="500" cy="64" r="5"/>
          <rect x="735" y="130" width="30" height="160"/>
          <rect x="727" y="165" width="46" height="8" rx="3"/>
          <path d="M735,130 Q750,105 765,130 Z" fill="url(#mg2)"/>
          <rect x="748" y="96" width="4" height="14"/>
          <circle cx="750" cy="92" r="3.5"/>
          <path d="M280,180 Q310,145 340,180 Z"/>
        </g>
        <g fill="#ffd97a" opacity="0.95">
          <rect x="330" y="220" width="16" height="45" rx="8"/>
          <rect x="380" y="220" width="16" height="45" rx="8"/>
          <rect x="430" y="220" width="16" height="45" rx="8"/>
          <rect x="560" y="220" width="16" height="45" rx="8"/>
          <rect x="610" y="220" width="16" height="45" rx="8"/>
          <rect x="660" y="220" width="16" height="45" rx="8"/>
          <rect x="478" y="240" width="44" height="50" rx="22"/>
        </g>
      </svg>
    </div>`;

html = html.replace(/<div class="mosque-silhouette">[\s\S]*?<\/div>\s*(?=<!--|<div class="tents|<\/section>)/, newMosque);
fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: مسجد بمأذنة متوسطة");

// ============================================================
// 3) moon.js — قوس نظيف بدون filter
// ============================================================
const moonCode = [
'"use strict";',
'',
'const MoonPhase=(function(){',
'  function render(day,size){',
'    size=size||100;',
'    const r=38,cx=50,cy=50;',
'    const ill=0.08+((day-1)/29)*0.92;',
'    const p=build(ill,r,cx,cy);',
'    return \'<svg viewBox="0 0 100 100" width="\'+size+\'" height="\'+size+\'" xmlns="http://www.w3.org/2000/svg">\'+',
'      \'<defs><radialGradient id="mg\'+day+\'" cx="35%" cy="30%" r="80%">\'+',
'      \'<stop offset="0%" stop-color="#ffffff"/>\'+',
'      \'<stop offset="60%" stop-color="#f5f5f5"/>\'+',
'      \'<stop offset="100%" stop-color="#e0e0e0"/>\'+',
'      \'</radialGradient></defs>\'+',
'      (p?\'<path d="\'+p+\'" fill="url(#mg\'+day+\')"/>\':\'\')+',
'      \'</svg>\';',
'  }',
'  function build(ill,r,cx,cy){',
'    if(ill<0.02)return "";',
'    if(ill>=0.98){',
'      return "M "+(cx-r)+","+cy+" a "+r+","+r+" 0 1,0 "+(2*r)+",0 a "+r+","+r+" 0 1,0 "+(-2*r)+",0 Z";',
'    }',
'    const rx=Math.abs(r*(1-2*ill));',
'    if(ill>0.5){',
'      return "M "+cx+","+(cy-r)+" A "+r+","+r+" 0 0,1 "+cx+","+(cy+r)+" A "+rx+","+r+" 0 0,1 "+cx+","+(cy-r)+" Z";',
'    }else{',
'      return "M "+cx+","+(cy-r)+" A "+r+","+r+" 0 0,1 "+cx+","+(cy+r)+" A "+rx+","+r+" 0 0,0 "+cx+","+(cy-r)+" Z";',
'    }',
'  }',
'  return {render:render};',
'})();',
'if(typeof window!=="undefined")window.MoonPhase=MoonPhase;',
''
].join("\n");

fs.writeFileSync(path.join(WEB, "moon.js"), moonCode, "utf8");
console.log("✓ moon.js: قوس نظيف بدون filter");

// ============================================================
// 4) style.css — إزالة filter + نجوم ناعمة
// ============================================================
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف تعريفات القمر القديمة
css = css.replace(/\.moon-wrap\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-body\s*\{[^}]*\}/g, "");
css = css.replace(/\.moon-body\s+svg\s*\{[^}]*\}/g, "");
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/\.star\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+starTwinkle\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.mosque-silhouette\s*\{[^}]*\}\s*\}/g, "");
css = css.replace(/@media[^{]*\{\s*\.moon-wrap\s*\{[^}]*\}\s*\}/g, "");

css += `

/* ============================================================
   FIX-CORE — القمر + المسجد + النجوم
   ============================================================ */

.moon-wrap{
  position:absolute;
  top:55px;
  right:12%;
  width:90px;
  height:90px;
  z-index:6;
  pointer-events:none;
  animation:moonFloat 8s ease-in-out infinite;
}

.moon-body{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
}

.moon-body svg{
  width:100%;
  height:100%;
  display:block;
}

.mosque-silhouette{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:38vh;
  min-height:220px;
  max-height:320px;
  z-index:5;
  pointer-events:none;
}

.mosque-silhouette svg{
  width:100%;
  height:100%;
  display:block;
}

/* نجوم ناعمة — بطيئة، غير متلاحقة */
.star{
  position:absolute;
  border-radius:50%;
  background:radial-gradient(circle,#fff,rgba(255,255,255,.4) 60%,transparent 70%);
  animation:starGlow 6s ease-in-out infinite;
}

.star-sm{width:2px;height:2px}
.star-md{width:3px;height:3px}
.star-lg{width:4px;height:4px;box-shadow:0 0 6px rgba(255,255,255,.6)}

@keyframes starGlow{
  0%,100%{opacity:.15;transform:scale(.85)}
  50%    {opacity:.7; transform:scale(1.1)}
}

@keyframes moonFloat{
  0%,100%{transform:translateY(0)}
  50%    {transform:translateY(-10px)}
}

@media (max-width:600px){
  .mosque-silhouette{height:34vh;min-height:200px;max-height:280px}
  .moon-wrap{top:50px;right:10%;width:80px;height:80px}
}

@media (max-width:380px){
  .mosque-silhouette{height:30vh;min-height:180px;max-height:240px}
  .moon-wrap{top:45px;width:70px;height:70px}
}
`;

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: القمر + المسجد + نجوم ناعمة");

// ============================================================
// 5) night-sky.js — إبطاء النجوم
// ============================================================
let ns = fs.readFileSync(path.join(WEB, "night-sky.js"), "utf8");
// ضمان أن كل نجمة لها delay عشوائي واضح (بدون تكرار)
ns = ns.replace(/d\.style\.animationDelay\s*=\s*[^;]+;/g, "");
fs.writeFileSync(path.join(WEB, "night-sky.js"), ns, "utf8");
console.log("✓ night-sky.js: نظيف");

console.log("\\n✅ المرحلة 1 مكتملة!");
console.log("  • splash.html: هلال نظيف + MuslimCode");
console.log("  • index.html: مسجد بمأذنة متوسطة");
console.log("  • moon.js: قوس نظيف بدون filter");
console.log("  • style.css: نجوم ناعمة + قمر 90px");
console.log("\\n📋 التالي:");
console.log("  1. node --check fix-core.js");
console.log("  2. node fix-core.js");
console.log("  3. npx cap sync");
console.log("  4. cd android");
console.log("  5. gradlew.bat assembleRelease");
console.log("  6. adb install -r app\\\\build\\\\outputs\\\\apk\\\\release\\\\app-release.apk");