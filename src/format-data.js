"use strict";

const NAMES = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء"
};

function formatDay(day) {
  return {
    day: day.day,
    date: day.date,
    status: day.status,
    prayers: Object.entries(day.timings).map(([key, time]) => ({
      key,
      name: NAMES[key] || key,
      time
    }))
  };
}

module.exports = { formatDay };
