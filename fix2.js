const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, c) { fs.writeFileSync(p, c, "utf8"); }

console.log("🔧 إصلاح شامل...\n");

// ==========================================================
// 1) index.html — تفتيح المسجد + إضافة حاوية الأمطار
// ==========================================================
let html = read(path.join(WEB, "index.html"));

// ألوان المسجد أوضح
html = html.replace(
  /<stop offset="0%"\s+stop-color="#0a1a2e"\/>/g,
  '<stop offset="0%" stop-color="#3a5f8a"/>'
);
html = html.replace(
  /<stop offset="100%"\s+stop-color="#020610"\/>/g,
  '<stop offset="100%" stop-color="#0f2a4a"/>'
);
html = html.replace(
  /<stop offset="0%"\s+stop-color="#0d2440"\/>/g,
  '<stop offset="0%" stop-color="#4a7099"/>'
);
html = html.replace(
  /<stop offset="100%"\s+stop-color="#030912"\/>/g,
  '<stop offset="100%" stop-color="#152e52"/>'
);

// إضافة حاوية الأمطار
if (!html.includes('id="rainLayer"')) {
  html = html.replace(
    '<div class="clouds">',
    '<div class="rain" id="rainLayer"></div>\n\n    <div class="clouds">'
  );
}

write(path.join(WEB, "index.html"), html);
console.log("✓ index.html: مسجد أفتح + حاوية أمطار");

// ==========================================================
// 2) style.css — توهج المسجد + الأمطار + قمر البطاقات
// ==========================================================
let css = read(path.join(WEB, "style.css"));

if (!css.includes("MOSQUE-V2")) {
  css += `

/* MOSQUE-V2 */
.mosque-silhouette{
  filter:drop-shadow(0 0 20px rgba(120,180,255,.4))
         drop-shadow(0 0 40px rgba(255,220,140,.3))
         brightness(1.7) contrast(1.15);
}
.mosque-silhouette svg{filter:brightness(1.2)}
.mosque-silhouette rect[fill="#ffd97a"]{
  filter:drop-shadow(0 0 8px rgba(255,220,120,1))
         drop-shadow(0 0 16px rgba(255,200,80,.7));
}

/* RAIN-V2 */
.rain{
  position:absolute;
  inset:0;
  pointer-events:none;
  z-index:7;
  overflow:hidden;
}
.rain-drop{
  position:absolute;
  width:2px;
  height:40px;
  background:linear-gradient(180deg,
    rgba(180,220,255,0) 0%,
    rgba(200,230,255,.85) 50%,
    rgba(180,220,255,0) 100%);
  border-radius:1px;
  animation:rainFall linear infinite;
  filter:blur(.3px);
  box-shadow:0 0 4px rgba(180,220,255,.6);
}
@keyframes rainFall{
  0%  {transform:translateY(-120px) translateX(0);opacity:0}
  10% {opacity:.9}
  90% {opacity:.7}
  100%{transform:translateY(650px) translateX(-40px);opacity:0}
}

/* MOON-IN-CARD */
.date-moon{
  flex:0 0 44px;
  height:44px;
  display:grid;
  place-items:center;
  filter:drop-shadow(0 2px 8px rgba(201,162,39,.6));
}
.date-moon svg{width:100%;height:100%}
.day-card.is-today .date-moon{
  filter:drop-shadow(0 2px 12px rgba(201,162,39,.95)) brightness(1.15);
}
`;
  write(path.join(WEB, "style.css"), css);
  console.log("✓ style.css: توهج + أمطار + قمر البطاقات");
} else {
  console.log("⚠ style.css: موجود مسبقاً");
}

// ==========================================================
// 3) night-sky.js — إضافة الأمطار
// ==========================================================
let js = read(path.join(WEB, "night-sky.js"));

if (!js.includes("createRain")) {
  js = js.replace(
    "createStars(starsLayer, 150);",
    "createStars(starsLayer, 150);\n    createRain();"
  );
  js = js.replace(
    "return { init: init };",
    `function createRain(){
    const layer = document.getElementById("rainLayer");
    if (!layer) return;
    for (let i = 0; i < 50; i++) {
      const d = document.createElement("div");
      d.className = "rain-drop";
      d.style.left = Math.random() * 100 + "%";
      d.style.top = (Math.random() * -80) + "px";
      d.style.animationDuration = (0.9 + Math.random() * 1.4) + "s";
      d.style.animationDelay = (Math.random() * 3) + "s";
      d.style.height = (25 + Math.random() * 45) + "px";
      d.style.opacity = 0.4 + Math.random() * 0.5;
      layer.appendChild(d);
    }
  }

  return { init: init };`
  );
  write(path.join(WEB, "night-sky.js"), js);
  console.log("✓ night-sky.js: أمطار مضافة");
} else {
  console.log("⚠ night-sky.js: موجود مسبقاً");
}

// ==========================================================
// 4) app.js — قمر لكل بطاقة يوم
// ==========================================================
let app = read(path.join(WEB, "app.js"));

if (!app.includes("date-moon")) {
  app = app.replace(
    `<div class="date-number">\${String(day.day).padStart(2, "0")}</div>`,
    `<div class="date-moon">\${MoonPhase.render(day.day, 44)}</div>\n          <div class="date-number">\${String(day.day).padStart(2, "0")}</div>`
  );
  write(path.join(WEB, "app.js"), app);
  console.log("✓ app.js: قمر لكل بطاقة");
} else {
  console.log("⚠ app.js: موجود مسبقاً");
}

console.log("\n✅ تم!");