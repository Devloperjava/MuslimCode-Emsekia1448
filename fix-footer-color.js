const fs = require("fs");
const path = require("path");

const CSS = path.join(__dirname, "web", "style.css");
let css = fs.readFileSync(CSS, "utf8");

console.log("🎨 تغيير لون الفوتر...\n");

// احذف قسم FOOTER-PREMIUM القديم
css = css.replace(/\/\* =+\s*\n\s*FOOTER-PREMIUM[\s\S]*?(?=\/\*\s*=+\s*\n\s*[A-Z]|$)/, "");

// احذف تعريفات brand-name القديمة
css = css.replace(/\.brand-name\s*\{[^}]*\}/g, "");
css = css.replace(/\.supported-text\s*\{[^}]*\}/g, "");
css = css.replace(/@keyframes\s+brandShimmer\s*\{[\s\S]*?\n\}/g, "");
css = css.replace(/@keyframes\s+supportedPulse\s*\{[\s\S]*?\n\}/g, "");

// أضف القسم الجديد
css += `

/* ============================================================
   FOOTER-OLIVE — زيتوني دافئ + بترولي دافئ
   ============================================================ */

.site-footer{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  padding: 32px 20px 18px;
  overflow: hidden;
  isolation: isolate;
}

/* خط ذهبي دافئ */
.footer-line{
  width: min(420px, 80%);
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(107,125,58,.6),
    rgba(42,95,90,.8),
    rgba(107,125,58,.6),
    transparent
  );
  margin-bottom: 22px;
}

.brand{
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  direction: ltr;
  cursor: default;
}

/* شعار MuslimCode — زيتوني/بترولي */
.brand-name{
  position: relative;
  display: inline-block;
  font-family: "Amiri", "Segoe UI", serif;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1.5px;
  background: linear-gradient(
    110deg,
    #4a5a25 0%,
    #6b7d3a 25%,
    #2a5f5a 45%,
    #3a7d72 50%,
    #2a5f5a 55%,
    #6b7d3a 75%,
    #4a5a25 100%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: oliveShimmer 6s ease-in-out infinite;
  filter: drop-shadow(0 3px 12px rgba(42,95,90,.35))
          drop-shadow(0 0 20px rgba(107,125,58,.25));
}

@keyframes oliveShimmer{
  0%, 55%, 100%{background-position: 200% 0}
  75%          {background-position: -50% 0}
}

.brand-name::after{
  content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  bottom: -4px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(107,125,58,.7),
    rgba(42,95,90,.8),
    rgba(107,125,58,.7),
    transparent
  );
}

/* نص الدعم — زيتوني/بترولي */
.supported-text{
  margin-top: 14px;
  padding: 6px 18px;
  font-family: "Amiri", "Segoe UI", serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #2a5f5a;
  background: linear-gradient(
    145deg,
    rgba(107,125,58,.10),
    rgba(42,95,90,.08)
  );
  border: 1px solid rgba(42,95,90,.35);
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(42,95,90,.15);
  animation: olivePulse 4s ease-in-out infinite;
}

@keyframes olivePulse{
  0%, 100%{
    box-shadow: 0 4px 16px rgba(42,95,90,.15);
    transform: scale(1);
    border-color: rgba(42,95,90,.35);
  }
  50%{
    box-shadow: 0 6px 24px rgba(42,95,90,.35);
    transform: scale(1.02);
    border-color: rgba(107,125,58,.55);
  }
}

/* توهج زيتوني/بترولي */
.footer-glow{
  position: absolute;
  left: 50%;
  bottom: -80px;
  width: 260px;
  height: 140px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(42,95,90,.18),
    rgba(107,125,58,.08) 50%,
    transparent 70%
  );
  filter: blur(14px);
  pointer-events: none;
  z-index: -1;
}

/* الهاتف */
@media(max-width: 520px){
  .brand-name{font-size: 22px}
  .supported-text{font-size: 12px; padding: 5px 14px}
}
`;

fs.writeFileSync(CSS, css, "utf8");
console.log("✓ style.css: اللون زيتوني + بترولي دافئ");