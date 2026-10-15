"use strict";

const { syncDay } = require("./sync");

async function syncAll(days, fetcher) {
  const results = [];

  for (const day of days) {
    const result = await syncDay(day, fetcher);
    results.push(result);

    if (result.status === "offline") break;
  }

  return results;
}

module.exports = { syncAll };
