const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

// احذف أي تعديلات سابقة على title-overlay
css = css.replace(
  /\.title-overlay\s*\{[\s\S]*?\}/g,
  `.title-overlay{
  position:absolute;
  top:22%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align:center;
  color:#fff;
  z-index:6;
  width:90%;
  max-width:600px;
  pointer-events:none;
}`
);

// أضف قاعدة نهائية بـ !important لضمان التطبيق
if (!css.includes("TITLE-RAISE")) {
  css += `

/* TITLE-RAISE */
.title-overlay{
  top: 22% !important;
  transform: translate(-50%, -50%) !important;
}
`;
}

fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
console.log("✓ style.css: العنوان رُفع إلى 22% من أعلى الصفحة");