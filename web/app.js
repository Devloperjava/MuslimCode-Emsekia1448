"use strict";

/* ============================================================
   إمساكية رمضان 1448 — التطبيق الرئيسي
   ============================================================ */

// ===== أسماء الصلوات =====
const PRAYER_NAMES = {
  Fajr:    "الفجر (الإمساك)",
  Sunrise: "الشروق",
  Dhuhr:   "الظهر",
  Asr:     "العصر",
  Maghrib: "المغرب (الإفطار)",
  Isha:    "العشاء"
};

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ===== العناصر =====
const elCalendar  = document.getElementById("calendar");
const elCountdown = document.getElementById("countdown");
const elToday     = document.getElementById("today");

// ===== التاريخ =====
const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

let DATA = null;

// ===== تحويل "HH:MM ص/م" إلى Date =====
function timeToDate(dateStr, timeStr) {
  const parts = dateStr.split("-").map(Number);
  const y = parts[0], m = parts[1], d = parts[2];

  // دعم صيغتين: "05:12" أو "5:12 ص"
  const clean = timeStr.replace(/\s*(ص|م)\s*$/, "").trim();
  const isPM = /م\s*$/.test(timeStr);
  const [hStr, mStr] = clean.split(":");
  let h = parseInt(hStr, 10);
  const min = parseInt(mStr, 10);

  if (isPM && h < 12) h += 12;
  if (!isPM && h === 12) h = 0;

  return new Date(y, m - 1, d, h, min, 0);
}

// ===== فرق الوقت =====
function formatDiff(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0")
  };
}

// ===== البحث عن اليوم الحالي =====
function findToday() {
  if (!DATA || !DATA.days) return null;
  const now = new Date();
  const todayStr = now.getFullYear() + "-" +
                   String(now.getMonth() + 1).padStart(2, "0") + "-" +
                   String(now.getDate()).padStart(2, "0");
  return DATA.days.find(function (d) { return d.date === todayStr; }) || null;
}

// ===== الصلاة القادمة =====
function findNextPrayer(day) {
  const now = new Date();
  for (let i = 0; i < PRAYER_ORDER.length; i++) {
    const key = PRAYER_ORDER[i];
    const t = day.timings[key];
    if (!t) continue;
    const d = timeToDate(day.date, t);
    if (d > now) return { key: key, date: d };
  }
  return null;
}

// ===== قمر آمن =====
function safeMoon(day, size) {
  if (typeof window.MoonPhase === "undefined") {
    // استخدام moonCardSVG كـ fallback
    var svg = moonCardSVG(day);
    return svg.replace('width="70"', 'width="' + size + '"')
              .replace('height="70"', 'height="' + size + '"');
  }
  try {
    return window.MoonPhase.render(day, size);
  } catch (e) {
    return "";
  }
}

// ===== تحديث القمر الرئيسي =====
function updateMainMoon() {
  const moonBody = document.getElementById("moonBody");
  if (!moonBody) return;

  const today = findToday();
  let dayNum = 1;

  if (today) {
    dayNum = today.day;
  } else {
    const now = new Date();
    const ramadanStart = new Date(2027, 1, 9);
    const diff = Math.floor((now - ramadanStart) / 86400000);
    if (diff >= 0 && diff < 30) dayNum = diff + 1;
    else if (diff < 0) dayNum = 1;
    else dayNum = 30;
  }

  moonBody.innerHTML = safeMoon(dayNum, 130);
}

// ===== العدّاد التنازلي =====
function renderCountdown() {
  const today = findToday();
  if (!today) {
    if (elCountdown) elCountdown.classList.remove("active");
    return;
  }

  const next = findNextPrayer(today);
  if (!next) {
    if (elCountdown) elCountdown.classList.remove("active");
    return;
  }

  const diff = formatDiff(next.date - new Date());
  const isIftar = next.key === "Maghrib";
  const label = isIftar ? "متبقٍ حتى الإفطار" : "متبقٍ حتى " + PRAYER_NAMES[next.key];

  elCountdown.innerHTML =
    '<div class="countdown-label">اليوم ' + today.day + ' من رمضان</div>' +
    '<div class="countdown-title">' + label + '</div>' +
    '<div class="countdown-timer">' +
      '<div class="countdown-part"><div class="countdown-num">' + diff.h + '</div><div class="countdown-unit">ساعة</div></div>' +
      '<div class="countdown-part"><div class="countdown-num">' + diff.m + '</div><div class="countdown-unit">دقيقة</div></div>' +
      '<div class="countdown-part"><div class="countdown-num">' + diff.s + '</div><div class="countdown-unit">ثانية</div></div>' +
    '</div>';
  elCountdown.classList.add("active");
}

