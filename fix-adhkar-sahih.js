const fs = require("fs");
const path = require("path");
const WEB = path.join(__dirname, "web");

console.log("📖 أدعية صحيحة من السنة + ليلة القدر\n");

let html = fs.readFileSync(path.join(WEB, "index.html"), "utf8");

// احذف بطاقة الأدعية القديمة
html = html.replace(/<!-- ADHKAR-CARD -->[\s\S]*?<!-- \/ADHKAR-CARD -->\s*/g, "");

// احذف بطاقة ليلة القدر القديمة
html = html.replace(/<!-- QADR-CARD -->[\s\S]*?<!-- \/QADR-CARD -->\s*/g, "");

// ============================================================
// بطاقة الأدعية الثابتة (من السنة الصحيحة)
// ============================================================
const adhkarCard = `<!-- ADHKAR-CARD -->
    <section class="adhkar-card">
      <h2 class="adhkar-title">🤲 أدعية رمضان</h2>

      <div class="dhikr-item">
        <span class="dhikr-icon">🌙</span>
        <div class="dhikr-content">
          <p class="dhikr-text">«اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي»</p>
          <p class="dhikr-source">رواه الترمذي وقال: حديث حسن صحيح [citation:1][citation:10]</p>
        </div>
      </div>

      <div class="dhikr-item">
        <span class="dhikr-icon">✨</span>
        <div class="dhikr-content">
          <p class="dhikr-text">«ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ»</p>
          <p class="dhikr-source">رواه أبو داود والنسائي [citation:12]</p>
        </div>
      </div>

      <div class="dhikr-item">
        <span class="dhikr-icon">🕌</span>
        <div class="dhikr-content">
          <p class="dhikr-text">«اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ»</p>
          <p class="dhikr-source">رواه ابن ماجه [citation:2]</p>
        </div>
      </div>

      <div class="dhikr-item">
        <span class="dhikr-icon">🌟</span>
        <div class="dhikr-content">
          <p class="dhikr-text">«اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ أَنْ تَغْفِرَ لِي»</p>
          <p class="dhikr-source">رواه ابن ماجه وصححه الكناني [citation:2]</p>
        </div>
      </div>
    </section>
    <!-- /ADHKAR-CARD -->

    `;

html = html.replace(
  /(<section class="calendar-section">)/,
  adhkarCard + "$1"
);

// ============================================================
// بطاقة ليلة القدر (بدون أدعية مضافة)
// ============================================================
const qadrCard = `
    <!-- QADR-CARD -->
    <section class="qadr-card">
      <div class="qadr-stars" aria-hidden="true"></div>
      <div class="qadr-moon" aria-hidden="true">🌙</div>
      <h2 class="qadr-title">✨ ليلة القدر</h2>
      <p class="qadr-subtitle">خَيْرٌ مِّنْ أَلْفِ شَهْرٍ</p>

      <div class="qadr-section">
        <h3 class="qadr-h3">📖 من القرآن الكريم</h3>
        <p class="qadr-text qadr-verse">﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ • وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ • لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾</p>
        <p class="qadr-source">[سورة القدر: 1-3]</p>
      </div>

      <div class="qadr-section">
        <h3 class="qadr-h3">✨ علاماتها</h3>
        <ul class="qadr-signs">
          <li>لَيْلَةٌ هَادِئَةٌ مُعْتَدِلَةٌ، لَا حَارَّةٌ وَلَا بَارِدَةٌ</li>
          <li>تَطْلُعُ الشَّمْسُ صَبِيحَتَهَا بَيْضَاءَ بِلَا شُعَاعٍ</li>
          <li>يَشْعُرُ الْمُؤْمِنُ فِيهَا بِالطُّمَأْنِينَةِ وَالسَّكِينَةِ</li>
        </ul>
      </div>

      <div class="qadr-section">
        <h3 class="qadr-h3">🌙 فضلها</h3>
        <p class="qadr-text">مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ</p>
        <p class="qadr-source">رواه البخاري ومسلم</p>
      </div>

      <div class="qadr-footer">
        <span class="qadr-brand">MuslimCode</span>
      </div>
    </section>
    <!-- /QADR-CARD -->
    `;

html = html.replace(
  /(<footer class="site-footer">)/,
  qadrCard + "\n    $1"
);

fs.writeFileSync(path.join(WEB, "index.html"), html, "utf8");
console.log("✓ index.html: أدعية صحيحة + ليلة القدر");

console.log("\\n✅ تم التصحيح:");
console.log("  • 🤲 أدعية من السنة الصحيحة فقط");
console.log("  • 📖 مع ذكر المصدر");
console.log("  • 🌙 ليلة القدر: قرآن + علامات + فضل");
console.log("  • ✍️ بالتشكيل الكامل");
console.log("\\n📋 التالي:");
console.log("  npx cap sync");
console.log("  cd android");
console.log("  gradlew.bat assembleDebug");
console.log("  adb install -r app\\\\build\\\\outputs\\\\apk\\\\debug\\\\app-debug.apk");