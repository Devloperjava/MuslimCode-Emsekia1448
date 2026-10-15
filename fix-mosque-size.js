const fs = require("fs");
const path = require("path");

const CSS = path.join(__dirname, "web", "style.css");
let css = fs.readFileSync(CSS, "utf8");

// احذف كل تعريفات mosque-silhouette السابقة
css = css.replace(/\.mosque-silhouette\s*\{[^}]*\}/g, "");
css = css.replace(/@media[^{]*\{[^}]*\.mosque-silhouette[^}]*\}[^}]*\}/g, "");

// أضف تعريف جديد بحجم أصغر
css += `

/* MOSQUE-SIZE-FIX */
.mosque-silhouette{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 22vh;
  min-height: 130px;
  max-height: 200px;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  filter: drop-shadow(0 -6px 20px rgba(0,0,0,.5));
}

.mosque-silhouette svg{
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 600px){
  .mosque-silhouette{
    height: 20vh;
    min-height: 120px;
    max-height: 180px;
  }
}

@media (max-width: 380px){
  .mosque-silhouette{
    height: 18vh;
    min-height: 110px;
    max-height: 160px;
  }
}

/* تقليل ارتفاع السماء أيضاً لتتوازن */
@media (max-width: 600px){
  .sky{height: 48vh; min-height: 360px}
}

@media (max-width: 380px){
  .sky{height: 45vh; min-height: 330px}
}
`;

fs.writeFileSync(CSS, css, "utf8");
console.log("✓ style.css: المسجد صُغّر إلى 22vh");