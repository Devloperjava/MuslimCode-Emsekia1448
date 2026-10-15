"use strict";

const REQUIRED_TIMINGS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function mapPrayerTimes(day, timings) {
  if (!timings || typeof timings !== "object") {
    throw new Error("Invalid prayer timings");
  }

  for (const name of REQUIRED_TIMINGS) {
    if (typeof timings[name] !== "string" || !timings[name].trim()) {
      throw new Error(`Missing prayer time: ${name}`);
    }
  }

  return {
    day: day.day,
    date: day.date,
    source: "AlAdhan API",
    status: "retrieved",
    timings: {
      Fajr: timings.Fajr,
      Sunrise: timings.Sunrise,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha
    }
  };
}

module.exports = { mapPrayerTimes };
