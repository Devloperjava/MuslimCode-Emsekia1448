const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");
if (!fs.existsSync(RES)) fs.mkdirSync(RES);

console.log("🎨 بناء الأيقونة المخصصة — 🅲️ المبسّط\n");

// ============================================================
// أيقونة عالية الجودة — 1024×1024
// ============================================================
function generateIcon(size) {
  const s = size;
  const cx = s / 2;

  // ⭐ نجوم موزعة بعناية (ثابتة)
  const stars = [
    { x: 0.15, y: 0.12, r: 0.006, o: 0.7 },
    { x: 0.28, y: 0.22, r: 0.005, o: 0.6 },
    { x: 0.78, y: 0.10, r: 0.007, o: 0.8 },
    { x: 0.88, y: 0.25, r: 0.005, o: 0.55 },
    { x: 0.10, y: 0.35, r: 0.006, o: 0.65 },
    { x: 0.92, y: 0.42, r: 0.004, o: 0.5 },
    { x: 0.20, y: 0.55, r: 0.005, o: 0.6 },
    { x: 0.85, y: 0.60, r: 0.006, o: 0.65 },
    { x: 0.72, y: 0.75, r: 0.004, o: 0.5 },
    { x: 0.35, y: 0.85, r: 0.005, o: 0.55 }
  ];

  let starsSvg = "";
  stars.forEach(function (st) {
    const cxx = (st.x * s).toFixed(1);
    const cyy = (st.y * s).toFixed(1);
    const rr = (st.r * s).toFixed(1);
    starsSvg += '<circle cx="' + cxx + '" cy="' + cyy + '" r="' + rr + '" fill="#ffffff" opacity="' + st.o + '"/>';
  });

  // 🌙 الهلال — كبير وواضح
  const moonCX = cx;
  const moonCY = s * 0.38;
  const moonR = s * 0.20;
  const cutR = moonR * 0.85;
  const cutX = moonCX + moonR * 0.45;
  const cutY = moonCY - moonR * 0.10;

  // 🏮 الفانوس — الزاوية العلوية اليمنى
  const lanternX = s * 0.78;
  const lanternY = s * 0.20;
  const lanternSize = s * 0.11;

  // 🕌 المسجد — الأسفل
  const mosqueBaseY = s * 0.78;
  const mosqueHeight = s * 0.12;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +

    // ==== defs ====
    '<defs>' +

    // خلفية ليلية غنية
    '<radialGradient id="bg" cx="50%" cy="30%" r="80%">' +
      '<stop offset="0%" stop-color="#1f4f5a"/>' +
      '<stop offset="45%" stop-color="#0f2a3a"/>' +
      '<stop offset="100%" stop-color="#05141c"/>' +
    '</radialGradient>' +

    // توهج الهلال
    '<radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="rgba(245,215,110,.5)"/>' +
      '<stop offset="60%" stop-color="rgba(245,215,110,.15)"/>' +
      '<stop offset="100%" stop-color="rgba(245,215,110,0)"/>' +
    '</radialGradient>' +

    // تدرج الهلال الذهبي
    '<radialGradient id="moonG" cx="30%" cy="30%" r="75%">' +
      '<stop offset="0%" stop-color="#fffdf0"/>' +
      '<stop offset="45%" stop-color="#f5d76e"/>' +
      '<stop offset="80%" stop-color="#d4a72c"/>' +
      '<stop offset="100%" stop-color="#a8841a"/>' +
    '</radialGradient>' +

    // توهج الفانوس
    '<radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="rgba(255,220,120,.7)"/>' +
      '<stop offset="100%" stop-color="rgba(255,220,120,0)"/>' +
    '</radialGradient>' +

    // توهج النص
    '<linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#d4a72c"/>' +
      '<stop offset="50%" stop-color="#fffdf0"/>' +
      '<stop offset="100%" stop-color="#d4a72c"/>' +
    '</linearGradient>' +

    // فلتر ناعم
    '<filter id="soft" x="-50%" y="-50%" width="200%" height="200%">' +
      '<feGaussianBlur stdDeviation="' + (s * 0.008) + '"/>' +
    '</filter>' +

    '</defs>' +

    // ==== الخلفية ====
    '<rect width="' + s + '" height="' + s + '" fill="url(#bg)"/>' +

    // ==== النجوم ====
    starsSvg +

    // ==== توهج الهلال ====
    '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + (moonR * 1.8) + '" fill="url(#moonGlow)"/>' +

    // ==== الهلال ====
    '<g filter="url(#soft)">' +
      '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + moonR + '" fill="url(#moonG)"/>' +
      '<circle cx="' + cutX + '" cy="' + cutY + '" r="' + cutR + '" fill="#0a1e28"/>' +
    '</g>' +

    // ==== الفانوس — الزاوية العلوية اليمنى ====
    '<g transform="translate(' + lanternX + ', ' + lanternY + ')">' +
      // توهج
      '<circle cx="0" cy="0" r="' + (lanternSize * 0.9) + '" fill="url(#lanternGlow)"/>' +
      // سلك التعليق
      '<line x1="0" y1="' + (-lanternSize * 0.7) + '" x2="0" y2="' + (-lanternSize * 0.3) + '" stroke="#c9a227" stroke-width="' + (s * 0.003) + '"/>' +
      // الجزء العلوي
      '<rect x="' + (-lanternSize * 0.25) + '" y="' + (-lanternSize * 0.35) + '" width="' + (lanternSize * 0.5) + '" height="' + (lanternSize * 0.15) + '" fill="#c9a227" rx="' + (lanternSize * 0.05) + '"/>' +
      // الجسم (مضيء)
      '<rect x="' + (-lanternSize * 0.35) + '" y="' + (-lanternSize * 0.2) + '" width="' + (lanternSize * 0.7) + '" height="' + (lanternSize * 0.7) + '" fill="#f5d76e" rx="' + (lanternSize * 0.1) + '"/>' +
      // خطوط زينة
      '<line x1="' + (-lanternSize * 0.2) + '" y1="' + (-lanternSize * 0.1) + '" x2="' + (lanternSize * 0.2) + '" y2="' + (-lanternSize * 0.1) + '" stroke="#a8841a" stroke-width="' + (s * 0.002) + '"/>' +
      '<line x1="' + (-lanternSize * 0.2) + '" y1="' + (lanternSize * 0.15) + '" x2="' + (lanternSize * 0.2) + '" y2="' + (lanternSize * 0.15) + '" stroke="#a8841a" stroke-width="' + (s * 0.002) + '"/>' +
      // الجزء السفلي
      '<rect x="' + (-lanternSize * 0.25) + '" y="' + (lanternSize * 0.5) + '" width="' + (lanternSize * 0.5) + '" height="' + (lanternSize * 0.12) + '" fill="#c9a227" rx="' + (lanternSize * 0.05) + '"/>' +
    '</g>' +

    // ==== المسجد — الأسفل ====
    '<g transform="translate(' + cx + ', ' + mosqueBaseY + ')">' +
      // القاعدة
      '<rect x="' + (-s * 0.18) + '" y="0" width="' + (s * 0.36) + '" height="' + (mosqueHeight * 0.7) + '" fill="#1a3a4a" rx="' + (s * 0.01) + '"/>' +
      // القبة الكبيرة
      '<path d="M ' + (-s * 0.12) + ',0 Q 0,' + (-mosqueHeight * 0.7) + ' ' + (s * 0.12) + ',0 Z" fill="#2a4f6a"/>' +
      // سارية القبة
      '<rect x="' + (-s * 0.004) + '" y="' + (-mosqueHeight * 0.75) + '" width="' + (s * 0.008) + '" height="' + (mosqueHeight * 0.1) + '" fill="#c9a227"/>' +
      // هلال القبة
      '<circle cx="0" cy="' + (-mosqueHeight * 0.78) + '" r="' + (s * 0.012) + '" fill="#f5d76e"/>' +
      '<circle cx="' + (s * 0.004) + '" cy="' + (-mosqueHeight * 0.78) + '" r="' + (s * 0.01) + '" fill="#0a1e28"/>' +
      // نوافذ مضيئة
      '<rect x="' + (-s * 0.13) + '" y="' + (mosqueHeight * 0.15) + '" width="' + (s * 0.02) + '" height="' + (mosqueHeight * 0.35) + '" fill="#f5d76e" rx="' + (s * 0.005) + '"/>' +
      '<rect x="' + (-s * 0.07) + '" y="' + (mosqueHeight * 0.15) + '" width="' + (s * 0.02) + '" height="' + (mosqueHeight * 0.35) + '" fill="#f5d76e" rx="' + (s * 0.005) + '"/>' +
      '<rect x="' + (s * 0.05) + '" y="' + (mosqueHeight * 0.15) + '" width="' + (s * 0.02) + '" height="' + (mosqueHeight * 0.35) + '" fill="#f5d76e" rx="' + (s * 0.005) + '"/>' +
      '<rect x="' + (s * 0.11) + '" y="' + (mosqueHeight * 0.15) + '" width="' + (s * 0.02) + '" height="' + (mosqueHeight * 0.35) + '" fill="#f5d76e" rx="' + (s * 0.005) + '"/>' +
      // الباب
      '<rect x="' + (-s * 0.025) + '" y="' + (mosqueHeight * 0.3) + '" width="' + (s * 0.05) + '" height="' + (mosqueHeight * 0.4) + '" fill="#f5d76e" rx="' + (s * 0.015) + '"/>' +
    '</g>' +

    // ==== النص MuslimCode ====
    '<text x="' + cx + '" y="' + (s * 0.94) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.075) + '" ' +
          'font-weight="800" ' +
          'letter-spacing="' + (s * 0.005) + '" ' +
          'fill="url(#textGrad)" ' +
          'text-anchor="middle">MuslimCode</text>' +

    // ==== خط ذهبي فاصل ====
    '<line x1="' + (s * 0.28) + '" y1="' + (s * 0.87) + '" ' +
          'x2="' + (s * 0.72) + '" y2="' + (s * 0.87) + '" ' +
          'stroke="url(#textGrad)" stroke-width="' + (s * 0.003) + '"/>' +

  '</svg>';
}

// ============================================================
// اكتب الأيقونات
// ============================================================
fs.writeFileSync(path.join(RES, "icon.svg"), generateIcon(1024), "utf8");
console.log("✓ resources/icon.svg (1024×1024)");

// أيقونة الـ splash أيضاً
fs.writeFileSync(path.join(RES, "icon-1024.svg"), generateIcon(1024), "utf8");
console.log("✓ resources/icon-1024.svg");

console.log("\\n✅ الأيقونة جاهزة!");
console.log("  • 🎨 جودة عالية (1024×1024)");
console.log("  • 🌙 هلال ذهبي كبير");
console.log("  • 🏮 فانوس مضيء");
console.log("  • 🕌 مسجد بنوافذ");
console.log("  • ⭐ نجوم موزعة");
console.log("  • ✨ MuslimCode أسفل");
console.log("\\n📋 التالي:");
console.log("  svgexport resources\\icon.svg resources\\icon-512.png 512:512");
console.log("  svgexport resources\\icon.svg resources\\icon-1024.png 1024:1024");