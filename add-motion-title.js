const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
let css = fs.readFileSync(path.join(WEB, "style.css"), "utf8");

console.log("✨ إضافة أنيميشن العنوان + MuslimCode...\n");

if (!css.includes("TITLE-MOTION")) {
  css += `

/* ============================================================
   TITLE-MOTION — أنيميشن العنوان + MuslimCode
   ============================================================ */

/* ===== العنوان الرئيسي ===== */
.title-overlay h1{
  animation: titleShimmer 7s ease-in-out infinite,
             titleFloat 6s ease-in-out infinite,
             titleEnter 1.6s cubic-bezier(.2,.8,.2,1) both !important;
  background-size: 300% 100% !important;
  will-change: background-position, transform, filter;
}

@keyframes titleShimmer{
  0%, 50%, 100%{background-position: 200% 0}
  70%          {background-position: -50% 0}
}

@keyframes titleFloat{
  0%, 100%{transform: translateY(0) scale(1)}
  50%     {transform: translateY(-8px) scale(1.015)}
}

@keyframes titleEnter{
  0%{
    opacity: 0;
    transform: translateY(-50px) scale(.85);
    filter: blur(16px);
  }
  70%{
    opacity: 1;
    filter: blur(2px);
  }
  100%{
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* ===== MuslimCode في الفوتر ===== */
.brand-name{
  animation: brandShimmer 6s ease-in-out infinite,
             brandPulse 4s ease-in-out infinite !important;
  background-size: 300% 100% !important;
  will-change: background-position, filter;
}

@keyframes brandShimmer{
  0%, 55%, 100%{background-position: 200% 0}
  75%          {background-position: -50% 0}
}

@keyframes brandPulse{
  0%, 100%{
    filter: drop-shadow(0 3px 12px rgba(255,255,255,.3))
            brightness(1);
  }
  50%{
    filter: drop-shadow(0 8px 24px rgba(255,255,255,.7))
            drop-shadow(0 0 40px rgba(255,255,255,.4))
            brightness(1.25);
  }
}

/* ===== "Supported For MuslimCode" ===== */
.supported-text{
  animation: supportedGlow 4s ease-in-out infinite !important;
}

@keyframes supportedGlow{
  0%, 100%{
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(42,95,90,.15);
  }
  50%{
    transform: scale(1.03);
    box-shadow: 0 6px 28px rgba(42,95,90,.5),
                0 0 40px rgba(255,255,255,.2);
  }
}

/* احترام تفضيل تقليل الحركة */
@media(prefers-reduced-motion:reduce){
  .title-overlay h1,
  .brand-name,
  .supported-text{animation: none !important}
}
`;
  fs.writeFileSync(path.join(WEB, "style.css"), css, "utf8");
  console.log("✓ style.css: أنيميشن العنوان + MuslimCode مضاف");
} else {
  console.log("⚠ موجود مسبقاً");
}
`;

**احفظ وأغلق، ثم:**

```cmd
node add-motion-title.js