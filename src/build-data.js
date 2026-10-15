"use strict";

const { generateCalendar } = require("./calendar");
const { syncAll } = require("./sync-all");
const { saveData } = require("./storage");

async function buildData(fetcher) {
  const days = generateCalendar();
  const results = await syncAll(days, fetcher);
  saveData(results);
  return results;
}

module.exports = { buildData };