// ===== بطاقة اليوم =====
function renderToday() {
  const today = findToday();
  if (!today) {
    if (elToday) elToday.classList.remove("active");
    return;
  }

  const next = findNextPrayer(today);
  const nextKey = next ? next.key : null;

  let prayersHtml = "";
  PRAYER_ORDER.forEach(function (k) {
    const isNext = k === nextKey ? " is-next" : "";
    prayersHtml +=
      '<div class="prayer' + isNext + '">' +
        '<strong>' + PRAYER_NAMES[k] + '</strong>' +
        '<span>' + (today.timings[k] || "—") + '</span>' +
      '</div>';
  });

  elToday.innerHTML =
    '<div class="today-head">' +
      '<div class="today-num">' + String(today.day).padStart(2, "0") + '</div>' +
      '<div class="today-info">' +
        '<h2>اليوم ' + today.day + ' من رمضان</h2>' +
        '<p>' + dateFormatter.format(new Date(today.date + "T12:00:00")) + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="prayers">' + prayersHtml + '</div>';
  elToday.classList.add("active");
}

// ===== قائمة الأيام =====
function renderCalendar() {
  if (!elCalendar || !DATA || !DATA.days) return;

  const today = findToday();
  const todayIdx = today ? DATA.days.indexOf(today) : -1;

  let html = "";
  DATA.days.forEach(function (day, idx) {
    const isToday = idx === todayIdx;
    const isPast = todayIdx >= 0 && idx < todayIdx;
    let cls = "day-card";
    if (isToday) cls += " is-today";
    if (isPast) cls += " is-past";

    let prayersHtml = "";
    PRAYER_ORDER.forEach(function (k) {
      prayersHtml +=
        '<div class="prayer">' +
          '<strong>' + PRAYER_NAMES[k] + '</strong>' +
          '<span>' + (day.timings[k] || "—") + '</span>' +
        '</div>';
    });

    html +=
      '<article class="' + cls + '">' +
        '<div class="date-block">' +
          '<div class="date-moon">' + moonCardSVG(day.day) + '</div>' +
          '<div class="date-info">' +
            '<div class="date-label">' + day.day + ' رمضان 1448</div>' +
            '<div class="date-gregorian">' + dateFormatter.format(new Date(day.date + "T12:00:00")) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="prayers">' + prayersHtml + '</div>' +
      '</article>';
  });

  elCalendar.innerHTML = html;
}

// ===== الإشعارات =====
const notifiedKeys = new Set();

async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const p = await Notification.requestPermission();
  return p === "granted";
}

function showNotification(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body: body, dir: "rtl", lang: "ar" });
  } catch (e) {}
}

function checkNotifications() {
  const today = findToday();
  if (!today) return;
  const now = new Date();

  const fajrTime = timeToDate(today.date, today.timings.Fajr);
  const imsakWarn = new Date(fajrTime.getTime() - 10 * 60 * 1000);
  const imsakKey = today.date + ":imsak";
  if (now >= imsakWarn && now < fajrTime && !notifiedKeys.has(imsakKey)) {
    notifiedKeys.add(imsakKey);
    showNotification("اقترب الإمساك", "باقي 10 دقائق على الإمساك — يوم " + today.day);
  }

  const maghribTime = timeToDate(today.date, today.timings.Maghrib);
  const iftarKey = today.date + ":iftar";
  if (now >= maghribTime && now < new Date(maghribTime.getTime() + 60000) && !notifiedKeys.has(iftarKey)) {
    notifiedKeys.add(iftarKey);
    showNotification("حان وقت الإفطار", "تقبل الله صيامكم — يوم " + today.day);
  }
}

// ===== تحميل البيانات =====
async function loadData() {
  try {
    const res = await fetch("./ramadan-data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();

    if (Array.isArray(json)) {
      DATA = { meta: {}, days: json };
    } else if (json && Array.isArray(json.days)) {
      DATA = json;
    } else {
      throw new Error("Unrecognized data format");
    }

    renderCalendar();
    renderToday();
    renderCountdown();
    updateMainMoon();
  } catch (err) {
    console.error("فشل تحميل البيانات:", err);
    if (elCalendar) {
      elCalendar.innerHTML = '<div style="text-align:center;padding:30px;color:#b00">تعذر تحميل البيانات</div>';
    }
  }
}

// ===== التشغيل =====
(async function init() {
  await loadData();
  await requestNotificationPermission();

  setInterval(function () {
    renderCountdown();
    checkNotifications();
  }, 1000);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(function () {});
  }
})();


/* MOON-CARD-BIRD */
function moonCardSVG(day) {
  // 🌙 هلال نصي — مضمون 100%
  // الرمز ☪ (U+262A) = هلال ونجمة
  // أو 🌙 (U+1F319)
  return '<span class="moon-emoji">🌙</span>' +
         '<span class="moon-day-num">' + String(day).padStart(2, "0") + '</span>';
}




