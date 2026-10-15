const fs = require("fs");
const path = require("path");

const RES = path.join(__dirname, "resources");
if (!fs.existsSync(RES)) fs.mkdirSync(RES);

function generateIcon(size) {
  const s = size;
  const half = s / 2;
  const moonCX = half;
  const moonCY = s * 0.42;
  const moonR = s * 0.22;

  const stars = [
    { x: 0.12, y: 0.08, r: 3, o: 0.95 },
    { x: 0.80, y: 0.10, r: 3.5, o: 1.0 },
    { x: 0.42, y: 0.06, r: 2, o: 0.6 },
    { x: 0.08, y: 0.28, r: 2.5, o: 0.8 },
    { x: 0.92, y: 0.32, r: 2, o: 0.65 },
    { x: 0.18, y: 0.42, r: 2, o: 0.7 },
    { x: 0.82, y: 0.45, r: 2.5, o: 0.75 }
  ];

  let starsSvg = "";
  stars.forEach(function (st) {
    starsSvg += '<circle cx="' + (st.x * s).toFixed(1) + '" cy="' + (st.y * s).toFixed(1) + '" r="' + st.r + '" fill="#ffffff" opacity="' + st.o + '"/>';
  });

  const cutR = moonR * 0.88;
  const cutX = moonCX + moonR * 0.42;
  const cutY = moonCY - moonR * 0.08;

  const textSize = s * 0.085;
  const textY = s * 0.86;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
    '<defs>' +

    // خلفية بترولية غامقة
    '<radialGradient id="bg1" cx="50%" cy="25%" r="85%">' +
      '<stop offset="0%" stop-color="#1f4f4a"/>' +   // بترولي فاتح
      '<stop offset="40%" stop-color="#163a38"/>' +  // بترولي
      '<stop offset="75%" stop-color="#0d2523"/>' +  // بترولي غامق
      '<stop offset="100%" stop-color="#051412"/>' + // بترولي غامق جداً
    '</radialGradient>' +

    // تدرج أبيض ناصع للهلال
    '<radialGradient id="moonG" cx="30%" cy="30%" r="80%">' +
      '<stop offset="0%" stop-color="#ffffff"/>' +
      '<stop offset="60%" stop-color="#f0f4f2"/>' +
      '<stop offset="100%" stop-color="#c8d4cf"/>' +
    '</radialGradient>' +

    // توهج أبيض
    '<radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="rgba(255,255,255,.35)"/>' +
      '<stop offset="60%" stop-color="rgba(255,255,255,.10)"/>' +
      '<stop offset="100%" stop-color="rgba(255,255,255,0)"/>' +
    '</radialGradient>' +

    // تدرج أبيض للنص
    '<linearGradient id="textG" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" stop-color="#c8d4cf"/>' +
      '<stop offset="50%" stop-color="#ffffff"/>' +
      '<stop offset="100%" stop-color="#c8d4cf"/>' +
    '</linearGradient>' +

    '<filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">' +
      '<feGaussianBlur stdDeviation="' + (s * 0.015) + '" result="b"/>' +
      '<feMerge>' +
        '<feMergeNode in="b"/>' +
        '<feMergeNode in="SourceGraphic"/>' +
      '</feMerge>' +
    '</filter>' +

    '<filter id="moonHalo" x="-50%" y="-50%" width="200%" height="200%">' +
      '<feGaussianBlur stdDeviation="' + (s * 0.04) + '"/>' +
    '</filter>' +

    '</defs>' +

    // خلفية
    '<rect width="' + s + '" height="' + s + '" fill="url(#bg1)"/>' +

    // نجوم
    starsSvg +

    // هالة الهلال
    '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + (moonR * 2) + '" fill="url(#moonGlow)"/>' +

    // توهج قوي
    '<g filter="url(#moonHalo)" opacity="0.55">' +
      '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + moonR + '" fill="#ffffff"/>' +
      '<circle cx="' + cutX + '" cy="' + cutY + '" r="' + cutR + '" fill="#163a38"/>' +
    '</g>' +

    // الهلال الأبيض الناصع
    '<g filter="url(#softGlow)">' +
      '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + moonR + '" fill="url(#moonG)"/>' +
      '<circle cx="' + cutX + '" cy="' + cutY + '" r="' + cutR + '" fill="#163a38"/>' +
    '</g>' +

    // خط أبيض فاصل
    '<line x1="' + (s * 0.30) + '" y1="' + (s * 0.70) + '" ' +
          'x2="' + (s * 0.70) + '" y2="' + (s * 0.70) + '" ' +
          'stroke="#ffffff" stroke-width="' + (s * 0.004) + '" opacity="0.75"/>' +

    // النص — أبيض ناصع
    '<text x="' + half + '" y="' + textY + '" ' +
          'font-family="Georgia, Times New Roman, serif" ' +
          'font-size="' + textSize + '" ' +
          'font-weight="bold" ' +
          'letter-spacing="' + (s * 0.008) + '" ' +
          'fill="url(#textG)" ' +
          'text-anchor="middle" ' +
          'filter="url(#softGlow)">MuslimCode</text>' +

  '</svg>';
}

function generateSplash(size) {
  const s = size;
  const half = s / 2;
  const moonCX = half;
  const moonCY = s * 0.45;
  const moonR = s * 0.10;

  const cutR = moonR * 0.88;
  const cutX = moonCX + moonR * 0.42;
  const cutY = moonCY - moonR * 0.08;

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '">' +
    '<defs>' +
    '<radialGradient id="bg" cx="50%" cy="30%" r="80%">' +
      '<stop offset="0%" stop-color="#1f4f4a"/>' +
      '<stop offset="50%" stop-color="#163a38"/>' +
      '<stop offset="100%" stop-color="#051412"/>' +
    '</radialGradient>' +
    '<radialGradient id="mg" cx="30%" cy="30%" r="80%">' +
      '<stop offset="0%" stop-color="#ffffff"/>' +
      '<stop offset="60%" stop-color="#f0f4f2"/>' +
      '<stop offset="100%" stop-color="#c8d4cf"/>' +
    '</radialGradient>' +
    '<filter id="bl">' +
      '<feGaussianBlur stdDeviation="' + (s * 0.01) + '"/>' +
    '</filter>' +
    '</defs>' +
    '<rect width="' + s + '" height="' + s + '" fill="url(#bg)"/>' +
    '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + (moonR * 2.5) + '" fill="rgba(255,255,255,.08)" filter="url(#bl)"/>' +
    '<circle cx="' + moonCX + '" cy="' + moonCY + '" r="' + moonR + '" fill="url(#mg)"/>' +
    '<circle cx="' + cutX + '" cy="' + cutY + '" r="' + cutR + '" fill="#163a38"/>' +
    '<text x="' + half + '" y="' + (s * 0.65) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.038) + '" ' +
          'font-weight="bold" fill="#ffffff" ' +
          'text-anchor="middle">إمساكية رمضان 1448</text>' +
    '<text x="' + half + '" y="' + (s * 0.70) + '" ' +
          'font-family="Georgia, serif" ' +
          'font-size="' + (s * 0.020) + '" ' +
          'fill="#c8d4cf" ' +
          'letter-spacing="' + (s * 0.004) + '" ' +
          'text-anchor="middle">MuslimCode</text>' +
  '</svg>';
}

fs.writeFileSync(path.join(RES, "icon.svg"), generateIcon(1024), "utf8");
fs.writeFileSync(path.join(RES, "splash.svg"), generateSplash(2732), "utf8");

console.log("✅ أيقونة جديدة — أبيض + بترولي (بدون ذهبي)");
console.log("");
console.log("👉 للمعاينة:");
console.log("   start chrome \"%CD%\\resources\\icon.svg\"");