const fs = require("fs");
const path = require("path");

const CSS = path.join(__dirname, "web", "style.css");
let css = fs.readFileSync(CSS, "utf8");

// احذف تعريف moonFloat الأخير
css = css.replace(
  /@keyframes\s+moonFloat\s*\{[\s\S]*?\n\}/g,
  ""
);

// أضف نسخة محسّنة في النهاية
css += `

/* BOOST-MOTION */
@keyframes moonFloat{
  0%,100%{transform: translateY(0) rotate(0deg)}
  25%    {transform: translateY(-22px) rotate(-1.5deg)}
  50%    {transform: translateY(-28px) rotate(0deg)}
  75%    {transform: translateY(-14px) rotate(1.5deg)}
}

@keyframes moonDrift{
  0%,100%{margin-right: 0; transform: translateX(0)}
  50%    {margin-right: 0; transform: translateX(-30px)}
}

@keyframes starTwinkle{
  0%,100%{opacity: 0.15; transform: scale(0.8)}
  50%    {opacity: 1;    transform: scale(1.6)}
}
`;

fs.writeFileSync(CSS, css, "utf8");
console.log("✓ حركة القمر زادت ×3");
console.log("  القمر: 28 بكسل صعود/هبوط");
console.log("  النجوم: تباين مضاعف");