/* RAMADAN-COUNTER */
(function ramadanCounter(){
  var RAMADAN_START = new Date(2027, 1, 9, 0, 0, 0);  // 9 فبراير 2027

  function tick(){
    var now = new Date();
    var diff = RAMADAN_START - now;
    if (diff <= 0) {
      var el = document.getElementById("ramadanCounter");
      if (el) el.style.display = "none";
      return;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;

    var elD = document.getElementById("rcDays");
    var elH = document.getElementById("rcHours");
    var elM = document.getElementById("rcMins");
    var elS = document.getElementById("rcSecs");

    if (elD) elD.textContent = String(d).padStart(2, "0");
    if (elH) elH.textContent = String(h).padStart(2, "0");
    if (elM) elM.textContent = String(m).padStart(2, "0");
    if (elS) elS.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
})();



/* TOOLTIP-ADHKAR */
(function tooltipAdhkar(){
  var ADHKAR = [
    { icon: "🌙", text: "اللهم بلّغنا رمضان وأعنا على صيامه وقيامه" },
    { icon: "✨", text: "اللهم إنك عفوٌّ كريم تحب العفو فاعفُ عنا" },
    { icon: "🕌", text: "اللهم تقبّل صيامنا وقيامنا واغفر لنا ذنوبنا" },
    { icon: "🌿", text: "اللهم اجعل رمضان هذا خير رمضان مرّ علينا" },
    { icon: "🌟", text: "اللهم أعنا على ذكرك وشكرك وحسن عبادتك" },
    { icon: "🤲", text: "اللهم ارزقنا صيام رمضان إيماناً واحتساباً" },
    { icon: "🌌", text: "اللهم اجعل القرآن ربيع قلوبنا في رمضان" }
  ];

  var idx = 0;
  function show(){
    var container = document.getElementById("tooltipContainer");
    if (!container) return;
    var dhikr = ADHKAR[idx % ADHKAR.length];
    idx++;

    container.innerHTML =
      '<div class="tooltip">' +
        '<span class="tooltip-icon">' + dhikr.icon + '</span>' +
        '<div class="tooltip-text">' + dhikr.text + '</div>' +
        '<div class="tooltip-brand">MuslimCode</div>' +
      '</div>';

    // إزالة بعد 8.5 ثانية
    setTimeout(function(){ container.innerHTML = ""; }, 8500);
  }

  function start(){
    setTimeout(function(){
      show();
      setInterval(show, 2.5 * 60 * 1000);  // كل 2.5 دقيقة
    }, 15000);  // أول ToolTip بعد 15 ثانية
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

/* NOTIFY-12H-FINAL */
(function notify12hFinal(){
  var KEY = "mc_notify_last";
  var INTERVAL = 12 * 60 * 60 * 1000;  // 12 ساعة

  var MESSAGES = [
    "Supported For MuslimCode\n🌙 إمساكية رمضان 1448",
    "من تطوير MuslimCode\n🤲 لا تنسَ الدعاء",
    "Supported For MuslimCode\n✨ تقبّل الله صيامك",
    "MuslimCode — Ramadan 1448\n🌿 اللهم بلّغنا رمضان"
  ];

  function notify(){
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    var last = parseInt(localStorage.getItem(KEY) || "0", 10);
    var now = Date.now();
    if (now - last < INTERVAL) return;
    localStorage.setItem(KEY, String(now));

    var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    try {
      new Notification("🌙 MuslimCode", {
        body: msg,
        dir: "rtl",
        lang: "ar",
        tag: "mc-12h-final",
        requireInteraction: false
      });
    } catch(e){}
  }

  function start(){
    setTimeout(notify, 5000);
    setInterval(notify, 60 * 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();


/* FORCE-MOTION-V2 */
(function forceMotionV2() {
  function apply() {
    // القمر الرئيسي
    var moon = document.querySelector(".moon-wrap");
    if (moon && !moon.dataset.fmv2) {
      moon.dataset.fmv2 = "1";
      moon.style.animation = "moonSmooth 5s cubic-bezier(.45,0,.55,1) infinite";
    }

    // النجوم — قيم أسرع
    var stars = document.querySelectorAll(".star");
    stars.forEach(function(star) {
      if (star.dataset.fmv2) return;
      star.dataset.fmv2 = "1";
      var dur = 1.5 + Math.random() * 1.5;  // 1.5-3s (كان 2-4)
      var delay = Math.random() * 2;
      star.style.animation = "starTwinkle " + dur + "s ease-in-out " + delay + "s infinite";
    });

    // المطر
    var drops = document.querySelectorAll(".rain-drop");
    drops.forEach(function(drop) {
      if (drop.dataset.fmv2) return;
      drop.dataset.fmv2 = "1";
      var baseDur = drop.classList.contains("type-thin") ? 1.0 :
                    drop.classList.contains("type-mid")  ? 1.3 : 1.7;
      drop.style.animationDuration = (baseDur + Math.random() * 0.5) + "s";
    });
  }

  function start() {
    setTimeout(apply, 800);
    setTimeout(apply, 2500);
    setTimeout(apply, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
