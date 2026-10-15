"use strict";

/**
 * توليد مواقيت الصلاة لرمضان 1448هـ / 2027م
 * القاهرة - الطريقة المصرية - مذهب الجمهور (Shafi)
 * offline بالكامل - لا يحتاج إنترنت
 */

const fs = require("fs");
const path = require("path");
const {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab
} = require("adhan");

const LOCATION = {
  name: "القاهرة",
  country: "مصر",
  latitude: 31.2001,
  longitude: 29.9187,
  timezone: "Africa/Cairo"
};

const METHOD = "Egyptian";
const MADHAB = "Shafi";

const coords = new Coordinates(LOCATION.latitude, LOCATION.longitude);
const params = CalculationMethod.Egyptian();
params.madhab = Madhab.Shafi;

function formatTime(date) {
  let h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  const period = h < 12 ? "ص" : "م";
  h = h % 12;
  if (h === 0) h = 12;
  return h + ":" + m + " " + period;
}

const DATA_FILE = path.join(__dirname, "..", "ramadan-data.json");
const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const data = Array.isArray(raw) ? raw : raw.days;

console.log("🌙 بدء توليد مواقيت رمضان 1448هـ");
console.log("📍 " + LOCATION.name + " (" + LOCATION.latitude + ", " + LOCATION.longitude + ")");
console.log("🕌 " + METHOD + " | " + MADHAB);
console.log("📅 " + data.length + " يوم\n");

for (const day of data) {
  const [y, m, d] = day.date.split("-").map(Number);
  const date = new Date(y, m - 1, d, 12, 0, 0);

  const pt = new PrayerTimes(coords, date, params);

  day.timings = {
    Fajr:    formatTime(pt.fajr),
    Sunrise: formatTime(pt.sunrise),
    Dhuhr:   formatTime(pt.dhuhr),
    Asr:     formatTime(pt.asr),
    Maghrib: formatTime(pt.maghrib),
    Isha:    formatTime(pt.isha)
  };
  day.source = "adhan:" + METHOD + ":" + MADHAB;
  day.status = "ready";

  console.log("  يوم " + String(day.day).padStart(2, "0") +
              " (" + day.date + ") | إمساك " + day.timings.Fajr +
              " | إفطار " + day.timings.Maghrib);
}

const output = {
  meta: {
    location: LOCATION,
    method: METHOD,
    madhab: MADHAB,
    hijriYear: 1448,
    gregorianYear: 2027,
    generatedAt: new Date().toISOString(),
    version: "1.0.0"
  },
  days: data
};

fs.writeFileSync(DATA_FILE, JSON.stringify(output, null, 2), "utf8");

console.log("\n✅ تم الحفظ: " + DATA_FILE);