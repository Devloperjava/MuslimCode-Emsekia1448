"use strict";

const REQUIRED = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function validateData(data) {
  if (!Array.isArray(data)) throw new Error("Data must be an array");
  for (const day of data) {
    if (!day.day || !day.date || !day.timings) throw new Error("Invalid day data");
    for (const name of REQUIRED) {
      if (typeof day.timings[name] !== "string" || !day.timings[name].trim()) {
        throw new Error("Missing prayer time: " + name);
      }
    }
  }
  return true;
}

module.exports = { validateData };
