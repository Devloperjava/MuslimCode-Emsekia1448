"use strict";

const { getPrayerTimes } = require("./prayer-times");
const { mapPrayerTimes } = require("./mapper");

async function syncDay(day, fetcher = getPrayerTimes) {
  try {
    const timings = await fetcher(day.date);
    return mapPrayerTimes(day, timings);
  } catch (error) {
    return {
      day: day.day,
      date: day.date,
      source: null,
      status: "offline",
      timings: { Fajr: null, Sunrise: null, Dhuhr: null, Asr: null, Maghrib: null, Isha: null },
      error: error.message
    };
  }
}

module.exports = { syncDay };
