"use strict";

const { generateCalendar } = require("./calendar");

function createPrayerData() {
  return generateCalendar().map(day => ({
    day: day.day,
    date: day.date,
    source: null,
    status: "pending",
    timings: {
      Fajr: null,
      Sunrise: null,
      Dhuhr: null,
      Asr: null,
      Maghrib: null,
      Isha: null
    }
  }));
}

module.exports = { createPrayerData };
