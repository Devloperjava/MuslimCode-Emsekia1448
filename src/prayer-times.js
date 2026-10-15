"use strict";

const config = require("./config");

async function getPrayerTimes(date) {
  const { latitude, longitude, timezone } = config.location;
  const url = new URL(`https://api.aladhan.com/v1/timings/${date}`);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("method", "5");
  url.searchParams.set("school", "0");
  url.searchParams.set("timezonestring", timezone);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Prayer API HTTP ${response.status}`);

  const json = await response.json();
  if (json.code !== 200 || !json.data || !json.data.timings) {
    throw new Error("Invalid prayer-times API response");
  }

  return json.data.timings;
}

module.exports = { getPrayerTimes };
